// Array de preguntas del quiz Hello Kitty
const questions = [
    {
        question: "¿En que año fue creada Hello Kitty?",
        options: ["1969", "1974", "1980", "1985"],
        correct: 1, //La respuesta correcta es 1974
        explanation: "Mi amor la Kitty se creo por Yuko Simizu para la compañia Sanrio en 1974, Esta viejita la Kitty"                
    },
    {
        question: "¿Cuál es el nombre completo de la Gatita?",
        options: ["Gatita Salvaje", "Kitty White", "Gatubela", "Kitty Chan"],
        correct: 1, // La respuesta correcta es Kitty White
        explanation: "Lastimosamente se llama Kitty White y no Gatita Salvaje"        
    },
    {
        question: "Qué tipo de animal es la Kitty",
        options: ["Una niña", "Un conejo", "Una gata", "Una perra"],
        correct: 2, //La respuesta corecta es una gata
        explanation: "Más que una gata, es una gatita muy tierna y única, como tú mi cielito"
    },
    {
        question: "¿Quién es el mejor amigo/a de la Gatita?",
        options: ["Keroppi", "My Melody", "Dear Daniel", "La Donita"],
        correct: 2, // La respuesta correcta es Dear Daniel
        explanation: "La verdad no sabia que tenia un amigo la gatita jaja"
    },
    {
        question: "¿Cuál es la comida favorita de la Kitty",
        options: ["Helado", "Pastel de manzana", "Galletas", "Dulces"],
        correct: 1, // La respuesta correcta es el pastel de manzanaa
        explanation: "A la Gatita le encanta el pastel de manzana hecho por su mamá. Consentida como tú oww "
    },
    {
        question: "¿Cuál prefiere Luis?",
        options: ["Kuromi", "La Gatita", "My Melody", "Dear Daniel"],
        correct: 0, //La respuesta correcta es Kuromi
        explanation: "La kuromi entiende de la fucking vibra y la buena moda"
    },
    {
        question: "Si la Kitty tiene un mejor amigo gato, ¿Cuál es tu mejor amiga?",
        options: ["Una gata", "Un gato", "Donita", "No hay, no existe"],
        correct: 2, //La respuesta correcta es Donita
        explanation: "Obviamente Donita, además ella es igual de diva que la Kitty y tú"        
    },
    {
        question: "¿Quién creo la canción favorita de la Gatita? 'Daga Adicta'",
        options: ["Luigi", "Box Bonni", "Ñenjo", "FireBoy"],
        correct: 0, //La respuesta correcta es Luigi
        explanation: "Reitero que es una gatita salvaje que le gusta el boquisucio"        
    }
];

//Variables globales
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answered = false;
let playerName = "";

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizSection = document.getElementById('quiz-section');
const quizContainer = document.getElementById('quiz-container');
const nextButton = document.getElementById('next-button');
const resultsContainer = document.getElementById('results');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const userNameElement = document.getElementById('user-name');
const certificationLevelElement = document.getElementById('certification-level');
const certificateDateElement = document.getElementById('certificate-date');
const downloadButton = document.getElementById('download-button');
const restartButton = document.getElementById('restart-button');
const startButton = document.getElementById('start-button');
const playerNameInput = document.getElementById('player-name');

// Funcion para iniciar el quiz despues de ingresar el nombre
function initQuiz() {
    // Verificar que se haya ingresado un nombre 
    if (!playerNameInput.value.trim()) {
        alert("Por favor, ingresa tu nombre para comenzar a jugar:D");
        return;
    }

    // Ocultar pantalla de inicio y mostrar el quiz
    playerName = playerNameInput.value.trim();

    //ocultar pantanlla de inicio y mostrar el quiz
    startScreen.classList.add('hidden');
    quizSection.classList.remove('hidden');

    // Iniciar el Quiz
    startQuiz();
}

// Funcion para iniciar el quiz
function startQuiz() {
    // Resetear variables
    currentQuestion = 0;
    score = 0;
    selectedOption = null; 
    answered = false;

    // ocultar resultados y mostrar quiz
    resultsContainer.classList.add('hidden');
    quizSection.classList.remove('hidden');
    
    // Mostrar la primera pregunta
    showQuestion(currentQuestion);
}

