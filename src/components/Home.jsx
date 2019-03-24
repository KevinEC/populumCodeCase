import React, {Component} from "react";
import styles from './Home.module.scss';

import Header from "./Header.jsx"
import Graph from "./Graph.jsx"

class Home extends Component {
	render() {
		return(
			<div className={styles.main}>
				<Header />
				<Graph />
			</div>
		)
	}
}

export default Home;