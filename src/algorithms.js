export default class Algorithms {
	async breadthFirstSearch(queue, speed, end) {
		//building the PrevNodeList
		// let prevNodeList = this.prevNodeArray;

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
				if (x < 0 || y < 0 || x > 39 || y > 19) {
					continue;
				}
				//check if wall
				else if (this.state.grid[y][x].isWall) {
					continue;
				}
				//else put in queue
				if (!this.state.grid[y][x].isVisited) {
					// prevNodeList[y][x] = [...box];
					queue.push([x, y]);
					this.markVisited(x, y);
					await new Promise((r) => setTimeout(r, speed));
				}
				if (x === end[0] && y === end[1]) {
					// await this.buildPath(prevNodeList, this.stateManager.destination);
					return;
				}
			}
		}
	}
}
