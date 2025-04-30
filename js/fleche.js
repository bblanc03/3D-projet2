var positionFleches = [];

// Improved arrow creation function
function creerobj3DFleche(objgl, tresorZ, tresorX) {
    var obj3DFleche = new Object();

    // Grandeur de la fleche
    var scale = 0.3;
    obj3DFleche.fltProfondeur = scale;
    obj3DFleche.fltLargeur = scale;
    obj3DFleche.fltHauteur = scale;

    obj3DFleche.vertex = creerFlecheOptimized(objgl);
    obj3DFleche.couleurs = creerCouleursFlecheOptimized(objgl);
    obj3DFleche.maillage = null;
    obj3DFleche.texels = creerTexelsFlecheOptimized(objgl);
    obj3DFleche.transformations = creerTransformations();

    setEchellesXYZ([obj3DFleche.fltLargeur, obj3DFleche.fltHauteur, obj3DFleche.fltProfondeur], obj3DFleche.transformations);


    const baseY = 1;
    setPositionY(baseY, obj3DFleche.transformations);
    obj3DFleche.baseY = baseY; 

    var position = positionValideFleche();
    var z = position.z;
    var x = position.x;

    setPositionZ(z, obj3DFleche.transformations);
    setPositionX(x, obj3DFleche.transformations);

    const angle = directionFleche(tresorZ, tresorX);
    setAngleY(angle, obj3DFleche.transformations);

    return obj3DFleche;
}

