// calendar.js

function afficherVegan() {
    afficherPlats('vegan');
}

function afficherVege() {
    afficherPlats('vege');
}

function afficherCarnivore() {
    afficherPlats('carnivore');
}

function afficherPlats(categorie) {
    // Obtenez tous les plats
    const plats = document.querySelectorAll('.bg_plat');

    // Parcourez tous les plats
    plats.forEach(plat => {
        // Si le plat a la classe correspondant à la catégorie, on l'affiche, sinon on le cache
        if (plat.classList.contains(categorie)) {
            plat.style.display = 'block';
        } else {
            plat.style.display = 'none';
        }
    });
}

// Optionnel : pour afficher tous les plats au chargement de la page
function afficherTous() {
    const plats = document.querySelectorAll('.bg_plat');
    plats.forEach(plat => {
        plat.style.display = 'block';
    });
}

// Appeler afficherTous() lorsque la page est chargée pour montrer tous les plats par défaut
document.addEventListener('DOMContentLoaded', afficherTous);
