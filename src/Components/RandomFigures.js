import React, { Component } from 'react';
import Figures from './Figures'

export default class RandomFigures extends Component {
  render() {
    return (
      <div className="randomFigure">
        <Figures />
        <Figures />
        <Figures />
      </div>
    )
  } 
}
