import React, {Component} from "react";
import styles from './Graph.module.scss';

import DATA from "../assets/data";

import Lists from "./Lists/Lists.jsx";
import Chart from "./Chart.jsx";

//import { Line } from "react-chartjs-2";



class Graph extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	numSeparations: 6
	  };

	  this.createLines = this.createLines.bind(this);
	}

	createLines(){

		let lines = [];
		let increment = (100/this.state.numSeparations);
		let num = 0;
		for(let i = 0; i <= this.state.numSeparations; i++) {
			lines.push(<span className={styles.line} key={i}><span className={styles.lineNum}>{Math.round(num)}</span></span>);
			num += increment;
		}
		return lines;
	}

	render() {

		const lines = this.createLines();


		return(
			<max>
				<div className={styles.container} >
					
					<Chart data={DATA} />

					<div className={styles.axisWrapper}>
						<span className={styles.axisLabel} >index</span>
						<span className={styles.axis } ></span>
						<div className={styles.lines}>
							{lines}
						</div>
					</div>
					<Lists numDivs={this.state.numSeparations} data={DATA}/>
				</div>
			</max>
		)
	}
}

export default Graph;