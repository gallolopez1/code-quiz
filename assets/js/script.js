const questions = [{
        question: "JavaScript programs can be inserted almost anywhere into an HTML document using the ______ tag.",
        choices: [
            "<code>",
            "<script>",
            "<ins>",
            "<template>"
        ],
        answer: "<script>"
    },
    {
        question: "A ______ is a named storage for data.",
        choices: [
            "variable",
            "message",
            "value",
            "string"
        ],
        answer: "variable"
    },
    {
        question: "Variables declared using ______ cannot be reassigned.",
        choices: [
            "var",
            "let",
            "have",
            "const"
        ],
        answer: "const"
    }
    // {
    //     question: "Which of the following is NOT a data type in JavaScript?",
    //     choices: [
    //         "number",
    //         "string",
    //         "character",
    //         "boolean"
    //     ],
    //     answer: "character"
    // },
    // {
    //     question: "Which of the following functions will NOT interact with the user?",
    //     choices: [
    //         "print();",
    //         "alert();",
    //         "prompt();",
    //         "confirm();"
    //     ],
    //     answer: "print()",
    // },
    // {
    //     question: "Of the following logical operators in JavaScript, which one represents (NOT)?",
    //     choices: [
    //         "||",
    //         "&&",
    //         "!",
    //         "??"
    //     ],
    //     answer: "!",
    // },
    // {
    //     question: "Normally, a loop exists when the condition becomes falsy. But we can force the exit at any time with the special ______ directive.",
    //     choices: [
    //         "stop",
    //         "end",
    //         "alert",
    //         "break"
    //     ],
    //     answer: "break",
    // },
    // {
    //     question: "A ______ statement can replace multiple (if) checks.",
    //     choices: [
    //         "switch",
    //         "while",
    //         "for",
    //         "continue"
    //     ],
    //     answer: "switch",
    // },
    // {
    //     question: "A variable inside a function is only visible inside that function and is known as a ______ .",
    //     choices: [
    //         "local variable",
    //         "outer variable",
    //         "global variable",
    //         "parameter"
    //     ],
    //     answer: "local variable",
    // },
    // {
    //     question: "The ______ helps with the process of finding and fixing errors within a script.",
    //     choices: [
    //         "DOM",
    //         "console.log()",
    //         "debugger",
    //         "parameter"
    //     ],
    //     answer: "debugger",
    // },
    // {
    //     question: " ______ appends new elements to the end of an array, and returns the new length of an array.",
    //     choices: [
    //         "concat()",
    //         "push()",
    //         ".join",
    //         "parseInt()"
    //     ],
    //     answer: "push()",
    // },
    // {
    //     question: " When saving to local storage, remember to ______ in order to convert the object to a string.",
    //     choices: [
    //         "Storage.setItem()",
    //         "JSON.parse()",
    //         "JSON.stringify()",
    //         "Storage.getItem()"
    //     ],
    //     answer: "JSON.stringify()",
    // },
    // {
    //     question: " ______ executes the callback repeatedly at a set interval.",
    //     choices: [
    //         "set.Timeou()",
    //         "loop",
    //         "callback",
    //         "setInterval"
    //     ],
    //     answer: "setInterval",
    // },
    // {
    //     question: " Which is a DOM element method?",
    //     choices: [
    //         "setAttribute()",
    //         "getAttribute()",
    //         "removeAttribute()",
    //         "All of the above"
    //     ],
    //     answer: "All of the above",
    // },
    // {
    //     question: " This library includes new methods to make elements sortable, draggable, droppable, etc.",
    //     choices: [
    //         "jQuery",
    //         "Bootstrap",
    //         "Moment.js",
    //         "jQuery UI"
    //     ],
    //     answer: "jQuery UI",
    // }
];
// setAttribute
// removeAttribute
//hide things with hide class (after one question has been answered hide it)
// document.createElement to
// loop through the choices array and create a button for each choice
let generateBtn = document.querySelector("#btn-start")
var mainView = document.querySelector("main");
var timerEl = document.querySelector("#timer");
var qID = 0;
var score = 0;
var timeLeft = 100;

