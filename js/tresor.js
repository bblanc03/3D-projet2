function creerobj3DTresor(objgl, obj3DMurs, intNoTexture) {
    var obj3DTresor = new Object();
    obj3DTresor.fltProfondeur = 0.15;
    obj3DTresor.fltLargeur = 0.3;
    obj3DTresor.fltHauteur = 0.1;

    obj3DTresor.vertex = creerTresor(objgl);
    obj3DTresor.couleurs = creerCouleursTresor(objgl);
    obj3DTresor.maillage = null;
    obj3DTresor.texels = creerTexelsTresor(objgl);
    obj3DTresor.transformations = creerTransformations();

    setEchellesXYZ([obj3DTresor.fltLargeur, obj3DTresor.fltHauteur, obj3DTresor.fltProfondeur], obj3DTresor.transformations);

    setPositionY(0.15, obj3DTresor.transformations);

    return obj3DTresor;
}

function creerTresor(objgl) {
    var tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
        0.0, 0.0, 1.0, // Centre du plan 
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0
    ];

    // Face arrère pleine
    tabVertex[1] = [
        0.0, 0.0, -1.0, // Centre du plan
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0
    ];

    // Contour avant
    tabVertex[2] = [
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0
    ];

    // Contour arrière
    tabVertex[3] = [
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0
    ];

    // Droites reliées aux 2 faces
    tabVertex[4] = [
        1.0, 1.0, -1.0, 1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        1.0, -1.0, -1.0, 1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0
    ];

    // Haut
    tabVertex[5] = [
        0.0, 1.0, 0.0, // Centre du plan
        1.0, 1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0
    ];

    // bas
    tabVertex[6] = [
        0.0, -1.0, 0.0, // Centre du plan
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0
    ];

    // Droite
    tabVertex[7] = [
        1.0, 0.0, 0.0, // Centre du plan
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0
    ];

    // Gauche
    tabVertex[8] = [
        -1.0, 0.0, 0.0, // Centre du plan
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0
    ];

    // Création des tampons
    var tabObjCube = new Array();
    for (var i = 0; i < 9; i++) {
        tabObjCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjCube[i].typeDessin = (i < 2) || ((i >= 5 && i <= 8)) ? objgl.TRIANGLE_FAN : ((i < 4) ? objgl.LINE_LOOP : objgl.LINES);
    }

    return tabObjCube;
}

function creerCouleursTresor(objgl) {
    var tabCouleurs = new Array();

    // Couleurs face avant pleine
    tabCouleurs[0] = [1.0, 1.0, 1.0, 1.0]; // Blanc 
    for (var i = 1; i < 6; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Couleurs face arrière pleine
    tabCouleurs[1] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[1] = tabCouleurs[1].concat([0.0, 1.0, 0.0, 1.0]); // Vert

    // Couleurs contour avant
    tabCouleurs[2] = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs[2] = tabCouleurs[2].concat([1.0, 1.0, 1.0, 1.0]); // Blanc

    // Couleurs contour arrière
    tabCouleurs[3] = tabCouleurs[2];

    // Couleurs droites reliées aux 2 faces
    tabCouleurs[4] = tabCouleurs[2].concat(tabCouleurs[2]);

    // Haut
    tabCouleurs[5] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[5] = tabCouleurs[5].concat([0.0, 0.0, 1.0, 1.0]); // Bleu

    // Bas
    tabCouleurs[6] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[6] = tabCouleurs[6].concat([0.0, 1.0, 1.0, 1.0]); // Turquoise

    // Droite
    tabCouleurs[7] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[7] = tabCouleurs[7].concat([1.0, 1.0, 0.0, 1.0]); // Jaune

    // Gauche
    tabCouleurs[8] = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i < 6; i++)
        tabCouleurs[8] = tabCouleurs[8].concat([1.0, 0.0, 1.0, 1.0]); // Rose

    // Création des tampons
    var tabObjCouleursCube = new Array();
    for (var i = 0; i < 9; i++) {
        tabObjCouleursCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursCube;
}

function creerTexelsTresor(objgl) {
    const tabTexels = new Array();

    // Texels de la face avant
    tabTexels[0] = [
        0.5, 0.5,
        1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0,
    ];

    // Texels de la face arrière
    tabTexels[1] = tabTexels[0];

    // Texels de la face avant, de la face arrière et des arêtes
    tabTexels[2] = [];
    for (let i = 0; i < 4; i++) {
        tabTexels[2] = tabTexels[2].concat([0.0, 1.0]);
    }

    tabTexels[3] = tabTexels[2];
    tabTexels[4] = tabTexels[2].concat(tabTexels[2]);

    // Haut
    tabTexels[5] = tabTexels[0];

    // Bas
    tabTexels[6] = tabTexels[0];

    // Droite
    tabTexels[7] = tabTexels[0];

    // Gauche
    tabTexels[8] = tabTexels[0];

    const tabTexelsCube = new Array();
    for (let i = 0; i < 9; i++) {
        tabTexelsCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);

        if (i === 0) { //Face avant
            tabTexelsCube[i].intNoTexture = 1; 
            tabTexelsCube[i].pcCouleurTexel = 0.6;
        }
        else if (i === 1) { // Face derriere
            tabTexelsCube[i].intNoTexture = 6; 
            tabTexelsCube[i].pcCouleurTexel = 0.6;
        }
        else if (i === 5) { // face haut
            tabTexelsCube[i].intNoTexture = 2; 
            tabTexelsCube[i].pcCouleurTexel = 0.6;
        }
        else if (i === 6) { // face bas
            tabTexelsCube[i].intNoTexture = 5; 
            tabTexelsCube[i].pcCouleurTexel = 0.6;
        }
        else if (i === 7) { // face droite
            tabTexelsCube[i].intNoTexture = 3; 
            tabTexelsCube[i].pcCouleurTexel = 0.6;
        }
        else if (i === 8) { // face gauche
            tabTexelsCube[i].intNoTexture = 4; 
            tabTexelsCube[i].pcCouleurTexel = 0.6;
        }
        else { 
            tabTexelsCube[i].intNoTexture = 0;
            tabTexelsCube[i].pcCouleurTexel = 0.0;
        }
    }

    return tabTexelsCube;
}

function positionValideTresor() {
    let tableauMur = getTabMap();
    let validLocation = false;
    let x, z;

    const GRANDEUR_GRID = 29;

    while (!validLocation) {
        x = Math.floor(Math.random() * GRANDEUR_GRID);  // rangees
        z = Math.floor(Math.random() * GRANDEUR_GRID);  // colonnes

        // Checker si le coord est vide
        if (tableauMur[x][z] === 0) {
            validLocation = true;
        }
        //Eventuellement rajouter aussi pour ne pas spawn dans le milieu et dans les autres objects
    }

    // Retourne les coords (+0.5 pour centrer)
    return {
        x: x + 0.5,
        z: z + 0.5
    };
}


