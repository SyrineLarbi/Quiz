class QuizGame{
    questionNumber;
    currentQuestion;
    question;
    QuestionsArray;
    questionCounter;
    quizStart;
    answers
    result;
    scoreQuiz;
    quizScore;
    totalQuestion;
    correct;
    wrongAn;
    finish;
    wrongAnswers;
    finalScore;
    resultScore;
    startQuiz;
    constructor(){
        this.btnNext=document.querySelector(".btn_next");
        this.finish;
        this.scoreQuiz;
        this.wrongAnswers;
        this.answers;
        this.finalScore=document.querySelector(".score");
        this.questionNumber = document.querySelector(".number_Of_Question");
        this.quizStart=document.querySelector(".Quiz");
        this.question= document.querySelector(".question");
        this.options = document.querySelector(".options_container");
        this.quizScore=document.querySelector(".scoreQuiz");
        this.questionCounter = 0; 
        this.QuestionsArray = [];
        this.result=[];
        this.totalQuestion =document.querySelector(".n_Of_Question");
        this.correct= document.querySelector('.C_answer');
        this.wrongAn=document.querySelector('.W_answer');
        this.resultScore=document.querySelector(".result");
        this.startQuiz=document.querySelector(".Start_Page"); 

    } 

    // *******************Questions******************

    QuizQuestion(){
        for (let i= 0; i<quiz.length ; i++){
            this.QuestionsArray.push(quiz[i]);
        }
    }
    QuestionFunction(){
        this.finish=false
        this.questionNumber.innerHTML="Question " + (this.questionCounter+1) +  " of " + quiz.length;
        let theQuestion = this.QuestionsArray[Math.floor(Math.random() * this.QuestionsArray.length)]
        this.currentQuestion= theQuestion;
        let questionIndex=this.QuestionsArray.indexOf(theQuestion);  
        this.QuestionsArray.splice(questionIndex,1);
        let questionContenu='';
            questionContenu += '<div class="question"  data-index='+questionIndex+'>'+this.currentQuestion.question+'</div>';
        console.log(questionContenu);
        this.question.innerHTML=questionContenu
        this.questionCounter++;
        let contenu='';
        for(let i =0; i<this.currentQuestion.options.length;i++){
            let yra=this.currentQuestion.options[i].split(" ").join("");
            contenu += '<div class="option"  data-option='+yra+'>'+this.currentQuestion.options[i]+'</div>';
        }
        this.options.innerHTML = contenu;
        this.select()
    }
    
    nextQuestion(){
        
        if(this.questionCounter == quiz.length){
            this.resultScore.classList.add("show");
            this.quizStart.classList.remove("show");
            this.resultSc();
           
        }
        else{
            this.QuestionFunction();
          
        }
    }
// *****************Options*********************
    select(){
        this.finish=false
        this.answers=this.options.querySelectorAll(".option"); 
        let wrong;
        if(localStorage.getItem('wrong')){
            wrong=parseInt(localStorage.getItem("wrong"))
        }
        else{
            wrong=0;
        }
        let sc 
        if (localStorage.getItem('sc')){
            sc = parseInt(localStorage.getItem('sc'))
        }else {
            sc = 0;
        }
        this.answers.forEach(answer => { 
        let z = answer.innerHTML;
        let y =this.currentQuestion.options.length ;
        let testi= this.currentQuestion.correctAnswer;
        let testinospace=testi.split(" ").join("");
        answer.addEventListener('click',function(){    
        
            answer.classList.add("hover")
            // let optionDisable=this.currentQuestion.options;
            
            // let disable = document.querySelector('[data-option="'+optionDisable+'"]');

            
            console.log("ho");
            // let y=testi.innerHTML;
            // console.log(testi+ "test");
            // j = parse int( get data question number)
            if (z==testi){
                answer.style.backgroundColor = "green";
                sc += 1;
                localStorage.setItem('sc',sc)
                        // this.answers.classList.add("disableop") ;
            }
            else{
                wrong+=1;
                localStorage.setItem('wrong',wrong);
                answer.style.backgroundColor="red";
             
                let r = document.querySelector('[data-option="'+testinospace+'"]');
                r.classList.add("green");
            }
    
        }
        ) 
        localStorage.setItem('sc',sc)
        this.scoreQuiz=sc;
        console.log(this.scoreQuiz + "this.scoreQuiz")
        console.log(sc + "sc")
        this.quizScore.innerHTML= sc;
        // this.wrongAnswers=wrong;
    })  
    }
    start(){
        this.QuizQuestion();
        this.QuestionFunction();
    }
    resultSc(){
          this.totalQuestion.innerHTML=quiz.length;
          this.wrongAnswers=parseInt(localStorage.getItem("wrong"));
          this.scoreQuiz=parseInt(localStorage.getItem('sc'));
          console.log(this.wrongAnswers)
          this.correct.innerHTML=this.scoreQuiz;
          this.wrongAn.innerHTML=this.wrongAnswers;
          let score= (this.scoreQuiz / quiz.length) *100
         
          this.finalScore.innerHTML=("Your Score is : " + score + "%")
    }
    // reset(){
    //     this.resultScore.classList.remove("show");
    //     let resetQuiz=document.querySelector(".Start_Page");
    //     resetQuiz.classList.add("show");
    //     this.start();
    // }
}




let test= new QuizGame();
test.start();
let btnNext=document.querySelector(".btn_next");
let btnStart=document.querySelector(".start_button");
let btnReset=document.querySelector(".reset");
// let resultQuiz=document.querySelector(".result");

btnNext.addEventListener("click", function(){
    test.nextQuestion();
})
btnStart.addEventListener('click', () =>{
    test.quizStart.classList.add("show");
    test.startQuiz.classList.add("hideStart");
    test.startQuiz.classList.remove("show");
    localStorage.setItem("sc", "0");
    localStorage.setItem("wrong", "0");
  });
// let sel =test.currentQuestion.options
// console.log(sel + "gg");
test.options.addEventListener("mouseenter", function(){
test.select();
test.resultSc();
})
btnReset.addEventListener('click', () =>{
    test.resultScore.classList.remove("show");
    test.startQuiz.classList.add("show");
    localStorage.setItem("sc", "0");
    localStorage.setItem("wrong", "0");
    test.questionCounter=0
    test.start();
})

// if (this.finish=false){
//     test.resultSc();
// }

