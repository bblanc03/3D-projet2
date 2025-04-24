function creerobj3DFleche(objgl, obj3DMurs, intNoTexture) {
    var obj3DFleche = new Object();

    obj3DFleche.fltProfondeur = 1;
    obj3DFleche.fltLargeur = 1;
    obj3DFleche.fltHauteur = 0.5;

    obj3DFleche.fltPosX = tabPosJoueur[0];
    obj3DFleche.fltPosZ = tabPosJoueur[2];

    // obj3DFleche.fltCibleX = tabCibleJoueur[0];
    // obj3DFleche.fltCibleZ = tabCibleJoueur[2];
   
    obj3DFleche.angle = Math.atan2(tabCibleJoueur[2] - tabPosJoueur[2], tabCibleJoueur[0] - tabPosJoueur[0]) + (90 * Math.PI / 180);

    setEchellesXYZ([obj3DFleche.fltLargeur, obj3DFleche.fltHauteur, obj3DFleche.fltProfondeur], obj3DFleche.transformations);

    setPositionY(0.3, obj3DFleche.transformations);

    return obj3DFleche;
}


function creerFleche(objgl, fltLargeur, fltProfondeur, fltHauteur, fltPosX, fltPosZ, angle) {
    const pointFlecheA = rotationXZ(-fltLargeur/3 + fltPosX, fltProfondeur/3 + fltPosZ, fltPosX, fltPosZ, angle);
    const pointFlecheB = rotationXZ(fltPosX, -fltProfondeur/2 + fltPosZ, fltPosX, fltPosZ, angle);
    const pointFlecheC = rotationXZ(fltLargeur/3 + fltPosX, fltProfondeur/3 + fltPosZ, fltPosX, fltPosZ, angle);


    var tabVertex = [
        pointFlecheA.x, fltHauteur, pointFlecheA.z,
        pointFlecheB.x, fltHauteur, pointFlecheB.z,
        pointFlecheC.x, fltHauteur, pointFlecheC.z    
    ];

    var objVertex = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objVertex;
}

function creerCouleursFleche(objgl) {
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

function creerTexelsFleche(objgl) {
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

    const tabTexelsFleche = new Array();
    for (let i = 0; i < 9; i++) {
        tabTexelsFleche[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsFleche[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);

        if (i === 0) { //Face avant
            tabTexelsFleche[i].intNoTexture = 1;
            tabTexelsFleche[i].pcCouleurTexel = 0.6;
        }
        else if (i === 1) { // Face derriere
            tabTexelsFleche[i].intNoTexture = 6;
            tabTexelsFleche[i].pcCouleurTexel = 0.6;
        }
        else if (i === 5) { // face haut
            tabTexelsFleche[i].intNoTexture = 2;
            tabTexelsFleche[i].pcCouleurTexel = 0.6;
        }
        else if (i === 6) { // face bas
            tabTexelsFleche[i].intNoTexture = 5;
            tabTexelsFleche[i].pcCouleurTexel = 0.6;
        }
        else if (i === 7) { // face droite
            tabTexelsFleche[i].intNoTexture = 3;
            tabTexelsFleche[i].pcCouleurTexel = 0.6;
        }
        else if (i === 8) { // face gauche
            tabTexelsFleche[i].intNoTexture = 4;
            tabTexelsFleche[i].pcCouleurTexel = 0.6;
        }
        else {
            tabTexelsFleche[i].intNoTexture = 0;
            tabTexelsFleche[i].pcCouleurTexel = 0.0;
        }
    }

    return tabTexelsFleche;
}

function positionValideFleche() {
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


