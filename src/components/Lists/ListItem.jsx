import React, {Component} from "react";
import styles from './ListItem.module.scss';

import arrow from "../../assets/arrow.svg";

class ListItem extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}



	render() {



		if(this.props.index == null) {
			return(
				<div className={[styles.container, styles.null].join(" ")} >
					<div className={styles.texts} >
						<h3 className={styles.name}>{this.props.name}</h3>
						<div className={styles.employees}>
							<span>employees</span>
							<h4>{this.props.employees}</h4>
						</div> 
					</div>
					<div className={styles.score}> 
						<h2 className={styles.index}>N/A</h2>
						<img src={arrow} className={styles.arrow} alt="indexChangeSymbol" />
					</div>
				</div>

			)
		}

		return(
			<div className={styles.container} >
				<div className={styles.texts} >
					<h3 className={styles.name}>{this.props.name}</h3>
					<div className={styles.employees}>
						<span>employees</span>
						<h4>{this.props.employees}</h4>
					</div> 
				</div>
				<div className={styles.score}> 
					<h2 className={styles.index}>{this.props.index}</h2>
					<img src={arrow} className={styles.arrow} alt="indexChangeSymbol" />
				</div>
			</div>

		)
	}
}

export default ListItem;