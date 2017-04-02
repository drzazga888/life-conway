import React from 'react';

const Board = ({items, rows, cols, mainWidth, mainHeight}) => (

	<table className="board">
		<tbody>
			{items.map((row, row_i) => (
				<tr key={row_i}>{row.map((field, field_i) => (
					<td key={field_i} className={`cell ${field ? 'live' : 'dead'}`}></td>
				))}</tr>
			))}
		</tbody>
	</table>

);

export default Board;
