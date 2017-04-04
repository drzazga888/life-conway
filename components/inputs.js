import React from 'react';
import { AutomatonActions } from '../stores/automaton';

const Inputs = ({ isPlaying, density, rows, cols, interval }) => (

	<div className="inputs">

		{/* buttons start / stop / reset / next */}
		<div className="buttons">
			<button title="Rozpocznij / zakończ symulację" onClick={AutomatonActions.togglePlaying}>{isPlaying ? 'Stop' : 'Start'}</button>
			<button title="Następny krok symulacji" onClick={AutomatonActions.nextStep} disabled={isPlaying}>Krok</button>
			<button title="Zresetuj automat" onClick={AutomatonActions.reset} disabled={isPlaying}>Reset</button>
		</div>

		<div className="input-blocks">

			{/* density input */}
			<label title="Wspoółczynnik żywych komórek do wszystkich możliwych (w %); można wprowadzać wartości o 0 do 100 co 0.01">
				Gestosc (%):
				<input
					type="number"
					value={Math.round(density * 10000) / 100}
					onChange={(e) => {
						if (e.target.checkValidity()) {
							AutomatonActions.changeDensity(e.target.value / 100)
						}
					}}
					min={0}
					max={100}
					step={0.01}
					disabled={isPlaying}
				/>
			</label>

			{/* rows input */}
			<label title="Ilość wierszy automatu; można wprowadzać wartości całkowite od 1 do 999">
				Ilosc wierszy:
				<input
					type="number"
					value={rows.toFixed(0)}
					onChange={(e) => {
						if (e.target.checkValidity()) {
							AutomatonActions.changeRows(Number(e.target.value))
						}
					}}
					min={1}
					max={999}
					step={1}
					disabled={isPlaying}
				/>
			</label>

			{/* cols input */}
			<label title="Ilość kolumn automatu; można wprowadzać wartości całkowite od 1 do 999">
				Ilosc kolumn:
				<input title=""
					type="number"
					value={cols.toFixed(0)}
					onChange={(e) => {
						if (e.target.checkValidity()) {
							AutomatonActions.changeCols(Number(e.target.value))
						}
					}}
					min={1}
					max={999}
					step={1}
					disabled={isPlaying}
				/>
			</label>

			{/* interval input */}
			<label title="Okres, po którym wykonany zostanie następny krok (w ms); można wprowadzać wartości całkowite od 0 do 9999; wartość '0' oznacza, że symulacja jest prowadzona najszybciej jak to jest możliwe">
				Okres odświeżania (ms):
				<input
					type="number"
					value={interval.toFixed(0)}
					onChange={(e) => {
						if (e.target.checkValidity()) {
							AutomatonActions.changeInterval(Number(e.target.value))
						}
					}}
					min={0}
					max={9999}
					step={1}
					disabled={isPlaying}
				/>
			</label>

		</div>

	</div>

);

export default Inputs;
