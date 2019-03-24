import React, {Component} from "react";
import styles from './Lists.module.scss';

import DATA from "../../assets/data";

import List from "./List.jsx";

class Lists extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	numDivs: this.props.numDivs
	  };
	
	  this.lists = "";
	  this.divideByQuality = this.divideByQuality.bind(this);
	  this.createLists = this.createLists.bind(this);
	}

	componentDidMount(){
	}

	divideByQuality(data){

		let divided = [];

		// init array with guranteed deep copys cuz javascript
		for(let i = 0; i <= this.state.numDivs-1; i++) {
			divided.push([]);
		}

		data.forEach( (manager, index) => {
			let lowerLimit = 0;
			let upperLimit = (100/this.state.numDivs);
			let limitStep = (100/this.state.numDivs);

			for(let i = 0; i <= this.state.numDivs-1; i++) {
				if(manager.index >= lowerLimit && manager.index < upperLimit){
					divided[i].push( Object.assign(manager)); // make a deep copy. aka clone
				}
				lowerLimit += limitStep;
				upperLimit += limitStep; // produces bug with upperlimit = 1.2 on last iteration but doesnt matter
			}
		});

		this.lists = divided;
	}

	createLists() {
		let listComponents = [];

		listComponents = this.lists.map( (list, index) => {
			return <List numDivs={this.state.numDivs} key={index} data={[...list]} />;
		});

		return listComponents;
	}

	render() {

		//divide data by quality
		this.divideByQuality(DATA);
		// create react elemnts
		const Lists = this.createLists();

		return(
			<div className={styles.container} >
				{Lists}
			</div>

		)
	}
}

export default Lists;