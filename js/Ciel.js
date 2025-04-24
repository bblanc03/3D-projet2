// Ciel.js

function creerObj3DCiel(objgl, obj3DMurs, intNoTexture) {
    var obj3DCiel = new Object();
    obj3DCiel.fltProfondeur = obj3DMurs.fltProfondeur * 2;
    obj3DCiel.fltLargeur = obj3DMurs.fltLargeur * 2;
    obj3DCiel.fltHauteur = 0;
    
    obj3DCiel.vertex = creerVertexCiel(objgl, obj3DCiel.fltLargeur, obj3DCiel.fltProfondeur);
    obj3DCiel.couleurs = creerCouleursCiel(objgl, [1, 1, 1, 1]);
	obj3DCiel.texels = creerTexelsCiel(objgl, intNoTexture);
	obj3DCiel.maillage = creerMaillageCiel(objgl);
	
    obj3DCiel.transformations = creerTransformations();
	setPositionY(obj3DMurs.fltHauteur, obj3DCiel.transformations);
    return obj3DCiel;
}

function creerVertexCiel(objgl, fltLargeur, fltProfondeur) {
    var tabVertex = [
             -fltLargeur / 2, 0.0, -fltProfondeur / 2,
             fltLargeur / 2, 0.0, -fltProfondeur / 2,
             -fltLargeur / 2, 0.0, fltProfondeur / 2,
             fltLargeur / 2, 0.0, fltProfondeur / 2
        ];
    
    var objCiel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCiel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objCiel;
}

function creerCouleursCiel(objgl, tabCouleur) {
    var tabCouleurs = []; 
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursCiel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCiel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
   
    return objCouleursCiel;
}

function creerTexelsCiel(objgl, intNoTexture) {
     var tabTexels = [
             0.0, 0.0,
             1.0, 0.0,
             0.0, 1.0,
             1.0, 1.0
        ];
    
    var objTexelsCiel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCiel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
  
    objTexelsCiel.intNoTexture = intNoTexture; objTexelsCiel.pcCouleurTexel = 1.0;
    
    return objTexelsCiel;
  }

function creerMaillageCiel(objgl) {

       var tabMaillage =
            [ // Les 2 triangles du ciel
             0, 1, 2,
             1, 2, 3,
            ];

	    var objMaillageCiel = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCiel);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageCiel.intNbTriangles = 2;
        // Le nombre de droites
        objMaillageCiel.intNbDroites = 0;
		
        return objMaillageCiel;
    }
  
  
