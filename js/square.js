//初始化，生成网格
let init=()=>{
    for(let i=0;i<24;i++){
        let td=[];
        let tr=document.createElement('tr');
        for(let j=0;j<11;j++){
            let newNode=document.createElement('td');
            newNode.style.top=  (i*20)+"px";
            newNode.style.left=  (j*20)+"px";
            tr.appendChild(newNode);
        }
        document.getElementById("tbl").appendChild(tr);
    }
}
init();
let tbl = document.getElementById("tbl");  
let timer="";  
let nextTbl = document.getElementById("nextTbl");  
//生成网格数据，为二维数组，0表示没有，1表示已下落，2表示当前正在下落
let gameData=[
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];
//随机生成7中形状,把网格想象成坐标，对应的数字表示小方块的位置，x表示垂直方向
function setSquare(){      
    let block = new Array(4);          
    let t = (Math.floor(Math.random()*20)+1)%7;      
    switch(t){    
        case 0:{      
            block[0] = {x:0, y:4};      
            block[1] = {x:1, y:4};      
            block[2] = {x:0, y:5};      
            block[3] = {x:1, y:5};      
            break;      
        }      
        case 1:{      
            block[0] = {x:0, y:3};      
            block[1] = {x:0, y:4};      
            block[2] = {x:0, y:5};      
            block[3] = {x:0, y:6};      
            break;      
        }      
        case 2:{      
            block[0] = {x:0, y:5};      
            block[1] = {x:1, y:4};      
            block[2] = {x:1, y:5};      
            block[3] = {x:2, y:4};      
            break;      
        }      
        case 3:{      
            block[0] = {x:0, y:4};      
            block[1] = {x:1, y:4};      
            block[2] = {x:1, y:5};      
            block[3] = {x:2, y:5};      
            break;      
        }      
        case 4:{      
            block[0] = {x:0, y:4};      
            block[1] = {x:1, y:4};      
            block[2] = {x:1, y:5};      
            block[3] = {x:1, y:6};      
            break;      
        }      
        case 5:{      
            block[0] = {x:0, y:4};      
            block[1] = {x:1, y:4};      
            block[2] = {x:2, y:4};      
            block[3] = {x:2, y:5};      
            break;      
        }      
        case 6:{      
            block[0] = {x:0, y:5};      
            block[1] = {x:1, y:4};      
            block[2] = {x:1, y:5};      
            block[3] = {x:1, y:6};      
            break;      
        }     
    }    
    return block;     
} 
function clear(){      
    for(var i=0; i<4; i++){ 
        tbl.rows[curBlock[i].x].cells[curBlock[i].y].style.backgroundColor="white";      
    }      
} 
function clearBox(){      
    for(var i=0; i<24; i++){     
        for(var j=0; j<11; j++){     
            tbl.rows[i].cells[j].style.backgroundColor = "white";     
        }     
    }        
} 
function paint(){      
    for(var i=0; i<4; i++){      
        tbl.rows[curBlock[i].x].cells[curBlock[i].y].style.backgroundColor="red";      
    }      
}
function paintBox(){//根据gameData
    for(var i=0;i<24;i++){     
        for(var j=0; j<11; j++){      
          if(gameData[i][j]==1){    
            tbl.rows[i].cells[j].style.backgroundColor = "red";     
          }     
        }      
    }      
}   
//检查坐标是否合法
function isValid(x, y){      
    if(x>23||x<0||y>10||y<0){      
        return false;      
    }      
    if(gameData[x][y]==1){//表示有已下落方块    
        return false;      
    }      
    return true;      
}
//当前下落的方块
let curBlock=setSquare();
//预览区的方块
let nextBlock=copyBlock(curBlock);
//预览图形

