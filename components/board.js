import React from 'react';

class Board extends React.PureComponent {

	render() {
		let built = this.props.items.map((row, row_i) => {
			let row_content = row.map((field, field_i) => {
				return <td key={field_i} className={`cell ${field ? 'live' : 'dead'}`}></td>;
			});
			return <tr key={row_i}>{row_content}</tr>;
		});
		return (
			<table className="board">
				<tbody>
					{built}
				</tbody>
			</table>
		);
	}

}

export default Board;