/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

var board = new Array();
var score = 0;

$(function(){
  newgame();
})

function newgame(){
  //初始化棋盤格
  init();
  //隨機生成二個數字
  generateOneNumber();
  generateOneNumber();

  // updateBoardView();
}

function init(){
  //設定格子位置
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var gridCell=$("#grid-cell-"+i+"-"+j);
      gridCell.css("top",getPosTop(i,j));
      gridCell.css("left",getPosLeft(i,j));
    }
  }

  //生成數字
  for(var i=0;i<4;i++){
    board[i]=new Array();//讓board變成二維陣列
    for(var j=0;j<4;j++){
      board[i][j]=0;//初始數字0
    }
  }

  updateBoardView();//更新數字顯示
}

function updateBoardView(){
  $(".number-cell").remove();//移除所有number-cell
  //生成數字格
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
      var theNumberCell=$("#number-cell-"+i+"-"+j);

      if(board[i][j]==0){
        theNumberCell.css("width","0px");
        theNumberCell.css("height","0px");
        //設定0的位置,是為了數字改變時,動畫效果才能在本身格子有個基準點,若沒設定基準點將跑到大正方形左上角
        theNumberCell.css('top',getPosTop(i,j) + 50 );
        theNumberCell.css('left',getPosLeft(i,j) + 50 );
      } else {
        theNumberCell.css("width","100px");
        theNumberCell.css("height","100px");
        theNumberCell.css("top",getPosTop(i,j));
        theNumberCell.css("left",getPosLeft(i,j));

        theNumberCell.text(board[i][j]);

        theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
        theNumberCell.css("color",getNumberColor(board[i][j]));

      }


    }
  }
}


function generateOneNumber(){
  //判斷還有空格再生成數字
  if(nospace(board))
    return false;
  //隨機產生一個位置
  var randx=parseInt(Math.floor(Math.random()*4));
  var randy=parseInt(Math.floor(Math.random()*4));
  //判斷該位置原本是否有數字
  while(true){
    //0
    if(board[randx][randy]==0)
      break;
    randx=parseInt(Math.floor(Math.random()*4));
    randy=parseInt(Math.floor(Math.random()*4));
  }

  var randNumber=Math.random()<0.5 ? 2 : 4 ;


  board[randx][randy]=randNumber;

  showNumber(randx,randy,randNumber);


}





$(document).keydown(function (event){
  switch(event.keyCode){
    case 37:
      if( moveLeft() ){
        generateOneNumber();
        isgameover();
      }
      break;

    case 38:
      if( moveUp() ){
        generateOneNumber();
        isgameover();
      }
      break;

    case 39:
      if(moveRight()){
        generateOneNumber();
        isgameover();
      }

      break;
  }

});


function isgameover(){

}


function moveRight(){
  if(!canMoveRight(board))
    return false;

  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){//最右邊的格子開始看能否移
      if(board[i][j]!=0){//不是0的數字才有需要移
        for(var k=3;k>j;k--){//從最右邊開始找新位置
          //新位置是0 且 原來位置到新位置間沒有障礙
          if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
            showMoveAnimation(i,j,i,k);//移動位置
            board[i][k]=board[i][j];//設定新位置的數字為原位置的數字
            board[i][j]=0;//原位置的數字設為0
          }
          //新位置和原位置的數字相等 且 原來位置到新位置間沒有障礙
          else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)){
            showMoveAnimation(i,j,i,k);//移動位置
            board[i][k]+=board[i][j];//設定新位置的數字和原位置的數字相加
            board[i][j]=0;//原位置的數字設為0
          }
        }
      }
    }
  }

  setTimeout("updateBoardView()",200);
  return true;
}

function moveLeft(){

  // alert(canMoveLeft(board));
  // return true;
  if(!canMoveLeft(board)){
    return false;
  }

  //moveLeft
  //除了第一欄的數字
  //針對左側的所有數字進行判斷
  //條件:
  //是否為空0
  //數字相等
  //障礙物
  for(i=0;i<4;i++)
    for(j=1;j<4;j++){
      if(board[i][j]!=0){
        //所在位置的整列左方數字
        for(k=0;k<j;k++){//從最左方開始看能否移動
          //等於0且沒有障礙
          if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
            // move
            showMoveAnimation(i,j,i,k);//從i-j 移動到 i-k
            board[i][k]=board[i][j];//新位置的數字等於原位置的數字
            board[i][j]=0;//原位置的數字變為0
            continue;//繼續迴圈中下個元素
          // 數字相等且沒有障礙
          }else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)){
            // move
            showMoveAnimation(i,j,i,k);//從i-j 移動到 i-k
            // add
            board[i][k]+=board[i][j];//新位置的數字等於加上原位置的數字
            board[i][j]=0;//原位置的數字變為0

            continue;
          }
        }
      }
    }//for






  setTimeout("updateBoardView()",200);
  return true;
}
