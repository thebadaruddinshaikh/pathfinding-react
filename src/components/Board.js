import React from "react";
import { GRID } from "../constants/constants";
import Algorithms from "../algorithms";

import Box from "./Box";
import NavBar from "./NavBar";

export default class Board extends React.PureComponent {
	speedToDelayMap = {
		IN: 0,
		FS: 25,
		MD: 75,
		SL: 100,
	};

	speedToStringMap = {
		IN: "Insane ⚡️",
		FS: "Fast",
		MD: "Medium",
		SL: "Slow",
	};

	algoToMethodMap = null;

	algoToMessageMap = {
		BFS: "Breadth First Search guarantees a shortest path",
		DFS: "Depth First Search does not guarantee the shortest path",
	};

	algoToStringMap = {
		BFS: "BFS",
		DFS: "DFS",
		DIK: "Dijkstra's",
		AST: "A*",
	};

	constructor(props) {
		super(props);
		this.algorithms = new Algorithms();
		this.algoToMethodMap = {
			BFS: this.algorithms.breadthFirstSearch.bind(this),
			DFS: this.algorithms.depthFirstSearch.bind(this),
			DIK: this.algorithms.dijkstras.bind(this),
			AST: this.algorithms.aStar.bind(this),
		};

		this.state = {
			grid: this.constructor.buildGrid(),
			isDragging: false,
			isHouseMoving: false,
			isStartMoving: false,
			isPathFound: false,
			isUnderProgramControl: false,
			selectedAlgo: "BFS",
			selectedSpeed: "FS",
			start: [5, 12],
			end: [45, 12],
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

	changeAlgo = (selectedAlgo) => {
		this.setState({
			selectedAlgo,
		});
	};

	changeSpeed = (selectedSpeed) => {
		this.setState({
			selectedSpeed,
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

	clearPath = (rebuildWithAnimation = false) => {
		if (!this.state.isUnderProgramControl) {
			if (rebuildWithAnimation) {
				this.setState({
					isPathFound: false,
				});
			}
			let grid = this.state.grid.slice();

			for (let y = 0; y < GRID.NUM_ROWS; y++) {
				for (let x = 0; x < GRID.NUM_COLS; x++) {
					if (grid[y][x].isVisited || grid[y][x].isPath) {
						grid[y][x] = {
							isVisited: false,
							isPath: false,
						};
					}
				}
			}

			this.setState({
				grid,
			});
		}
	};

	clearBoard = () => {
		if (!this.state.isUnderProgramControl) {
			this.setState({
				grid: this.constructor.buildGrid(),
				isPathFound: false,
			});
		}
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
		speed = this.speedToDelayMap[this.state.selectedSpeed],
		triggerFromNav = false,
	}) => {
		if (!this.state.isUnderProgramControl) {
			this.clearPath();
			this.setState({
				isUnderProgramControl: true,
				isPathFound: !triggerFromNav,
			});

			const nodeArr = [start];
			await this.algoToMethodMap[this.state.selectedAlgo](nodeArr, speed, end);
			this.setState({
				isUnderProgramControl: false,
			});
		}
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
			<div>
				<NavBar
					findPath={this.findPath}
					isUnderProgramControl={this.state.isUnderProgramControl}
					clearPath={this.clearPath}
					clearBoard={this.clearBoard}
					updateAlgo={this.changeAlgo}
					updateSpeed={this.changeSpeed}
					selectedAlgo={this.algoToStringMap[this.state.selectedAlgo]}
					selectedSpeed={this.speedToStringMap[this.state.selectedSpeed]}
				/>
				<div className="info-block">
					<p>
						{" "}
						🏁 : Start <t /> 🎯 : End <br />{" "}
						<span>
							{" "}
							You can drag on the grid to draw walls , and drag 🏁 & 🎯 to move them on
							the grid , Select any algorithm to visualize
						</span>
					</p>
					<p style={{ fontWeight: "bold" }}>
						{this.algoToMessageMap[this.state.selectedAlgo]}
					</p>
				</div>
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
				</div>
				<div className="info-block">
					{" "}
					<a
						href={"https://github.com/thebadaruddinshaikh/pathfinding-react"}
						target={"_blank"}
						rel="noreferrer"
					>
						Source Code
					</a>
				</div>
			</div>
		);
	}
}
