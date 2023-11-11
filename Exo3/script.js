document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne le conteneur de la grille en utilisant la classe
    var gridContainer = document.querySelector(".grid-container");

    // Sélectionne l'élément pour afficher le statut du jeu
    var gameStatusElement = document.getElementById("gameStatus");

    // Initialise les variables du jeu
    var currentPlayer = "X"; // Le joueur actuel, commence avec "X"
    var gameBoard = Array.from({ length: 3 }, () => Array(3).fill(null)); // Tableau pour suivre l'état du jeu
    var movesCount = 0; // Compteur pour le nombre de coups joués
    var gameOver = false; // Indique si le jeu est terminé

    function updateGameState(row, col) {
        gameBoard[row][col] = currentPlayer; // Attribue le symbole du joueur à la case sélectionnée
        movesCount++; // Incrémente le compteur de coups
    
        // Récupére l'élément de la grille individuel
        var gridItem = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

        // Retirez toutes les classes correspondant aux joueurs
        gridItem.classList.remove("x", "o");

        // Ajoutez la classe correspondant au joueur actuel
        gridItem.classList.add(currentPlayer.toLowerCase());
        
        // Supprimez le contenu de la case
        gridItem.textContent = "";
        
        // Vérifie s'il y a un gagnant
        if (checkWinner()) {
            gameStatusElement.innerText = `Le joueur ${currentPlayer} a gagné !`;
            gameOver = true; // Marque le jeu comme terminé
        } else if (movesCount === 9) {
            gameStatusElement.innerText = "Partie terminée. Match nul !";
            gameOver = true; // Marque le jeu comme terminé en cas d'égalité
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; // Passe au prochain joueur
        }
    }
    
    // Fonction pour vérifier s'il y a un gagnant
    function checkWinner() {
        // Vérification des lignes
        for (var i = 0; i < 3; i++) {
            if (
                (gameBoard[i][0] === currentPlayer &&
                    gameBoard[i][1] === currentPlayer &&
                    gameBoard[i][2] === currentPlayer)
            ) {
                // Applique la classe clignotante aux cases gagnantes dans la ligne
                document
                    .querySelectorAll(`[data-row="${i}"][data-col="0"], [data-row="${i}"][data-col="1"], [data-row="${i}"][data-col="2"]`)
                    .forEach((element) => {
                        element.classList.add("blinking");
                    });
                return true; // Gagnant trouvé dans une ligne
            }
        }

        // Vérification des colonnes
        for (var i = 0; i < 3; i++) {
            if (
                (gameBoard[0][i] === currentPlayer &&
                    gameBoard[1][i] === currentPlayer &&
                    gameBoard[2][i] === currentPlayer)
            ) {
                // Applique la classe clignotante aux cases gagnantes dans la colonne
                document
                    .querySelectorAll(`[data-row="0"][data-col="${i}"], [data-row="1"][data-col="${i}"], [data-row="2"][data-col="${i}"]`)
                    .forEach((element) => {
                        element.classList.add("blinking");
                    });
                return true; // Gagnant trouvé dans une colonne
            }
        }

        // Vérification de la diagonale principale
        if (
            (gameBoard[0][0] === currentPlayer &&
                gameBoard[1][1] === currentPlayer &&
                gameBoard[2][2] === currentPlayer)
        ) {
            // Applique la classe clignotante aux cases gagnantes dans la diagonale principale
            document
                .querySelectorAll('[data-row="0"][data-col="0"], [data-row="1"][data-col="1"], [data-row="2"][data-col="2"]')
                .forEach((element) => {
                    element.classList.add("blinking");
                });
            return true; // Gagnant trouvé dans la diagonale principale
        }

        // Vérification de l'autre diagonale
        if (
            (gameBoard[0][2] === currentPlayer &&
                gameBoard[1][1] === currentPlayer &&
                gameBoard[2][0] === currentPlayer)
        ) {
            // Applique la classe clignotante aux cases gagnantes dans l'autre diagonale
            document
                .querySelectorAll('[data-row="0"][data-col="2"], [data-row="1"][data-col="1"], [data-row="2"][data-col="0"]')
                .forEach((element) => {
                    element.classList.add("blinking");
                });
            return true; // Gagnant trouvé dans l'autre diagonale
        }

        return false; // Aucun gagnant trouvé
}

    
    // Initialisez la grille
    createGrid();
    
    // Fonction pour créer la grille
    function createGrid() {
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                // Crée une nouvelle case
                var gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");

                // Ajout du gestionnaire d'événements au clic sur la case
                gridItem.addEventListener("click", function (event) {
                    if (!gameOver) {
                        // Récupére les indices de ligne et de colonne à partir des attributs de données
                        var rowIndex = parseInt(event.currentTarget.dataset.row);
                        var colIndex = parseInt(event.currentTarget.dataset.col);
                
                        // Vérifie si la case a déjà été jouée
                        if (!gameBoard[rowIndex][colIndex]) {
                            // Utilise event.currentTarget au lieu de gridItem pour référencer l'élément actuel
                            event.currentTarget.innerText = currentPlayer;
                            updateGameState(rowIndex, colIndex);
                
                            // Désactivez le gestionnaire d'événements pour cette case
                            event.currentTarget.removeEventListener("click", arguments.callee);
                        }
                    }
                });

                // Ajoute des attributs de données pour stocker les indices de ligne et de colonne
                gridItem.dataset.row = row;
                gridItem.dataset.col = col;
                gridContainer.appendChild(gridItem);
            }
        }
    }
});
