import React, { Component } from 'react';
import {Emitter} from '../lib/Emitter'

export default  class Figures extends Component {
  constructor(props){
    super(props)
    this.state = {
      figurs:[
        this.DefaultFigureL(),
        this.DefaultFigureJ(),
        this.DefaultFigureT(),
        this.DefaultFigureReverseT(),
        this.DefaultFigureCube(),
        this.DefaultFigureI(),
        this.DefaultFigureDot()
      ],
      currentFigure: null
    }
  }

  componentWillMount() {
    this.setState({currentFigure: this.getNewFigure()})
    Emitter.addListener('onGetNewFigure', this.getNewFigure)
  }

  getNewFigure = () => {
    let length = this.state.figurs.length
    let index = Math.round(Math.random()*(length - 1))
    let currentFigure = this.state.figurs[index]
    return currentFigure
  }

  DefaultFigureT = () =>{
    return {
      board:[[1,0],[1,1],[1,0]],
      color: 'green',
      type: 'T'
    }
  }

  DefaultFigureDot = () =>{
    return {
      board:[[1]],
      color: 'blue',
      type: 'Dot'
    }
  }

  DefaultFigureReverseT = () =>{
    return {
      board:[[0,1],[1,1],[0,1]],
      color: '#ad2e9e',
      type: 'ReverseT'
    }
  }

  DefaultFigureCube = () =>{
    return {
      board:[[1,1],[1,1]],
      color: 'black',
      type: 'Cube'
    }
  }


  DefaultFigureI = () =>{
    return {
      board:[[1],[1],[1],[1]],
      color: 'red',
      type: 'I'
    }
  }


  DefaultFigureJ = () =>{
    return {
      board:[[0,1],[0,1],[1,1]],
      color: '#ef7a38',
      type: 'J'
    }
  }

  DefaultFigureL = () =>{
      return {
        board:[[1,0],[1,0],[1,1]],
        color: '#3365f9',
        type: 'L'
      }
  }

  getFigureTemplate = () =>{
  const board = this.state.currentFigure.board
  return (<table className="item">{
      board.map((line, i)=>{
           return (<tr className={this.state.currentFigure.type}>{
          line.map((item, j)=>{
            let defaultColor = '#fff'
            if(item === 1){
              defaultColor = this.state.currentFigure.color
            }
            return (<td style={{backgroundColor:defaultColor}}></td>)
          })
        }</tr>)
      })
    }</table>)
  }

  onClickFigure = () => {
    Emitter.emit('onClickFigure', this.state.currentFigure)
  }

  render() {
    if(!this.state.currentFigure){
      return (<div>Loading...</div>)
    }

    return (<div className="singleFigure" onClick={this.onClickFigure}>
        {this.getFigureTemplate()}
      </div>
    );
  }
}
