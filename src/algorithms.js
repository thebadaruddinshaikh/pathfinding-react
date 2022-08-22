import { GRID } from "./constants/constants";

export default class Algorithms {
	async breadthFirstSearch(queue, speed, end) {
		//building the PrevNodeList
		const prevNodeList = this.constructor.buildGrid();

		this.markVisited(queue[0][0], queue[0][1]);

		//up, right, down, left
		const dy = [-1, 0, 1, 0];
		const dx = [0, 1, 0, -1];

		while (queue.length) {
			const box = queue.shift();

			for (let i = 0; i < 4; i++) {
				let x = box[0] + dx[i];
				let y = box[1] + dy[i];
				//check if off the grid
				if (x < 0 || y < 0 || x >= GRID.NUM_COLS || y >= GRID.NUM_ROWS) {
					continue;
				}
				//check if wall
				else if (this.state.grid[y][x].isWall) {
					continue;
				}
				//else put in queue
				if (!this.state.grid[y][x].isVisited) {
					prevNodeList[y][x] = box.slice();
					queue.push([x, y]);
					this.markVisited(x, y);

					if (speed !== 0) {
						await new Promise((r) => setTimeout(r, speed));
					}
				}

				if (x === end[0] && y === end[1]) {
					const pathArray = [];
					while (x !== -1 && y !== -1) {
						pathArray.push([x, y]);
						[x, y] = prevNodeList[y][x];
					}
					this.drawPath(pathArray, speed);
					return;
				}
			}
		}
	}

	async depthFirstSearch(stack, speed, end) {
		//building the PrevNodeList
		const prevNodeList = this.constructor.buildGrid();

		this.markVisited(stack[0][0], stack[0][1]);

		//up, right, down, left
		const dy = [-1, 0, 1, 0];
		const dx = [0, 1, 0, -1];

		while (stack.length) {
			const box = stack.pop();

			for (let i = 0; i < 4; i++) {
				let x = box[0] + dx[i];
				let y = box[1] + dy[i];
				//check if off the grid
				if (x < 0 || y < 0 || x >= GRID.NUM_COLS || y >= GRID.NUM_ROWS) {
					continue;
				}
				//check if wall
				else if (this.state.grid[y][x].isWall) {
					continue;
				}
				//else put in stack
				if (!this.state.grid[y][x].isVisited) {
					prevNodeList[y][x] = box.slice();
					stack.push([x, y]);
					this.markVisited(x, y);

					if (speed !== 0) {
						await new Promise((r) => setTimeout(r, speed));
					}
				}

				if (x === end[0] && y === end[1]) {
					const pathArray = [];
					while (x !== -1 && y !== -1) {
						pathArray.push([x, y]);
						[x, y] = prevNodeList[y][x];
					}
					this.drawPath(pathArray, speed);
					return;
				}
			}
		}
	}

	async dijkstras() {
		console.log("From dijkstras");
	}

	async aStar() {
		console.log("From A*");
	}
}
