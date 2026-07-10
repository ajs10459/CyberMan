import * as THREE from "three";

import {createPlayer} from "./player.js";
import {createCity} from "./city.js";
import {createCamera} from "./camera.js";
import {spawnNPCs} from "./npc.js";

const canvas=document.getElementById("game");

const scene=new THREE.Scene();

scene.background=new THREE.Color(0x050510);

scene.fog=new THREE.Fog(0x050510,80,450);

const renderer=new THREE.WebGLRenderer({

    canvas,
    antialias:true

});

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

const camera=createCamera();

scene.add(camera);

const ambient=new THREE.AmbientLight(0xffffff,.6);

scene.add(ambient);

const moon=new THREE.DirectionalLight(0x66bbff,1.5);

moon.position.set(40,80,20);

scene.add(moon);

const ground=new THREE.Mesh(

new THREE.PlaneGeometry(1000,1000),

new THREE.MeshStandardMaterial({

color:0x111111

})

);

ground.rotation.x=-Math.PI/2;

scene.add(ground);

const player=createPlayer(scene);

createCity(scene);

spawnNPCs(scene);

document.getElementById("loading").style.display="none";

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

function animate(){

requestAnimationFrame(animate);

player.update();

camera.position.lerp(

new THREE.Vector3(

player.mesh.position.x,

player.mesh.position.y+8,

player.mesh.position.z+15

),

0.08

);

camera.lookAt(player.mesh.position);

renderer.render(scene,camera);

}

animate();