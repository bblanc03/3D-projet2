const tableauMur = getTabMurs();
let tabTeleports = [];
let lastTeleportor = null;
let coordsTeleport = null;

function getTabTeleports() {
    return tabTeleports;
}

function resetTeleports() {
    console.log("reset done");
    tabTeleports = [];
    lastTeleportor = null;
    coordsTeleport = null;
}

//verification des spawn teleporteurs
function validTeleportorLocation() {
    let validLocationTele = false;
    let x, z;

    while (!validLocationTele) {
        x = Math.floor(Math.random() * (tableauMur.length));
        z = Math.floor(Math.random() * (tableauMur.length));


        if (tableauMur[x][z] === 0 && tableauMur[x][z] !== 1 && tableauMur[x][z] !== 2 && tableauMur[x][z] !== 3) {
            if (!lastTeleportor || (lastTeleportor.x !== x || lastTeleportor.z !== z)) {
                validLocationTele = true;
            }

        }
    }

    lastTeleportor = { x: x, z: z };
    // Return the position at the center of the tile
    return { x: x, z: z };
}


//creation du teleporteur
function creerObj3DTeleporteur(objgl, intNoTexture) {
    var obj3DTeleporteurs = new Object();
    obj3DTeleporteurs.fltProfondeur = 1;
    obj3DTeleporteurs.fltLargeur = 1;
    obj3DTeleporteurs.fltHauteur = 1;

    obj3DTeleporteurs.vertex = creerVertexTeleporteur(objgl, obj3DTeleporteurs.fltLargeur, obj3DTeleporteurs.fltProfondeur);
    obj3DTeleporteurs.couleurs = creerCouleursTeleporteur(objgl, [1, 1, 1, 1]);
    obj3DTeleporteurs.texels = creerTexelsTeleporteur(objgl, obj3DTeleporteurs.fltLargeur, obj3DTeleporteurs.fltProfondeur, intNoTexture);
    obj3DTeleporteurs.maillage = creerMaillageTeleporteur(objgl, nbTeleporteur);
    obj3DTeleporteurs.transformations = creerTransformations();
    return obj3DTeleporteurs;
}

// final test
function creerVertexTeleporteur(objgl, fltLargeur, fltProfondeur) {
    var tabVertex = [];
    const HEIGHT = 0.02; // Height of the slab
    const BASE_Y = 0; // Base height from ground

    coordsTeleport = validTeleportorLocation()
    tabTeleports.push(coordsTeleport);

    // Bottom face vertices
    tabVertex.push(coordsTeleport.x);        tabVertex.push(BASE_Y);        tabVertex.push(coordsTeleport.z);        // bottom front left -- 0
    tabVertex.push(coordsTeleport.x + 1);    tabVertex.push(BASE_Y);        tabVertex.push(coordsTeleport.z);        // bottom front right -- 1
    tabVertex.push(coordsTeleport.x);        tabVertex.push(BASE_Y);        tabVertex.push(coordsTeleport.z + 1);    // bottom back left -- 2
    tabVertex.push(coordsTeleport.x + 1);    tabVertex.push(BASE_Y);        tabVertex.push(coordsTeleport.z + 1);    // bottom back right -- 3

    // Top face vertices
    tabVertex.push(coordsTeleport.x);        tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsTeleport.z);        // top front left -- 4
    tabVertex.push(coordsTeleport.x + 1);    tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsTeleport.z);        // top front right -- 5
    tabVertex.push(coordsTeleport.x);        tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsTeleport.z + 1);    // top back left -- 6
    tabVertex.push(coordsTeleport.x + 1);    tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsTeleport.z + 1);    // top back right -- 7

    var objTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTeleporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    return objTeleporteur;
}



