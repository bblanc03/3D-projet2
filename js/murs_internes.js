const tabMurs =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 2, 2, 0, 2, 2, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 2, 3, 3, 3, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 3, 3, 3, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 2, 3, 3, 3, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


let binBas = false;
let nbTriangles = 6;

function getTabMurs(){
    return tabMurs;
}


function creerObj3DMursInternes(objgl, intNoTexture) {

    // for (let i = 0; i < tabMurs.length; i++) {
    //     for (let j = 0; j < tabMurs[i].length; j++) {
    //         tabMurs[i][j] = 0;
    //     }
    // }
    var obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = 1;
    obj3DMurs.fltLargeur = 1;
    obj3DMurs.fltHauteur = 2;

    obj3DMurs.vertex = creerVertexMursInternes(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur);
    obj3DMurs.couleurs = creerCouleursMursInternes(objgl, [1, 1, 1, 1]);
    obj3DMurs.texels = creerTexelsMursInternes(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture);
    obj3DMurs.maillage = creerMaillageMursInterne(objgl);

    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerVertexMursInternes(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    var tabVertex = [
    ];
    nbTriangles = 0;
    for (let x = 0; x < tabMurs.length; x++) {
        for (let y = 0; y < tabMurs[x].length; y++) {
            if (tabMurs[x][y] == 1) {
                //left side----------------------------------------------------
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


                // right side---------------------------------------------------
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

                //top-----------------------------------------------------------------------
                tabVertex.push(x); // top left-side left -- 8
                tabVertex.push(fltHauteur);
                tabVertex.push(y);

                tabVertex.push(x + 1); // top left-side right -- 9
                tabVertex.push(fltHauteur);
                tabVertex.push(y);

                tabVertex.push(x); // top right-side left -- 10
                tabVertex.push(fltHauteur);
                tabVertex.push(y + 1);

                tabVertex.push(x + 1); //  top right-side right -- 11
                tabVertex.push(fltHauteur);
                tabVertex.push(y + 1);

                //front-----------------------------------------------------------------------                
                tabVertex.push(x); // top left-side left -- 12
                tabVertex.push(0);
                tabVertex.push(y);

                tabVertex.push(x); // top left-side right -- 13
                tabVertex.push(0);
                tabVertex.push(y + 1);

                tabVertex.push(x); // top right-side left -- 14
                tabVertex.push(fltHauteur);
                tabVertex.push(y);

                tabVertex.push(x); //  top right-side right -- 15
                tabVertex.push(fltHauteur);
                tabVertex.push(y + 1);

                //back-----------------------------------------------------------------------                
                tabVertex.push(x +1); // top left-side left -- 16
                tabVertex.push(0);
                tabVertex.push(y +1);

                tabVertex.push(x+1); // top left-side right -- 17
                tabVertex.push(0);
                tabVertex.push(y);

                tabVertex.push(x +1); // top right-side left -- 18
                tabVertex.push(fltHauteur);
                tabVertex.push(y +1);

                tabVertex.push(x + 1); //  top right-side right -- 19
                tabVertex.push(fltHauteur);
                tabVertex.push(y);

                nbTriangles += 20;
            }
        }


    }
    //console.log(nbTriangles);


    var objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMurs;
}

function creerCouleursMursInternes(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMurs;
}

function creerTexelsMursInternes(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    var tabTexels = [


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
            );
        }
    }

    var objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 1.0;

    return objTexelsMurs;
}

function creerMaillageMursInterne(objgl) {
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
            ecart += 12;
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

            tabMaillage.push(8 + ecart);
            tabMaillage.push(9 + ecart);
            tabMaillage.push(10 + ecart);
            tabMaillage.push(9 + ecart);
            tabMaillage.push(10 + ecart);
            tabMaillage.push(11 + ecart);

            tabMaillage.push(12 + ecart);
            tabMaillage.push(13 + ecart);
            tabMaillage.push(14 + ecart);
            tabMaillage.push(13 + ecart);
            tabMaillage.push(14 + ecart);
            tabMaillage.push(15 + ecart);

            tabMaillage.push(16 + ecart);
            tabMaillage.push(17 + ecart);
            tabMaillage.push(18 + ecart);
            tabMaillage.push(17 + ecart);
            tabMaillage.push(18 + ecart);
            tabMaillage.push(19 + ecart);

        }
    }


    var objMaillageMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurs.intNbTriangles = nbTriangles;
    // Le nombre de droites
    objMaillageMurs.intNbDroites = 0;

    return objMaillageMurs;
}

function getTabMap() {
    if (tabMurs != null) {
        return tabMurs;
    }
   return null;
}


