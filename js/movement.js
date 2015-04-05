function canMoveIn(positionX, positionY, sceneObject){
	if(!insideSceneBoundaries(positionX, positionY, sceneObject)){
		return false;
	}

	return true;
}

function insideSceneBoundaries(positionX, positionY, scene){
	if(Math.pow(positionX,2) + Math.pow(positionY,2) > Math.pow(scene.xBoundary,2)){
		return false;
	}
	else{
		return true;
	}
}