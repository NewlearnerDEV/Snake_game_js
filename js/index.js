//game constants
let inputDir={x:0,y:0};
const foodsound=new Audio('eat_food.wav');
const gameoversound=new Audio('game_over.wav');
const movesound=new Audio('dir_chng.wav');
const mussound=new Audio('snake_bg_music.wav');
let speed=3;let score=0;
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:6,y:7};let hiscoreval;

//game functions
function main(ctime)
{
    window.requestAnimationFrame(main);//console.log(ctime);
    if((ctime-lastPaintTime)/1000< 1/speed)
    {
        return ;
    }
    lastPaintTime=ctime;
    gameEngine();
    mussound.play();
    
}
function isCollide(sarr)
{
    // if you pump into urself
    for(let i=1;i<snakearr.length;i++)
    {
        if(snakearr[i].x===snakearr[0].x&&snakearr[i].y===snakearr[0].y)
        {
            return true;
        }
    }// if u pump into wall
    if(snakearr[0].x>=18||snakearr[0].x<=0 || snakearr[0].y>=18||snakearr[0].y<=0)
    {
            return true;
    }
    
}
function gameEngine()
{
    // part1:updating snake array
    if(isCollide(snakearr)){
        
        mussound.pause();
        gameoversound.play();
        inputDir={x:0,y:0};
        alert("GAME OVER !! PRESS ANY KEY TO PLAY AGAIN");
        snakearr=[{x:13,y:15}];
        mussound.play();
        score=0;
    }

   // if u have eaten food increment score and regenerate the food
   if(snakearr[0].y===food.y&&snakearr[0].x===food.x)
   { foodsound.play();score+=1;
    if(score>hiscoreval)
    {   
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        highScore.innerHTML="HiScore:"+hiscoreval;;
    }
    scoreBox.innerHTML="Score:"+score;
    snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y});
    let a=2;
    b=16;
    food={x:Math.round(a+ (b-a)*Math.random()),y: Math.round(a+ (b-a)*Math.random())}
   }
   //moving the snake
   for(let i=snakearr.length-2;i>=0;i--)
   {
     //const element=array[i];
     snakearr[i+1]={...snakearr[i]};
   }
   snakearr[0].x+=inputDir.x;
   snakearr[0].y+=inputDir.y;









    // part2:render the snake and food
    board.innerHTML="";
    snakearr.forEach((e,index)=>
    {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
}
//logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{   hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    highScore.innerHTML="HiScore:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y: 1}//start the game
    movesound.play();
    switch(e.key)
    {
        case "ArrowUp":
            //console.log(ArrowUp);
            inputDir.x=  0 ;
            inputDir.y=  -1;
            break;

        case "ArrowDown":
            //console.log(ArrowDown);
            inputDir.x=  0 ;
            inputDir.y=  1;
            break;

        case "ArrowLeft":
            //console.log(ArrowLeft);
            inputDir.x=  -1 ;
            inputDir.y=  0;
            break;

        case "ArrowRight":
            //console.log(ArrowRight);
            inputDir.x=  1 ;
            inputDir.y=  0;
            break;
        default:
            break;
    }
});