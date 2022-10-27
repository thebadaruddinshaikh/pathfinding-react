import React from "react";

function Box(props) {
	let house;

	function getClass() {
		let classList = "box";
		if (props.isWall) {
			classList += " wall ";
		} else if (props.isPath) {
			classList += props.shouldAnimate ? " animate-path " : " path ";
		} else if (props.isVisited) {
			classList += props.shouldAnimate ? " animate-visit " : " visit ";
		}

		return classList.trim();
	}

	function mouseDownHandler() {
		if (props.isStart || props.isEnd) {
			props.setHouseOnMove(true, props.isStart);
		}
		interactionHandler();
	}

	function mouseEnterHandler() {
		if (props.isDragging) {
			interactionHandler();
		}
	}

	function interactionHandler() {
		if (props.isHouseMoving) {
			if (!props.isWall) {
				props.moveHouseto(props.coord);
			}
		} else if (!props.isStart && !props.isEnd) {
			props.onClick(props.coord[0], props.coord[1]);
		}
	}

	if (props.isStart || props.isEnd) {
		house = <div className="house">{props.isStart ? "🏁" : "🎯"}</div>;
	}

	return (
		<div
			className={getClass()}
			onMouseEnter={mouseEnterHandler}
			onMouseDown={mouseDownHandler}
		>
			{house}
		</div>
	);
}

function areEqual(props, nextProps) {
	return (
		props.isWall === nextProps.isWall &&
		props.isVisited === nextProps.isVisited &&
		props.isStart === nextProps.isStart &&
		props.isEnd === nextProps.isEnd &&
		props.isPath === nextProps.isPath &&
		props.isDragging === nextProps.isDragging
	);
}

export default React.memo(Box, areEqual);
