import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Box extends React.Component {
	getClass() {
		let classList = "";
		if (this.props.isWall) {
			classList += " wall ";
		} else if (this.props.isVisited) {
			classList += " visited ";
		}
		classList += " box ";
		return classList.trim();
	}
	dragHandler = () => {
		if (this.props.isDragging) {
			this.props.onClick();
		}
	};
	render() {
		return (
			<div
				className={this.getClass()}
				onClick={this.props.onClick}
				onMouseEnter={this.dragHandler}
			></div>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: Array(30).fill(Array(50).fill({ isWall: false, isVisited: false })),
			isDragging: false,
		};
	}
	makeWall = (x, y) => {
		let grid = [...this.state.grid];
		console.log(grid[y][x]);
		grid[y][x] = {
			isWall: !this.state.grid[y][x].isWall,
			isVisited: false,
		};
		this.setState({
			grid: grid,
		});
	};

	dragHandler = (isDrag) => {
		this.setState({
			isDragging: isDrag,
		});
	};

	render() {
		let rowKey = 5000;
		return (
			<div
				className="center-container grid-container"
				onMouseDown={() => this.dragHandler(true)}
				onMouseUp={() => this.dragHandler(false)}
			>
				{this.state.grid.map((rows, rowNum) => {
					return (
						<div className="center-row-container" key={--rowKey}>
							{rows.map((box, index) => {
								return (
									<Box
										isWall={box.isWall}
										isVisited={box.isVisited}
										key={rowNum * 30 + index}
										isDragging={this.state.isDragging}
										onClick={() => this.makeWall(index, rowNum)}
									/>
								);
							})}
						</div>
					);
				})}
				<button onClick={() => this.makeWall(5, 1)}>Check!</button>
			</div>
		);
	}
}
ReactDOM.render(<Board />, document.getElementById("root"));

// function tick() {
// 	const element = (
// 		<div>
// 			<h1>Hello, world!</h1>
// 			<h2>It is {new Date().toLocaleTimeString()}.</h2>
// 		</div>
// 	);
// 	ReactDOM.render(element, document.getElementById("root"));
// }

// setInterval(tick, 1000);