// Función para mostrar una pregunta
function showQuestion(index) {
    // Resetear estado para la nueva pregunta
    selectedOption = null;
    answered = false;
    nextButton.disabled = true;
    
    // Obtener la pregunta actual
    const question = questions[index];
    
    // Crear el HTML para la pregunta
    const questionHTML = `
        <div class="question-container">
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="options">
                ${question.options.map((option, i) => 
                    `<div class="option" data-index="${i}">${option}</div>`
                ).join('')}
            </div>
            <div class="explanation hidden" id="explanation"></div>
        </div>
    `;
    
    // Insertar la pregunta en el contenedor
    quizContainer.innerHTML = questionHTML;
    
    // Agregar eventos a las opciones
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });
    
    // Actualizar el texto del botón si es la última pregunta
    if (index === questions.length - 1) {
        nextButton.textContent = 'Ver Resultados';
    } else {
        nextButton.textContent = 'Siguiente Pregunta';
    }
}

// Función para seleccionar una opción
function selectOption() {
    // Si ya se respondió la pregunta, no hacer nada
    if (answered) return;
    
    // Quitar selección previa si existe
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Marcar la opción seleccionada
    this.classList.add('selected');
    
    // Guardar el índice seleccionado
    selectedOption = parseInt(this.getAttribute('data-index'));
    
    // Habilitar el botón de siguiente
    nextButton.disabled = false;
}

// Función para verificar la respuesta
function checkAnswer() {
    answered = true;
    
    // Obtener la pregunta actual
    const question = questions[currentQuestion];
    
    // Verificar si la respuesta es correcta
    const isCorrect = selectedOption === question.correct;
    
    // Actualizar puntuación si es correcta
    if (isCorrect) {
        score++;
    }
    
    // Mostrar respuesta correcta e incorrecta
    document.querySelectorAll('.option').forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedOption && selectedOption !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Mostrar explicación
    const explanationElement = document.getElementById('explanation');
    explanationElement.textContent = question.explanation;
    explanationElement.classList.remove('hidden');
    
    // Actualizar botón para continuar
    nextButton.textContent = currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta';
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
    // Si no ha contestado aún, verificar la respuesta
    if (!answered) {
        checkAnswer();
        return;
    }
    
    // Avanzar a la siguiente pregunta o mostrar resultados
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        showResults();
    }
}

// Función para mostrar los resultados
function showResults() {
    // Ocultar el contenedor de preguntas
    quizSection.classList.add('hidden');
    
    // Mostrar el contenedor de resultados
    resultsContainer.classList.remove('hidden');
    
    // Mostrar la puntuación
    const percentage = Math.round((score / questions.length) * 100);
    scoreElement.textContent = `¡Has obtenido ${score} de ${questions.length} puntos! (${percentage}%)`;
    
    // Establecer la fecha actual en el certificado
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    certificateDateElement.textContent = formattedDate;
    
    // Mostrar retroalimentación según la puntuación
    let feedback = '';
    let certificationLevel = '';
    
    if (percentage >= 90) {
        feedback = '¡Increíble! Eres un verdadero experto en Hello Kitty. Sanrio estaría orgulloso de ti!';
        certificationLevel = 'Nivel: Experto Supremo';
    } else if (percentage >= 70) {
        feedback = '¡Muy bien! Sabes mucho sobre Hello Kitty. ¡Sigue aprendiendo!';
        certificationLevel = 'Nivel: Fan Avanzado';
    } else if (percentage >= 50) {
        feedback = 'No está mal. Conoces lo básico sobre Hello Kitty, pero todavía puedes aprender más.';
        certificationLevel = 'Nivel: Fan Intermedio';
    } else {
        feedback = 'Parece que aún estás empezando a conocer a Hello Kitty. ¡No te preocupes, es un buen comienzo!';
        certificationLevel = 'Nivel: Fan Principiante';
    }
    
    feedbackElement.textContent = feedback;
    userNameElement.textContent = playerName;
    certificationLevelElement.textContent = certificationLevel;
}

// Función para descargar el certificado como imagen
function downloadCertificate() {
    // Usar html2canvas para convertir el certificado en una imagen
    html2canvas(document.getElementById('certificate')).then(canvas => {
        // Crear un enlace para descargar la imagen
        const link = document.createElement('a');
        link.download = `Certificado_Hello_Kitty_${playerName.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Configurar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Botón para iniciar el quiz desde la pantalla de inicio
    startButton.addEventListener('click', initQuiz);
    
    // Botón para pasar a la siguiente pregunta
    nextButton.addEventListener('click', nextQuestion);
    
    // Botón para reiniciar el quiz
    restartButton.addEventListener('click', startQuiz);
    
    // Botón para descargar el certificado
    downloadButton.addEventListener('click', downloadCertificate);
    
    // Permitir iniciar el quiz presionando Enter en el campo de nombre
    playerNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            initQuiz();
        }
    });
});