//Valor fixo
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("contador");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// Questões
let questions = [
    {
        question : "O coronavírus pode ser transmitido através de um aperto de mãos.",
        imgSrc : "img/mao.jpg",
        choiceA : "Verdadeiro",
        choiceB : "Falso",
        correct : "A"
    },{
        question : "Na hora de lavar as mãos é importante tirar anéis, pulseiras e acessórios.",
        imgSrc : "img/lavar.jpg",
        choiceA : "Verdadeiro",
        choiceB : "Falso",
        correct : "A"
    },{
        question : "Homens devem raspar as barbas ou bigodes.",
        imgSrc : "img/barba.jpg",
        choiceA : "Verdadeiro",
        choiceB : "Falso",
        correct : "B"
    }

,{
    question : "Cães e gatos podem infectar seus donos.",
    imgSrc : "img/cg.jpg",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "B"
}

,{
    question : "Altas doses de vitamina C matam o coronavírus.",
    imgSrc : "img/lara.jpg",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "B"
}

,{
    question : "Os sintomas podem durar até 10 dias. ",
    imgSrc : "img/sint.jpg",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "A"
}

,{
    question : "diabéticos são mais vulneráveis à covid-19",
    imgSrc : "img/dia.png",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "A"
}

,{
    question : "Gargarejo com água quente mata o vírus.",
    imgSrc : "img/garga.jpg",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "B"
}

,{
    question : "O coronavírus causa pneumonia instantânea.",
    imgSrc : "img/pneu.jpg",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "B"
}

,{
    question : "O coronavírus consegue sobreviver por dois meses no ambiente",
    imgSrc : "img/amb.jpg",
    choiceA : "Verdadeiro",
    choiceB : "Falso",
    correct : "B"
}

];



const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//Questões

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    

}

start.addEventListener("click",startQuiz);

// Começe o quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// Progresso
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



function renderCounter(){
    if(count <= questionTime){
        contador.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Checando a pergunta // Próxima questão

function ChecarPergunta(answer){
    if( answer == questions[runningQuestion].correct){
        
        score++;
        
        answerIsCorrect();
    }else{
        
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{

        // Finalize o quiz e mostre a pontuação
        clearInterval(TIMER);
        scoreRender();
    }
}

// Resposta correta
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// Resposta errada
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// Placar
function scoreRender(){
    scoreDiv.style.display = "block";
    
    
    const scorePerCent = Math.round(100 * score/questions.length);
    
    //Mostrar placar
    // O cálculo da pontuação exibirá diferentes emotes

    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















