import * as THREE from "three";

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

export function createPlayer(scene) {

    // Player body
    const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 1.5, 8, 16),
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x004444
        })
    );

    body.position.set(0, 1, 0);
    body.castShadow = true;
    scene.add(body);

    let velocity = new THREE.Vector3();

    const walkSpeed = 0.20;
    const sprintSpeed = 0.40;

    function update() {

        velocity.set(0,0,0);

        const speed =
            (keys["shift"])
            ? sprintSpeed
            : walkSpeed;

        // WASD
        if(keys["w"]) velocity.z -= speed;
        if(keys["s"]) velocity.z += speed;
        if(keys["a"]) velocity.x -= speed;
        if(keys["d"]) velocity.x += speed;

        // Arrow Keys
        if(keys["arrowup"]) velocity.z -= speed;
        if(keys["arrowdown"]) velocity.z += speed;
        if(keys["arrowleft"]) velocity.x -= speed;
        if(keys["arrowright"]) velocity.x += speed;

        if(velocity.length() > 0){

            velocity.normalize().multiplyScalar(speed);

            body.position.add(velocity);

            body.rotation.y = Math.atan2(
                velocity.x,
                velocity.z
            );

        }

    }

    return{

        mesh:body,

        update

    };

}