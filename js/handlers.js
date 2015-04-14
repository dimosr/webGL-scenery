function onDocumentKeyDown(event){ 
	var keyCode = event.keyCode;
	keyMap[keyCode] = true;
}

function onDocumentKeyUp(event){
	var keyCode = event.keyCode;
	keyMap[keyCode] = false;
}

function executeMovement(){
	var cameraNeck = cameraEquipment.getNeck();
	var camera = cameraEquipment.getCamera();
	scene.movementSteps = 10;
	if(keyMap[37] == true){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(4));
	}
	if(keyMap[39] == true){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(-4));
	}
	if(keyMap[38] == true){
		cameraNeck.translateZ((-1)*scene.movementSteps);
		if(!canMoveIn(cameraNeck.position.x, cameraNeck.position.y, scene)){
			cameraNeck.translateZ(scene.movementSteps);
		}
		joggingAngle += elapsed * 0.4;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 0.15 + cameraNeck.getNeckOffsetY();
	}
	if(keyMap[40] == true){
		cameraNeck.translateZ(scene.movementSteps);
		if(!canMoveIn(cameraNeck.position.x, cameraNeck.position.y, scene)){
			cameraNeck.translateZ((-1)*scene.movementSteps);
		}
		joggingAngle += elapsed * 0.4;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 0.15 + cameraNeck.getNeckOffsetY();
	}
	if(keyMap[82] == true){
		camera.rotateOnAxis(new THREE.Vector3(1,0,0), degInRad(8));
	}
	if(keyMap[70] == true){
		camera.rotateOnAxis(new THREE.Vector3(1,0,0), degInRad(-8));
	}

	rotateCoin(scene.coin, 20);
	if(!outsideCoinBoundaries(cameraNeck.position.x, cameraNeck.position.y, scene)){
		scene.remove(scene.coin);
	}

	updateProgressBar('progress', cameraNeck.position.x, cameraNeck.position.y, scene);
}

function updateProgressBar(divID, positionX, positionY,scene){
	var progressBar = document.getElementById(divID);
	var container = progressBar.offsetParent

	var distance = EuclideanDistance(positionX, positionY, scene.coin.position.x, scene.coin.position.y);
	var maxDistance = EuclideanDistance(positionX, positionY, scene.xBoundary, scene.yBoundary);

	var percent = ((distance/maxDistance)*100).toFixed(2);
	if(percent > 100 ){
		percent = 100;
	}
	progressBar.style.width = percent + "%";
}