import React from 'react';

class Board extends React.PureComponent {

	componentDidMount() {
		this.ctx = this.refs.canvas.getContext('2d');
		this.ctx.fillStyle = this.props.liveColor;
		this._draw();
	}

	componentDidUpdate() {
		this.ctx.fillStyle = this.props.liveColor;
		this._draw();
	}

	_draw() {
		this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
		this.props.items.forEach(((row, row_i) => {
			row.forEach(((isLive, col_i) => {
				if (isLive) {
					this.ctx.fillRect(
						col_i * (this.props.gap + this.props.size),
						row_i * (this.props.gap + this.props.size),
						this.props.size,
						this.props.size
					);
				}
			}).bind(this));
		}).bind(this));
	}

	render() {
		return <canvas
			ref="canvas"
			className="board"
			width={this.props.cols * (this.props.gap + this.props.size) - this.props.gap}
			height={this.props.rows * (this.props.gap + this.props.size) - this.props.gap}
		></canvas>;
	}

}

Board.defaultProps = {
	liveColor: '#2FB298',
	gap: 2,
	size: 5
};

export default Board;
