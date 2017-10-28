export const setFigureInBoard = (board, figure) => {
  let result = {}
  board.forEach((line , i) => {
      line.forEach((item, j) => {
          if(item === 0 && result.status !== 'ok'){
            result = getFreeBlocks(board, i, j, figure)
          }
      })
  })
  return result
}

const getFreeBlocks = (board, i, j, figure) =>{
  let boardRow = i
  let boardCol = j
  let result = {status: 'ok', data: ''}
    figure.board.forEach((line, RowIndex) => {
        line.forEach((item, ColIndex) => {
          if(item === 1 && board[boardRow][boardCol] === 1){
            result.status = 'error'
          }else if(item === 1 && board[boardRow][boardCol] === 0){
            board[boardRow][ColIndex] = 1
          }
          boardCol++
        })
        boardCol = j
        boardRow++
    })
    if(result.status === 'ok'){
      result.data = board
    }
    return result
}
