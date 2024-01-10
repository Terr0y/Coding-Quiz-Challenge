document.addEventListener('DOMContentLoaded', () => {
    // DOM references
    const startButton = document.getElementById('start');
    const questionScreen = document.getElementById('questions');
    const timerEl = document.getElementById('time');
    const endScreen = document.getElementById('end-screen');
    const finalScoreEl = document.getElementById('final-score');
    const initialsInput = document.getElementById('initials');
    const submitButton = document.getElementById('submit');
    const feedbackEl = document.getElementById('feedback');

    // Quiz state variables
    let timeLeft = 60;
    let currentQuestionIndex = 0;
    let timerInterval;

    // Questions array 
    const questions = [
        {
            question: "Which HTML element is used for specifying a JavaScript source file?",
            choices: ["<script>", "<javascript>", "<src>", "<js>"],
            answer: "<script>"
        },
        {
            question: "Which of the following is not a JavaScript data type?",
            choices: ["Number", "Undefined", "Boolean", "Float"],
            answer: "Float"
        },
        {
            question: "How do you create a function in JavaScript?",
            choices: ["function = myFunction()", "function:myFunction()", "function myFunction()", "function-myFunction()"],
            answer: "function myFunction()"
        },
        {
            question: "How do you call a function named 'myFunction'?",
            choices: ["call myFunction()", "myFunction()", "call function myFunction()", "Execute myFunction()"],
            answer: "myFunction()"
        },
        {
            question: "How to write an IF statement in JavaScript?",
            choices: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"],
            answer: "if (i == 5)"
        },
        {
            question: "How does a WHILE loop start?",
            choices: ["while (i <= 10)", "while (i <= 10; i++)", "while i = 1 to 10", "while (i <= 10; i--)"],
            answer: "while (i <= 10)"
        },
        {
            question: "How can you add a comment in a JavaScript?",
            choices: ["//This is a comment", "<!--This is a comment-->", "'This is a comment", "(This is a comment)"],
            answer: "//This is a comment"
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            choices: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = 'red', 'green', 'blue'"],
            answer: "var colors = ['red', 'green', 'blue']"
        },
        {
            question: "What is the correct HTML for referring to an external style sheet?",
            choices: ["<style src='mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<css>mystyle.css</css>"],
            answer: "<link rel='stylesheet' type='text/css' href='mystyle.css'>"
        },
        {
            question: "Where in an HTML document is the correct place to refer to an external style sheet?",
            choices: ["At the end of the document", "In the <body> section", "In the <head> section", "At the start of the document"],
            answer: "In the <head> section"
        },
        {
            question: "Which is the correct CSS syntax?",
            choices: ["{body;color:black;}", "body:color=black;", "{body:color=black;}", "body {color: black;}"],
            answer: "body {color: black;}"
        },
        {
            question: "How do you insert a comment in a CSS file?",
            choices: ["// this is a comment", "' this is a comment", "/* this is a comment */", "// this is a comment //"],
            answer: "/* this is a comment */"
        },
        {
            question: "Which property is used to change the background color?",
            choices: ["bgcolor", "color", "background-color", "backgroundColor"],
            answer: "background-color"
        },
        {
            question: "How do you add a background color for all <h1> elements?",
            choices: ["h1.all {background-color:#FFFFFF;}", "h1 {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "<h1 style='background-color:#FFFFFF;'>"],
            answer: "h1 {background-color:#FFFFFF;}"
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            choices: ["text-color", "fgcolor", "color", "font-color"],
            answer: "color"
        },
        {
            question: "Which CSS property controls the text size?",
            choices: ["font-style", "text-style", "text-size", "font-size"],
            answer: "font-size"
        },
        {
            question: "What does CSS stand for?",
            choices: ["Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which HTML attribute is used to define inline styles?",
            choices: ["styles", "style", "class", "font"],
            answer: "style"
        },
        {
            question: "Which is the correct CSS syntax to change the font name?",
            choices: ["font-name:Arial;", "font.family:Arial;", "font:Arial;", "font-family:Arial;"],
            answer: "font-family:Arial;"
        },
        {
            question: "How do you make each word in a text start with a capital letter?",
            choices: ["text-transform:capitalize", "You can't do that with CSS", "text-style:capitalize", "transform:capitalize"],
            answer: "text-transform:capitalize"
        }
    ];
    

    // startQuiz Functions
    function startQuiz() {
        document.getElementById('start-screen').style.display = 'none';
        questionScreen.style.display = 'block';
        startTimer();
        showNextQuestion();
    }

    // startTimer Function
    function startTimer() {
        timerEl.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }
        // showNextQuestion Function 
    function showNextQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question-title').textContent = currentQuestion.question;
        
        const choicesElement = document.getElementById('choices');
        choicesElement.innerHTML = '';
        
        currentQuestion.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.onclick = () => handleAnswer(choice === currentQuestion.answer);
            choicesElement.appendChild(button);
        });
    }

    function handleAnswer(isCorrect) {
        if (isCorrect) {
            feedbackEl.textContent = 'Correct!';
        } else {
            feedbackEl.textContent = 'Wrong!';
            timeLeft = Math.max(0, timeLeft - 10);
        }
        
        feedbackEl.classList.remove('hide');
        setTimeout(() => {
            feedbackEl.classList.add('hide');
            showNextQuestion();
        }, 1000);

        currentQuestionIndex++;
    }
 // endQuiz Function
    function endQuiz() {
        clearInterval(timerInterval);
        questionScreen.style.display = 'none';
        endScreen.style.display = 'block';
        finalScoreEl.textContent = timeLeft;
    }
     // Function saveHighScore
    function saveHighScore(event) {
        console.log("Submitting ...")
        event.preventDefault();
        const initials = initialsInput.value.trim();
        console.log("User Input: ", initials)
        if (initials.length === 0) {
            alert("Please enter your initials.");
            return;
        }


        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ initials, score: timeLeft });
        highscores.sort((a, b) => b.score - a.score);

        localStorage.setItem('highscores', JSON.stringify(highscores));
        // redirect to our highscores.html page
        //window.location.href = 'highscores.html';
       //window.location.replace('highscores.html')
    }


    document.addEventListener('DOMContentLoaded', () => {
        const submitButton = document.getElementById('submit');
        if (submitButton) {
            submitButton.addEventListener('click', saveHighScore);
        } else {
            console.error('Submit button not found');
        }
    
        // ... rest of your code ...
    });
    






    const highscoreForm = document.getElementById('highscore-form'); // Replace with your form's ID
if (highscoreForm) {
    highscoreForm.addEventListener('submit', saveHighScore);
} else {
    document.getElementById('submit').addEventListener('click', saveHighScore); // submitButton.addEventListener('click', saveHighScore);
}

    
    // Event listeners for the start button
    startButton.addEventListener('click', startQuiz);
    //submitButton.addEventListener('click', saveHighScore);
    

    
    // Load highscores when clicked on the highscores page
    if (window.location.pathname.includes('highscores.html')) {
        loadHighscores();
    }

    function loadHighscores() {
        const highscoresList = document.getElementById('highscores');
        if (!highscoresList) return;

        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscoresList.innerHTML = highscores
           .map(score => `<li>${score.initials} - ${score.score}</li>`)
           .join('');
   }
});
