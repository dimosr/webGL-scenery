function canMoveIn(positionX, positionY, sceneObject){
	if(!insideSceneBoundaries(positionX, positionY, sceneObject)){
		return false;
	}
	if(!outsideLakeBoundaries(positionX, positionY, sceneObject)){
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

function outsideLakeBoundaries(positionX, positionY, scene){
	var lakeCenterX = scene.lake.positionX;
	var lakeCenterY = scene.lake.positionY;
	var lakeRadius = scene.lake.radius;
	if( (Math.pow((positionX - lakeCenterX),2) + Math.pow((positionY - lakeCenterY),2)) < Math.pow(lakeRadius,2) ){
		return false;
	}
	else{
		return true;
	}
}