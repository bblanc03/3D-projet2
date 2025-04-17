# Plan du PDF "TP2-__Thesaurus.pdf"

## 1. Présentation du projet
- **Titre** : PROJET 2 : PROGRAMMATION DU JEU THESAURUS¹
- **Contexte** : Jeu en 3D où un joueur doit parcourir un dédale pour trouver un trésor, guidé par des indices (flèches, téléportation, etc.)
- **Mode de réalisation** : Travail en équipe de trois étudiants

## 2. Remise du projet
- **Date limite** : Jeudi 27 avril 2023 à 23h59m59s
- **Consignes de dépôt** :
  - Titre de la page Web : "Thesaurus" suivi des noms des étudiants
  - Remise du jeu complet (incluant images, sons, musiques) au format zip sur LÉA
- **Pénalités** :
  - Retard : -10 % par jour de retard (maximum 5 jours)
  - Plagiat (utilisation d’un jeu existant) : note de 0 %

## 3. Les objets du jeu Thesaurus
### 3.1 Le dédale
- **Description** : Matrice 31×31 cellules de 1×1
- **Types de cellules** :
  - Couloir (noir)
  - Mur ouvrable (carré rouge)
  - Mur non ouvrable (carré vert)
  - Partie de l’enclos (jaune)
- **Contraintes** : Respecter strictement le plan fourni

### 3.2 Le plancher
- **Dimensions** : Rectangle 31×31
- **Localisation** : Plan Y = 0
- **Conseils** :
  - [x] Positionné le long des X et Z positifs pour faciliter les calculs de position
  - [x] Différencier par couleur ou texture avec le plancher de l’enclos

### 3.3 Le plafond
- **Dimensions** : Rectangle 31×31
- **Localisation** : Sur le plan Y = hauteur, juste au-dessus du plancher
- **Possibilités** : Utilisation d’un "ciel" comme texture

### 3.4 Les murs
- **Caractéristiques** :
  - Parallélépipèdes placés dans les cellules
  - Dimension : largeur 1, profondeur 1, hauteur variable (en général jusqu’au plafond)
- **Types** :
  - Murs ouvrables (peuvent être ouverts par un ouvreur de murs)
  - Murs non ouvrables (différent en couleur/texture)
- **Conseils** : Différencier visuellement selon leur position dans le dédale

### 3.5 Les ouvreurs de murs
- **Fonction** : Objets invisibles utilisés par le joueur pour ouvrir un mur
- **Usage** : Permet l’ouverture du mur situé directement en face du joueur

### 3.6 Les flèches
- **Description** : Objets 3D indiquant la direction du trésor
- **Contraintes** :
  - Placées dans les cellules contenant un couloir
  - La flèche pointe horizontalement vers le trésor
  - Taille maximale : largeur et profondeur de 1
  - Positionnement en hauteur (pour ne pas gêner la circulation)

### 3.7 Les télé-transporteurs
- **Description** : Objets permettant au joueur d’entrer et d’être téléporté
- **Contraintes** :
  - Placés dans les cellules de couloir
  - Taille maximale : largeur et profondeur de 1
  - La base doit être visible (colorée et/ou texturée)
  - Ne pas cohabiter avec une flèche

### 3.8 Les télé-récepteurs
- **Description** : Objets 3D pour faire sortir le joueur du téléportage
- **Contraintes** :
  - Placés dans les cellules de couloir
  - Taille maximale : largeur et profondeur de 1
  - La base doit être visible (colorée et/ou texturée)
  - Doit être différent du télé-transporteur
  - Pas sur une cellule déjà occupée par un télé-transporteur ou une flèche

### 3.9 Le trésor
- **Description** : Objet 3D placé dans une cellule du couloir
- **Contraintes** :
  - Repose sur le plancher
  - Taille maximale : largeur et profondeur de 1
  - Ne doit pas être plat et ne doit pas traverser le plafond ou le plancher
  - Ne peut pas être positionné sur la même cellule qu’une flèche, un télé-transporteur ou un télé-récepteur

