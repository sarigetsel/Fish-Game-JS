
const fish = document.getElementById("fish-cursor");
let lastX = 0; // שומר את המיקום האחרון של העכבר
let score=0;
let mediumScore=0;
let bigScore=0;
let littleFishes = [];
let mediumFishes=[];
let bigFishes=[];
let live=4;
let setinter;
let setinter2;
let setinter3;
let t;
let most = localStorage.getItem("most");
if (most === null) {
  most = 0;
  localStorage.setItem("most", JSON.stringify(most));
} else {
  most = JSON.parse(most);
}
// לרקעים
let savedSrc = JSON.parse(localStorage.getItem("src"));
if(savedSrc){
  document.getElementById("backGround").src=savedSrc;
}

const music = new Audio("music/track1.wav"); 
music.loop = true;

document.getElementById("startMusicBtn").addEventListener("click", function() {
  music.play()
  document.getElementById("startMusicBtn").style.display = "none";
    
});



// בכל תזוזה של העכבר
document.addEventListener("mousemove", function(e) {
  // מזיזים את הדג למיקום של העכבר
  fish.style.left = (e.pageX - 40) + "px";
  fish.style.top = (e.pageY - 40) + "px";

  // אם העכבר זז ימינה → הפנים של הדג לצד ימין (scaleX(1))
  if (e.pageX > lastX) {
    fish.style.transform = "scaleX(-1)";
  }

  // אם העכבר זז שמאלה → הפנים של הדג לצד שמאל (scaleX(-1))
  else if (e.pageX < lastX) {
    fish.style.transform = "scaleX(1)";
  }

  // עדכון מיקום אחרון
  lastX = e.pageX;

  littleFishFunction();

  if (score <= 40) {
    fish.style.width = "6vw"; 
}
  if(score>40){
    fish.style.width="10vw";
    mediumFishFunction();
    
  }
  if(score>120){
    fish.style.width="16vw";
    bigFishesFunction();
  }
  if(score > 160){
    document.getElementById("timerP").innerText="";
    clearInterval(setinter3)
    let y = document.getElementById("win");
    y.style.display = "block";
    y.style.width = "85vw";
    y.style.top = "0.1vh";

    y.style.left = "8vw";
   
    clearInterval(setinter);
    clearInterval(setinter2);
    document.body.style.cursor="default";
    document.getElementById("fish-cursor").style.display = "none";
   
   
    document.getElementById("playAgain").style.display = "block";
    document.getElementById("back").style.display = "block";
    diverBlock();

    document.getElementById("playAgain").addEventListener("click", startFish);
    document.getElementById("back").addEventListener("click", function() {
    window.location.href = "homepage.html";
      
    });
  }
  if(score>most){
    most=score;
    localStorage.setItem("most", JSON.stringify(most));
    
  }
});
  
// מאפסת את המשחק
function resetGame() {
  score = 0;
  mediumScore = 0;
  bigScore = 0;
  live = 4;

  littleFishes = [];
  mediumFishes = [];
  bigFishes = [];

  document.getElementById("generalScore").innerHTML = "0";
  document.getElementById("littleScore").innerHTML = "0";
  document.getElementById("mediumScore").innerHTML = "0";
  document.getElementById("bigScore").innerHTML = "0";
  document.getElementById("live").innerHTML = "4X";

  // מסיר את כל הדגים מהדיבים
  document.getElementById("littleDiv").innerHTML = "";
  document.getElementById("mediumDiv").innerHTML = "";
  document.getElementById("bigDiv").innerHTML = "";

  // מחזיר את הדג ואת הסמן
  document.getElementById("fish-cursor").style.display = "block";
  document.body.classList.add("hide-cursor");
 

  // מסתיר מסכים
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
  document.getElementById("faild").style.display="none";
}
let level = parseInt(localStorage.getItem("currentLevel"), 10);
const levelImg = document.getElementById("levelImg");//התמונה של הדגים למעלה
levelImg.src = `pic/level${level}.png`;

