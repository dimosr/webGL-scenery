function createGroundSurface(dimensionX, dimensionY, textureIMG, anisotropy){
	var geometry = new THREE.PlaneGeometry( dimensionX, dimensionY);
	var texture = THREE.ImageUtils.loadTexture( textureIMG );
	texture.anisotropy = anisotropy;
	var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	var plane = new THREE.Mesh( geometry, material );
	return plane;
}

function createSkySphere(radius, textureIMG){
	var geometry = new THREE.SphereGeometry(radius);
	var texture = THREE.ImageUtils.loadTexture( textureIMG );
	var material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
	var sphere = new THREE.Mesh( geometry, material );
	return sphere;
}

function createSceneObjects(sceneObject){
	var ground = createGroundSurface(2000, 2000, 'textures/grass3.jpg', renderer.getMaxAnisotropy());
	scene.xBoundary = (0.92*2000)/2;
	scene.yBoundary = (0.92*2000)/2;
	scene.add(ground);

	var sky = createSkySphere(1000, 'textures/sky.jpg');
	scene.add(sky);
}