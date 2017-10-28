import React, { Component } from 'react';
import {Emitter} from '../lib/Emitter'
import Figure from './Figures'
import * as utils from '../lib/utils'

export default  class Board extends Component {
  constructor(props){
    super(props)
    this.state= {
      board: this.getDefaultBoard(10,10)
    }
  }

  componentWillMount() {
    Emitter.addListener('newFigureIsSet', this.newFigureIsSet)
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


  newFigureIsSet = (newFigure)=>{
    let result = utils.setFigureInBoard(this.state.board, newFigure)
    if(result.status === 'ok'){
      this.setState({board:result.board})
    }else {
      alert(1111)
    }

    // TODO ERROR
  }

  printBoardTable = ()=>{
    return (
      <table>
        {this.state.board.map(line =>
          (<tr>{(line.map(item => {
            let defaultColor = '#fffff'
            if(item !== 0){
              defaultColor = item.color
            }

            return(<td style = {{backgroundColor: defaultColor}}>{

          }</td>)}))}</tr>))
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
      <Figure />
        {this.printBoardTable()}
        <button onClick={this.clickOnButton}>Get Random Figure</button>
      </div>
    );
  }
}
