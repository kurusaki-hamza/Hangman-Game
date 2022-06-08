let container = document.querySelector(".container");
let startingButton = document.querySelector(".starting button");
let starting = document.querySelector(".starting");
let wrongSpan = document.querySelector(".header span span");
let drawing = document.querySelector(".drawing");
let spansContainer = document.querySelector(".spans");
let questionElement = document.querySelector(".question");
let answerElement = document.querySelector(".answer")
let footer = document.querySelector(".footer");
let spans,evFn,qstObj,answer,lastAnswer,answerSpans,retryWordElement,continueI,retryI,levelDivI1,levelDivI2,currentObj,currentQuestions,checked = 0,soundV;
let questionsLevels = [
    [
        {
          question:"what is the biggest country",
          answers:"russia"  
        },
        {  
          question:"who is the richest man",
          answers:"jeff bizoss"
        },
        {
          question:"what is the largest company in the world?",
          answers:"alphabet"  
        },
        {
          question:"what is the higher montain in the world",
          answers:"everest"
        }
    ],
    [{
        question:"who is the founder of Facebook",
        answers:"Mark zuckerberg"  
      },
      {  
        question:"how many human in the world",
        answers:"seven billion"
      },
      {
        question:"how many color in the rainbow?",
        answers:"seven"  
      },
      {
        question:"what is the largest forest in the world",
        answers:"amazon"
      }
    ],
    [{
        question:"what is the Capital Of Russia",
        answers:"Moscow"  
      },
      {  
        question:"what is the hardest language",
        answers:"chinese"
      },
      {
        question:"what is the mother company of Google?",
        answers:"alphabet"  
      },
      {
        question:"where can you find the kengaru animal",
        answers:"Australia"
      }
    ]
];
startingButton.addEventListener("click",startingfn);
function startingfn(){
    sounder("StartAudio");
    container.classList.add("slowShow");
    starting.classList.add("slowHide");
    setTimeout(() => {
        container.style.display = "block";
        starting.style.display= "none";
        timer();
    }, 400);
}
currentQuestions = 0;
let questions = questionsLevels[currentQuestions];
questions.sort(()=>Math.random()-.5);
currentObj = 0;
qstObj = questions[currentObj];
let letters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
answer = Array.from(qstObj.answers);
function showQst() {
    questionElement.innerHTML = qstObj.question;
    spansContainer.innerHTML = "";
    for(let i = 0 ; i < letters.length ; i++){
        let span = document.createElement("span");
        span.className = "span";
        span.innerHTML = letters[i];
        spansContainer.append(span)
    };
    spans = document.querySelectorAll(".spans span");
};
function renderAnswerSpans(){
    answerElement.innerHTML="";
    let answerLen = qstObj.answers.length;
    for(let i=0 ; i < answerLen ; i++){
        let spanInpt = document.createElement("span");
        spanInpt.className = "spanInpt";
        if(qstObj.answers[i]===" "){
            spanInpt.className = "spanSpace"
        }
        answerElement.append(spanInpt)
    };
}
renderAnswerSpans();
showQst();
function spanEvent() {
    evFn = (e)=>setSpans(e,answer);
    spans.forEach(function (span) {
        span.addEventListener("click",evFn)
    })
}
function setSpans(e,answer){
        lastAnswer = false;
        sounder("clickAudio");
        e.target.classList.toggle("clicked");
        answerSpans = document.querySelectorAll(".answer span");
        answer.forEach(function (ele,indx){
            if(ele.toLowerCase() === e.target.innerHTML.toLowerCase()){
                lastAnswer=true;
                answerSpans.forEach(function (a,i) {
                    if(i===indx){
                        if(a.innerHTML){
                            a.innerHTML = "";
                            e.target.classList.remove("clicked")
                        } else {
                            a.innerHTML = ele.toUpperCase();
                        }
                    }
                })
            } else {
                lastAnswer = lastAnswer ? lastAnswer : false;
            }
        })
        if(!lastAnswer){
            if(!e.target.classList.contains("clicked")){
                drawing.classList.remove(`show${wrongSpan.innerHTML}`);
                wrongSpan.innerHTML = parseInt(wrongSpan.innerHTML)-1;
            } else {
                wrongSpan.innerHTML = parseInt(wrongSpan.innerHTML)+1;
                drawing.classList.add(`show${wrongSpan.innerHTML}`);
            }
        }
        if (wrongSpan.innerHTML === "4"){
            setTimeout(() => {
                if(currentQuestions < 2){
                    if(currentObj < 3){
                        sounder("failAudio");
                        createRetryDiv("You Failed!","fail");
                    } else {
                        createLevelDiv(`You Failed in the Level ${currentQuestions+1}`,"finishLevel");
                    }
                } else {
                    if(currentObj < 3){
                        sounder("failAudio");
                        createRetryDiv("You Failed!","fail");
                    } else {
                        sounder("gameOverAudio");
                        createFinishDiv("Your Score is 47/100");
                    }
                }
            }, 300);
        }
        checked =0;
        answerSpans.forEach(function(span){
            if(currentQuestions < 2){
                if(currentObj < 3){
                    if(span.innerHTML === ""){
                        if(span.classList.contains("spanSpace")){
                            checked++
                        }
                        return;
                    } else {
                        checked++;
                            if(checked === answerSpans.length && wrongSpan.innerHTML !== "4"){
                                sounder("SuccessAudio");
                                createRetryDiv("You Success!","success");
                            }
                    }
                } else if(currentObj===3){
                    if(span.innerHTML === ""){
                        if(span.classList.contains("spanSpace")){
                            checked++
                        }
                        return;
                    } else {
                        checked++;
                        if(checked === answerSpans.length && wrongSpan.innerHTML !== "4"){
                            createLevelDiv(`You Finished the Level ${currentQuestions+1}`,"finishLevel");
                        }
                    }
                }
            }  else if(currentQuestions === 2) {
                if(currentObj < 3){
                    if(span.innerHTML === ""){
                        if(span.classList.contains("spanSpace")){
                            checked++
                        }
                        return;
                    } else {
                        checked++;
                        if(checked === answerSpans.length && wrongSpan.innerHTML !== "4"){
                            sounder("SuccessAudio");
                            createRetryDiv("You Success!","success");
                        }
                    }
                } else if(currentObj===3){
                    if(span.innerHTML === ""){
                        if(span.classList.contains("spanSpace")){
                            checked++
                        }
                        return;
                    } else {
                        checked++;
                        if(checked === answerSpans.length && wrongSpan.innerHTML !== "4"){
                            sounder("gameOverAudio");
                            createFinishDiv("Your Score is 88/100");;
                        }
                    }
                }
            }
        })
}
spanEvent();
function render(answer){
    answerSpans = document.querySelectorAll(".answer span");
    answer.forEach(function(ele,ind){
        answerSpans.forEach(function(el,i){
            if(i===ind){
                el.innerHTML = ele.toUpperCase();
            }
        })
    })
}
function createRetryDiv(message,classNameParam){
    sounderPause("CountDownAudio");
    spansContainer.style.cursor = "default";
    spansContainer.style.pointerEvents = "none";
    let retryWord = document.createElement("div");
    retryWord.classList.add("retryWord");
    let retryWordIcon1 = document.createElement("i");
    retryWordIcon1.className ="fa fa-retry"
    retryWordIcon1.innerHTML ="retry"
    let retryWordIcon2 = document.createElement("i");
    retryWordIcon2.className ="fa fa-continue"
    retryWordIcon2.innerHTML ="continue"
    let retryWordH2 = document.createElement("h2");
    retryWordH2.className = classNameParam;
    retryWordH2.append(message)
    retryWord.append(retryWordH2,retryWordIcon1,retryWordIcon2);
    container.append(retryWord);
    retryWordElement = document.querySelector(".retryWord");
    continueI = document.querySelector(".retryWord .fa-continue");
    retryI = document.querySelector(".retryWord .fa-retry");
    let x = 54;
    let toper = setInterval(() => {
        x -= 0.19;
        retryWordElement.style.top = x+"%";
        if(x < 50){
            clearInterval(toper);
        }
    }, 1);
    retryI.addEventListener("click",()=>{retryfn(retryWordElement)});
    continueI.addEventListener("click",()=>{continueIfn(retryWordElement)});
    render(Array.from(qstObj.answers));
}
function createLevelDiv(message,classNameParam){
    sounderPause("CountDownAudio");
    spansContainer.style.cursor = "default";
    spansContainer.style.pointerEvents = "none";
    let levelDiv = document.createElement("div");
    levelDiv.classList.add("retryWord2");
    let levelIcon1 = document.createElement("i");
    levelIcon1.className ="fa fa-retry2"
    levelIcon1.innerHTML ="retry"
    let levelIcon2 = document.createElement("i");
    levelIcon2.className ="fa fa-continue2"
    levelIcon2.innerHTML ="next"
    let levelDivH2 = document.createElement("h2");
    levelDivH2.className = classNameParam;
    levelDivH2.append(message)
    levelDiv.append(levelDivH2,levelIcon1,levelIcon2);
    container.append(levelDiv);
    levelDivElement = document.querySelector(".retryWord2");
    levelDivI1 = document.querySelector(".retryWord2 .fa-continue2");
    levelDivI2 = document.querySelector(".retryWord2 .fa-retry2");
    let x = 54;
    let toper = setInterval(() => {
        x -= 0.19;
        levelDivElement.style.top = x+"%";
        if(x < 50){
            clearInterval(toper);
        }
    }, 1);
    levelDivI1.addEventListener("click",continuelevelfn) 
    levelDivI2.addEventListener("click",()=>{retryfn(levelDivElement)});
}
function createFinishDiv(msg){
    sounderPause("CountDownAudio");
    spansContainer.style.cursor = "default";
    spansContainer.style.pointerEvents = "none";
    let finishDiv = document.createElement("div");
    finishDiv.classList.add("retryWord3");
    let finishIcon = document.createElement("i");
    finishIcon.innerHTML ="Play Again";
    let finishH2 = document.createElement("h2");
    finishH2.innerHTML ="Game Over";
    finishIcon.innerHTML ="Play Again";
    let finishH4 = document.createElement("h4");
    finishH4.innerHTML =msg;
    finishDiv.append(finishH2,finishIcon,finishH4);
    container.append(finishDiv);
    finishDivElement = document.querySelector(".retryWord3");
    finishIconElement = document.querySelector(".retryWord3 i");
    let x = 54;
    let toper = setInterval(() => {
        x -= 0.19;
        finishDivElement.style.top = x+"%";
        if(x < 50){
            clearInterval(toper);
        }
    }, 1);
    finishIconElement.addEventListener("click",finishfn);
}
function finishfn(){
    setTimeout(()=>window.location.reload(),900)
}
function rerender(ele){
    ele.remove();
    let x = 54;
    let toper = setInterval(() => {
        x += 0.19;
            ele.style.top = x+"%";
            if(x > 100){
                clearInterval(toper);
                ele.remove();
            }
    }, 1);
    questionElement.innerHTML = qstObj.question;
    wrongSpan.innerHTML ="0";
    spans = document.querySelectorAll(".spans .span")
    spans.forEach(function(span){
        span.className = "span"
        span.removeEventListener("click",evFn)
    });
    drawing.className = "drawing";
    answerSpans = document.querySelectorAll(".answer span");
    answerSpans.forEach((span)=>{span.innerHTML=""});
    spansContainer.style.cursor = "default";
    spansContainer.style.pointerEvents = "visible";
    spans.forEach(function (span) {
        span.addEventListener("click",evFn)
    })
}
function retryfn(ele){
    sounder("clickAudio");
    questions.sort(()=>Math.random()-.5);
    currentObj = 0;
    checked=0;
    qstObj = questions[currentObj];
    answer = Array.from(qstObj.answers);
    renderAnswerSpans();
    rerender(ele)
    timer();
}
function continueIfn(ele){
    timer();
    checked=0;
    sounder("clickAudio");
    currentObj++;
    qstObj = questions[currentObj];
    answer = Array.from(qstObj.answers);
    renderAnswerSpans();
    rerender(ele);
}
function continuelevelfn(){
    currentQuestions++;
    sounder("clickAudio");
    currentObj=0;
    checked = 0;
    questions = questionsLevels[currentQuestions];
    qstObj = questions[currentObj];
    answer = Array.from(qstObj.answers);
    renderAnswerSpans();
    rerender(levelDivElement);
    timer();
}

