import React from "react";

export default React.memo(function Box(props){

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

	function mouseDownHandler(){
		props.mouseDownHandler()
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

	
		let house;
		if (props.isStart || props.isEnd) {
			house = <div className="house">{props.isStart ? "🏁" : "🎯"}</div>;
		}

		return (
			<div
				className={getClass()}
				onMouseEnter={mouseEnterHandler}
				onMouseDown={mouseDownHandler}
				onMouseUp={props.mouseUpHandler}
			>
				{house}
			</div>
		);
}, (prevProps, props) => {
	return prevProps.isWall === props.isWall &&
	prevProps.isVisited === props.isVisited &&
	prevProps.isStart === props.isStart &&
	prevProps.isEnd === props.isEnd &&
	prevProps.isPath === props.isPath &&
	prevProps.isDragging === props.isDragging
})		