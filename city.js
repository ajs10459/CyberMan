import * as THREE from "three";


function random(min,max){

    return Math.random()*(max-min)+min;

}


export function createCity(scene){


    const buildingMaterials=[

        new THREE.MeshStandardMaterial({
            color:0x111122,
            emissive:0x001133
        }),

        new THREE.MeshStandardMaterial({
            color:0x222233,
            emissive:0x330033
        }),

        new THREE.MeshStandardMaterial({
            color:0x151515
        })

    ];


    const neonMaterials=[

        new THREE.MeshBasicMaterial({
            color:0xff00ff
        }),

        new THREE.MeshBasicMaterial({
            color:0x00ffff
        }),

        new THREE.MeshBasicMaterial({
            color:0xffff00
        })

    ];



    // Roads

    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color:0x050505
        });


    for(let x=-250;x<=250;x+=50){

        const road=new THREE.Mesh(

            new THREE.BoxGeometry(
                12,
                0.05,
                500
            ),

            roadMaterial

        );

        road.position.set(
            x,
            0.03,
            0
        );

        scene.add(road);

    }



    for(let z=-250;z<=250;z+=50){

        const road=new THREE.Mesh(

            new THREE.BoxGeometry(
                500,
                0.05,
                12
            ),

            roadMaterial

        );


        road.position.set(
            0,
            0.03,
            z
        );


        scene.add(road);

    }





    // Sidewalks

    const sidewalkMaterial =
        new THREE.MeshStandardMaterial({
            color:0x222222
        });


    for(let x=-250;x<=250;x+=50){

        const sidewalk =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                4,
                .15,
                500
            ),

            sidewalkMaterial

        );


        sidewalk.position.set(
            x+8,
            .08,
            0
        );


        scene.add(sidewalk);


    }





    // Buildings


    for(let x=-250;x<=250;x+=25){

        for(let z=-250;z<=250;z+=25){



            // Leave roads open

            if(
                Math.abs(x%50)<8 ||
                Math.abs(z%50)<8
            ){

                continue;

            }



            let poorArea =
                (x < -100 && z < 100);



            let height;


            if(poorArea){

                height=random(8,35);

            }

            else{

                height=random(30,160);

            }



            const width=random(12,22);



            const building =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width,
                    height,
                    width
                ),

                buildingMaterials[
                    Math.floor(
                        Math.random()*
                        buildingMaterials.length
                    )
                ]

            );


            building.position.set(

                x+random(-5,5),

                height/2,

                z+random(-5,5)

            );


            building.castShadow=true;


            scene.add(building);




            // Neon strips


            if(Math.random()>0.35){


                const neon =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        width*.8,
                        .4,
                        .1
                    ),

                    neonMaterials[
                        Math.floor(
                            Math.random()*
                            neonMaterials.length
                        )
                    ]

                );


                neon.position.set(

                    building.position.x,

                    random(
                        height*.3,
                        height*.8
                    ),

                    building.position.z+
                    width/2

                );


                scene.add(neon);


            }



            // Rooftop antenna

            if(height>80){

                const antenna =
                new THREE.Mesh(

                    new THREE.CylinderGeometry(
                        .15,
                        .15,
                        15
                    ),

                    new THREE.MeshBasicMaterial({
                        color:0xff0000
                    })

                );


                antenna.position.set(

                    building.position.x,

                    height+7,

                    building.position.z

                );


                scene.add(antenna);

            }


        }

    }





    // Street lights


    for(let i=0;i<150;i++){


        const pole =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .08,
                .08,
                5
            ),

            new THREE.MeshStandardMaterial({
                color:0x333333
            })

        );


        const light =
        new THREE.PointLight(
            0x00ffff,
            2,
            20
        );


        pole.position.set(

            random(-240,240),

            2.5,

            random(-240,240)

        );


        light.position.copy(
            pole.position
        );


        scene.add(pole);

        scene.add(light);


    }





    // Central corporate tower


    const tower =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            45,
            250,
            45
        ),

        new THREE.MeshStandardMaterial({

            color:0x080808,

            emissive:0x220022

        })

    );


    tower.position.set(
        0,
        125,
        0
    );


    scene.add(tower);



    console.log(
        "Neo-Vanguard city generated"
    );


}