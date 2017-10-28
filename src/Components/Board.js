import React, { Component } from 'react';
import {Emitter} from '../lib/Emitter'
import Figure from './Figures'
import * as utils from '../lib/utils'

export default  class Board extends Component {
  constructor(props){
    super(props)
    this.state= {
      board: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    }
  }

  componentWillMount() {
    Emitter.addListener('newFigureIsSet', this.newFigureIsSet)
  }

  newFigureIsSet = (newFigure)=>{
    let newBoard = utils.setFigureInBoard(this.state.board, newFigure)
    if(newBoard.status === 'ok'){
      this.setState({board:newBoard.data})
    }else {
      alert(1111)
    }

    // TODO ERROR
  }

  printBoardTable = ()=>{
    return (
      <table>
        {this.state.board.map(line =>
          (<tr>{(line.map(item => (<td>{item}</td>)))}</tr>))
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
