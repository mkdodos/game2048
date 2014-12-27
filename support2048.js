/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

function getPosTop(i,j){
  return 20+i*120;
}

function getPosLeft(i,j){
  return 20+j*120;
}


function getNumberBackgroundColor(number){
  switch( number ){
      case 2:return "#eee4da";break;
      case 4:return "#ede0c8";break;
      case 8:return "#f2b179";break;
      case 16:return "#f59563";break;
      case 32:return "#f67c5f";break;
      case 64:return "#f65e3b";break;
      case 128:return "#edcf72";break;
      case 256:return "#edcc61";break;
      case 512:return "#9c0";break;
      case 1024:return "#33b5e5";break;
      case 2048:return "#09c";break;
      case 4096:return "#a6c";break;
      case 8192:return "#93c";break;
  }

  return "black";
}


function getNumberColor(number){
  if(number<=4){
    return "#776e65";
  }
  return "white";
}


function nospace(board){
  for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
      if(board[i][j]==0)//有0的話代表還有空格
        return false;

  return true;

}

//判斷除了第一欄的數字以外,所有數字是否可移動
//可移動的條件有二
//該左側數字為0或該左側數字和本身數字相等
function canMoveLeft(board){

  for(var i=0;i<4;i++)
    for(var j=1;j<4;j++)
      if( board[i][j] != 0 )//有存在數字的話
        if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
          return true;

  return false;

}

function canMoveRight(board){
  for(var i=0;i<4;i++)
    for(var j=2;j>=0;j--)//由最右欄(第3欄)開始判斷,然後2,1,0
      if( board[i][j] != 0 )//有存在數字的話
        if(board[i][j+1]==0 || board[i][j+1]==board[i][j])//右側數字為0或該數字和本身數字相等
          return true;

  return false;




}

//檢查指定欄位間該列沒有障礙物(不為0的數字)
function noBlockHorizontal (row,col1,col2,board){
  for(var i=col1+1;i<col2;i++){
    if(board[row][i]!=0)
      return false;
  }

  return true;


}

