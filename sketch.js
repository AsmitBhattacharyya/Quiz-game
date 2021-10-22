var canvas, backgroundImage;

var gameState = 0;
var contestantCount;
var allContestants;
var answer;
var database;

var question, contestant, quiz;


function setup(){
  canvas = createCanvas(850,400);
  database = firebase.database();
  quiz = new Quiz();
  quiz.getState();
  quiz.start();
}


function draw(){
  background("pink");
  if(contestantCount === 2){
    quiz.update(1);
  }
  if(gameState === 1){
    clear();
    quiz.play();
  }
}
addQuestion(){
  var Question = "questions/question" + this.index;
  if(this.index === 1){
    this.positionX = width / 2 - 100;
  }else{
    this.positionX = width/ 2 + 180;
  }
  database.ref(questionIndex).set({
    name: this.name,
    positionX: this.positionX,
    positionY: this.positionY
  });
}

getCount() {
  var questionCountRef = database.ref("questionCount");
  questionCountRef.on("value", data => {
    questionCount = data.val();
  });
}

updateCount(count){
  database.ref("/").uptade({
    questionCount: count
  });
}

handleMousePressed() {
  this.playButton.mousePressed(() => {
    this.InputEvent.hide();
    var message = '
    Hello ${this.input.value()}
    </br>wait for another Question to apper...';
    this.greeting.html(message);
    questionCount +=1;
    question.name = this.input.value();
    question.index = playerCount;
    question.addQuestion();
    question.uptadeCount(questionCount);
  });
}
static getPlayersInfo() {
  var playerInfoRef = database.ref("questions");
  questionInforef.on("value", data =>{
    allquestions = data.val();
  });
}
