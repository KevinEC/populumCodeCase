import React, {Component} from "react";
import styles from './List.module.scss';

import ListItem from "./ListItem";

class List extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	width: this.props.numDivs
	  };

	  this.createList = this.createList.bind(this);
	  this.sortList = this.sortList.bind(this);
	}

	sortList(key){
		this.props.data.sort(function (b, a) {
			let keyA = a[key];
			let keyB = b[key];

			if(keyA < keyB) return -1;
			if(keyA > keyB) return 1;
			return 0;
		});
	}

	createList(){
		let items = [];
		items = this.props.data.map( (item, index) => {
			return <ListItem name={item.name} index={item.index} employees={item.employees} responseRate={item.responseRate} indexChange={item.indexChange} key={index} />
		});

		return items;
	}

	render() {


		this.sortList("index");
		const listItems = this.createList();
		console.log(this.props.data);

		let width = (100/this.state.width);

		const styles = {
			flexBasis: width + "%",
			maxWidth: width + "%"
		}

		return(
			<div className={styles.container} style={styles} >
				{listItems}
			</div>	
		)
	}
}

export default List;