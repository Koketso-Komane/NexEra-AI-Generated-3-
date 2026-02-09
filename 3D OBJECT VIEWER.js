const canvas=document.getElementById("viewer");
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,1,0.1,100);
camera.position.set(0,1.2,3);

const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setSize(canvas.clientWidth,canvas.clientHeight);

const controls=new THREE.OrbitControls(camera,canvas);
controls.enableDamping=true;

scene.add(new THREE.AmbientLight(0xffffff,0.8));
const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(3,5,2);
scene.add(light);

const loader=new THREE.GLTFLoader();
let current;

function loadObject(url){
if(current)scene.remove(current);
loader.load(url,gltf=>{
current=gltf.scene;
centerAndScale(current);
scene.add(current);
});
}

function centerAndScale(model){
const box=new THREE.Box3().setFromObject(model);
const size=box.getSize(new THREE.Vector3()).length();
const center=box.getCenter(new THREE.Vector3());
model.position.sub(center);
model.scale.multiplyScalar(1.5/size);
}

function animate(){
requestAnimationFrame(animate);
controls.update();
renderer.render(scene,camera);
}
animate();
