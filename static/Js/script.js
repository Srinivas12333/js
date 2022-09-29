//challenge 1
function ageInDays() {
    let birthYear = prompt('what year were you born....Good Friend?');
    let ageInDayss = (2022 - birthYear) *365
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//challenge 2

function generateCat(){
    let img = document.createElement('img');
    let div = document.getElementById('flex-cat-gen')
    img.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(img)
}

//challenge 3
function rpsGame(yourChoice) {
    console.log(yourChoice)
    let humanChoice,botChoice; 
    humanChoice = yourChoice.id

    botChoice = numberToChoice(randToRpsInt());
    console.log('computer choice:',botChoice);

    results = decideWinner(humanChoice,botChoice);
    console.log(results);

    message = finalMessage(results) //you won!
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message)
} 
function randToRpsInt() {
    return Math.floor(Math.random() * 3)
}
function numberToChoice(number) {
    return ['rock','paper','scissors'] [number];
}
function decideWinner(yourChoice,computerChoice) {
    let rpsDatabase = {
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    };
    let yourScore =rpsDatabase[yourChoice][computerChoice];
    let computerScore =rpsDatabase[computerChoice][yourChoice];
    return [yourScore,computerScore]

}//[1,0] you won
//[0.5,0.5] you tired
//[0,1] you lost

function finalMessage([yourScore,computerScore]) {
    if(yourScore === 0){
        return{'message':'You lost!','color':'red'};
    }else if(yourScore === 0.5){
        return {'message':'You tired!','color':'yellow'}; 
    }else{
        return{'message':'You won!','color':'green'}
    }
}
function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    let imagesDatabase = {
     'rock':document.getElementById('rock').src,
     'paper':document.getElementById('paper').src,
     'scissors':document.getElementById('scissors').src
    }
    //lets remove the all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML= "<img src='" + imagesDatabase[humanImageChoice] +"'height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>"
    botDiv.innerHTML= "<img src='" + imagesDatabase[botImageChoice] +"'height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>"
    messageDiv.innerHTML ="<h1 style = 'color:" + finalMessage['color']+"; font-size:60px;padding:30px;'>"+finalMessage['message']+"</h1>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

//challenge 4

let all_buttons = document.getElementsByTagName('button');

let copyAllButtons = [];
for(let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThinky) {
    if(buttonThinky.value === 'red'){
        buttonsRed();
    }else if(buttonThinky.value === 'green') {
        buttonsGreen();
    }else if(buttonThinky.value === 'reset'){
        buttonColorReset();
    }else if(buttonThinky.value === 'random'){
        randomColors();
    }
}

function buttonsRed() {
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen() {
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonColorReset(){
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    let choices = ['btn-primary','btn-danger','btn-success','btn-warning']

    for(let i=0; i < all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]); 
    }
}

//challenge 5

let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,10]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,

};
const YOU = blackjackGame['you']   
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/Sounds/swish.m4a');
const winSound = new Audio('static/Sounds/cash.mp3');
const lossSound = new Audio('static/Sounds/aww.mp3');


 //start
 document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
 document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
     
 document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal)

 function blackjackHit() {
    if (blackjackGame['isStand'] === false) {

    
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    console.log(YOU['score']);
   }
   
 }
  function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
   }

  function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21) {
      let cardImage =document.createElement('img');
      cardImage.src=`static/Images/images/${card}.png`;
      document.querySelector(activePlayer['div']).appendChild(cardImage);
      hitSound.play();
   }
  }
  function blackjackDeal() { 
    if(blackjackGame['turnsOver'] === true) {
    
        blackjackGame['isStand'] = false;
  let yourImages = document.querySelector('#your-box').querySelectorAll('img')
  let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

  for(let i=0; i<yourImages.length;i++){
  yourImages[i].remove();
  }

  for(let i=0; i<dealerImages.length;i++){
    dealerImages[i].remove();   
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0; 

    document.querySelector('#your-blackjack-result').style.color ='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color ='#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';
    
    blackjackGame['turnsOver'] = true;
    
   }
   
}
 
 function updateScore(card,activePlayer) {
    //if adding 11 keeps me below 21,add 11.otherwise add 1.
    if(card === 'A'){
    if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
        activePlayer['score'] +=blackjackGame['cardsMap'][card][1];
      }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
      }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];

    }
 }
   
 function showScore(activePlayer) {  
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']

    }
 }

 function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
 }
 
  async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
   
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
      showResult(winner); 
 }
 //compute winner and return who just won
 // update the wins,draws and losses
 function computeWinner() { 
    let winner;
    if(YOU['score'] <=21){
        //condition:higher score than dealer or when dealer busts but you're 21 
       if(['score'] > DEALER ['score'] ||(DEALER['score'] > 21)) {
        blackjackGame['wins']++;
        winner = YOU;

       }else if (YOU['score'] < DEALER['score']){     
        blackjackGame['losses']++;
        winner = DEALER;

       }else if(YOU['score'] === DEALER['score']){
        blackjackGame['draws']++;
       }
       //condition:when user busts but dealer doesn't
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

        //condition:when you and dealer busts
    }else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log(blackjackGame)    
    return winner;
 }

 function showResult(winner){
     let message,messageColor;

    if (blackjackGame['turnsOver'] === true) { 

     if(winner === YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();

     }else if(winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];

        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();
        
     }else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];

        message = 'You drew!';
        messageColor = 'black'
     }
     document.querySelector('#blackjack-result').textContent = message;
     document.querySelector('#blackjack-result').style.color = messageColor;
    }
 }

 
 