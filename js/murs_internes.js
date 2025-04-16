
function creerObj3DMursInternes(objgl, obj3DSol, intNoTexture) {
    var obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = 1;
    obj3DMurs.fltLargeur = 1;
    obj3DMurs.fltHauteur = 2;

    obj3DMurs.vertex = creerVertexMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur);
    obj3DMurs.couleurs = creerCouleursMurs(objgl, [1, 1, 1, 1]);
    obj3DMurs.texels = creerTexelsMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture);
    obj3DMurs.maillage = creerMaillageMurs(objgl);

    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerVertexMursInternes(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    var tabVertex = [
        // Mur nord'
        15, 0, 15, // 0
        30, 0, 15, // 1
        15, fltHauteur, 30, // 2
        30, fltHauteur, fltProfondeur // 3
        
        
    ];

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
        // Mur nord
        		 
        0.0, 0.0,
        fltProfondeur, 0.0,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur
    ];

    var objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 0.0;

    return objTexelsMurs;
}

function creerMaillageMursInterne(objgl) {
    var tabMaillage =
        [ // Les 2 triangles du mur nord
            0, 1, 2,
            1, 2, 3,
        ];

    var objMaillageMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurs.intNbTriangles = 2;
    // Le nombre de droites
    objMaillageMurs.intNbDroites = 0;

    return objMaillageMurs;
}