## 4. Le joueur
- **Représentation** : La caméra
- **Position de départ** : Centre du dédale (dans l’enclos), regardant vers le nord (sortie de l’enclos)
- **Déplacements** :
  - Avec le clavier (flèches directionnelles)
  - Avec la souris (roulette pour avancer/reculer, bouton pour tourner)
- **Limitation** : Une fois sorti de l’enclos, le joueur ne peut plus y retourner
- **Interaction** : Possibilité d’ouvrir un mur avec la touche espace (ou bouton du milieu)

## 5. La vue aérienne du dédale
- [x] **Activation** : Touche Page Up
- **Effets** :
  - [x] Vue du dédale complet depuis le haut (seulement plancher et murs visibles)
  - Affichage d’un indicateur (objet plat) pour la position et la direction du joueur
- **Mode triche** : CTRL+SHIFT+ESPACE pour rendre visibles tous les objets (sauf le plafond)
- [x] **Retour** : Touche Page Down, avec conservation de la position et direction du joueur

## 6. Le déroulement du jeu Thesaurus
- **Nombre de niveaux** : 10 niveaux
- **Évolution des objets par niveau** :
  - Trésor : 1 par niveau
  - Ouvreurs de murs : Diminution tous les 2 niveaux (initialement 4)
  - Flèches : Diminuent de 2 à chaque niveau (commençant à 18)
  - Télé-transporteurs : Augmentent de 1 tous les 2 niveaux (à partir du niveau 2)
  - Télé-récepteurs : Augmentent de 1 à chaque niveau

## 7. Le déroulement d’un niveau
- **Durée** : 60 secondes par niveau
- **Conditions de réinitialisation** :
  - Si le temps expire sans trouver le trésor, le niveau recommence sans redéfinir la position des objets (sauf réinitialisation de l’état des murs ouverts et du nombre d’ouvreurs)
- **Transition** : Passage automatique au niveau suivant dès que le trésor est trouvé

## 8. Le score
- **Départ** : 300 points au démarrage du niveau 1
- **Actions et pénalités** :
  - Recommencer un niveau : -200 points
  - Trouver le trésor : +10 points multiplié par le nombre de secondes restantes
  - Utiliser un ouvreur de mur : -50 points
  - En vue aérienne : -10 points par seconde passée en mode vue aérienne
- **Restrictions basées sur le score** :
  - Moins de 200 pts : Fin de niveau (game over)
  - Moins de 50 pts : Interdiction d’utiliser les ouvreurs de murs
  - Moins de 10 pts : Interdiction d’utiliser la vue aérienne

## 9. Sons et/ou musique
- **Obligations** : Au moins 7 sons/musiques distincts pour les événements suivants :
  1. Début de chaque niveau
  2. Trouver le trésor (changement de niveau)
  3. Expiration du temps (niveau à recommencer)
  4. Ouverture d’un mur
  5. Téléportation dans un télé-récepteur
  6. Game over (niveau recommencé à cause du score insuffisant)
  7. Fin du jeu après le niveau 10

## 10. Les animations automatiques
- **Règle générale** : Pas d’animation continue obligatoire (pas de cycle à chaque 60ième de seconde)
- **Optionnel** : Possibilité d’ajouter des animations automatiques pour enrichir le jeu

## 11. Autres considérations
- **Réutilisation de fonctions** : Possibilité d'utiliser des fonctions du jeu "La tornade" programmées précédemment
- **Liberté de mise en œuvre** : Différentes méthodes pour indiquer les informations (barres de progression, étiquettes, etc.)

## 12. Pondération de la correction
- **Critères d’évaluation** :
  - 80 % sur le bon déroulement du jeu et le respect des règles
  - 20 % sur l’interface (originalité, qualité des objets 3D, utilisation des couleurs/textures, fluidité des déplacements et animations)
