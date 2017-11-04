<<<<<<< HEAD
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
=======
import React, { Component } from 'react'
import Figure from './Figures'

export default class RandomFigures extends Component {
  render() {
    return (<div >
    <Figure/>
    <Figure/>
    <Figure/>
    </div>
    );
  }
>>>>>>> 1abc018d06cfd505a4d4e72210902540f99c842b
}
