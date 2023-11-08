addEventListener("keydown", function(e){

    keypressed = e.code;

    console.log(keypressed + "Pressed");
    if(keypressed =='keyD') vxr=5;
    if(keypressed =='keyA') vxl=-5;
    if(keypressed =='keyS') vyU=5;
    if(keypressed =='keyW') vxD=-5;

})

addEventListener("keyup", function(e){
    console.log(e.code)
    if(e.code =='keyD') vxr=0;
    if(e.code =='keyA') vxl=0;
    if(e.code =='keyS') vyU=0;
    if(e.code =='keyW') vyD=0;

})

