function createGroundSurface(dimensionX, dimensionY, textureIMG, anisotropy){

	var geometry = new THREE.PlaneGeometry( dimensionX, dimensionY);
	var texture = THREE.ImageUtils.loadTexture( textureIMG );
	texture.anisotropy = anisotropy;
	var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	var plane = new THREE.Mesh( geometry, material );
	return plane;
}

function createSceneObjects(sceneObject){
	var ground = createGroundSurface(400, 400, 'textures/grass3.jpg', renderer.getMaxAnisotropy());
	scene.xBoundary = (0.95*400)/2;
	scene.yBoundary = (0.95*400)/2;
	scene.add(ground);
}