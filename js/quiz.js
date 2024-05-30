document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let score = 0;
        const totalQuestions = 3;
        const answers = {
            q1: 'faux',
            q2: 'faux', 
            q3: 'vrai'
        };
        
        const userAnswers = {};
        let allQuestionsAnswered = true;
        
        for (let i = 1; i <= totalQuestions; i++) {
            const radios = document.getElementsByName('q' + i);
            let questionAnswered = false;
            
            radios.forEach(radio => {
                if (radio.checked) {
                    userAnswers['q' + i] = radio.value;
                    questionAnswered = true;
                }
            });
            
            if (!questionAnswered) {
                allQuestionsAnswered = false;
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
    });
});
