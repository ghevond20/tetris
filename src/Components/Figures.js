import React, { Component } from 'react';
import {Emitter} from '../lib/Emitter'

export default  class Figures extends Component {
  constructor(props){
    super(props)
    this.state = {
      figurs:[
      this.DefaultFigureL(),
        this.DefaultFigureJ(),
        this.DefaultFigureT()
      ]
    }
  }
  componentWillMount() {
    Emitter.addListener('onGetNewFigure', this.getNewFigure)
  }

  getNewFigure = () => {
    let length = this.state.figurs.length
    let index = Math.round(Math.random()*(length - 1))
    let newFigure = this.state.figurs[index]
    Emitter.emit('newFigureIsSet', newFigure)
  }

  DefaultFigureT = () =>{
    return {
      board:[[1,0],[1,1],[1,0]],
      length: 4,
      color: '#ad4e9e'
    }
  }

  DefaultFigureJ = () =>{
    return {
      board:[[0,1],[0,1],[1,1]],
      length: 4,
      color: '#ef7a38'
    }
  }

  DefaultFigureL = () =>{
      return {
        board:[[1,0],[1,0],[1,1]],
        length: 4,
        color: '#3365f9'
      }
  }

  render() {
    return (<div>

      </div>
    );
  }
}
