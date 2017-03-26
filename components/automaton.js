import React from 'react';
import Board from './board';
import Stats from './stats';

class Automaton extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			items: this._randomizeFields(this.props),
			step: 0
		};
		this.nextStep = this.nextStep.bind(this);
	}
	
	componentWillReceiveProps(nextProps, nextState) {
		// randomize if density / rows / cols changed
		if (this.props.density !== nextProps.density
			|| this.props.rows !== nextProps.rows
			|| this.props.cols !== nextProps.cols
		) {
			this.setState({
				items: this._randomizeFields(nextProps),
				step: 0
			});
		}
	}
	
	reset() {
		this.setState({
			items: this._randomizeFields(this.props),
			step: 0
		});
	}
	
	start() {
		this.interval = setInterval(this.nextStep, this.props.interval);
	}
	
	stop() {
		clearInterval(this.interval);
	}

	_countLive() {
		return this.state.items.reduce((countedInRows, row) => (
			countedInRows + row.reduce((countedInRow, field) => (
				countedInRow + field
			), 0)
		), 0);
	}
	
	nextStep() {
		let newBoard = this.state.items.map(arr => arr.slice());
		for (let row = 0; row < this.props.rows; ++row) {
			for (let col = 0; col < this.props.cols; ++col) {
				newBoard[row][col] = this._computeNextVal(newBoard, row, col);
			}
		}
		this.setState({
			items: newBoard,
			step: ++this.state.step
		});
	}
	
	_computeNextVal(board, row, col) {
		// 1. get indexes of neighbours
		let prevRow = (row - 1 + this.props.rows) % this.props.rows;
		let nextRow = (row + 1) % this.props.rows;
		let prevCol = (col - 1 + this.props.cols) % this.props.cols;
		let nextCol = (col + 1) % this.props.cols;
		// 2. count neighbours
		let neighbours = (
			board[prevRow][prevCol] +
			board[prevRow][col] +
			board[prevRow][nextCol] +
			board[row][prevCol] +
			board[row][nextCol] +
			board[nextRow][prevCol] +
			board[nextRow][col] +
			board[nextRow][nextCol]
		);
		// 3. determine new state
		let value = board[row][col];
		return (!value && neighbours === 3)
			|| (value && (neighbours === 2 || neighbours === 3));
	}

	_randomizeFields({density, rows, cols}) {
		let arr = [];
		for (let i = 0; i < rows; ++i) {
			arr.push(new Array(cols).fill(false));
		}
		let live = Math.floor(rows * cols * density);
		let availableCells = Array.from({length: rows * cols}, (v, k) => k); 
		while (live) {
			let selected = Math.floor(Math.random() * availableCells.length);
			let removed = availableCells.splice(selected, 1);
			arr[Math.floor(removed / cols)][removed % cols] = true;
			--live;
		}
		return arr;
	}

	render() {
		return (
			<div>
				<Board items={this.state.items} />
				<Stats live={this._countLive()} all={this.props.rows * this.props.cols} step={this.state.step} />
			</div>
		);
	}

}

export default Automaton;