function startFish()
{
    
      resetGame();
      setinter=setInterval(swiming,280);
     if(level===3){
      setinter2=setInterval(bomb,3500);
      t=81;
      let x=document.getElementById("timerP");
      x.style.fontSize="2vw";
      x.style.top="0vh";
      x.style.left="77vw";
      setinter3=setInterval(timerDown,1000);
     }
     document.getElementById("back").style.display="none";
     document.getElementById("win").style.display="none";
     document.getElementById("playAgain").style.display="none";
}

// שחיית דגים 
function swiming()
{
  // שירנדם איזה גודל של דג יכנס
  let randomSize=Math.floor(Math.random()*20);
  let little,medium,big;

   //בשביל התדירות
   if(randomSize==19 || (level==2 &&(randomSize===1)))

    {
    big=document.createElement("img");
   
    if(level===2){
      big.src="pic/f14.png";
      
    }
    else if(level===3){
      big.src="pic/f17.png";
    }
    else if(level===1){
      big.src="pic/big.png";
    }
    
    big.classList.add("classBig");
   }
   
   else if(randomSize==18 || randomSize==17){
    medium=document.createElement("img");
    if(level===2){
      medium.src="pic/f12.png";
      
    }
    else if(level===3){
      medium.src="pic/f3.png";
      
    }
    else if(level===1){
      medium.src="pic/medium.png";
     
    }
   
    medium.classList.add("classMedium");
   }
  else 
  {
    little=document.createElement("img");
    if(randomSize==16 || randomSize==15){
      if(level===1)
      {
        little.setAttribute("src","pic/littleUpsize.png");
        little.classList.add("classLittle2");
      }
      
   }        
   else{// הדג הקטן מהצד השני

   if(level===2){
    little.src="pic/f1.png";
    
  }
  else if(level===3){
    little.src="pic/f4.png";
    
  }
  else if(level===1){
    little.src="pic/f2.png";
  }
   }
  little.classList.add("classLittle");
  }
  // מרנדם את הגובה שלהם
  if(little){
    let lrandHight=Math.floor(Math.random()*95);
     little.style.top=lrandHight+"%";
     document.getElementById("littleDiv").appendChild(little);
     littleFishes.push(little);
  }
    if(medium){
    let mrandHight=Math.floor(Math.random()*85);
     medium.style.top=mrandHight+"%";
     document.getElementById("mediumDiv").appendChild(medium);
     mediumFishes.push(medium);
    } 
     
     if(big){
       let brandHight=Math.floor(Math.random()*75);
       big.style.top=brandHight+"%";
       document.getElementById("bigDiv").appendChild(big);
       bigFishes.push(big);
     }
     checkBombCollisions();
}

// בודקת אם 2 דגים נפגשים ביחד
function isCollding(f1,f2)
{
  const ff1 = f1.getBoundingClientRect();
  const ff2 = f2.getBoundingClientRect(); 
  return!(
      ff1.right < ff2.left ||
      ff1.left > ff2.right ||
      ff1.bottom < ff2.top ||
      ff2.bottom < ff1.top
  );
}
function updateLivesDisplay(){
  document.getElementById("live").innerHTML=live+"X";
 
}
function gameOver(){
  clearInterval(setinter);
  clearInterval(setinter3);
  document.getElementById("gameOver").style.display="block";
  document.getElementById("playAgain").style.display = "block";
  document.getElementById("back").style.display = "block";
  document.body.classList.remove("hide-cursor");
  document.getElementById("fish-cursor").style.display = "none";

  document.getElementById("playAgain").addEventListener("click",startFish);
  document.getElementById("back").addEventListener("click",function(){
    window.location.href = "homePage.html";
  });
}


