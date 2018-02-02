import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  startGame,
  beginner
} from './LandingAction';
import { setTimeout } from 'timers';

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.beginner = this.beginner.bind(this);
    // this.moderate = this.moderate.bind(this);
    // this.hard = this.hard.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(startGame());
  }

  beginner(e) {
    const { dispatch } = this.props;
    dispatch(beginner(e.target.value));
  }

  componentDidMount() {
    this.setDisplayTitle();
  }
  setDisplayTitle(){
    const characterDelays = [
      {char:'h', timeDelay: 1000},
      {char:'a', timeDelay: 200},
      {char:'g', timeDelay: 400},
      {char:'n', timeDelay: 800},
      {char:'m', timeDelay: 1400},
    ];

    function setCharacterDelay(elem, delay){
      const letter = elem.dataset.charBlock;
      return setTimeout(()=>{
        elem.innerText = letter;
      }, delay);
    }
    // Select title character blocks
    const letterBlocks = document.querySelectorAll(".title__char-block");
    for(let block of letterBlocks){
      const {charBlock} = block.dataset;
      const delayInterval = characterDelays.filter(prop =>(prop.char == charBlock));
      setCharacterDelay(block, delayInterval[0].timeDelay);
    }
  }
  render() {
    return (
      <div className='text-center text-white'>
        <h1 className='hangman'>
        {
          "hangman".split("").map((letter,index)=>(
            <span key={letter + '-' + index}
                  data-char-block={letter}
                  className="title__char-block mx-2">_</span>
          ))
        }
        </h1>
        <h3>Let's play a game...</h3>
        <div className='mb-3'>
          <img src='./gallows/gallows6.jpg' alt='Hangman' />
        </div>
        <h3>Select your difficulty</h3>
        <div className='row'>
          <div className='col-4'>
            <h5>Choose this if you're a wimp</h5>
            <Link to={ '/play' }>
              <button className='btn btn-success' value={ 6 } onClick={ this.beginner }>Beginner</button>
            </Link>
          </div>
          <div className='col-4'>
            <h5>Ok, you have some skills</h5>
            <Link to={ '/play' }>
              <button className='btn btn-primary' value={ 5 } onClick={ this.beginner }>Moderate</button>
            </Link>
          </div>
          <div className='col-4'>
            <h5>You like to live dangerously</h5>
            <Link to={ '/play' }>
              <button className='btn btn-danger' value={ 3 } onClick={ this.beginner }>Hard</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
