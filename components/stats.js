import React from 'react';
import Dygraph from 'dygraphs';

class Stats extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			liveHistory: [[this.props.step, this.props.live]]
		};
	}

	componentDidMount() {
		this.chart = new Dygraph(this.refs.chartDom, this.state.liveHistory, {
			labels: ['Krok', 'Gęstość'],
			axes: {
				'y': {
					axisLabelFormatter: val => `${Number(val * 100 / this.props.all).toFixed(2)}%`,
					valueFormatter: val => `${Number(val * 100 / this.props.all).toFixed(3)}% (${val} żywych)`,
					includeZero: true
				}
			},
			legend: 'always',
			color: '#7AFF9B'
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.step === 0) {
			this.setState({
				liveHistory: [[nextProps.step, nextProps.live]]
			});
		} else if (nextProps.step !== this.props.step) {
			let newHistory = this.state.liveHistory.map(arr => arr.slice());
			this.setState({
				liveHistory: newHistory.concat([[nextProps.step, nextProps.live]])
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.liveHistory !== this.state.liveHistory) {
			this.chart.updateOptions({
				file: this.state.liveHistory
			});
		}
	}

	render() {
		return (
			<div className="stats">
				<p>Krok: <strong>{this.props.step}</strong></p>
				<p>Gęstość: <strong>{Number(this.props.live * 100 / this.props.all).toFixed(3)}%</strong></p>
				<p><strong>{this.props.live}</strong> żywych komórek na <strong>{this.props.all}</strong> wszystkich</p>
				<div className="chart" ref="chartDom"></div>
			</div>
		);
	}

}

export default Stats;
