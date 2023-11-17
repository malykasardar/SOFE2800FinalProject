
class Player {
    constructor(game){
        this.game = game;                           //Player obj refers to Game obj
        this.width = this.game.width/16;            
        this.height = this.game.width/16;
        this.xpos = 250;
        this.ypos = canvas.height - 150;
        this.vx = 0;
        this.vy = 0;
        this.maxSpeed = 10;
        this.xTileCoord = Math.floor(this.xpos/this.game.tilemap.tilesize);
        this.yTileCoord = Math.floor(this.ypos/this.game.tilemap.tilesize);
        this.isOnGround = true;
        this.isColliding = false;
    }
    update(){
        if(this.game.keys.includes('d') && !this.isColliding){
            this.vx = this.maxSpeed
        }
        else if(this.game.keys.includes('a') && !this.isColliding){
            this.vx = -this.maxSpeed
        } 
        else if(this.game.keys.includes('w') && this.isOnGround){
        this.vy=-20;
        
        this.isOnGround = false;
        this.isJumping();
        

        }else this.vx = 0

        

        if(!this.isOnGround) setTimeout(this.isFalling(),3000);

        this.xpos += this.vx;
    

        this.xTileCoord = Math.floor(this.xpos/this.game.tilemap.tilesize);
        this.yTileCoord = Math.floor(this.ypos/this.game.tilemap.tilesize);
        

    }
    draw(context){
        
        context.fillRect(this.xpos,this.ypos,this.width,this.height);
    }
    isJumping(){
        this.ypos += this.vy
    }
    isFalling(){
        this.vy = 0;
        this.xpos += this.vy;
    }
    checkCollision(bool){
        if (bool = true){this.isColliding = true;}
        else this.isColliding = false;
    }
}
/*

class MovingPlatform extends Platform {

    constructor(xpos,ypos,width,height){
        super(xpos,ypos,width,height);

        this.vx = 0;
        this.vy = 0;
    }

    
}*/


class Platform {
    constructor(xpos,ypos,width,height){ 
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.xTileCoord = Math.floor(this.xpos/50);
        this.yTileCoord = Math.floor(this.ypos/50);
    }
    draw(context){
        context.fillRect(this.xpos,this.ypos,this.width,this.height)
    }
    isColliding(){
        console.log(this.xTileCoord + "," + this.yTileCoord);
    }

}

class Tilemap {

    //one Platform object draws tile and changes position every iteration in for loop
    //when animation frame is done, Platform xpos and ypos are reset for for-loop in next frame
    constructor(game){
        this.game = game;
        this.platform = new Platform();
        this.rows = 9;
        this.cols = 16;
        this.tilesize = this.game.width/16;
        this.platform.width = this.tilesize;
        this.platform.height = this.tilesize;
        this.tilemap = [
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
                        1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                        ]; 
    
    }
       
    getTileValue(row,col){
        return this.tilemap[row*this.cols + col]
    }
    draw(context){
        for (let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    if ( this.getTileValue(i,j) === 1){
                    this.platform = new Platform(this.tilesize*j, this.tilesize*i,this.tilesize,this.tilesize);
                    this.game.allPlatforms.push(this.platform);
                    this.platform.draw(context);
                }
            }
        }
       
    }
    update(){
        this.game.allPlatforms = [];
    }
}