//when I click the start button I remove the introduction and I move on to the next step which is to load a question
let startQuiz = function() {
    const startBtn = document.querySelector("#quiz-start")
    startBtn.remove();
    createQuestion(0);
    startTimer();
};
// creating the questions
function createQuestion(questionID) {

    let primaryDiv = document.createElement("div");
    primaryDiv.id = "question" + questionID;
    primaryDiv.className = "container";

    let secondDiv = document.createElement("div");
    secondDiv.className = "row align-items-center";

    let thirdDiv = document.createElement("div");
    thirdDiv.className = "col-12 d-flex flex-column answers-button text-center align-content-center";
    thirdDiv.innerHTML = "<h2 class= 'title'</h2>" + "Question " + (questionID + 1) + ": " + questions[questionID].question;

    let fourthDiv = document.createElement("div");
    fourthDiv.className = "answers-button d-flex flex-column align-items-center";
    for (ans in questions[questionID].choices) {
        let buttonEl = document.createElement("button");
        let temp = ans;
        temp++;
        buttonEl.className = "btn m-1 w-25 text-start";
        buttonEl.textContent = temp + ". " + questions[questionID].choices[ans];
        buttonEl.setAttribute("onclick", "checkAnswer(" + questionID + ",'" + questions[questionID].choices[ans] + "')");
        fourthDiv.appendChild(buttonEl);
    }
    thirdDiv.appendChild(fourthDiv);
    secondDiv.appendChild(thirdDiv);
    primaryDiv.appendChild(secondDiv);
    mainView.appendChild(primaryDiv);
};

function checkAnswer(questionID, Answer) {
    var removeOld = document.querySelector("#question" + questionID);
    if (Answer === questions[questionID].answer) {
        // let correct = document.createElement("h2");
        // correct.className = "title border-top-2";
        // correct.textContent = "Correct!";
        // mainView.appendChild(correct);
        console.log("Correct");
        score += 10;
    } else {
        // let wrong = document.createElement("h2");
        // wrong.className = "title border-top-2";
        // wrong.textContent = "Wrong!";
        // mainView.appendChild(wrong);
        console.log("Wrong");
    }
    if (questions[qID] === undefined) {
        gameOver();
    } else {
        removeOld.remove();
        qID++;
        createQuestion(qID);
    }
};

function startTimer() {
    timerEl.textContent = timeLeft;
    var timeInternal = setInterval(function() {
        if (timeLeft > 0 && questions[qID] !== undefined) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else if (questions[qID] === undefined) {
            clearInterval(timeInternal);
        } else {
            clearInterval(timeInternal);
            gameOver();
        }
    }, 1000)
};

function gameOver() {
    let primaryDiv = document.createElement("div");
    primaryDiv.className = "quiz-end";

    let secondDiv = document.createElement("div");
    secondDiv.className = "container";

    let thirdDiv = document.createElement("div");
    thirdDiv.className = "row align-items-center";

    let fourthDiv = document.createElement("div");
    fourthDiv.className = "col";

    let h2 = document.createElement("h2");
    h2.className = ("text-decoration-underline")
    h2.textContent = "All done!";

    let p = document.createElement("p");
    p.id = ("score")
    p.textContent = "Your final score is " + finalScore;

    let form = document.createElement("form");
    form.className = ("form");

    let fifthDiv = document.createElement("div");
    fifthDiv.className = ("form-group");

    let label = document.createElement("label");
    label.className = ("nameInitials");

    let input = document.createElement("input");
    input.id = ("name-initials");
    input.type = ("text");
    input.name = ("name-initials");

    fifthDiv.appendChild(input);
    fifthDiv.appendChild(label);
    form.appendChild(fifthDiv);
    fourthDiv.appendChild(form);
    fourthDiv.appendChild(p);
    fourthDiv.appendChild(h2);
    thirdDiv.appendChild(fourthDiv);
    secondDiv.appendChild(thirdDiv);
    primaryDiv.appendChild(secondDiv);
    mainView.appendChild(primaryDiv);

};


//create a question
// let createQuestion = function() {
//     let question = document.createElement("h2")
//     question.className = "question-item"

//     let listChoices = document.createElement("li");
//     listChoices.className = "choices"

// };

// A question appears and I can see a list of possible answers
// let loadQuestion = function() {
//     for (let i = 0; i < questions.length; i++) {

//         break;

//     };
// };