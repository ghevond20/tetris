import React, { Component } from 'react';
import {Emitter} from '../lib/Emitter'
import Figure from './Figures'
import * as utils from '../lib/utils'
import RandomFigures from './RandomFigures'
import * as Constants from '../lib/Constants'

export default  class Board extends Component {
  constructor(props){
    super(props)
    this.state= {
      board: this.getDefaultBoard(Constants.BOARD_ROW_COUNT,Constants.BOARD_COL_COUNT),
      virtualBoard: this.getDefaultBoard(Constants.BOARD_ROW_COUNT,Constants.BOARD_COL_COUNT),
      selectedFigure: null
    }
  }

  componentWillMount() {
  //  Emitter.addListener('newFigureIsSet', this.newFigureIsSet)
    Emitter.addListener('onClickFigure', this.onClickFigure)

  }

  onClickFigure = (selectedFigure) =>{
    this.setState({selectedFigure})
  }

  getDefaultBoard = (rowNum, colNum) => {
    let boardArr = []
    for (var i = 0; i <= rowNum; i++) {
      boardArr[i] = []
      for (var j = 0; j <= colNum; j++) {
        boardArr[i][j] = 0
      }
    }
    return boardArr
  }

  clickInBoardItem = () => {
    this.setState({board: this.state.virtualBoard, selectedFigure: null})
  }

onMouseOut= () => {
  return
  if(!this.state.selectedFigure){
    return
  }

  this.setState({virtualBoard:this.state.board})
    console.log('virtualBoard')
  }

  componentWillUpdate(){
    console.log(this.state.virtualBoard);
  }

  onMouseOver = (params) =>{
    if(!this.state.selectedFigure){
      return
    }


    let result = {status: 'ok', board:this.state.board}
    if(utils.isFigurePositionValid(this.state.virtualBoard, params.rowIndex, params.colIndex, this.state.selectedFigure)){
      result = utils.insertFigureInBoard(this.state.virtualBoard, params.rowIndex, params.colIndex, this.state.selectedFigure)
    }

    //let result = utils.setFigureInBoard(this.state.board, this.state.selectedFigure)
  //  this.setState({virtualBoard: this.state.board})
    if(result.status === 'ok'){
      this.setState({virtualBoard: result.board})
      console.log("result.status === 'ok'");
    }else {
      console.log(1111)
    }
  }


  printBoardTable = ()=>{
    let board = this.state.board
    if(this.state.selectedFigure){
      board = this.state.virtualBoard
      console.log('  board = this.state.virtualBoard');
    }

    return (
            <table>
              {board.map((line ,rowIndex) =>
                (<tr>{(line.map((item, colIndex) => {
                  let defaultColor = '#fffff'
                  if(item !== 0){
                    defaultColor = item.color
                  }
                  return(<td onMouseOut={this.onMouseOut.bind(this)} onMouseOver={this.onMouseOver.bind(this,{rowIndex,colIndex} )} onClick ={this.clickInBoardItem} style = {{backgroundColor: defaultColor}}/>)}
                ))}</tr>))
              }
            </table>
    )
  }

  clickOnButton = () => {
    Emitter.emit('onGetNewFigure','')
  }

  render() {
    return (
      <div>
        <div className="board">
          {this.printBoardTable()}
        </div>
        <RandomFigures />
      </div>
    );
  }
}
