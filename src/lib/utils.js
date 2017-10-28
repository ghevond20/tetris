export const setFigureInBoard = (board, figure) => {
  let result = {}
  board.forEach((row , rowIndex) => {
      row.forEach((item, colIndex) => {
            if(result.status !== 'ok' && isFigurePositionValid(board, rowIndex, colIndex, figure)){
              result = insertFigureInBoard(board, rowIndex, colIndex, figure)
            }
      })
  });

  return result;
}



const placeFigure = (board, rowIndex, colIndex, figure)=>{
  const figureLength = getFigureLength(figure)

  if(board[rowIndex].length >= colIndex + figureLength.colLength && board[rowIndex + figureLength.rowLength - 1]){
    return true
  }
  return false
}

const getFigureLength = (figure)=>{
  let rowLength = figure.board.length
  let colLength = figure.board[0].length
  return {rowLength, colLength}
}

const isFigurePositionValid = (board, rowIndex, colIndex, figure) =>{
  if(!placeFigure(board, rowIndex, colIndex,figure)){
    return false
  }
  let rInd = rowIndex;
  let cInd = colIndex;

  let res = true;

  figure.board.forEach((row, i)=>{
    row.forEach((item, j)=>{
      if (board[rInd][cInd]!==0 && figure.board[i][j]==1 && res){
        res = false;
      }

      cInd++;
    }

  )

    cInd = colIndex;
    rInd++;
  })

  return res;
}


const insertFigureInBoard = (board, rowIndex, colIndex,figure) =>{
  let rInd = rowIndex;
  let cInd = colIndex;

  let result = {status:'ok', board:board};
  figure.board.forEach((row, i)=>{
    row.forEach((item, j)=>{
      if (board[rInd][cInd]!== 0 && figure.board[i][j]==1 && result.status !=="error"){
        result.status = "error";
      }else if (figure.board[i][j]==1){
        result.board[rInd][cInd] = figure;
      }

      cInd++;
    }

  )
  cInd = colIndex;
  rInd++;
  })

  return result; //{status: 'ok' , newBoard}
}
