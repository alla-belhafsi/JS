// Fonction aller&retour carre-clicked
        // function showReaction(clickedCarre) {
        //     // Toggle de la classe carre-clicked
        //     clickedCarre.classList.toggle("carre-clicked");
        // }

        // Fonction pour gérer le clic sur un carré
        // function handleClick(event) {
        //     // Récupère l'élément carré cliqué
        //     const clickedCarre = event.currentTarget;
            
        //     // Appelle la fonction pour basculer entre les classes carre et carre-clicked
        //     showReaction(clickedCarre);
        // }

        // Création des carrés
        for (let i = 1; i <= 4; i++) {
            // Création d'un élément div pour représenter un carré
            const carre = document.createElement("div");
            
            // Ajout de la classe initiale carre à l'élément
            carre.classList.add("carre");
            
            // Ajout du texte au carré
            carre.innerText = i; 
            
            // Si function handleclick(event) et showReaction(clickedCarre) existante alors utiliser : carre.addEventListener("click", handleClick);

            // Ajout du gestionnaire d'événements au clic sur le carré
            carre.addEventListener("click", (event) => {
                // Récupère l'élément carré cliqué
                const clickedCarre = event.currentTarget;
                // Toggle de la classe carre-clicked
                clickedCarre.classList.toggle("carre-clicked");
            }); 
            
            // Ajout du carré au conteneur avec l'id "board"
            document.getElementById("board").appendChild(carre);
        }