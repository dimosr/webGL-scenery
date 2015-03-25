function onDocumentKeyDown(event){ 
	var keyCode = event.keyCode;
	keyMap[keyCode] = true;
	//keyMap[keyCode] = event.type == 'keydown';
	executeMovement();
}

function onDocumentKeyUp(event){
	var keyCode = event.keyCode;
	keyMap[keyCode] = false;
	//keyMap[keyCode] = event.type == 'keydown';
	executeMovement();
}

function executeMovement(){
	var cameraNeck = cameraEquipment.getNeck();
	if(keyMap[37] == true){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(4));
	}
	if(keyMap[39] == true){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(-4));
	}
	if(keyMap[38] == true){
		cameraNeck.translateZ(-2);
		if(Math.pow(cameraNeck.position.x,2) + Math.pow(cameraNeck.position.y,2) > Math.pow(scene.xBoundary,2)){
			cameraNeck.translateZ(+2);
		}

		joggingAngle += elapsed * 0.3;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 0.7 + cameraNeck.getNeckOffsetY();
	}
	if(keyMap[40] == true){
		cameraNeck.translateZ(+2);
		if(Math.pow(cameraNeck.position.x,2) + Math.pow(cameraNeck.position.y,2) > Math.pow(scene.xBoundary,2)){
			cameraNeck.translateZ(-2);
		}

		joggingAngle += elapsed * 0.3;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 1 + cameraNeck.getNeckOffsetY();
	}
}