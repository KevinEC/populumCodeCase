import React, {Component} from "react";
import styles from './Graph.module.scss';

import Lists from "./Lists/Lists.jsx";

class Graph extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	numSeparations: 5
	  };

	  this.createLines = this.createLines.bind(this);
	}

	createLines(){

		let lines = [];
		let increment = 20;
		let num = 0;
		for(let i = 0; i <= this.state.numSeparations; i++) {
			lines.push(<span className={styles.line} key={i}><span className={styles.lineNum}>{num}</span></span>);
			num += increment;
		}
		return lines;
	}

	render() {

		const lines = this.createLines();

		return(
			<max>
				<div className={styles.container} >
					<div className={styles.axisWrapper}>
						<span className={styles.axis } ></span>
						<div className={styles.lines}>
							{lines}
						</div>
					</div>
					<Lists numDivs={this.state.numSeparations} />
				</div>
			</max>
		)
	}
}

export default Graph;