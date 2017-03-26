import React from 'react';
import Automaton from './automaton';

class UI extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			densityPercentage: 10,
			rows: 40,
			cols: 60,
			isPlaying: false,
			interval: 100
		};
		this.changeDensity = this.changeDensity.bind(this);
		this.changeRows = this.changeRows.bind(this);
		this.changeCols = this.changeCols.bind(this);
		this.togglePlaying = this.togglePlaying.bind(this);
		this.resetClicked = this.resetClicked.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.changeInterval = this.changeInterval.bind(this);
	}
	
	changeDensity(e) {
		this.setState({
			densityPercentage: e.target.value
		});
	}
	
	changeRows(e) {
		this.setState({
			rows: e.target.value
		});
	}
	
	changeCols(e) {
		this.setState({
			cols: e.target.value
		});
	}

	changeInterval(e) {
		this.setState({
			interval: e.target.value
		});
	}
	
	togglePlaying() {
		this.setState({
			isPlaying: !this.state.isPlaying
		}, () => {
			this.state.isPlaying ? this.automaton.start() : this.automaton.stop();
		});
	}
	
	resetClicked() {
		this.automaton.reset();
	}
	
	nextStep() {
		this.automaton.nextStep();
	}

	render() {
		return (
			<div className="app">
				<div className="ui">
					<div className="ui-block">
						<h1>Gra w życie</h1>
						<p>Wersja asynchroniczna</p>
					</div>
					<div className="ui-block">
						<button onClick={this.togglePlaying}>{this.state.isPlaying ? 'Stop' : 'Start'}</button>
						<button onClick={this.nextStep} disabled={this.state.isPlaying}>Krok</button>
						<button onClick={this.resetClicked} disabled={this.state.isPlaying}>Reset</button>
					</div>
					<div className="ui-block label-block">
						<label>
							Gestosc (%):
							<input
								type="number"
								value={this.state.densityPercentage}
								onChange={this.changeDensity}
								min={0}
								max={100}
								disabled={this.state.isPlaying}
							/>
						</label>
						<label>
							Ilosc wierszy:
							<input
								type="number"
								value={this.state.rows}
								onChange={this.changeRows}
								min={1}
								step={1}
								disabled={this.state.isPlaying}
							/>
						</label>
						<label>
							Ilosc kolumn:
							<input
								type="number"
								value={this.state.cols}
								onChange={this.changeCols}
								min={1}
								step={1}
								disabled={this.state.isPlaying}
							/>
						</label>
						<label>
							Okres odświeżania (ms):
							<input
								type="number"
								value={this.state.interval}
								onChange={this.changeInterval}
								min={0}
								disabled={this.state.isPlaying}
							/>
						</label>
					</div>
					<div className="ui-block">
						<p>Autor: Kamil Drzazga</p>
					</div>
				</div>
				<Automaton
					density={this.state.densityPercentage / 100}
					cols={Number(this.state.cols)}
					rows={Number(this.state.rows)}
					isPlaying={this.state.isPlaying}
					interval={Number(this.state.interval)}
					ref={automaton => { this.automaton = automaton }}
				/>
			</div>
		);
	}

}

export default UI;