function onDocumentKeyDown(event){ 
	var keyCode = event.which;
	var cameraNeck = cameraEquipment.getNeck();
	if(keyCode == 37){
		cameraNeck.rotation.y += degInRad(4);
	}
	if(keyCode == 39){
		cameraNeck.rotation.y -= degInRad(4);
	}
	if(keyCode == 38){
		cameraNeck.translateZ(-2);

		joggingAngle += elapsed * 0.3;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 0.7 + cameraNeck.getNeckOffsetY();
	}
	if(keyCode == 40){
		cameraNeck.translateZ(+2);

		joggingAngle += elapsed * 0.3;
        cameraNeck.position.z = Math.sin(degInRad(joggingAngle)) / 1 + cameraNeck.getNeckOffsetY();
	}
}