// Fixed arrow geometry with proper triangles
function creerFlecheOptimized(objgl) {
    var tabVertex = new Array();

    // ARROW HEAD - top triangular face
    tabVertex[0] = [
        // Triangle 1 - left side of head
        0.0, 1.0, 1.0,    // Tip
        -1.0, 1.0, 0.0,   // Left corner
        0.0, 1.0, 0.0,    // Center
        
        // Triangle 2 - right side of head
        0.0, 1.0, 1.0,    // Tip
        0.0, 1.0, 0.0,    // Center
        1.0, 1.0, 0.0     // Right corner
    ];

    // ARROW HEAD - bottom triangular face
    tabVertex[1] = [
        // Triangle 1 - left side of head
        0.0, 0.5, 1.0,    // Tip
        -1.0, 0.5, 0.0,   // Left corner
        0.0, 0.5, 0.0,    // Center
        
        // Triangle 2 - right side of head
        0.0, 0.5, 1.0,    // Tip
        0.0, 0.5, 0.0,    // Center
        1.0, 0.5, 0.0     // Right corner
    ];

    // ARROW HEAD - side faces
    tabVertex[2] = [
        // Triangle 1 - left side face
        0.0, 1.0, 1.0,    // Top tip
        0.0, 0.5, 1.0,    // Bottom tip
        -1.0, 0.5, 0.0,   // Bottom left
        
        // Triangle 2 - left side face (continued)
        0.0, 1.0, 1.0,    // Top tip
        -1.0, 0.5, 0.0,   // Bottom left
        -1.0, 1.0, 0.0,   // Top left
        
        // Triangle 3 - right side face
        0.0, 1.0, 1.0,    // Top tip
        1.0, 1.0, 0.0,    // Top right
        1.0, 0.5, 0.0,    // Bottom right
        
        // Triangle 4 - right side face (continued) 
        0.0, 1.0, 1.0,    // Top tip
        1.0, 0.5, 0.0,    // Bottom right
        0.0, 0.5, 1.0     // Bottom tip
    ];

    // SHAFT - top face
    tabVertex[3] = [
        // Rectangle as two triangles
        -0.5, 1.0, 0.0,   // Top front left
        -0.5, 1.0, -1.0,  // Top back left
        0.5, 1.0, -1.0,   // Top back right
        
        -0.5, 1.0, 0.0,   // Top front left
        0.5, 1.0, -1.0,   // Top back right
        0.5, 1.0, 0.0     // Top front right
    ];

    // SHAFT - bottom face
    tabVertex[4] = [
        // Rectangle as two triangles
        -0.5, 0.5, 0.0,   // Bottom front left
        -0.5, 0.5, -1.0,  // Bottom back left
        0.5, 0.5, -1.0,   // Bottom back right
        
        -0.5, 0.5, 0.0,   // Bottom front left
        0.5, 0.5, -1.0,   // Bottom back right
        0.5, 0.5, 0.0     // Bottom front right
    ];

    // SHAFT - side faces
    tabVertex[5] = [
        // Left side (rectangle as two triangles)
        -0.5, 1.0, 0.0,   // Top front left
        -0.5, 0.5, 0.0,   // Bottom front left
        -0.5, 0.5, -1.0,  // Bottom back left
        
        -0.5, 1.0, 0.0,   // Top front left
        -0.5, 0.5, -1.0,  // Bottom back left
        -0.5, 1.0, -1.0,  // Top back left
        
        // Right side (rectangle as two triangles)
        0.5, 1.0, 0.0,    // Top front right
        0.5, 1.0, -1.0,   // Top back right
        0.5, 0.5, -1.0,   // Bottom back right
        
        0.5, 1.0, 0.0,    // Top front right
        0.5, 0.5, -1.0,   // Bottom back right
        0.5, 0.5, 0.0,    // Bottom front right
        
        // Back side (rectangle as two triangles)
        -0.5, 1.0, -1.0,  // Top back left
        -0.5, 0.5, -1.0,  // Bottom back left
        0.5, 0.5, -1.0,   // Bottom back right
        
        -0.5, 1.0, -1.0,  // Top back left
        0.5, 0.5, -1.0,   // Bottom back right
        0.5, 1.0, -1.0    // Top back right
    ];

    // CONNECTION between arrow head and shaft (front face)
    tabVertex[6] = [
        // Left side triangle
        -1.0, 1.0, 0.0,   // Top head left
        -1.0, 0.5, 0.0,   // Bottom head left
        -0.5, 0.5, 0.0,   // Bottom shaft left
        
        // Left side triangle (continued)
        -1.0, 1.0, 0.0,   // Top head left
        -0.5, 0.5, 0.0,   // Bottom shaft left
        -0.5, 1.0, 0.0,   // Top shaft left
        
        // Right side triangle
        1.0, 1.0, 0.0,    // Top head right
        0.5, 1.0, 0.0,    // Top shaft right
        0.5, 0.5, 0.0,    // Bottom shaft right
        
        // Right side triangle (continued)
        1.0, 1.0, 0.0,    // Top head right
        0.5, 0.5, 0.0,    // Bottom shaft right
        1.0, 0.5, 0.0     // Bottom head right
    ];
    
    // OUTLINE - for wireframe rendering
    tabVertex[7] = [
        // Top outline
        0.0, 1.0, 1.0,    // Tip
        -1.0, 1.0, 0.0,   // Left corner
        -0.5, 1.0, 0.0,   // Left shaft join
        -0.5, 1.0, -1.0,  // Left back
        0.5, 1.0, -1.0,   // Right back
        0.5, 1.0, 0.0,    // Right shaft join
        1.0, 1.0, 0.0,    // Right corner
        0.0, 1.0, 1.0     // Back to tip
    ];

    // Create vertex buffers
    var objVertex = new Array();
    for (var i = 0; i < tabVertex.length; i++) {
        objVertex[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertex[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);

        // All buffers are triangle sets except the last one (outline)
        objVertex[i].typeDessin = (i < 7) ? objgl.TRIANGLES : objgl.LINE_STRIP;
        objVertex[i].nbVertex = tabVertex[i].length / 3;
    }

    return objVertex;
}

// Updated colors to match the 8 vertex buffers
function creerCouleursFlecheOptimized(objgl) {
    var tabCouleurs = new Array();
    
    // Blue color with alpha for faces
    const blueColor = [0.0, 0.0, 1.0, 0.7];
    // Slightly lighter blue for some faces to create depth
    const lightBlueColor = [0.2, 0.2, 1.0, 0.7];
    // Black for outlines
    const blackColor = [0.0, 0.0, 0.0, 1.0];

    // Function to create color arrays
    function createColorArray(color, vertexCount) {
        const result = [];
        for (let i = 0; i < vertexCount; i++) {
            result.push(...color);
        }
        return result;
    }

    // Colors for each buffer
    tabCouleurs[0] = createColorArray(blueColor, 6);       // Arrow head top
    tabCouleurs[1] = createColorArray(lightBlueColor, 6);  // Arrow head bottom
    tabCouleurs[2] = createColorArray(blueColor, 12);      // Arrow head sides
    tabCouleurs[3] = createColorArray(blueColor, 6);       // Shaft top
    tabCouleurs[4] = createColorArray(lightBlueColor, 6);  // Shaft bottom
    tabCouleurs[5] = createColorArray(blueColor, 18);      // Shaft sides
    tabCouleurs[6] = createColorArray(blueColor, 12);      // Connection
    tabCouleurs[7] = createColorArray(blackColor, 8);      // Outline

    // Create buffers
    var tabObjCouleursFleche = new Array();
    for (var i = 0; i < tabCouleurs.length; i++) {
        tabObjCouleursFleche[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursFleche[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursFleche;
}

// Updated texels to match the 8 vertex buffers
function creerTexelsFlecheOptimized(objgl) {
    const tabTexels = new Array();

    // Function to create basic texture coordinates for triangles
    function createTriangleTexCoords(numTriangles) {
        const result = [];
        for (let i = 0; i < numTriangles; i++) {
            result.push(
                0.0, 1.0,  // Top-left
                0.0, 0.0,  // Bottom-left
                1.0, 0.0   // Bottom-right
            );
        }
        return result;
    }

    // Create texture coordinates for each buffer
    tabTexels[0] = createTriangleTexCoords(2);  // Arrow head top - 2 triangles
    tabTexels[1] = createTriangleTexCoords(2);  // Arrow head bottom - 2 triangles
    tabTexels[2] = createTriangleTexCoords(4);  // Arrow head sides - 4 triangles
    tabTexels[3] = createTriangleTexCoords(2);  // Shaft top - 2 triangles
    tabTexels[4] = createTriangleTexCoords(2);  // Shaft bottom - 2 triangles
    tabTexels[5] = createTriangleTexCoords(6);  // Shaft sides - 6 triangles
    tabTexels[6] = createTriangleTexCoords(4);  // Connection - 4 triangles
    
    // Outline texels - one per vertex
    tabTexels[7] = [
        0.5, 1.0,  // Tip
        0.0, 0.5,  // Left corner
        0.25, 0.5, // Left shaft join
        0.25, 0.0, // Left back
        0.75, 0.0, // Right back
        0.75, 0.5, // Right shaft join
        1.0, 0.5,  // Right corner
        0.5, 1.0   // Back to tip
    ];

    const tabTexelsFleche = new Array();
    for (let i = 0; i < tabTexels.length; i++) {
        tabTexelsFleche[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabTexelsFleche[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels[i]), objgl.STATIC_DRAW);
        
        // Set texture properties
        tabTexelsFleche[i].pcCouleurTexel = 0.0;
        tabTexelsFleche[i].intNoTexture = 0;
    }

    return tabTexelsFleche;
}

// Validation des position avec le centre et espacement entre fleches
function positionValideFleche() {
    let tableauMur = getTabMap();
    var GRANDEUR_GRID = 29;
    var MIN_DISTANCE = 5;
    var RAYON_CENTRE_EXCLUSION = 5;

    // Calculer centre du tableau
    const centerX = GRANDEUR_GRID / 2;
    const centerZ = GRANDEUR_GRID / 2;

    // Tableau de posiitions valides
    let validPositions = [];

    // Remplir les positions existantes
    for (let x = 0; x < GRANDEUR_GRID; x++) {
        for (let z = 0; z < GRANDEUR_GRID; z++) {
            if (tableauMur[x][z] === 0) {
                // Exclure les positions du centre
                const distanceFromCenter = Math.sqrt(
                    Math.pow(x + 0.5 - centerX, 2) +
                    Math.pow(z + 0.5 - centerZ, 2)
                );
                if (distanceFromCenter > RAYON_CENTRE_EXCLUSION) {
                    validPositions.push({ x: x + 0.5, z: z + 0.5 });
                }
            }
        }
    }

    // Filtrer positions trop proche des autres fleches
    if (positionFleches.length > 0) {
        validPositions = validPositions.filter(pos => {
            for (let existingPos of positionFleches) {
                let distance = Math.sqrt(
                    Math.pow(pos.x - existingPos.x, 2) +
                    Math.pow(pos.z - existingPos.z, 2)
                );
                if (distance < MIN_DISTANCE) {
                    return false;
                }
            }
            return true;
        });
    }

    // Si il y a des positions vailde, utiliser un random
    if (validPositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * validPositions.length);
        const selectedPosition = validPositions[randomIndex];

        // Rajouter au tableau de position
        positionFleches.push({ x: selectedPosition.x, z: selectedPosition.z });
        return selectedPosition;
    }

    // Si il y a aucune place de libre
    return { x: GRANDEUR_GRID / 2, z: GRANDEUR_GRID / 2 };
}

function directionFleche(tresorZ, tresorX) {
    const posCourrant = positionFleches[positionFleches.length - 1];
    
    // Calculer la direction
    const dirX = tresorX - posCourrant.x;
    const dirZ = tresorZ - posCourrant.z;
    
    // Calculer angle a radian
    let angle = Math.atan2(dirX, dirZ);
    
    // Convertir en degres
    angle = angle * (180 / Math.PI);
    
    return angle;
}