function littleFishFunction(){

for (let i = 0; i < littleFishes.length; i++) {
  // אוכל דגים קטנים ממנו 
  
      if(isCollding(fish,littleFishes[i]))
     {
       littleFishes[i].remove();
       littleFishes.splice(i,1);// מסיר מהמערך
       score+=1;
       document.getElementById("generalScore").innerHTML=score;
       document.getElementById("littleScore").innerHTML=score;
    
       break;
    }
}

for (let j = 0; j < mediumFishes.length; j++) {
  // דגים גדולים ממנו אוכלים אותו 
  if(score<=40){

  if(isCollding(mediumFishes[j],fish)){
    fish.style.display="none";
    live--;
   if(live<=0){
      gameOver();
   }
   else{
    updateLivesDisplay();
   }
    score-=10;
    if(score<=0){
      score=0;
    }
    document.getElementById("generalScore").innerHTML=score;
    document.getElementById("faild").style.display = "block";
   setTimeout(()=>{
    fish.style.display="block";
    document.getElementById("faild").style.display = "none";
   },5000)
  }
  }
}

if(score<=120){
 
for (let j = 0; j < bigFishes.length; j++) {
  // דגים גדולים ממנו אוכלים אותו 
  if(isCollding(bigFishes[j],fish)){
  
    fish.style.display="none";
    live--;
    if(live<=0){
      gameOver();
   }
   else{
    updateLivesDisplay();
   }
    score-=10;
    if(score<0){
      score=0;
    }
    document.getElementById("generalScore").innerHTML=score;
    document.getElementById("faild").style.display = "block";
   setTimeout(()=>{
    fish.style.display="block";
    document.getElementById("faild").style.display = "none";
   },5000)
  }
}
}
}


function mediumFishFunction(){
  littleFishFunction();
  for (let j = 0; j < mediumFishes.length; j++) {
      if(isCollding(fish,mediumFishes[j]) ){
        mediumFishes[j].remove();
        mediumFishes.splice(j,1);// מסיר מהמערך
        score+=3;
        mediumScore+=1;
        document.getElementById("generalScore").innerHTML=score;
        document.getElementById("mediumScore").innerHTML=mediumScore;
       
        break;
       }
    
  }

}
function bigFishesFunction(){
  mediumFishFunction();
  for (let j = 0; j < bigFishes.length; j++) {
    if(isCollding(fish,bigFishes[j])){
      bigFishes[j].remove();
      bigFishes.splice(j,1);// מסיר מהמערך
      score+=6;
      bigScore+=1;
      document.getElementById("generalScore").innerHTML=score;
      document.getElementById("bigScore").innerHTML=bigScore;
     
      break;
     }
  
}
}
function bomb(){
    let randLocation=Math.floor(Math.random()*95);
    let bombb=document.createElement("img");
    bombb.src="pic/bomb.png";
    bombb.classList.add("bombImg");
    bombb.style.left=randLocation+"%";
    document.getElementById("bombDiv").appendChild(bombb);
    
}
function checkBombCollisions() {
  let bombs = document.querySelectorAll("#bombDiv .bombImg");
  bombs.forEach(bombb => {
    if (isCollding(fish, bombb))
       {
      bombb.src = "pic/afterBomb.png";
      bombb.style.width="10vw";
      bombb.style.opacity=0.02;
      bombb.style.animationPlayState = "paused";
      fish.style.display = "none";
      setTimeout(() => {
        bombb.remove(); 
      }, 1500);
      live--;
      if (live <= 0) {
        gameOver();
      } else {
        updateLivesDisplay();
        setTimeout(() => {
          fish.style.display = "block";
        }, 3000);
      }
    }
  });
}

// הצוללן בסוף
function diverBlock() {
  console.log("function")
  const diver = document.getElementById("diver");
  const coins = document.getElementById("coins");

  diver.style.display = "block";
  coins.style.display = "block";

  diver.classList.remove("animate");
  coins.classList.remove("animate");

  // רענון מחזור הרינדור כדי שהאנימציה תתחיל מחדש
  void diver.offsetWidth; 
  void coins.offsetWidth;

  diver.classList.add("animate");

  setTimeout(() => {
    coins.classList.add("animate");
  }, 500);
}
function timerDown(){
  console.log("timer")
  t--;
  document.getElementById("timerP").innerText=t;
  if(!t){
     clearInterval(setinter3);
     document.getElementById("timerP").innerText="Oops! Out of Time! ⌛";
     document.getElementById("timerP").style.fontSize="4.5vw"
     document.getElementById("timerP").style.top="30vh"
     document.getElementById("timerP").style.left="30vw"
     gameOver();
  }
}




