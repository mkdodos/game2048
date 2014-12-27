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


function showMoveAnimation(formx,fromy,tox,toy){
  var numberCell=$("#number-cell-"+formx+"-"+fromy);//取得要移動的元素
  // numberCell.animate({param1: value1, param2: value2}, speed);
  numberCell.animate({
    top: getPosTop(tox,toy),
    left:getPosLeft(tox,toy)
  }, 200);


  // var numberCell = $('#number-cell-' + fromx + '-' + fromy );
  // numberCell.animate({
  //     top:getPosTop( tox , toy ),
  //     left:getPosLeft( tox , toy )
  // },200);


}
