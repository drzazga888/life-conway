import Reflux from 'reflux';

const AutomatonActions = Reflux.createActions([
  'nextStep', 'reset', 'togglePlaying',
  'changeDensity', 'changeRows', 'changeCols', 'changeInterval'
]);

class AutomatonStore extends Reflux.Store {

  constructor() {
    super();
    this.state = {
      step: 0,
      density: 0.1,
      rows: 80,
      cols: 120,
      isPlaying: false,
      interval: 100
    };
    this.state.items = this._randomizeFields(this.state);
    this.listenables = [AutomatonActions];
  }

  onReset() {
    this.setState({
      step: 0,
      items: this._randomizeFields(this.state)
    });
  }

  onNextStep() {
    let newBoard = this.state.items.map(arr => arr.slice());
		for (let row = 0; row < this.state.rows; ++row) {
			for (let col = 0; col < this.state.cols; ++col) {
				newBoard[row][col] = this._computeNextVal(newBoard, row, col);
			}
		}
		this.setState({
			items: newBoard,
			step: ++this.state.step
		});
  }

  onTogglePlaying() {
    if (this.state.isPlaying) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(this.onNextStep.bind(this), this.state.interval);
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  onChangeInterval(interval) {
    this.setState({
      step: 0,
      interval
    });
  }

  onChangeDensity(density) {
    this.setState({
      step: 0,
      density,
      items: this._randomizeFields(Object.assign({}, this.state, {density}))
    });
  }

  onChangeRows(rows) {
    this.setState({
      step: 0,
      rows,
      items: this._randomizeFields(Object.assign({}, this.state, {rows}))
    });
  }

  onChangeCols(cols) {
    this.setState({
      step: 0,
      cols,
      items: this._randomizeFields(Object.assign({}, this.state, {cols}))
    });
  }

  _computeNextVal(board, row, col) {
		// 1. get indexes of neighbours
		let prevRow = (row - 1 + this.state.rows) % this.state.rows;
		let nextRow = (row + 1) % this.state.rows;
		let prevCol = (col - 1 + this.state.cols) % this.state.cols;
		let nextCol = (col + 1) % this.state.cols;
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

	_randomizeFields({cols, rows, density}) {
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

}

export { AutomatonActions, AutomatonStore };
