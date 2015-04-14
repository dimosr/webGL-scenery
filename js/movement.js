function canMoveIn(positionX, positionY, sceneObject){
	if(!insideSceneBoundaries(positionX, positionY, sceneObject)){
		return false;
	}
	if(!outsideLakeBoundaries(positionX, positionY, sceneObject)){
		return false;
	}
	if(!outsideRockBoundaries(positionX, positionY, sceneObject)){
		return false;
	}
	if(hittingHouseWall(positionX, positionY, sceneObject)){
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

function outsideRockBoundaries(positionX, positionY, scene){
	var outsideRock = true;
	for(var i=0; i<scene.lake.rocks.length; i++){
		var rock = scene.lake.rocks[i];
		var rockRadius = rock.radius;
		var rockCenterX = rock.positionX;
		var rockCenterY = rock.positionY;
		if( (Math.pow((positionX - rockCenterX),2) + Math.pow((positionY - rockCenterY),2)) < Math.pow(rockRadius,2) ){
			outsideRock = false;
		}
	}
	return outsideRock;
}

function hittingHouseWall(positionX, positionY, scene){
	if( (isNear(positionY, scene.helpVertices.yMin, 2)) || (isNear(positionY, scene.helpVertices.yMax, 2)) ){
		if( (positionX <= scene.helpVertices.xMax) && (positionX >= scene.helpVertices.xMin) ){
			return true;
		}
	}
	if( isNear(positionX, scene.helpVertices.xMax, 2) ){
		if( (positionY <= scene.helpVertices.yMax) && (positionY >= scene.helpVertices.yMin) ){
			return true;
		}
	}
	return false;
}

function rotateCoin(coin, degrees){
	coin.rotateOnAxis(new THREE.Vector3( 1, 0, 0 ), degInRad(degrees));
}