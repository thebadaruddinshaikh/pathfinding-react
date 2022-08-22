import React from "react";

export default class NavBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isAlgoDropDownVisible: false,
			isSpeedDropDownVisible: false,
		};
	}

	toggleDropDownVisiblity({
		algoOptionClicked = false,
		speedOptionClicked = false,
	}) {
		this.setState((state, props) => ({
			isAlgoDropDownVisible: algoOptionClicked
				? !state.isAlgoDropDownVisible
				: false,
			isSpeedDropDownVisible: speedOptionClicked
				? !state.isSpeedDropDownVisible
				: false,
		}));
	}

	updateAlgo(algo) {
		this.toggleDropDownVisiblity({});
		this.props.updateAlgo(algo);
	}

	updateSpeed(speed) {
		this.toggleDropDownVisiblity({});
		this.props.updateSpeed(speed);
	}

	render() {
		return (
			<nav>
				<h2>Pathfinding</h2>
				<div className="navControls">
					<div className="navOption">
						<button
							onClick={() => this.toggleDropDownVisiblity({ algoOptionClicked: true })}
						>
							Algorithms <br />
							<sub>{this.props.selectedAlgo}</sub>
						</button>
						<ul
							className="dropdown-options"
							id="algo-dropdown"
							style={{
								visibility: this.state.isAlgoDropDownVisible ? "visible" : "hidden",
							}}
						>
							<li onClick={() => this.updateAlgo("BFS")}>BFS</li>
							<li onClick={() => this.updateAlgo("DFS")}>DFS</li>
							<li onClick={() => this.updateAlgo("DIK")}>Dijkstra's</li>
							<li onClick={() => this.updateAlgo("AST")}>A*</li>
						</ul>
					</div>

					<div className="navOption">
						<button
							onClick={() =>
								this.toggleDropDownVisiblity({ speedOptionClicked: true })
							}
						>
							Speed <br />
							<sub>{this.props.selectedSpeed}</sub>
						</button>
						<ul
							className="dropdown-options"
							id="speed-dropdown"
							style={{
								visibility: this.state.isSpeedDropDownVisible ? "visible" : "hidden",
							}}
						>
							<li onClick={() => this.updateSpeed("IN")}>Insane ⚡️</li>
							<li onClick={() => this.updateSpeed("FS")}>Fast</li>
							<li onClick={() => this.updateSpeed("MD")}>Medium</li>
							<li onClick={() => this.updateSpeed("SL")}>Slow</li>
						</ul>
					</div>

					<div className="navOption">
						<button
							onClick={() => this.props.findPath({ triggerFromNav: true })}
							disabled={this.props.isUnderProgramControl}
						>
							Find Path
						</button>
					</div>

					<div className="navOption">
						<button
							onClick={() => {
								this.props.clearPath(true);
							}}
						>
							Clear Path
						</button>
					</div>

					<div className="navOption">
						<button onClick={this.props.clearBoard}>Clear Board</button>
					</div>
				</div>
			</nav>
		);
	}
}
