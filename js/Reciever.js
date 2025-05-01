let lastReciever = null;
let tabCoordsTeleports = null
tabCoordsTeleports = getTabTeleports();
let coordsReciever = null;
let tabReceveurs = [];
var RAYON_CENTRE_EXCLUSION = 5;

function getTabReceveurs(){
    return tabReceveurs;
}

function resetReciever(){
    console.log("reset done");
    tabReceveurs = [];
    coordsReciever = null;
    lastReciever = null;
    

}

//verification des spawn receveurs
function validRecieverLocation() {
    let validLocationRecep = false;
    let x, z;
    let coordReciever

    while (!validLocationRecep) {
        x = Math.floor(Math.random() * (tableauMur.length));
        z = Math.floor(Math.random() * (tableauMur.length));
        coordReciever = { x: x, z: z };

        if (tableauMur[x][z] === 0 && tableauMur[x][z] !== 1 && tableauMur[x][z] !== 2 && tableauMur[x][z] !== 3) {
            if (!lastTeleportor || (lastTeleportor.x !== x || lastTeleportor.z !== z)) {
                if (!lastReciever || (lastReciever.x !== x || lastReciever.z !== z)) {
                    if (!tabCoordsTeleports.includes(coordReciever)) {
                        validLocationRecep = true;
                    }
                }
            }
        }
    }

    lastReciever = { x: x, z: z };
    // Return the position at the center of the tile
    return { x: x, z: z };
};

validRecieverLocation();

//creation du teleporteur
function creerObj3DReciever(objgl, intNoTexture) {
    var obj3DRecievers = new Object();
    obj3DRecievers.fltProfondeur = 1;
    obj3DRecievers.fltLargeur = 1;
    obj3DRecievers.fltHauteur = 1;

    obj3DRecievers.vertex = creerVertexReciever(objgl, obj3DRecievers.fltLargeur, obj3DRecievers.fltProfondeur);
    obj3DRecievers.couleurs = creerCouleursReciever(objgl, [1, 1, 1, 1]);
    obj3DRecievers.texels = creerTexelsReciever(objgl, obj3DRecievers.fltLargeur, obj3DRecievers.fltProfondeur, intNoTexture);
    obj3DRecievers.maillage = creerMaillageReciever(objgl);
    obj3DRecievers.transformations = creerTransformations();
    return obj3DRecievers;
}

// final test
function creerVertexReciever(objgl, fltLargeur, fltProfondeur) {
    var tabVertex = [];
    const HEIGHT = 0.02; // Increased height for visibility
    const BASE_Y = 0; // Base height from ground

    coordsReciever = validRecieverLocation()
    tabReceveurs.push(coordsReciever);

    // Bottom face vertices
    tabVertex.push(coordsReciever.x);        tabVertex.push(BASE_Y);        tabVertex.push(coordsReciever.z);        // bottom front left -- 0
    tabVertex.push(coordsReciever.x + 1);    tabVertex.push(BASE_Y);        tabVertex.push(coordsReciever.z);        // bottom front right -- 1
    tabVertex.push(coordsReciever.x);        tabVertex.push(BASE_Y);        tabVertex.push(coordsReciever.z + 1);    // bottom back left -- 2
    tabVertex.push(coordsReciever.x + 1);    tabVertex.push(BASE_Y);        tabVertex.push(coordsReciever.z + 1);    // bottom back right -- 3

    // Top face vertices
    tabVertex.push(coordsReciever.x);        tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsReciever.z);        // top front left -- 4
    tabVertex.push(coordsReciever.x + 1);    tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsReciever.z);        // top front right -- 5
    tabVertex.push(coordsReciever.x);        tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsReciever.z + 1);    // top back left -- 6
    tabVertex.push(coordsReciever.x + 1);    tabVertex.push(BASE_Y + HEIGHT);    tabVertex.push(coordsReciever.z + 1);    // top back right -- 7

    var objReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objReciever);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    return objReciever;
}

function creerCouleursReciever(objgl, tabCouleur) {
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

    var objCouleursReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursReciever);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursReciever;
}

function creerTexelsReciever(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    var tabTexels = [];
    
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

    var objTexelsReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsReciever);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsReciever.intNoTexture = intNoTexture;
    objTexelsReciever.pcCouleurTexel = 1.0;

    return objTexelsReciever;
}

function creerMaillageReciever(objgl) {
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

    var objMaillageReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageReciever);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    objMaillageReciever.intNbTriangles = 12;  // 2 triangles per face * 6 faces
    objMaillageReciever.intNbDroites = 0;

    return objMaillageReciever;
}


