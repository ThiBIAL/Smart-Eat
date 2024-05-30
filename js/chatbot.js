// Déclaration de la classe ChatHistory
class ChatHistory {
    constructor() {
        // Initialisation de la propriété messages à un tableau vide
        this.messages = [];
    }

    // Méthode pour ajouter un message à l'historique
    addMessage(message) {
        this.messages.push(message);
    }

    // Méthode pour obtenir l'historique complet des messages
    getHistory() {
        return this.messages;
    }
}

// Ajout d'un événement pour enregistrer les messages dans la session du navigateur avant de quitter la page
window.addEventListener('beforeunload', saveMessages);

// Ajout d'un événement pour charger les messages de la session du navigateur au chargement de la page
window.addEventListener('load', loadMessages);

// Création d'une instance de ChatHistory
const historyMessages = new ChatHistory();

// création d'une session navigateur pour stocker les messages
function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem('chatHistory',JSON.stringify(historyMessages.getHistory().map(msg => msg.message)));
}

// Fonction pour charger les messages de la session navigateur
function loadMessages() {
    // Récupérer l'historique des messages de la session navigateur
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
            showMessages(message, message.sender);
         });
    }
}

// Fonction pour récupérer et traiter le JSON
function fetchJSON(url) {
    // Récupérer le JSON à partir de l'URL fournie
    fetch(url)
    //then est une méthode qui retourne une promesse et prend en paramètre une
        //fonction callback qui sera exécutée une fois la promesse résolue
        .then(response => {
            // Vérifier si la réponse est correcte
            if (!response.ok) {
                // Si la réponse n'est pas correcte, lancer une erreur
                throw new Error('Network response was not ok');
            }
            // Si la réponse est correcte, retourner le JSON
            return response.json();
        })
        //then ici permettra de récupérer le JSON retourné par la promesse
            .then(data => {
                // Vérifier si le JSON est vide ou mal formé
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    // Si le JSON est vide ou mal formé, lancer une erreur
                    throw new Error('Empty JSON or malformed JSON');
                }
            //On affiche le JSON dans la console. Il s'agit d'un objet contenant les
            // intentions du chatbot
            console.log(data);
            // Passer les intentions à la fonction sendMessage qui sera définie plus tard
            sendMessage(data.intents);
            })
            //catch est une méthode qui retourne une promesse et prend en paramètre une
            //fonction callback qui sera exécutée en cas d’erreur
            .catch(error => {
            // En cas d’erreur, afficher un message d’erreur dans la console
            console.error('There was a problem with the fetch operation:', error);
            }) ;
}

// Fonction pour afficher les messages dans le chatbox
function showMessage(message, type) {
    const chatbox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    const timestamp = new Date().toLocaleString(); // Obtenir la date et l'heure actuelles
    const messageWithTimestamp = `<span class="timestamp">${timestamp}</span><br>${message}`; // Ajouter la date et l'heure au message
    messageDiv.innerHTML = messageWithTimestamp;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;  // Faire défiler vers le bas pour voir les nouveaux messages
    historyMessages.addMessage({message: messageWithTimestamp,type});
}

// Fonction pour afficher les messages dans le chatbox sans l'heure
function showMessages(message, type) {
    const chatbox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    const timestamp = new Date().toLocaleString(); // Obtenir la date et l'heure actuelles
    const messageWithTimestamp = `<span class="styled-message">${message}</span>`; // Ajouter la date et l'heure au message
    messageDiv.innerHTML = messageWithTimestamp;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;  // Faire défiler vers le bas pour voir les nouveaux messages
    historyMessages.addMessage({message: messageWithTimestamp,type});
}

// Fonction pour traiter le message de l'utilisateur
function processMessage(intents, message) {
    // Par défaut, la réponse est "Je suis désolé, je ne suis pas sûr de comprendre."
    let response = "Je suis désolé, je ne suis pas sûr de comprendre.";
    // Parcourir les intentions du chatbot
    intents.forEach(intent => {
    // Vérifier si le message de l'utilisateur correspond à l'un des motifs
        intent.patterns.forEach(pattern => {
            // Vérifier si le message de l'utilisateur contient le motif 
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                // Sélectionner une réponse aléatoire parmi les réponses possibles
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });
    // Retourner la réponse
    return response;
}

// Fonction pour envoyer un message
function sendMessage(intents) {
    // a. Récupération de la saisie de l’utilisateur dans une variable
    const userInput = document.getElementById('user-input').value;

    // b. Affichage du message de l'utilisateur dans la boîte de chat
    showMessage(userInput, 'user');

    // c. Traitement du message de l'utilisateur et obtention de la réponse du chatbot
    const botResponse = processMessage(intents, userInput);

    // d. Affichage de la réponse du chatbot dans la boîte de chat
    showMessage(botResponse, 'bot');

    // e. Effacer le champ de saisie
    document.getElementById('user-input').value = '';
}



