import React, {Component} from "react";
import styles from './ListItem.module.scss';

import arrow from "../../assets/arrow.svg";

class ListItem extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	indexStyle: "",
	  	index: this.props.index,
	  	indexChange: this.props.indexChange + "%",
	  	expanded: false
	  };

	  this.nullCheck = this.nullCheck.bind(this);
	  this.setArrow = this.setArrow.bind(this);
	  this.toggleView = this.toggleView.bind(this);
	}

	componentDidMount(){
		this.nullCheck();
		this.setArrow();
	}

	toggleView(){
		this.setState(prevState => ({ expanded: !prevState.expanded }));
	}

	nullCheck(){
		if(this.props.index == null) {
			this.setState({
				indexStyle: styles.null,
				index: "N/A"
			});
		}

		if(this.props.indexChange == null) {
			this.setState({
				indexChange: "N/A",
				indexChangeStyle: styles.indexChangeNull
			});
		}
	}

	setArrow(){
		if(this.props.indexChange == 0) {
			this.setState({
				arrowDirection: {
					transform: "rotate(-45deg)"
				}
			});
		} else if (this.props.indexChange > 0) {
			this.setState({
				arrowDirection: {
					transform: "rotate(-90deg)"
				}
			});
		} else if (this.props.indexChange < 0) {
			this.setState({
				arrowDirection: {
					transform: "rotate(0)"
				}
			});
		} else if (this.props.indexChange == null) {
			this.setState({
				arrowDirection: {
					transform: "rotate(-45deg)"
				}
			});
		}
	}


	render() {

		let view = "";

		if(this.state.expanded){
			view = styles.expanded;
		}

		return(
			<div className={[styles.container, this.state.indexStyle, view].join(" ")}  onClick={this.toggleView.bind(this)}>
				<div className={styles.texts} >
					<h3 className={styles.name}>{this.props.name}</h3>
					<div className={styles.employees}>
						<span>employees</span>
						<h4>{this.props.employees}</h4>
					</div>
				</div>
				<div className={styles.score}> 
					<h2 className={styles.index}>{this.state.index}</h2>
					<div className={[styles.indexChange, this.state.indexChangeStyle].join(" ")} >
						<h4>{this.state.indexChange}</h4>
						<img src={arrow} className={styles.arrow} style={this.state.arrowDirection} alt="indexChangeSymbol" />
					</div>
				</div>
			</div>

		)
	}
}

export default ListItem;