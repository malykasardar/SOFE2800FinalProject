console.log("main.js loaded")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
var gravity = 50;
/*
const player = {
    wd:100,
    ht:100,
    xpos: 0,
    ypos: canvas.height - 100,
    vx: 0,
    vy: 0
}
*/
const platform = {
    wd:100,
    ht:100,
    xpos:0,
    ypos:0,
}



function render(object){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(object.x,object.y,object.wd,object.ht);  //origin of rect is top-left corner
}



function updatePlayer(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    playerMovement(player);
    checkBounds(player); 
    checkOnGround(player);
    ctx.fillRect(player.xpos,player.ypos,player.wd,player.ht);  
  
    requestAnimationFrame(updatePlayer);

}

function playerMovement(player){
    player.xpos += player.vx;
    player.ypos += player.vy;
}

function checkBounds(player){

    if(player.xpos > (canvas.width - player.wd))
    {
        player.vx=0;
        player.xpos = canvas.width - player.wd;
        console.log("Outside of right border")
        
        return true;
    }
    if(player.xpos  < 0){
        player.vx=0;
        player.xpos = 0;
        console.log("Outside of left border")
        
        return true;
    }
    if(player.ypos > (canvas.height - player.ht)){
        player.vy=0;
        player.ypos = canvas.height - player.ht;
        console.log("Outside of bottom border");
        return true;
    }
    if(player.ypos < 0){
        player.vy=0;
        player.ypos = 0;
        console.log("Outside of top border");
        return true;
    }


    return false;
}



function checkOnGround(player){
    if (player.ypos  == canvas.height - player.ht){
        console.log("on ground");
        return true;
    }
    
    return false;
}


updatePlayer();
   




