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

function showNumber(i,j,randNumber){
  var numberCell = $('#number-cell-' + i + "-" + j );
  numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
  numberCell.css('color',getNumberColor( randNumber ) );
  numberCell.text( randNumber );
  numberCell.animate({
      width:"100px",
      height:"100px",
      top:getPosTop( i , j ),
      left:getPosLeft( i , j )
  },300);
}

function nospace(board){
  for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
      if(board[i][j]==0)//有0的話代表還有空格
        return false;

  return true;

}
