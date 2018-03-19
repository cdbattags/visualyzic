/* eslint-disable */
// Assumes context is an AudioContext defined outside of this class.
class VScene extends Polymer.Element {
  static get is() {return 'v-scene';}

  static get properties() {
    return {
      isBeat: {
          type: Boolean,
          notify: true,
          reflectToAttribute: true
      },
        volume: {
            type: Number,
            notify: true,
            reflectToAttribute: true
        },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    
    // initial camera position
    this.camera.position.z = 900;
    // set renderer fullscreen
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // add to dom
    this.$.scene.appendChild(this.renderer.domElement);
    var pointLight = new THREE.PointLight(0xFFFFFF, 1, 0, 2);
    var ambientLight = new THREE.AmbientLight(0x404040);
    // set where you want the light to be directed at
    pointLight.position.set(10, 50, 130);
    this.sphereColors = [{r:156,g:0,b:253},{r:0,g:255,b:249},{r:0,g:253,b:40},{r:245,g:253,b:0},{r:252,g:15,b:145}];
    this.activeColor = 0;
    var sphereRadius = 150;
    var sphereSegments = 24;
    var sphereRings = 24;
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xCC0000
    });
    var sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereRings);
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // add all objects to scene
    this.scene.add(ambientLight);
    this.scene.add(pointLight);
    this.scene.add(this.sphere);
      
    //console.log("hello: ", this.isBeat, this.volume)
    //this.attributeChanged();
  }

  attributeChangedCallback() {
    super.attributeChangedCallback();
    console.log("hello: ", this.isBeat, this.volume)
    // change sphere color every beat
    if (this.isBeat) {
      let color = this.sphereColors[this.activeColor];
      this.sphere.material.color = new THREE.Color(`rgb(${color.r},${color.g},${color.b})`);
      this.activeColor = this.activeColor < this.sphereColors.length - 1 ? this.activeColor + 1 : 0;
    }

    // change sphere size based on volume
    this.sphere.scale.x = .3 + (this.volume / 2);
    this.sphere.scale.y = .3 + (this.volume / 2);
    this.sphere.scale.z = .3 + (this.volume / 2);

    // rerender scene every update
    this.renderer.render(this.scene, this.camera);
    
  }
}
window.customElements.define(VScene.is, VScene);
