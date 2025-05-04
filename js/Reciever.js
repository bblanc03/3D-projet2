let lastReciever = null;
let tabCoordsTeleports = null
tabCoordsTeleports = getTabTeleports();
let coordsReciever = null;
let tabReceveurs = [];

function getTabReceveurs(){
    return tabReceveurs;
}

function resetReciever(){
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
    var tabVertex = [
    ];

    coordsReciever = validRecieverLocation()
    tabReceveurs.push(coordsReciever);
    tabVertex.push(coordsReciever.x); // bottom front left -- 0
    tabVertex.push(0.02);
    tabVertex.push(coordsReciever.z);

    tabVertex.push(coordsReciever.x + 1); // bottom front right -- 1
    tabVertex.push(0.02);
    tabVertex.push(coordsReciever.z);

    tabVertex.push(coordsReciever.x); // bottom back left -- 4
    tabVertex.push(0.02);
    tabVertex.push(coordsReciever.z + 1);

    tabVertex.push(coordsReciever.x + 1); // bottom back right -- 5
    tabVertex.push(0.02);
    tabVertex.push(coordsReciever.z + 1);



    var objReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objReciever);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    return objReciever;
}



function creerCouleursReciever(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursReciever);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursReciever;
}

function creerTexelsReciever(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    var tabTexels = [];
    tabTexels.push(0.0)
    tabTexels.push(0.0)
    tabTexels.push(fltLargeur)
    tabTexels.push(0.0)
    tabTexels.push(0.0)
    tabTexels.push(fltProfondeur)
    tabTexels.push(fltLargeur)
    tabTexels.push(fltProfondeur)



    var objTexelsReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsReciever);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsReciever.intNoTexture = intNoTexture; objTexelsReciever.pcCouleurTexel = 1.0;

    return objTexelsReciever;
}

function creerMaillageReciever(objgl) {
    var tabMaillage = [];

    tabMaillage.push(0);
    tabMaillage.push(1);
    tabMaillage.push(3);
    tabMaillage.push(0);
    tabMaillage.push(2);
    tabMaillage.push(3);



    var objMaillageReciever = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageReciever);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageReciever.intNbTriangles = 2;
    // Le nombre de droites
    objMaillageReciever.intNbDroites = 0;

    return objMaillageReciever;
}