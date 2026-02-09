const canvasA=document.getElementById("avatar");
const sceneA=new THREE.Scene();
const cameraA=new THREE.PerspectiveCamera(60,1,0.1,100);
cameraA.position.set(0,1.4,3);

const rendererA=new THREE.WebGLRenderer({canvas:canvasA,alpha:true});
rendererA.setSize(canvasA.clientWidth,canvasA.clientHeight);

sceneA.add(new THREE.AmbientLight(0xffffff,0.8));
sceneA.add(new THREE.DirectionalLight(0xffffff,1));

const loaderA=new THREE.GLTFLoader();
let avatar,mixer,actions={};
const clock=new THREE.Clock();

loaderA.load(
"https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
gltf=>{
avatar=gltf.scene;
avatar.scale.set(1.2,1.2,1.2);
sceneA.add(avatar);
mixer=new THREE.AnimationMixer(avatar);
gltf.animations.forEach(a=>{
actions[a.name.toLowerCase()]=mixer.clipAction(a);
});
}
);

function playAvatar(action){
if(!actions) return;
Object.values(actions).forEach(a=>a.stop());
if(actions[action]) actions[action].play();
}

function animateA(){
requestAnimationFrame(animateA);
if(mixer) mixer.update(clock.getDelta());
rendererA.render(sceneA,cameraA);
}
animateA();
