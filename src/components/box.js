import React from "react";

class Box extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.isWall !== nextProps.isWall ||
			this.props.isVisited !== nextProps.isVisited ||
			this.props.isStart !== nextProps.isStart ||
			this.props.isEnd !== nextProps.isEnd
		);
	}

	getClass() {
		let classList = "box";
		if (this.props.isWall) {
			classList += " wall ";
		} else if (this.props.isVisited) {
			classList += " visited ";
		}

		return classList.trim();
	}

	mouseDownHandler = () => {
		if (this.props.isStart || this.props.isEnd) {
			this.props.setHouseOnMove(true, this.props.isStart);
		}
		this.interactionHandler();
	};

	mouseEnterHandler = () => {
		if (this.props.isDragging) {
			this.interactionHandler();
		}
	};

	interactionHandler() {
		if (this.props.isHouseMoving) {
			if (!this.props.isWall) {
				this.props.moveHouseto(this.props.coord);
			}
		} else if (!this.props.isStart && !this.props.isEnd) {
			this.props.onClick(this.props.coord[0], this.props.coord[1]);
		}
	}

	render() {
		let house;

		if (this.props.isStart || this.props.isEnd) {
			house = <p>{this.props.isStart ? ">" : "O"}</p>;
		}

		return (
			<div
				className={this.getClass()}
				onMouseEnter={this.mouseEnterHandler}
				onMouseDown={this.mouseDownHandler}
			>
				{house}
			</div>
		);
	}
}

export default Box;
