import React from 'react';
import { AutomatonActions } from '../stores/automaton';

const Inputs = ({ isPlaying, density, rows, cols, interval }) => (

	<div className="inputs">

		{/* buttons start / stop / reset / next */}
		<div className="buttons">
			<button onClick={AutomatonActions.togglePlaying}>{isPlaying ? 'Stop' : 'Start'}</button>
			<button onClick={AutomatonActions.nextStep} disabled={isPlaying}>Krok</button>
			<button onClick={AutomatonActions.reset} disabled={isPlaying}>Reset</button>
		</div>

		<div className="input-blocks">

			{/* density input */}
			<label>
				Gestosc (%):
				<input
					type="number"
					value={density * 100}
					onChange={(e) => AutomatonActions.changeDensity(e.target.value / 100)}
					min={0}
					max={100}
					disabled={isPlaying}
				/>
			</label>

			{/* rows input */}
			<label>
				Ilosc wierszy:
				<input
					type="number"
					value={rows}
					onChange={(e) => { AutomatonActions.changeRows(Number(e.target.value)) }}
					min={1}
					step={1}
					disabled={isPlaying}
				/>
			</label>

			{/* cols input */}
			<label>
				Ilosc kolumn:
				<input
					type="number"
					value={cols}
					onChange={(e) => { AutomatonActions.changeCols(Number(e.target.value)) }}
					min={1}
					step={1}
					disabled={isPlaying}
				/>
			</label>

			{/* interval input */}
			<label>
				Okres odświeżania (ms):
				<input
					type="number"
					value={interval}
					onChange={(e) => { AutomatonActions.changeInterval(Number(e.target.value)) }}
					min={0}
					disabled={isPlaying}
				/>
			</label>

		</div>

	</div>

);

export default Inputs;
