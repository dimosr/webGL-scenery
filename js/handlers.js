function onDocumentKeyDown(event){ 
	var keyCode = event.which;
	var cameraNeck = cameraEquipment.getNeck();
	if(keyCode == 37){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(4));
	}
	if(keyCode == 39){
		cameraNeck.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(-4));
	}
	if(keyCode == 38){
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
	if(keyCode == 40){
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