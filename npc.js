import * as THREE from "three";


const npcs = [];


function random(min,max){

    return Math.random()*(max-min)+min;

}



export function spawnNPCs(scene){


    const colors=[

        0xff3366,
        0x00ffff,
        0xffff00,
        0xffffff,
        0xff8800,
        0x55ff55

    ];



    for(let i=0;i<80;i++){


        const citizen = new THREE.Mesh(

            new THREE.CapsuleGeometry(
                .3,
                1,
                4,
                8
            ),

            new THREE.MeshStandardMaterial({

                color:
                colors[
                    Math.floor(
                        Math.random()
                        *
                        colors.length
                    )
                ]

            })

        );



        // Spawn mostly near roads

        citizen.position.set(

            random(-220,220),

            1,

            random(-220,220)

        );



        citizen.castShadow=true;


        scene.add(citizen);



        npcs.push({

            mesh:citizen,


            direction:
            new THREE.Vector3(

                random(-1,1),
                0,
                random(-1,1)

            ).normalize(),


            speed:
            random(
                .01,
                .04
            ),


            timer:
            random(
                50,
                200
            )


        });


    }



    console.log(
        "Neo-Vanguard citizens spawned"
    );


}




export function updateNPCs(){


    npcs.forEach(npc=>{


        npc.mesh.position.add(

            npc.direction.clone()
            .multiplyScalar(
                npc.speed
            )

        );



        npc.timer--;



        if(npc.timer<=0){


            npc.direction.set(

                random(-1,1),
                0,
                random(-1,1)

            )
            .normalize();



            npc.timer=
            random(
                50,
                200
            );


        }



        // Keep NPCs inside city

        if(
            npc.mesh.position.x > 250 ||
            npc.mesh.position.x < -250
        ){

            npc.direction.x *= -1;

        }


        if(
            npc.mesh.position.z > 250 ||
            npc.mesh.position.z < -250
        ){

            npc.direction.z *= -1;

        }



        // Face walking direction

        npc.mesh.rotation.y =
        Math.atan2(

            npc.direction.x,

            npc.direction.z

        );


    });


}