function timer(){
    let timer = document.querySelector(".timer");
    let x=20;
    let timing = setInterval(function(){
        if(x>9){
            sounder("CountDownAudio");
            timer.innerHTML = `00:${x}`;
        } else {
            sounder("CountDownAudio");
            timer.innerHTML = `00:0${x}`;
        }
        --x;
        if(wrongSpan.innerHTML === "4" || checked === document.querySelectorAll(".answer span").length){
            if(currentObj === 0 && currentQuestions === 2){
                console.log("here");
            }
            clearInterval(timing);
        }
        if(x===0 && wrongSpan.innerHTML !== "4" && checked !== document.querySelectorAll(".answer span").length){
            sounder("CountDownAudio");
            timer.innerHTML = `00:0${x}`;
            if(currentQuestions < 2){
                if(currentObj < 3){
                    createRetryDiv("You Failed!","fail");
                    sounder("failAudio");
                } else {
                    createLevelDiv(`You Failed in the Level ${currentQuestions+1}`,"finishLevel");
                }
            } else {
                if(currentObj < 3){
                    createRetryDiv("You Failed!","fail");
                    sounder("failAudio");
                } else {
                    createFinishDiv("Your Score is 47/100");
                    sounder("gameOverAudio");
                }
            }
            clearInterval(timing);
        }
        switch(x){
            case 4: drawing.classList.add("show1");break;
            case 3: drawing.classList.add("show2");break;
            case 2: drawing.classList.add("show3");break;
            case 1: drawing.classList.add("show4");break;
        }
    },1000)
}
function sounder(theclass){
    soundV = document.querySelector(`.${theclass}`);
    soundV.play();
}
function sounderPause(theclass){
    soundV = document.querySelector(`.${theclass}`);
    soundV.pause();
}