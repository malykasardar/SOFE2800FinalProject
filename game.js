class Entity{
    constructor(game, xpos, ypos, width, height, image){
        this.game = game; 
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;           
        this.height = height;
        this.image = image;   
        this.vx = 0;
        this.vy = 0;
        this.xTileCoord = Math.floor(this.xpos/37.5);
        this.yTileCoord = Math.floor(this.ypos/37.5);
    }
}
class Player extends Entity{
    constructor(game, xpos,ypos, width, height, image){
        super(game, xpos, ypos, width, height, image);
        this.ox = 0;
        this.oy = 0;
        this.maxSpeed = 10;
        this.jumpHeight = 0;
        this.isJumping = null;
        this.isOnGround = null;
        this.isColliding = false;
        this.isOnMovingPlatform = null;
        this.spawnCoord = {x:this.xpos,y:this.ypos}
    }
    respawn(){
        this.xpos = this.spawnCoord.x;
        this.ypos = this.spawnCoord.y;
        this.vx = 0;
        this.vy = 0;
        this.game.keys = [];
        this.jumpHeight = 0;
        this.isJumping = false;
        this.isOnGround = true; 
        this.isOnMovingPlatform = false;
    }
    update(){
        if(this.game.keys.includes('d') && !this.isColliding){
            if(this.vx < this.maxSpeed){this.vx += 6;}
        }
        else if(this.game.keys.includes('a') && !this.isColliding){
            if(this.vx > -this.maxSpeed){this.vx -=6;}
        } 
        else if(this.game.keys.includes('w') && this.isOnGround){
            this.isOnGround = false;
            this.isJumping = true;
            this.vy-=25;
        }else if(!this.isOnMovingPlatform) this.vx = 0;
        this.ox = this.xpos;
        this.oy = this.ypos;
        this.vx*=.9;
        this.xpos += this.vx;
        this.ypos += this.vy;
        console.log("speed: "+this.vy);

        if(!(this.isOnGround && this.isJumping))
        {   
            console.log("FALLING")
            if(this.vy<=this.maxSpeed*1.5)
            {
                this.vy += 3;
            }
        }
  
        this.xTileCoord = Math.floor(this.xpos/this.game.tilemap.tilesize);
        this.yTileCoord = Math.floor(this.ypos/this.game.tilemap.tilesize);
    }
    draw(context){
        context.drawImage(this.image,this.xpos,this.ypos,this.width,this.height);
    }
}
class Platform extends Entity{
    constructor(xpos,ypos,width,height,image){ 
        super(null,xpos,ypos,width,height,image);
    }
    draw(context){
        context.drawImage(this.image,this.xpos,this.ypos,this.width,this.height)
    }
}
class Spike extends Entity{
    constructor(xpos,ypos,width,height,image){ 
        super(null,xpos,ypos,width,height,image);
    }
    draw(context){
        context.drawImage(this.image,this.xpos,this.ypos,this.width,this.height)
    }
}
class Goal extends Entity{
    constructor(xpos,ypos,width,height,image){
        super(null,xpos,ypos,width,height,image);
    }
    draw(context){
        context.drawImage(this.image,this.xpos,this.ypos,this.width,this.height)
    }
}
class MovingPlatform extends Entity{
    constructor(game,xpos,ypos,width,height,image,direction,speed,desiredDistance){
        super(game,xpos,ypos,width,height,image);
        this.ox = 0;
        this.oy = 0;
        this.direction = direction;
        if(this.direction =='X') {this.vx = speed;}
        if(this.direction =='Y') {this.vy = speed;}
        this.distanceTravelled = 0;
        this.desiredDistance = desiredDistance;
    }
    addPlatform(){
        this.game.allMovingPlatforms.push(this);
        this.game.nonPlayerEntities.push(this);
    }
    update(){ 
        this.ox = this.xpos;
        this.oy = this.ypos;
        this.xpos += this.vx; 
        this.ypos += this.vy; 
        this.distanceTravelled += Math.abs(this.vx);
        this.distanceTravelled += Math.abs(this.vy);
        if(this.direction == 'X')
        {
            if(this.distanceTravelled > this.desiredDistance){
                this.vx *= -1;
                this.distanceTravelled = 0;
            } 
        }
        if(this.direction == 'Y')
        {
            if(this.distanceTravelled > this.desiredDistance){
                this.vy *= -1;
                this.distanceTravelled = 0;
            }
        }
    }
    draw(context){
        //context.fillRect(this.xpos,this.ypos,this.width,this.height)
        context.drawImage(this.image,this.xpos,this.ypos,this.width,this.height);
    }
}
class Game{
    constructor(levelConfig){
        this.levelConfig = levelConfig;
        this.width = this.levelConfig.canvas_wd;
        this.height = this.levelConfig.canvas_ht;
        this.tileMapCol = this.levelConfig.tilemapCols;
        this.tileMapRow = this.levelConfig.tilemapRows;
        this.tileSize = this.width/this.tileMapCol;
        this.input = new InputHandler(this);
        this.tilemap = new Tilemap(this,this.levelConfig.tilemap);
        this.background = new Background(this.levelConfig);
        this.player = new Player(this,150,400,37.5,37.5,playerSprite);  //creating Game obj also creates Player obj with Game obj as arg
        this.keys = [];                  //tracks keys that are pressed down
        this.nonPlayerEntities = [];         //tracks all platform objects created for collision logic
        this.allMovingPlatforms = [];
    }
    update(){
        this.background.update();
        this.player.update();
        
        this.allMovingPlatforms.forEach(movingPlatform =>{
            movingPlatform.update();
        });
        this.nonPlayerEntities.forEach( nonPlayerEntity => {
        
            if(this.checkCollision(this.player,nonPlayerEntity))
            {   
                if(nonPlayerEntity instanceof Platform){
                    this.resolveTileMapCollision(this.player,nonPlayerEntity)
                }
                if(nonPlayerEntity instanceof MovingPlatform){
                    this.resolveMovingCollision(this.player,nonPlayerEntity)
                }
                if (nonPlayerEntity instanceof Spike){
                    alert("you died");
                    this.player.respawn();
                }  
                if (nonPlayerEntity instanceof Goal){
                    gameWin();
                }
            } else {
                this.player.isJumping = false;
                this.player.isColliding = false;
            }
        });
    }
    draw(context){
        this.allMovingPlatforms.forEach(movingPlatform =>{
           movingPlatform.draw(context);
        });
        this.background.draw(context);
        this.tilemap.draw(context);
        this.player.draw(context);
    }
    checkCollision(entity1,entity2){
            return (((entity1.xpos+entity1.width)>entity2.xpos && entity1.xpos<(entity2.xpos + entity2.width))
                && ((entity1.ypos+entity1.height)>entity2.ypos && entity1.ypos<(entity2.ypos + entity2.height)))
    }
    resolveMovingCollision(entity1,entity2){
        if (entity1.ypos + entity1.height > entity2.ypos 
            && (entity1.xpos + entity1.width > entity2.xpos 
                && entity1.xpos < entity2.xpos + entity2.width))
        {   
            entity1.vy = 0;
            entity1.ypos = entity2.ypos - entity1.height+2;
            entity1.isOnGround = true;
            entity1.isJumping = false;
            if (!this.keys.includes('a') && !this.keys.includes('d') && !this.keys.includes('w'))
            {
                entity1.isOnMovingPlatform = true;
                entity1.ox = entity1.xpos;
                entity1.vx += entity2.vx - entity1.vx;
            } 
            else entity1.isOnMovingPlatform = false;
        }
    }
    resolveTileMapCollision(entity1,entity2){
        if (entity2.yTileCoord - entity1.yTileCoord == 1 
            && (entity1.xpos + entity1.width > entity2.xpos 
            && entity1.xpos < entity2.xpos + entity2.width))
        {   
            entity1.vy = 0;
            entity1.ypos = entity2.ypos - entity1.height;
            entity1.isJumping = false;
            entity1.isColliding = false;
            entity1.isOnGround = true;
            entity1.isOnMovingPlatform = false
        }
        else if (entity1.yTileCoord - entity2.yTileCoord == 1
                && (entity1.xpos > entity2.xpos 
                && entity1.xpos < entity2.xpos + entity2.width))
        {   
            this.player.isJumping = false;
            entity1.ypos = entity2.ypos + entity2.height+2;
        }
        else if (entity1.xTileCoord - entity2.xTileCoord == 0)   
        {
            entity1.isJumping = false;
            entity1.isColliding = true;
            entity1.vx = 0;
            entity1.xpos = entity2.xpos + entity2.width + 2;
        }
        else if (entity2.xTileCoord - entity1.xTileCoord == 1)
        {
            entity1.isJumping = false;
            entity1.isColliding = true;
            entity1.vx = 0;
            entity1.xpos = entity2.xpos - entity1.width - 2;
        }
    }
}
