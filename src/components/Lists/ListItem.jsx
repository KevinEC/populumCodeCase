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
	  	responseRate: (this.props.responseRate * 100) + "%",
	  	expanded: false
	  };

	  this.nullCheck = this.nullCheck.bind(this);
	  this.setArrow = this.setArrow.bind(this);
	  this.toggleView = this.toggleView.bind(this);
	  this.setNotification = this.setNotification.bind(this);
	  this.calcColor = this.calcColor.bind(this);

	}

	componentDidMount(){
		this.nullCheck();
		this.setArrow();
		this.setNotification();
	}

	toggleView(){
		let expanded = this.state.expanded;

		let changeScale = (Math.abs(this.props.indexChange)/ 200 ) * 10;

		if(expanded) {
			this.setState({
				viewStyle: "",
				indexColor: {backgroundColor: this.calcColor(!expanded, this.props.index/100 )}
			}); 
		} else {
			this.setState({
				viewStyle: styles.expanded,
				indexColor: {backgroundColor: this.calcColor(!expanded, this.props.index/100 )}
			});
		}
		this.setState(prevState => ({ expanded: !prevState.expanded }));
	}

	calcColor(expanded, scale){
		if(expanded) {
			console.log("indexChange:", this.props.indexChange);
			console.log(scale);
			if(scale >= 0.5) {
				//speical scale for nice color interval in RGB color space from faint green to strong green
				let R = 187 - 37 * scale;
				let G = 237;
				let B = 157 - 58 * scale;

				return "rgba(" + R + "," + G + "," + B + ")";

			} else if(scale < 0.5){
				//speical scale for nice color interval in RGB color space from orange to red
				let R = 237;
				let G = 128 + 144 * scale;
				let B = 99;

				return "rgba(" + R + "," + G + "," + B + ")";
			}

		} else {
			return ""; // transparent bg
		}
		
	}

	setNotification(){
		if (this.props.responseRate < 0.5) {
			this.setState({dotStyle: styles.responseRateDot});
		} else {
			this.setState({dotStyle: ""});
		}
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

		return(
			<div className={[styles.container, this.state.indexStyle, this.state.viewStyle].join(" ")}  onClick={this.toggleView.bind(this)}>
				<div className={this.state.dotStyle}> <div></div> </div>
				<div className={styles.texts} >
					<h3 className={styles.name}>{this.props.name}</h3>
					<div className={styles.employees}>
						<span>employees</span>
						<h4>{this.props.employees}</h4>
					</div>
				</div>
				<div className={styles.score}> 
					<h2 className={styles.index} style={this.state.indexColor} >{this.state.index}</h2>
					<div className={[styles.indexChange, this.state.indexChangeStyle].join(" ")} >
						<h4 style={this.state.indexChangeColor} >{this.state.indexChange}</h4>
						<img src={arrow} className={styles.arrow} style={this.state.arrowDirection} alt="indexChangeSymbol" />
					</div>
				</div>
				<div className={styles.responseRate}>
					<span>Response rate:</span>
					<h4>{this.state.responseRate}</h4>
				</div>
			</div>

		)
	}
}

export default ListItem;