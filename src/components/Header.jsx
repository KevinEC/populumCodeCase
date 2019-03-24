import React, {Component} from "react";
import styles from './Header.module.scss';

import logo from "../assets/logo.svg";

class Header extends Component {
	render() {
		return(
			<max>
				<header>
					<div className={styles.logoContainer}>
						<img src={logo} alt="logo" />
						<h5>frontend code case</h5>
					</div>
					<h1>Team Perfomance Overview</h1>
				</header>
			</max>			
		)
	}
}

export default Header;