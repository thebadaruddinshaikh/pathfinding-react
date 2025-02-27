import React, { useState } from "react";

export default function NavBar(props) {
	const [state, setState] = useState({
		isAlgoDropDownVisible: false,
		isSpeedDropDownVisible: false,
	});

	function toggleDropDownVisiblity({
		algoOptionClicked = false,
		speedOptionClicked = false,
	}) {
		setState({
			isAlgoDropDownVisible: algoOptionClicked
				? !state.isAlgoDropDownVisible
				: false,
			isSpeedDropDownVisible: speedOptionClicked
				? !state.isSpeedDropDownVisible
				: false,
		});
	}

	function updateAlgo(algo) {
		toggleDropDownVisiblity({});
		props.updateAlgo(algo);
	}

	function updateSpeed(speed) {
		toggleDropDownVisiblity({});
		props.updateSpeed(speed);
	}

	return (
		<nav>
			<h2>Pathfinding</h2>
			<div className="navControls">
				<div className="navOption">
					<button
						onClick={() => toggleDropDownVisiblity({ algoOptionClicked: true })}
					>
						Algorithms <br />
						<sub>{props.selectedAlgo}</sub>
					</button>
					<ul
						className="dropdown-options"
						id="algo-dropdown"
						style={{
							visibility: state.isAlgoDropDownVisible ? "visible" : "hidden",
						}}
					>
						<li onClick={() => updateAlgo("BFS")}>BFS</li>
						<li onClick={() => updateAlgo("DFS")}>DFS</li>
						{/* <li onClick={() => updateAlgo("DIK")}>Dijkstra's</li>
							<li onClick={() => updateAlgo("AST")}>A*</li> */}
					</ul>
				</div>

				<div className="navOption">
					<button
						onClick={() => toggleDropDownVisiblity({ speedOptionClicked: true })}
					>
						Speed <br />
						<sub>{props.selectedSpeed}</sub>
					</button>
					<ul
						className="dropdown-options"
						id="speed-dropdown"
						style={{
							visibility: state.isSpeedDropDownVisible ? "visible" : "hidden",
						}}
					>
						<li onClick={() => updateSpeed("IN")}>Insane ⚡️</li>
						<li onClick={() => updateSpeed("FS")}>Fast</li>
						<li onClick={() => updateSpeed("MD")}>Medium</li>
						<li onClick={() => updateSpeed("SL")}>Slow</li>
					</ul>
				</div>

				<div className="navOption">
					<button
						onClick={() => props.findPath({ triggerFromNav: true })}
						disabled={props.isUnderProgramControl}
					>
						Find Path
					</button>
				</div>

				<div className="navOption">
					<button
						onClick={() => {
							props.clearPath(true);
						}}
					>
						Clear Path
					</button>
				</div>

				<div className="navOption">
					<button onClick={props.clearBoard}>Clear Board</button>
				</div>
			</div>
		</nav>
	);
}
