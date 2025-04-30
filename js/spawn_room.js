


let nbTrianglesSpawn = 6;


function creerObj3DMursSpawn(objgl, intNoTexture) {
    var obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = 1;
    obj3DMurs.fltLargeur = 1;
    obj3DMurs.fltHauteur = 2;

    obj3DMurs.vertex = creerVertexSpawn(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur);
    obj3DMurs.couleurs = creerCouleursSpawn(objgl, [1, 1, 1, 1]);
    obj3DMurs.texels = creerTexelsSpawn(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture);
    obj3DMurs.maillage = creerMaillageMursSpawn(objgl);

    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerVertexSpawn(objgl, fltHauteur) {
    let tabVertex = [
    ];
    nbTrianglesSpawn = 0;
    for (let x = 0; x < tabMurs.length; x++) {
        for (let y = 0; y < tabMurs[x].length; y++) {
            if (tabMurs[x][y] == 2) {
                
                console.log("Spawn : " + x + " " + y);
                tabVertex.push(x); // bottom front left -- 0
                tabVertex.push(0);
                tabVertex.push(y);

                tabVertex.push(x + 1); // bottom front right -- 1
                tabVertex.push(0);
                tabVertex.push(y);

                tabVertex.push(x); // top front left -- 2
                tabVertex.push(fltHauteur);
                tabVertex.push(y);

                tabVertex.push(x + 1); // top front right -- 3
                tabVertex.push(fltHauteur);
                tabVertex.push(y);


                tabVertex.push(x); // bottom back left -- 4
                tabVertex.push(0);
                tabVertex.push(y + 1);

                tabVertex.push(x + 1); // bottom back right -- 5
                tabVertex.push(0);
                tabVertex.push(y + 1);

                tabVertex.push(x); // top front left -- 6
                tabVertex.push(fltHauteur);
                tabVertex.push(y + 1);

                tabVertex.push(x + 1); //  top front right -- 7
                tabVertex.push(fltHauteur);
                tabVertex.push(y + 1);
                nbTrianglesSpawn += 10;
            }
        }


    }
    //console.log(nbTrianglesSpawn);


    var objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    return objMurs;
}

function creerCouleursSpawn(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMurs;
}

function creerTexelsSpawn(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    let tabTexels = [


    ];
    for (let x = 0; x < tabMurs.length; x++) {
        for (let y = 0; y < tabMurs[x].length; y++) {
            tabTexels.push(0.0, 0.0,
                fltProfondeur, 0.0,
                0.0, fltHauteur,
                fltProfondeur, fltHauteur,

                0.0, 0.0,
                fltProfondeur, 0.0,
                0.0, fltHauteur,
                fltProfondeur, fltHauteur,

                0.0, 0.0,
                fltProfondeur, 0.0,
                0.0, fltHauteur,
                fltProfondeur, fltHauteur,

                0.0, fltHauteur,
                0.0, 0.0,
                fltProfondeur, fltHauteur,
                fltProfondeur, 0.0,

                0.0, 0.0,
                fltProfondeur, 0.0,
                0.0, fltHauteur,
                fltProfondeur, fltHauteur,

                0.0, 0.0,
                fltProfondeur, 0.0,
                0.0, fltHauteur,
                fltProfondeur, fltHauteur,

                0.0, 0.0,
                fltProfondeur, 0.0,
                0.0, fltHauteur,
                fltProfondeur, fltHauteur,

                0.0, fltHauteur,
                0.0, 0.0,
                fltProfondeur, fltHauteur,
                fltProfondeur, 0.0,
            );
        }
    }

    var objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 1.0;
    return objTexelsMurs;
}

function creerMaillageMursSpawn(objgl) {
    var tabMaillage =
        [ // Les 2 triangles du gauche

            /*
            0, 1, 2,
            1, 2, 3,
            // Les 2 triangles du droit
            4, 5, 6,
            5, 6, 7,
            // Les 2 triangles du avant
            0, 4, 2,
            2, 6, 4,
            // Les 2 triangles du arriere
            1, 5, 7,
            7, 3, 1,
            // Les 2 triangles du dessus
            3, 6, 7,
            2, 6, 3,
 
*/

        ];
    let ecart = -8;

    for (let x = 0; x < tabMurs.length; x++) {
        for (let y = 0; y < tabMurs[x].length; y++) {
            ecart += 8;
            tabMaillage.push(0 + ecart);
            tabMaillage.push(1 + ecart);
            tabMaillage.push(2 + ecart);
            tabMaillage.push(1 + ecart);
            tabMaillage.push(2 + ecart);
            tabMaillage.push(3 + ecart);

            tabMaillage.push(4 + ecart);
            tabMaillage.push(5 + ecart);
            tabMaillage.push(6 + ecart);
            tabMaillage.push(5 + ecart);
            tabMaillage.push(6 + ecart);
            tabMaillage.push(7 + ecart);

            tabMaillage.push(0 + ecart);
            tabMaillage.push(2 + ecart);
            tabMaillage.push(4 + ecart);
            tabMaillage.push(2 + ecart);
            tabMaillage.push(4 + ecart);
            tabMaillage.push(6 + ecart);

            tabMaillage.push(1 + ecart);
            tabMaillage.push(5 + ecart);
            tabMaillage.push(7 + ecart);
            tabMaillage.push(7 + ecart);
            tabMaillage.push(3 + ecart);
            tabMaillage.push(1 + ecart);

            tabMaillage.push(3 + ecart);
            tabMaillage.push(6 + ecart);
            tabMaillage.push(7 + ecart);
            tabMaillage.push(6 + ecart);
            tabMaillage.push(7 + ecart);
            tabMaillage.push(2 + ecart);


        }
    }


    var objMaillageMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurs.intNbTriangles = nbTrianglesSpawn;
    // Le nombre de droites
    objMaillageMurs.intNbDroites = 0;
console.log(tabMaillage)
    return objMaillageMurs;
}


