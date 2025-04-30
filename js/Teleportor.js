const tableauMur = getTabMurs();
let tabTeleports = [];
let lastTeleportor = null;
let coordsTeleport = null;

function getTabTeleports() {
    return tabTeleports;
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

    lastTeleportor = { x: x, z: z};
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
    var tabVertex = [
    ];

    coordsTeleport = validTeleportorLocation()
    tabTeleports.push(coordsTeleport);
    tabVertex.push(coordsTeleport.x); // bottom front left -- 0
    tabVertex.push(0.02);
    tabVertex.push(coordsTeleport.z);

    tabVertex.push(coordsTeleport.x + 1); // bottom front right -- 1
    tabVertex.push(0.02);
    tabVertex.push(coordsTeleport.z);

    tabVertex.push(coordsTeleport.x); // bottom back left -- 4
    tabVertex.push(0.02);
    tabVertex.push(coordsTeleport.z + 1);

    tabVertex.push(coordsTeleport.x + 1); // bottom back right -- 5
    tabVertex.push(0.02);
    tabVertex.push(coordsTeleport.z + 1);



    var objTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTeleporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    return objTeleporteur;
}



function creerCouleursTeleporteur(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursSol;
}

function creerTexelsTeleporteur(objgl, fltLargeur, fltProfondeur, intNoTexture) {
    var tabTexels = [];
    tabTexels.push(0.0)
    tabTexels.push(0.0)
    tabTexels.push(fltLargeur)
    tabTexels.push(0.0)
    tabTexels.push(0.0)
    tabTexels.push(fltProfondeur)
    tabTexels.push(fltLargeur)
    tabTexels.push(fltProfondeur)



    var objTexelsTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTeleporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTeleporteur.intNoTexture = intNoTexture; objTexelsTeleporteur.pcCouleurTexel = 1.0;

    return objTexelsTeleporteur;
}

function creerMaillageTeleporteur(objgl) {
    var tabMaillage = [];

    tabMaillage.push(0);
    tabMaillage.push(1);
    tabMaillage.push(3);
    tabMaillage.push(0);
    tabMaillage.push(2);
    tabMaillage.push(3);



    var objMaillageTeleporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTeleporteur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageTeleporteur.intNbTriangles = 2;
    // Le nombre de droites
    objMaillageTeleporteur.intNbDroites = 0;

    return objMaillageTeleporteur;
}


