import Reflux from 'reflux';
import React from 'react';
import { AutomatonActions, AutomatonStore } from '../stores/automaton';
import Board from './board';
import Inputs from './inputs';
import Stats from './stats';

export default class App extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = AutomatonStore;
  }

  render() {
    return (
      <div className="app">
        <div className="side">
          <header className="app-header">
            <h1>Gra w życie</h1>
            <p>Wersja asynchroniczna</p>
            <p>Autor: Kamil Drzazga</p>
          </header>
          <Inputs
            interval={this.state.interval}
            cols={this.state.cols}
            rows={this.state.rows}
            density={this.state.density}
            isPlaying={this.state.isPlaying}
          />
          <Stats
            step={this.state.step}
            all={this.state.rows * this.state.cols}
            live={this.state.items.reduce((sumRow, row) => (
              sumRow += row.reduce((sum, item) => sum + item, 0)
            ), 0)}
          />
        </div>
        <div className="main" ref="main">
          <Board
            items={this.state.items}
            cols={this.state.cols}
            rows={this.state.rows}
          />
        </div>
      </div>
    );
  }

}
