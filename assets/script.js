const quizQuestions = [

    {

        title: "What ethnicity of Francine's parents?",

        choices: ["German", "Brazilian", "Norwegian", "Chinese"],

        answer: "Chinese"

    },

    {

        title: "What city do the Smith's live in?",

        choices: ["Springfield", "Nibilheim", "Langley Falls", "Gotham City"],

        answer: "Langley Falls"

    },

    {
        title: "What animal did Stan turn himself into when he was going to lose his truck?",

        choices: ["Cow", "Horse", "Chicken", "Dog"],

        answer: "Horse"
    },

    {   title: "What is Jeff's favorite band?",

        choices: ["Rush", "Phish", "SOAD", "Sublime"],

        answer: "Phish"

    },

    {
        title: "Who is Steve's best friend?",

        choices: ["Toshi", "Snot", "Barry", "Billy"],

        answer: "Snot"
    },

    {
        title: "What is the name of Stan's bully?",

        choices: ["Bruiser", "Hank", "Stelios", "Greg"],

        answer: "Stelios"
    },


]

var timer = document.getElementById("timer")
var startScreen = document.getElementById("start-screen")
var startBtn = document.getElementById("startBtn")
var questions = document.getElementById("questions")
var questionTitle = document.getElementById("question-title")
var choices = document.getElementById("choices")
var endScreen = document.getElementById("end-screen")
var finalScore = document.getElementById("final-score")
var inputName = document.getElementById("name")
var submitBtn = document.getElementById("submitBtn")
var timeLeft = 60
var questionIndex = 0
var intervalState;


startBtn.addEventListener("click", function(){
    startScreen.setAttribute("class", "hide")
    questions.removeAttribute("class", "hide")

intervalState = setInterval(function() {
    timeLeft --
    timer.textContent = timeLeft
    if (timeLeft <= 0) {
       clearInterval(intervalState) 
    }
},1000)
//call display question function
displayQuestion()
})

function displayQuestion() {
    var currentQuestion = quizQuestions [questionIndex]
    questionTitle.textContent = currentQuestion.title

    currentQuestion.choices.forEach(choice=>{
        var choiceBtn = document.createElement("button")
        choiceBtn.textContent = choice
        choiceBtn.setAttribute("value", choice)
        //add click event to each button to see if right or wrong
        choiceBtn.onclick = checkAnswer
        choices.append(choiceBtn)
    })
}

function checkAnswer() {
    if (this.value === quizQuestions[questionIndex].answer) {
        console.log("correct")
    }else{
        console.log("incorrect")
        timeLeft -= 10
        timer.textContent = timeLeft
    }
    questionIndex++
    choices.innerHTML = ""
    if (questionIndex === quizQuestions.length){
        endQuiz()
    }else{
        displayQuestion()
    }

}

function endQuiz() {
    clearInterval(intervalState)
    endScreen.removeAttribute("class", "hide")
    questions.setAttribute("class", "hide")
    finalScore.textContent = timeLeft
}

function saveScore() {
    var scoreArr = JSON.parse(localStorage.getItem("quiz scores"))||[]
    var newScore = {userName:inputName.value, score:timeLeft}
    scoreArr.push(newScore)
    localStorage.setItem("quiz scores", JSON.stringify(scoreArr))
    var scoreScreen = document.getElementById("score-screen")
    scoreScreen.removeAttribute("class")
    endScreen.setAttribute("class", "hide")
    showScore()
}

function showScore() {
    var scoreArr = JSON.parse(localStorage.getItem("quiz scores")) || []
    scoreArr.forEach(function(userScore){
        var listItem = document.createElement("li")
        listItem.textContent = userScore.userName + " : " + userScore.score 
        var scoreList = document.getElementById("score-list")
        scoreList.append(listItem)
    })

}
var restart = document.getElementById("restart")
function restartGame() {
    window.location.reload()
}
restart.onclick = restartGame
submitBtn.onclick = saveScore