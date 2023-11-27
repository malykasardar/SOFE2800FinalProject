class InputHandler{
    constructor(game){
        this.game = game;     //allows a class to access properties and methods in Game class
        window.addEventListener("keydown",e => {
           
            if((e.key === 'd' || e.key === 'a'|| e.key === 'w') && this.game.keys.indexOf(e.key) === -1){ 
                // -1 == e.key does not exist in Game keys
                this.game.keys.push(e.key);   //add key to Game string[] key
               
            }
            
            console.log(this.game.keys);
        });
        window.addEventListener("keyup",e => {
            if((this.game.keys.indexOf(e.key)) > -1){
                //if key is at index 0
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                //using splice, starting at index of pressed key in Game keys,
                //remove next index ==> pressedKey in keyidx[0], unpressed 
            }
            console.log(this.game.keys);
        });
    }
}