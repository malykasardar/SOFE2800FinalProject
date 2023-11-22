window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height =  450;
 
/////////////////////////////////////////////////////////////////
    let gameSpeed = 4;
    let gameFrame = 0;

    const backgroundLayer1 = new Image();
    backgroundLayer1.src = 'backgroundLayers/layer-1.png';
    const backgroundLayer2 = new Image();
    backgroundLayer2.src = 'backgroundLayers/layer-2.png';
    const backgroundLayer3 = new Image();
    backgroundLayer3.src = 'backgroundLayers/layer-3.png';
    const backgroundLayer4 = new Image();
    backgroundLayer4.src = 'backgroundLayers/layer-4.png';
    const backgroundLayer5 = new Image();
    backgroundLayer5.src = 'backgroundLayers/layer-5.png';
    //const slider = document.getElementById('slider');
    //slider.value= gameSpeed;
   // const showGameSpeed = document.getElementById('showGameSpeed');
    //showGameSpeed.innerHTML = gameSpeed;
   /* slider.addEventListener('change', function(e){
        gameSpeed=e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });*/


    class Layer {
        constructor(image, speedModifier){
            this.x=0;
            this.y=0;
            this.width=canvas.width;
            this.height=canvas.height;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update(){
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = (this.x - this.speed);
            
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    
        }
    }
    
    const layer1 = new Layer(backgroundLayer1,0.2);
    const layer2 = new Layer(backgroundLayer2,0.4);
    const layer3 = new Layer(backgroundLayer3,0.6);
    const layer4 = new Layer(backgroundLayer4,0.8);
    const layer5 = new Layer(backgroundLayer5,1);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5];

///////////////////////////////////////////////////////////////////

    class Background{

    }

    class UI{

    }
    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            
            this.input = new InputHandler(this);
            this.tilemap = new Tilemap(this);
            this.player = new Player(this);  //creating Game obj also creates Player obj with Game obj as arg
            this.keys = [];                  //tracks keys that are pressed down
            this.allPlatforms = [];         //tracks all platform objects created for collision logic
            this.jumpTimer = 0;
        }
        update(){
      
            
           // console.log(this.allPlatforms.length);
            
            this.allPlatforms.forEach(platform => {
                if(this.checkCollision(this.player,platform))
                {   
                    let direction = this.checkCollisionDirection(this.player,platform)
                    console.log("Collision detected: " + direction);
                   
                }
                
                
                
            });
            this.player.update();
            console.log(this.player.xTileCoord + "," + this.player.yTileCoord);
            this.tilemap.update();
            //console.log(this.player.jumpHeight + "IsonGround:" + this.player.isOnGround);
        }
        draw(context){
          
            this.player.draw(context);
            this.tilemap.draw(context);
        }
        checkCollision(entity1,entity2){
                return (((entity1.xpos+entity1.width)>=entity2.xpos && entity1.xpos<=(entity2.xpos + entity2.width))
                    && ((entity1.ypos+entity1.height)>=entity2.ypos && entity1.ypos<=(entity2.ypos + entity2.height)))
        }

    
        checkCollisionDirection(entity1,entity2){
            
            if (entity2.yTileCoord - entity1.yTileCoord == 1 
                && (entity1.xpos + entity1.width > entity2.xpos 
                    && entity1.xpos < entity2.xpos + entity2.width))
            {
                entity1.vy = 0;
                entity1.ypos = entity2.ypos - entity1.height;
                entity1.isOnGround = true;
                return entity1.isOnGround;
            }else if (entity2.yTileCoord - entity1.yTileCoord == 1
                && (entity1.xpos + entity1.width > entity2.xpos 
                    && entity1.xpos < entity2.xpos + entity2.width)
                    )
            {   
                entity1.ypos = entity2.ypos - entity2.height;
                return "bottomSide";
            }
            
            else if (entity1.xTileCoord - entity2.xTileCoord == 0
                && (entity1.ypos + entity1.height > entity2.ypos 
                    && entity2.ypos < entity2.ypos + entity2.height)
                    && entity1.isOnGround)   
            //0 because collision happens when entity1 is inside entity2
            //therefore, because of Math.floor(), entity1.xTileCoord = entity2.xTileCoord when colliding
            {
                entity1.vx = 0;
                entity1.xpos = entity2.xpos + entity2.width;
                return "rightSide with tile " + entity2.xTileCoord + "," + entity2.yTileCoord;
            }
            else if (entity2.xTileCoord - entity1.xTileCoord == 1
                && (entity1.xpos + entity1.width > entity2.xpos 
                    && entity1.xpos < entity2.xpos + entity2.width)
                    && entity1.isOnGround)
            {
                entity1.vx = 0;
                entity1.xpos = entity2.xpos - entity1.width;
                
                return "leftSide with tile "  + entity2.xTileCoord + "," + entity2.yTileCoord;
            }
            else entity1.isOnGround = false;
    
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let prevTime = 0;
    function animate(currTime){
        const deltaTime = currTime- prevTime;
        this.jumpTimer += deltaTime;
        //console.log(deltaTime);
        lastTime = currTime;
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        gameObjects.forEach(object => {
                object.update();
                object.draw(ctx);
            });
        game.update();
        game.draw(ctx);   //call Game draw to draw objects
        requestAnimationFrame(animate) //tell browser to execute arg before next repaint
    }
    animate(0);
});
