function creerObj3DJoueurFleche(objgl, tabPosJoueur, tabCibleJoueur) {
    var obj3DJoueur = new Object();

    obj3DJoueur.fltProfondeur = 1;
    obj3DJoueur.fltLargeur = 1;
    obj3DJoueur.fltHauteur = 0.5;

    obj3DJoueur.fltPosX = tabPosJoueur[0];
    obj3DJoueur.fltPosZ = tabPosJoueur[2];

    obj3DJoueur.fltCibleX = tabCibleJoueur[0];
    obj3DJoueur.fltCibleZ = tabCibleJoueur[2];
   
    obj3DJoueur.angle = Math.atan2(tabCibleJoueur[2] - tabPosJoueur[2], tabCibleJoueur[0] - tabPosJoueur[0]) + (90 * Math.PI / 180);
    
    console.log("tabPosJoueur[0] = " + tabPosJoueur[0]);
    console.log("tabPosJoueur[2] = " + tabPosJoueur[2]);
    console.log("angle = " + obj3DJoueur.angle);

    obj3DJoueur.vertex = creerVertexJoueurFleche(objgl, obj3DJoueur.fltLargeur, obj3DJoueur.fltProfondeur, obj3DJoueur.fltHauteur, obj3DJoueur.fltPosX, obj3DJoueur.fltPosZ, obj3DJoueur.angle);
    obj3DJoueur.couleurs = creerCouleursJoueurFleche(objgl, [1, 0, 0, 1]);

    obj3DJoueur.nbrVertex = 3;
    obj3DJoueur.transformations = creerTransformations();

    return obj3DJoueur;
}

function rotationXZ(posX, posZ, centreX, centreZ, angle) {
    let directionX = posX - centreX;
    let directionZ = posZ - centreZ;
    let angleCos  = Math.cos(angle);
    let angleSin  = Math.sin(angle);
    
    return {
      x: directionX * angleCos - directionZ * angleSin + centreX,
      z: directionX * angleSin + directionZ * angleCos + centreZ
    };
}

function creerVertexJoueurFleche(objgl, fltLargeur, fltProfondeur, fltHauteur, fltPosX, fltPosZ, angle) {
    
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

function creerCouleursJoueurFleche(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 3; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleurs;
}
