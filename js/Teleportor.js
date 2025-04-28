const tableauMur = getTabMurs();

let lastTeleportor = null;
let lastReciever = null;
let coordsTeleport = null;

//verification des spawn teleporteurs
function validTeleportorLocation() {
    let validLocationTele = false;
    let x, y;

    while (!validLocationTele) {
        x = Math.floor(Math.random() * (tableauMur.length));
        y = Math.floor(Math.random() * (tableauMur.length));

        // Ensure the guard spawns on a brick (1) and not on concrete (3), ladder (4), rope (5), or gold (6)
        // Also ensure there is a solid surface (brick or concrete) directly below the guard
        if (tableauMur[x][y] === 0 && tableauMur[x][y] !== 1 && tableauMur[x][y] !== 2) {
            if (!lastTeleportor || (lastTeleportor.x !== x || lastTeleportor.y !== y)) {
                validLocationTele = true;
            }

        }
    }

    lastTeleportor = { x: x, y: y };
    // Return the position at the center of the tile
    return { x: x, y: y };
}

//verification des spawn receveurs
function validRecieverLocation() {
    let validLocationRecep = false;
    let x, y;

    while (!validLocationRecep) {
        x = Math.floor(Math.random() * (tableauMur.length));
        y = Math.floor(Math.random() * (tableauMur.length));

        // Ensure the guard spawns on a brick (1) and not on concrete (3), ladder (4), rope (5), or gold (6)
        // Also ensure there is a solid surface (brick or concrete) directly below the guard
        if (tableauMur[x][y] === 0 && tableauMur[x][y] !== 1 && tableauMur[x][y] !== 2) {
            if (!lastTeleportor || (lastTeleportor.x !== x || lastTeleportor.y !== y)) {
                if (!lastReciever || (lastReciever.x !== x || lastReciever.y !== y)) {
                    validLocationRecep = true;
                }

            }

        }
    }

    lastReciever = { x: x, y: y };
    // Return the position at the center of the tile
    return { x: x, y: y };
};

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
    tabVertex.push(coordsTeleport.x); // bottom front left -- 0
    tabVertex.push(0.2);
    tabVertex.push(coordsTeleport.y);

    tabVertex.push(coordsTeleport.x + 1); // bottom front right -- 1
    tabVertex.push(0.2);
    tabVertex.push(coordsTeleport.y);

    tabVertex.push(coordsTeleport.x); // bottom back left -- 4
    tabVertex.push(0.2);
    tabVertex.push(coordsTeleport.y + 1);

    tabVertex.push(coordsTeleport.x + 1); // bottom back right -- 5
    tabVertex.push(0.2);
    tabVertex.push(coordsTeleport.y + 1);


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


