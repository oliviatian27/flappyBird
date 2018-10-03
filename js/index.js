
document.addEventListener("DOMContentLoaded",()=>{
    const jsWrapBg = document.getElementById("wrapBg");
    const jsHeadTitle = document.getElementById("headTitle");// get the title

    let blockDistance = baseObj.randomNum(120,350);
    let birdSpeed
    const jsScore = document.getElementById("score");
    const jsNum1 = document.getElementById("num1");
    const jsNum2 = document.getElementById("num2");
    const jsNum3 = document.getElementById("num3");
    let score = 0;

    const jsGameOver = document.getElementById("gameOver");
    const jsOkBtn = document.getElementById("ok");
    let jsStartBtn = document.getElementById("startBtn");

    let bird;
    let blockTimer;
    let headWaveRatio = 3;//set the ratio of how the headtitle swings
    let headWaveTimer = setInterval(headWave,200); //set the interval to swing the headtitle
    function headWave() {
      headWaveRatio *= -1;
      jsHeadTitle.style.top = jsHeadTitle.offsetTop + headWaveRatio + "px";
    }

    let jsGrassLand1 = document.getElementById("grassLand1"); //get the first grassland
    let jsGrassLand2 = document.getElementById("grassLand2"); //get the second grassland

    let landTimer = setInterval(landRun,30);
    function landRun() {
      if (jsGrassLand1.offsetLeft <= -343) {
        jsGrassLand1.style.left = "343px";
      }
      if (jsGrassLand2.offsetLeft <= -343) {
        jsGrassLand2.style.left = "343px";
      }
      jsGrassLand1.style.left = jsGrassLand1.offsetLeft - 3 + "px";
      jsGrassLand2.style.left = jsGrassLand2.offsetLeft - 3 + "px";//set interval for grassland

      if (allBlocks.length) {
        for (let i = 0; i < allBlocks.length; i++) {
          allBlocks[i].moveBlock();
          let x =baseObj.rectangleCrashExamine(allBlocks[i].downDivWrap, bird.div);
          let y = baseObj.rectangleCrashExamine(allBlocks[i].upDivWrap, bird.div);
          let z = bird.div.offsetTop >= 390;
          if (x || y || z) {
            window.clearInterval(landTimer);//clear the interval for land
            window.clearInterval(blockTimer)
            jsWrapBg.removeEventListener('click',birdSpeed)

            jsScore.style.display = "none"; //hide the score
            jsGameOver.style.display = "block"; // display gameover
          }
        }
      }//set interval to move all the blocks
    }

    jsStartBtn.addEventListener('click',e=>{
      jsHeadTitle.style.display = "none"; //hide the title
      jsStartBtn.style.display = "none"; //hide the select button

      bird=new Bird(jsWrapBg);
      bird.flyBird(); //controll the bird fall speed make it drop

      birdSpeed=function(){
        bird.fallSpeed = -8;
      }
      jsWrapBg.addEventListener('click',birdSpeed)

      let b = new Block(jsWrapBg);
      jsNum1.style.display = "block";
      b.moveBlock()

      blockTimer=setInterval(generateBlock,2000)
      function generateBlock(){
        let b = new Block(jsWrapBg);

      }// create new block every 2 seconds

    })
      jsOkBtn.addEventListener('click',e=>{
        window.location.href = "index.html"
      })// restart the game


})
