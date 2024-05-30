
// Fonction pour afficher le formulaire
function afficherFormulaire() {
    document.getElementById('modificationForm').style.display = 'block';
    document.getElementById('modifierButton').style.display = 'none';
    document.getElementById('soumettre').style.display = 'block';
}

// Initialisation des graphiques
var ctxGlucides = document.getElementById('glucidesChart').getContext('2d');
var ctxLipides = document.getElementById('lipidesChart').getContext('2d');
var ctxProteines = document.getElementById('proteinesChart').getContext('2d');

var glucidesChart = new Chart(ctxGlucides, {
    type: 'pie',
    data: {
        labels: ['Glucides', 'Restant'],
        datasets: [{
            data: [0, 300],
            backgroundColor: ['#0a7f79', '#dddddd'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' g';
                        }
                        return label;
                    }
                }
            }
        }
    }
});

var lipidesChart = new Chart(ctxLipides, {
    type: 'pie',
    data: {
        labels: ['Lipides', 'Restant'],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#7f0a7f', '#dddddd'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' g';
                        }
                        return label;
                    }
                }
            }
        }
    }
});

var proteinesChart = new Chart(ctxProteines, {
    type: 'pie',
    data: {
        labels: ['Protéines', 'Restant'],
        datasets: [{
            data: [0, 150],
            backgroundColor: ['#7f7f0a', '#dddddd'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' g';
                        }
                        return label;
                    }
                }
            }
        }
    }
});

// Fonction pour mettre à jour les graphiques
function updateChart(chart, value, maxValue) {
    chart.data.datasets[0].data[0] = value;
    chart.data.datasets[0].data[1] = maxValue - value;
    chart.update();
}

// Fonction pour modifier les valeurs des compteurs
function modifierNutriments() {
    // Récupérer les nouvelles valeurs du formulaire
    var nouveauGlucides = parseInt(document.getElementById('nouveauGlucides').value, 10);
    var nouveauLipides = parseInt(document.getElementById('nouveauLipides').value, 10);
    var nouveauProteines = parseInt(document.getElementById('nouveauProteines').value, 10);
    // Récupérer les valeurs actuelles des nutriments
    var glucidesActuels = parseInt(document.getElementById('glucides').innerText, 10);
    var lipidesActuels = parseInt(document.getElementById('lipides').innerText, 10);
    var proteinesActuels = parseInt(document.getElementById('proteines').innerText, 10);
    // Additionner les nouvelles valeurs aux valeurs actuelles
    if (!isNaN(nouveauGlucides)) {
        glucidesActuels += nouveauGlucides;
        document.getElementById('glucides').innerText = glucidesActuels + ' g';
        updateChart(glucidesChart, glucidesActuels, 300);
    }
    if (!isNaN(nouveauLipides)) {
        lipidesActuels += nouveauLipides;
        document.getElementById('lipides').innerText = lipidesActuels + ' g';
        updateChart(lipidesChart, lipidesActuels, 100);
    }
    if (!isNaN(nouveauProteines)) {
        proteinesActuels += nouveauProteines;
        document.getElementById('proteines').innerText = proteinesActuels + ' g';
        updateChart(proteinesChart, proteinesActuels, 150);
    }
    // Cacher le formulaire après la soumission et réafficher le bouton "Modifier"
    document.getElementById('modificationForm').style.display = 'none';
    document.getElementById('modifierButton').style.display = 'block';
}
