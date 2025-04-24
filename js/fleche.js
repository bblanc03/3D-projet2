function creerobj3DFleche(objgl, obj3DMurs, intNoTexture) {
    var obj3DFleche = new Object();

    // Make arrow smaller
    var scale = 0.5;
    obj3DFleche.fltProfondeur = scale;
    obj3DFleche.fltLargeur = scale;
    obj3DFleche.fltHauteur = scale;

    obj3DFleche.vertex = creerFleche(objgl);
    obj3DFleche.couleurs = creerCouleursFleche(objgl);
    obj3DFleche.maillage = null;
    obj3DFleche.texels = creerTexelsFleche(objgl);
    obj3DFleche.transformations = creerTransformations();

    setEchellesXYZ([obj3DFleche.fltLargeur, obj3DFleche.fltHauteur, obj3DFleche.fltProfondeur], obj3DFleche.transformations);
    setPositionY(1, obj3DFleche.transformations);

    var position = positionValideFleche();
    var z = position.z;
    var x = position.x;

    setPositionZ(z, obj3DFleche.transformations);
    setPositionX(x, obj3DFleche.transformations);

    return obj3DFleche;
}

function creerFleche(objgl) {
    var tabVertex = new Array();

    // ARROWHEAD
    // TOP FACE
    tabVertex[0] = [
        0.0, 1.0, 0.5,    // Milieu
        0.0, 1.0, 1.0,    // Bout
        1.0, 1.0, 0.0,     // Droit
        -1.0, 1.0, 0.0,   // Gauche
        0.0, 1.0, 1.0   // Bout
    ];

    // BOTTOM FACE
    tabVertex[1] = [
        0.0, 0.5, 0.5,    // Milieu
        0.0, 0.5, 1.0,    // Bout
        1.0, 0.5, 0.0,     // Droit
        -1.0, 0.5, 0.0,   // Gauche
        0.0, 0.5, 1.0   // Bout
    ];

    // SIDE FACE
    tabVertex[2] = [
        -1.0, 1.0, 0.0,    // Top left
        -1.0, 0.5, 0.0,    // Bottom left
        0.0, 0.5, 1.0,    // Bottom right
        0.0, 1.0, 1.0     // Top right
    ];

    // SIDE FACE
    tabVertex[3] = [
        1.0, 1.0, 0.0,    // Top left
        1.0, 0.5, 0.0,    // Bottom left
        0.0, 0.5, 1.0,    // Bottom right
        0.0, 1.0, 1.0     // Top right
    ];

    // SIDE FACE
    tabVertex[4] = [
        -1.0, 1.0, 0.0,    // Top left
        -1.0, 0.5, 0.0,    // Bottom left
        1.0, 0.5, 0.0,    // Bottom right
        1.0, 1.0, 0.0     // Top right
    ];


    //SHAFT ;)
    //TOP FACE
    tabVertex[5] = [
        -0.5, 1.0, 0.5,    // Top left
        -0.5, 1.0, -1.0,     // bottom left
        0.5, 1.0, -1.0,   // bottom right
        0.5, 1.0, 0.5   // Top right
    ];

    // BOTTOM FACE
    tabVertex[6] = [
        -0.5, 0.5, 0.5,    // Top left
        -0.5, 0.5, -1.0,     // bottom left
        0.5, 0.5, -1.0,   // bottom right
        0.5, 0.5, 0.5   // Top right
    ];

    // SIDE FACE
    tabVertex[7] = [
        -0.5, 1.0, 0.5,    // Top left
        -0.5, 0.5, 0.5,    // Bottom left
        -0.5, 0.5, -1.0,    // Bottom right
        -0.5, 1.0, -1.0,    // Top right
    ];

    // SIDE FACE
    tabVertex[8] = [
        0.5, 1.0, 0.5,    // Top left
        0.5, 0.5, 0.5,    // Bottom left
        0.5, 0.5, -1.0,    // Bottom right
        0.5, 1.0, -1.0,    // Top right
    ];

    // Lines 
    // TOP
    tabVertex[9] = [
        0.0, 1.0, 1.0, //  MIDDLE TIP TOP
        -1.0, 1.0, 0.0, // RIGHT TIP TOP
        -0.5, 1.0, 0.0,  // RIGHT SHAFT UP TOP
        -0.5, 1.0, -1.0,  // RIGHT SHAFT LOWER TOP
        0.5, 1.0, -1.0,  // LEFT SHAFT LOWER TOP
        0.5, 1.0, 0.0,  // LEFT SHAFT UP TOP
        1.0, 1.0, 0.0, // LEFT TIP TOP
        0.0, 1.0, 1.0, //  MIDDLE TIP TOP
    ];

    //BOTTOM
    tabVertex[10] = [
        0.0, 0.5, 1.0, //  MIDDLE TIP Bottom
        -1.0, 0.5, 0.0, // RIGHT TIP Bottom
        -0.5, 0.5, 0.0,  // RIGHT SHAFT UP Bottom
        -0.5, 0.5, -1.0,  // RIGHT SHAFT LOWER Bottom
        0.5, 0.5, -1.0,  // LEFT SHAFT LOWER Bottom
        0.5, 0.5, 0.0,  // LEFT SHAFT UP Bottom
        1.0, 0.5, 0.0, // LEFT TIP Bottom
        0.0, 0.5, 1.0, //  MIDDLE TIP Bottom
    ];

    // Create vertex buffers
    var objVertex = new Array();
    for (var i = 0; i < tabVertex.length; i++) {
        objVertex[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        
        // Use TRIANGLE_FAN for faces, LINE_STRIP for borders
        objVertex[i].typeDessin = (i < 9) ? objgl.TRIANGLE_FAN : objgl.LINE_STRIP;
    }

    return objVertex;
}



function creerCouleursFleche(objgl) {
    var tabCouleurs = new Array();

    // Define colors
    const blueColor = [0.0, 0.0, 1.0, 0.7]; // Rouge
    const blackColor = [0.0, 0.0, 0.0, 1.0]; // Noir

    // Face avant pleine
    tabCouleurs[0] = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs[0] = tabCouleurs[0].concat(blueColor);

    // Face arrière pleine
    tabCouleurs[1] = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs[1] = tabCouleurs[1].concat(blueColor);

    // Couleurs contour avant
    tabCouleurs[2] = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs[2] = tabCouleurs[2].concat(blueColor);

    // Couleurs contour arrière
    tabCouleurs[3] = tabCouleurs[2];

    // Couleurs droites reliées aux 2 faces
    tabCouleurs[4] = tabCouleurs[2].concat(tabCouleurs[2]);

    // Haut
    tabCouleurs[5] = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs[5] = tabCouleurs[5].concat(blueColor);

    // Bas
    tabCouleurs[6] = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs[6] = tabCouleurs[6].concat(blueColor);

    // Droite
    tabCouleurs[7] = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs[7] = tabCouleurs[7].concat(blueColor);

    // Gauche
    tabCouleurs[8] = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs[8] = tabCouleurs[8].concat(blueColor);

    // Add colors for arrowhead borders in black
    tabCouleurs[9] = [];
    for (var i = 0; i < 10; i++) // 10 vertices for arrowhead borders
        tabCouleurs[9] = tabCouleurs[9].concat(blackColor);

    // Add colors for shaft borders in black
    tabCouleurs[10] = [];
    for (var i = 0; i < 18; i++) // 18 vertices for shaft borders
        tabCouleurs[10] = tabCouleurs[10].concat(blackColor);

    var tabObjCouleursCube = new Array();
    for (var i = 0; i < 11; i++) { // Update loop to include new vertices
        tabObjCouleursCube[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursCube[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursCube;
}

function creerTexelsFleche(objgl) {
    const tabTexels = new Array();

    // Basic texture coordinates for a quad
    const basicTexCoords = [
        0.5, 0.5,
        1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0,
    ];

    // Faces 0-8 use the same texture coordinates
    for (let i = 0; i < 9; i++) {
        tabTexels[i] = basicTexCoords;
    }

    // Add texture coordinates for border lines (vertices 9 and 10)
    // For lines, we can use simple coordinates since they won't show texture
    tabTexels[9] = [];
    for (let i = 0; i < 10; i++) { // 10 vertices for arrowhead borders
        tabTexels[9].push(0.0, 0.0);
    }

    tabTexels[10] = [];
    for (let i = 0; i < 18; i++) { // 18 vertices for shaft borders
        tabTexels[10].push(0.0, 0.0);
    }

    const tabTexelsFleche = new Array();
    for (let i = 0; i < 11; i++) { // Update to handle 11 buffers
        tabTexelsFleche[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsFleche[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);

        if (i === 0) { //Face avant
            tabTexelsFleche[i].pcCouleurTexel = 0;
        }
        else if (i === 1) { // Face derriere
            tabTexelsFleche[i].pcCouleurTexel = 0;
        }
        else if (i === 5) { // face haut
            tabTexelsFleche[i].pcCouleurTexel = 0;
        }
        else if (i === 6) { // face bas
            tabTexelsFleche[i].pcCouleurTexel = 0;
        }
        else if (i === 7) { // face droite
            tabTexelsFleche[i].pcCouleurTexel = 0;
        }
        else if (i === 8) { // face gauche
            tabTexelsFleche[i].pcCouleurTexel = 0;
        }
        else {
            tabTexelsFleche[i].pcCouleurTexel = 0.0;
        }
        
        // Add texture properties for all buffers
        tabTexelsFleche[i].intNoTexture = 0;
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


