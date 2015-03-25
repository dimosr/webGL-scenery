function onDocumentKeyDown(event){ 
	var keyCode = event.which;
	var cameraNeck = cameraEquipment.getNeck();
	if(keyCode == 37){
		cameraNeck.rotation.y += degInRad(2);
	}
	if(keyCode == 39){
		cameraNeck.rotation.y -= degInRad(2);
	}
	if(keyCode == 38){
		cameraNeck.translateZ(-1);
	}
	if(keyCode == 40){
		cameraNeck.translateZ(+1)
	}
}