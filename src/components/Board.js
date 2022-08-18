import React from "react";
import Box from "./box";
import { GRID } from "../constants";
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
			isPathFound: false,
			isUnderProgramControl: false,
			start: [5, 10],
			end: [35, 10],
		};
	}

	static buildGrid() {
		let grid = [];
		for (let y = 0; y < GRID.NUM_ROWS; y++) {
			let tempArr = [];
			for (let x = 0; x < GRID.NUM_COLS; x++) {
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
		if (!this.state.isUnderProgramControl) {
			let start = this.state.start;
			let end = this.state.end;
			if (
				this.state.isStartMoving &&
				(coord[0] !== this.state.end[0] || coord[1] !== this.state.end[1])
			) {
				start = coord.slice();
			} else if (
				coord[0] !== this.state.start[0] ||
				coord[1] !== this.state.start[1]
			) {
				end = coord.slice();
			}

			this.setState({
				start,
				end,
			});

			if (this.state.isPathFound) {
				this.clearPath();
				this.findPath({ start, end, speed: 0 });
			}
		}
	};

	makeWall = (x, y) => {
		if (!this.state.isUnderProgramControl) {
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
		}
	};

	clearPath = () => {
		let grid = this.state.grid.slice();

		for (let y = 0; y < GRID.NUM_ROWS; y++) {
			for (let x = 0; x < GRID.NUM_COLS; x++) {
				if (grid[y][x].isVisited || grid[y][x].isPath) {
					grid[y][x] = {
						// ...box,
						isVisited: false,
						isPath: false,
					};
				}
			}
		}

		this.setState({
			grid,
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

	findPath = async ({
		start = this.state.start,
		end = this.state.end,
		speed = 100,
	}) => {
		this.setState({
			isUnderProgramControl: true,
		});

		const bfs = this.algorithms.breadthFirstSearch.bind(this);
		const queue = [start];
		await bfs(queue, speed, end);

		this.setState({
			isUnderProgramControl: false,
		});
	};

	drawPath = async (pathArr, speed) => {
		for (let i = pathArr.length - 1; i >= 0; i--) {
			let [x, y] = pathArr[i];
			let grid = this.state.grid.slice();
			grid[y][x] = {
				...grid[y][x],
				isPath: true,
			};
			this.setState({
				grid: grid,
			});

			if (speed !== 0) {
				await new Promise((r) => setTimeout(r, speed));
			}
		}
		this.setState({
			isPathFound: true,
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
										isPath={box.isPath}
										isPathFound={this.state.isPathFound}
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
				<button
					onClick={() => this.findPath({ speed: 100 })}
					disabled={this.state.isUnderProgramControl}
				>
					Find Path
				</button>
				<button
					onClick={() => {
						this.setState({
							isPathFound: false,
						});
						this.clearPath();
					}}
				>
					Clear Path
				</button>
			</div>
		);
	}
}
