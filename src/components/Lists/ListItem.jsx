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
	  this.rgb2hex = this.rgb2hex.bind(this);

	}

	componentDidMount(){
		this.nullCheck();
		this.setArrow();
		this.setNotification();
	}

	toggleView(){
		let expanded = this.state.expanded;

		let changeScale = (Math.abs(this.props.indexChange)/ 200 ) * 10;
		let indexRgb = this.calcColor(!expanded, this.props.index/100 );
		let indexHex = this.rgb2hex(indexRgb);

		console.log("rgb", indexRgb);
		console.log("hex", indexHex);

		if(expanded) {
			this.setState({
				viewStyle: "",
	
				indexBg: { backgroundImage: `none` },
				indexColor: {backgroundColor: indexRgb }
			}); 
		} else {
			this.setState({
				viewStyle: styles.expanded,
				indexBg: { backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23` + indexHex + `' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` },
				indexColor: {backgroundColor: indexRgb }
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
				let R = Math.floor(187 - 37 * scale);
				let G = 237;
				let B = Math.floor(157 - 58 * scale);

				return "rgb(" + R + "," + G + "," + B + ")";

			} else if(scale < 0.5){
				//speical scale for nice color interval in RGB color space from orange to red
				let R = 237;
				let G = Math.floor(128 + 144 * scale);
				let B = 99;

				return "rgb(" + R + "," + G + "," + B + ")";
			}

		} else {
			return ""; // transparent bg
		}
		
	}

	setNotification(){
		if (this.props.responseRate < 0.5) {
			this.setState({ 
				dotStyle: styles.responseRateDot,
				responseRateColor: {color: "#FB765E"} 
			});
		} else {
			this.setState({dotStyle: ""});
		}

		if(this.props.responseRate >= 0.75){
			this.setState({ responseRateColor: {color: "rgb(187,237,157)"}  });
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

	//help function
	rgb2hex(rgb){
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return (rgb && rgb.length === 4) ?
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
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
				<div className={styles.score} style={this.state.indexBg} > 
					<h2 className={styles.index} style={this.state.indexColor} >{this.state.index}</h2>
					<div className={[styles.indexChange, this.state.indexChangeStyle].join(" ")} >
						<h4 style={this.state.indexChangeColor} >{this.state.indexChange}</h4>
						<img src={arrow} className={styles.arrow} style={this.state.arrowDirection} alt="indexChangeSymbol" />
					</div>
				</div>
				<div className={styles.responseRate}>
					<span>Response rate:</span>
					<h4 style={this.state.responseRateColor} >{this.state.responseRate}</h4>
				</div>
			</div>

		)
	}
}



export default ListItem;