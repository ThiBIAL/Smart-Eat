const answers = {
    q1: 'Faux',
    q2: 'Faux',
    q3: 'Vrai'
};
const userAnswers = {};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quizForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let score = 0;
        const totalQuestions = Object.keys(answers).length;
        let allQuestionsAnswered = true;

        for (let i = 1; i <= totalQuestions; i++) {
            if (!userAnswers['q' + i]) {
                allQuestionsAnswered = false;
                break;
            }
        }

        if (!allQuestionsAnswered) {
            alert('Veuillez répondre à toutes les questions.');
            return;
        }

        for (let key in answers) {
            if (answers[key] === userAnswers[key]) {
                score++;
            }
        }

        let message;
        if (score === totalQuestions) {
            message = "Excellent ! Vous avez obtenu un score parfait de " + score + "/" + totalQuestions;
        } else if (score === totalQuestions - 1) {
            message = "Bien joué ! Vous avez obtenu un score de " + score + "/" + totalQuestions;
        } else {
            message = "Vous pouvez faire mieux. Vous avez obtenu un score de " + score + "/" + totalQuestions;
        }

        alert(message);
        form.reset();
        clearSelection();
    });
});

function selectAnswer(questionId, answer) {
    // Store the selected answer
    userAnswers[questionId] = answer;

    // Update button styles to show selection
    const buttons = document.querySelectorAll(`#${questionId}vrai, #${questionId}faux`);
    buttons.forEach(button => button.classList.remove('selected'));
    document.getElementById(`${questionId}${answer.toLowerCase()}`).classList.add('selected');
}

function clearSelection() {
    const buttons = document.querySelectorAll('input[type="button"]');
    buttons.forEach(button => button.classList.remove('selected'));
    for (let key in userAnswers) {
        delete userAnswers[key];
    }
}