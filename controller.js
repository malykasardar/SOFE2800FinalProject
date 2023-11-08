addEventListener("keydown",function (e) {

    keyPressed = e.code;
    console.log(keyPressed + "pressed");
    if(keyPressed === 'KeyD'){player.vx = 10};
    if(keyPressed === 'KeyA' ){player.vx = -10};
    //if(keyPressed === 'KeyW' ){player.vy = -5};
    //if(keyPressed === 'KeyS' ){player.vy = 5};
    if(keyPressed === 'Space' && checkOnGround(player)){
        console.log("JUMP");

        player.vy -= 20;    
        this.setTimeout(function(){player.vy += gravity}, 400);   //execute function after 250ms
       

    };
    //console.log("Coordinates:" + player.xpos + "and" + player.ypos);

})
addEventListener("keyup",function (e) {

    keyPressed = e.code;
    console.log(keyPressed + "removed");
    if(keyPressed === 'KeyD'){player.vx = 0};
    if(keyPressed === 'KeyA'){player.vx = 0};
    if(keyPressed === 'KeyW'){player.vy = 0};
    if(keyPressed === 'KeyS'){player.vy = 0};

})