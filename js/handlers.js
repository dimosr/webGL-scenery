function onDocumentKeyDown(event){ 
	var keyCode = event.which;
	keyMap[keyCode] = true;
	var cameraNeck = cameraEquipment.getNeck();
	if(keyMap[37] == true){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(4));
	}
	if(keyMap[39] == true){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(-4));
	}
	if(keyMap[38] == true){
		cameraNeck.translateZ(-2);
		if(cameraNeck.position.x > scene.xBoundary)
			cameraNeck.position.x = scene.xBoundary;
		if(cameraNeck.position.x < (-1)*scene.xBoundary)
			cameraNeck.position.x = (-1)*scene.xBoundary;
		if(cameraNeck.position.y > scene.yBoundary)
			cameraNeck.position.y = scene.yBoundary;
		if(cameraNeck.position.y < (-1)*scene.yBoundary)
			cameraNeck.position.y = (-1)*scene.yBoundary;

		joggingAngle += elapsed * 0.3;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 0.7 + cameraNeck.getNeckOffsetY();
	}
	if(keyMap[40] == true){
		cameraNeck.translateZ(+2);
		if(cameraNeck.position.x > scene.xBoundary)
			cameraNeck.position.x = scene.xBoundary;
		if(cameraNeck.position.x < (-1)*scene.xBoundary)
			cameraNeck.position.x = (-1)*scene.xBoundary;
		if(cameraNeck.position.y > scene.yBoundary)
			cameraNeck.position.y = scene.yBoundary;
		if(cameraNeck.position.y < (-1)*scene.yBoundary)
			cameraNeck.position.y = (-1)*scene.yBoundary;

		joggingAngle += elapsed * 0.3;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 1 + cameraNeck.getNeckOffsetY();
	}
}

function onDocumentKeyUp(event){
	var keyCode = event.which;
	keyMap[keyCode] = false;
}