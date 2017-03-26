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
			labels: ['Krok', 'Żywe komórki'],
			axes: {
				'y': {
					axisLabelFormatter: val => `${Number(val * 100 / this.props.all).toFixed(3)}%`,
					valueFormatter: val => `${Number(val * 100 / this.props.all).toFixed(3)}% (${val} żywych)`,
					includeZero: true
				}
			}
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
			<div>
				<p>
					Krok {this.props.step}: {this.props.live} żywych komórek
					na {this.props.all} wszystkich
					({Number(this.props.live * 100 / this.props.all).toFixed(3)}%)
				</p>
				<div ref="chartDom"></div>
			</div>
		);
	}

}

export default Stats;