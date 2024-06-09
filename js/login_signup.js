
function displayAlert() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const poids = document.getElementById('poids').value;
    const age = document.getElementById('age').value;
    const objectif = document.querySelector('input[name="Objectif"]:checked').value;

    const message = `Bonjour ${prenom} ${nom}, votre email est : ${email} et votre mot de passe est : ${password}.\nVotre poids est de ${poids} kg et vous avez ${age} ans.\nVotre objectif est de ${objectif}.`;
    alert(message);
    window.location.href = "../html/login.html";
    return false; 
}


function hello(){
    alert("Bienvenue sur Smart'Eat");
    window.location.href = "../html/accueil.html";
    return false;
}