function creerCouleursTeleporteur(objgl, tabCouleur) {
    var tabCouleurs = [];
    const blackColor = [0.0, 0.0, 0.0, 1.0];  // Black for sides
    const whiteColor = [1.0, 1.0, 1.0, 1.0];  // White for textured top

    // Bottom face (black)
    for (let i = 0; i < 4; i++) {
        tabCouleurs = tabCouleurs.concat(blackColor);
    }

    // Top face (white for texture)
    for (let i = 0; i < 4; i++) {
        tabCouleurs = tabCouleurs.concat(whiteColor);
    }

    // Side faces (black)
    for (let i = 0; i < 16; i++) {  // 4 sides * 4 vertices each
        tabCouleurs = tabCouleurs.concat(blackColor);
    }

    var objCouleursTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTeleporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursTeleporteur;
}

function creerTexelsTeleporteur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    var tabTexels = [];
    
    // Texels for each vertex (8 vertices total)
    // Bottom face (no texture)
    tabTexels.push(0.0); tabTexels.push(0.0);  // vertex 0
    tabTexels.push(0.0); tabTexels.push(0.0);  // vertex 1
    tabTexels.push(0.0); tabTexels.push(0.0);  // vertex 2
    tabTexels.push(0.0); tabTexels.push(0.0);  // vertex 3

    // Top face (with texture)
    tabTexels.push(0.0); tabTexels.push(0.0);  // vertex 4 - top left
    tabTexels.push(1.0); tabTexels.push(0.0);  // vertex 5 - top right
    tabTexels.push(0.0); tabTexels.push(1.0);  // vertex 6 - bottom left
    tabTexels.push(1.0); tabTexels.push(1.0);  // vertex 7 - bottom right

    var objTexelsTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTeleporteur.intNoTexture = intNoTexture;
    objTexelsTeleporteur.pcCouleurTexel = 1.0;

    return objTexelsTeleporteur;
}

function creerCouleursTeleporteur(objgl, tabCouleur) {
    var tabCouleurs = [];
    const redColor = [1.0, 0.0, 0.0, 1.0];  // Red for sides
    const whiteColor = [1.0, 1.0, 1.0, 1.0]; // White for textured top

    // Bottom vertices (red)
    for (let i = 0; i < 4; i++) {
        tabCouleurs = tabCouleurs.concat(redColor);
    }

    // Top vertices (white for texture)
    for (let i = 0; i < 4; i++) {
        tabCouleurs = tabCouleurs.concat(whiteColor);
    }

    var objCouleursTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTeleporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursTeleporteur;
}

function creerMaillageTeleporteur(objgl) {
    var tabMaillage = [];

    // Bottom face
    tabMaillage.push(0); tabMaillage.push(1); tabMaillage.push(2);
    tabMaillage.push(1); tabMaillage.push(3); tabMaillage.push(2);

    // Top face
    tabMaillage.push(4); tabMaillage.push(5); tabMaillage.push(6);
    tabMaillage.push(5); tabMaillage.push(7); tabMaillage.push(6);

    // Front face
    tabMaillage.push(0); tabMaillage.push(1); tabMaillage.push(4);
    tabMaillage.push(1); tabMaillage.push(5); tabMaillage.push(4);

    // Back face
    tabMaillage.push(2); tabMaillage.push(3); tabMaillage.push(6);
    tabMaillage.push(3); tabMaillage.push(7); tabMaillage.push(6);

    // Left face
    tabMaillage.push(0); tabMaillage.push(2); tabMaillage.push(4);
    tabMaillage.push(2); tabMaillage.push(6); tabMaillage.push(4);

    // Right face
    tabMaillage.push(1); tabMaillage.push(3); tabMaillage.push(5);
    tabMaillage.push(3); tabMaillage.push(7); tabMaillage.push(5);

    var objMaillageTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTeleporteur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Update triangle count (2 triangles per face * 6 faces)
    objMaillageTeleporteur.intNbTriangles = 12;
    objMaillageTeleporteur.intNbDroites = 0;

    return objMaillageTeleporteur;
}