function clearNext(){      
    for(var i=0; i<4; i++){
        nextTbl.rows[nextBlock[i].x].cells[nextBlock[i].y].style.backgroundColor="white";      
    }      
}
 function paintNext(){
    for(var i=0; i<4; i++){
        nextBlock[i].y-=3;
        nextTbl.rows[nextBlock[i].x].cells[nextBlock[i].y].style.backgroundColor="red";    
    }    
}
//下落边缘检测
function checkBottomBorder(){      
    for(var i=0; i<curBlock.length; i++){      
        if(curBlock[i].x==24){      
            return false;      
        }
        if(!isValid(curBlock[i].x+1, curBlock[i].y)){      
            return false;      
        }      
    }      
    return true;      
} 
function validateBlock(block){    
    if(!block){      
        return false;    
    }    
    for(var i=0; i<4; i++){     
        if(!isValid(block[i].x, block[i].y)){    
            return false;     
        }     
    }    
    return true;    
}
let score=0;    
function addScore(lines){
    let s=0;
    switch(lines){
        case 1:
        s=10;
        break;
        case 2:
        s=30;
        break;
        case 3:
        s=60;
        break;
        case 4:
        s=100;
        break;
    }
    score=score+s;
    document.getElementById("score").innerText=score+"分";
}
//下落 
let timeCount=0; 
let time=0; 
let down=function(){
    timeCount++; 

    timeCount=totalTime(timeCount);    
  if(checkBottomBorder()){           
      clear();      
      //更新当前图形坐标     
      for(var i=0; i<4; i++){     
        curBlock[i].x = curBlock[i].x + 1;      
      }     
      //重画当前图形     
      paint();      
  } else{     
        //停止当前的定时器, 也就是停止自动向下移动.     
        clearInterval(timer);     
        //更新board数组.     
        updateGameData();     
        //消行     
        var lines = deleteLine();     
        
        //如果有消行, 则     
        if(lines!=0){     
            addScore(lines);
            clearBox();  
            paintBox();
        }    
        clearNext();      
        //产生一个新图形并判断是否可以放在最初的位置.     
        if(!validateBlock(nextBlock)){    
            alert("Game over1111!");       
            return;     
        };    
        curBlock = nextBlock;    
        nextBlock = setSquare();    
        previewBlock = copyBlock(nextBlock);    
        paintNext();   
        paint(); 
        //定时器, 每隔一秒执行一次moveDown      
        timer = setInterval(down,250)     
        }      
}
function totalTime(timeCount){
    if(timeCount==5){
        timeCount=0;
        time++;
    }
    document.getElementById("time").innerText=time+"秒";
    return timeCount;
}
function checkleftBorder(){      
    for(var i=0; i<curBlock.length; i++){      
        if(curBlock[i].y==0){      
            return false;      
        }
        if(!isValid(curBlock[i].x, curBlock[i].y-1)){      
            return false;      
        }      
    }      
    return true;      
}   
//左移   
let left=function(){     
  if(checkleftBorder()){           
      clear();      
      //更新当前图形坐标     
      for(var i=0; i<4; i++){     
        curBlock[i].y = curBlock[i].y - 1;      
      }     
      //重画当前图形     
      paint();      
  } 
}
function checkRightBorder(){      
    for(var i=0; i<curBlock.length; i++){      
        if(curBlock[i].y==10){      
            return false;      
        }
        if(!isValid(curBlock[i].x, curBlock[i].y+1)){      
            return false;      
        }      
    }      
    return true;      
}   
//下落   
let right=function(){     
  if(checkRightBorder()){           
      clear();      
      //更新当前图形坐标     
      for(var i=0; i<4; i++){     
        curBlock[i].y = curBlock[i].y + 1;      
      }     
      //重画当前图形     
      paint();      
  } 
}
function copyBlock(old){    
    var o = new Array(4);    
    for(var i=0; i<4; i++){      
        o[i] = {x:0, y:0};      
    }    
    for(var i=0; i<4; i++){      
        o[i].x = old[i].x;      
        o[i].y = old[i].y;      
    }    
    return o;    
}    
//旋转变化,将坐标旋转
let rotate=function(){
    let tmpBlock=copyBlock(curBlock);
    //计算中心点
    let cx = Math.round((tmpBlock[0].x + tmpBlock[1].x + tmpBlock[2].x + tmpBlock[3].x)/4);      
    let cy = Math.round((tmpBlock[0].y + tmpBlock[1].y + tmpBlock[2].y + tmpBlock[3].y)/4);  

    for(var i=0; i<4; i++){      
        tmpBlock[i].x = cx+cy-curBlock[i].y;     
        tmpBlock[i].y = cy-cx+curBlock[i].x;     
    }      
    //检查旋转后方格是否合法.  
    for(var i=0; i<4; i++){      
        if(!isValid(tmpBlock[i].x,tmpBlock[i].y)){     
            return;     
        }     
    }     
    //如果合法, 擦除     
    clear();      
    for(var i=0; i<4; i++){      
        curBlock[i].x = tmpBlock[i].x;      
        curBlock[i].y = tmpBlock[i].y;      
    }     
    //重画.     
    paint();      
}


//产生一个空白行.         
 function updateGameData(){      
    for(var i=0; i<4; i++){      
        gameData[curBlock[i].x][curBlock[i].y]=1;  
    }      
}
//消行
 function deleteLine(){     
    let lines = 0;     
    for(var i=0; i<24; i++){          
        for(var j=0; j<gameData[0].length; j++){   
            if(gameData[i][j]==0){//只要有一个未填满就不向下执行     
                break;     
            }     
        }     
        if(j==gameData[0].length){//消除    
            lines++;     
            if(i!=0){  
                for(var k=i-1; k>=0; k--){     
                    gameData[k+1] = gameData[k];     
                }    
            }     
            for(let i=0;i<gameData[0].length;i++){
                gameData[0][i] = 0     
            }
            
        }     
    }
     return lines;     
}     
let first=false;
function start(){
    if(first){
        gameData=[
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0], 
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0],
        ];
        clear();
        clearNext();
        clearBox();
    }
    curBlock = setSquare();    
    nextBlock = setSquare();     
    paint();    
    paintNext();    
    timer=setInterval(down,250);
    first=true;
}