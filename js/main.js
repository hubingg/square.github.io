
let downDom=document.getElementById("down");
let rightDom=document.getElementById("right");
let leftDom=document.getElementById("left");
let rotateDom=document.getElementById("rotate");
let stopDom=document.getElementById("stop");
let startDom=document.getElementById("start");
let continueDom=document.getElementById("continue");
downDom.onclick=function(){
    down();
}
leftDom.onclick=function(){
    left();
}
rightDom.onclick=function(){
    right();
}
rotateDom.onclick=function(){
    rotate();
}
stopDom.onclick=function(){
    clearInterval(timer); 
}
startDom.onclick=function(){
    if(timer){
        clearInterval(timer); 
    }
    start();
}
continueDom.onclick=function(){
    timer = setInterval(down,250) 
}