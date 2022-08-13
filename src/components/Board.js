import React from "react";
import Box from "./box";
import Algorithms from "../algorithms";

export default class Board extends React.PureComponent {
	constructor(props) {
		super(props);
		this.algorithms = new Algorithms();

		this.state = {
			grid: this.constructor.buildGrid(),
			isDragging: false,
			isHouseMoving: false,
			isStartMoving: false,
			start: [5, 10],
			end: [35, 10],
		};
	}

	static buildGrid() {
		let grid = [];
		for (let y = 0; y < 20; y++) {
			let tempArr = [];
			for (let x = 0; x < 40; x++) {
				tempArr.push([-1, -1]);
			}
			grid[y] = tempArr;
		}
		return grid;
	}

	enableDragging = () => {
		this.setState({
			isDragging: true,
		});
	};

	disableDragging = () => {
		this.setState({
			isDragging: false,
			isHouseMoving: false,
		});
	};

	setHouseOnMove = (isHouseMoving, isStartMoving) => {
		this.setState({
			isHouseMoving,
			isStartMoving,
		});
	};

	moveHouseto = (coord) => {
		if (
			this.state.isStartMoving &&
			(coord[0] !== this.state.end[0] || coord[1] !== this.state.end[1])
		) {
			this.setState({
				start: coord.slice(),
			});
		} else if (
			coord[0] !== this.state.start[0] ||
			coord[1] !== this.state.start[1]
		) {
			this.setState({
				end: coord.slice(),
			});
		}
	};

	makeWall = (x, y) => {
		if (
			(x === this.state.start[0] && y === this.state.start[1]) ||
			(x === this.state.end[0] && y === this.state.end[1])
		) {
			return;
		}
		let grid = [...this.state.grid];
		grid[y][x] = {
			isWall: !this.state.grid[y][x].isWall,
			isVisited: false,
		};
		this.setState({
			grid: grid,
		});
	};

	markVisited = (x, y) => {
		let grid = [...this.state.grid];
		grid[y][x] = {
			isVisited: true,
		};
		this.setState({
			grid: grid,
		});
	};

	render() {
		let rowKey = 5000;
		return (
			<div
				className="center-container grid-container"
				onMouseDown={this.enableDragging}
				onMouseUp={this.disableDragging}
			>
				{this.state.grid.map((rows, rowNum) => {
					return (
						<div className="center-row-container" key={--rowKey}>
							{rows.map((box, index) => {
								return (
									<Box
										isWall={box.isWall}
										isVisited={box.isVisited}
										isStart={
											this.state.start[0] === index && this.state.start[1] === rowNum
										}
										isEnd={this.state.end[0] === index && this.state.end[1] === rowNum}
										key={rowNum * 30 + index}
										coord={[index, rowNum]}
										isDragging={this.state.isDragging}
										isHouseMoving={this.state.isHouseMoving}
										onClick={this.makeWall}
										setHouseOnMove={this.setHouseOnMove}
										moveHouseto={this.moveHouseto}
									/>
								);
							})}
						</div>
					);
				})}
				<button onClick={() => this.makeWall(5, 1)}>Check!</button>
				<button
					onClick={() => {
						const bfs = this.algorithms.breadthFirstSearch.bind(this);
						const queue = [this.state.start.slice()];
						const end = this.state.end.slice();
						bfs(queue, 100, end);
					}}
				>
					Visited
				</button>
			</div>
		);
	}
}
