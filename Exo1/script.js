// Sélection de l'élément .carre
var carreElement = document.querySelector('.carre');

// Ajout d'un écouteur d'événements au clic sur le carré
carreElement.addEventListener('click', function() {
    afficherProprietes();
});

// Fonction pour afficher les propriétés du carré
function afficherProprietes() {
    // Récupération des styles calculés du carré
    var style = window.getComputedStyle(document.querySelector('.carre'));
    
    // Création d'un objet contenant les propriétés à afficher
    var proprietes = {
        "- Background Color ": style.getPropertyValue('background-color'),
        "- Color ": style.getPropertyValue('color'),
        "- Height ": style.getPropertyValue('height'),
        "- Width ": style.getPropertyValue('width'),
        "- Display ":style.getPropertyValue('display'),
        "- Display":style.getPropertyValue('font-family') + " (" + style.getPropertyValue('font-size') + ")",
    };

    // Construction du message à afficher dans l'alerte
    var message = "Class .carre:\n";
    for (var prop in proprietes) {
        message += prop + ": " + proprietes[prop] + "\n";
    }

    // Affichage des propriétés dans une boîte d'alerte
    alert(message);
}