function createGroundSurface(dimensionX, dimensionY, textureIMG, anisotropy){
	var geometry = new THREE.PlaneGeometry( dimensionX, dimensionY);
	var texture = new THREE.ImageUtils.loadTexture( textureIMG );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50,50);
	texture.anisotropy = anisotropy;
	var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	var plane = new THREE.Mesh( geometry, material );
	return plane;
}

function createSkySphere(radius, textureIMG){
	var geometry = new THREE.SphereGeometry(radius);
	var texture = new THREE.ImageUtils.loadTexture( textureIMG );
	var material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
	var sphere = new THREE.Mesh( geometry, material );
	return sphere;
}

function createCloud(size){
	var geometry = new THREE.SphereGeometry(size);
	var material = new THREE.MeshBasicMaterial( { color: 0xb8b894, transparent: true } );
	material.opacity = 0.3;
	var sphere = new THREE.Mesh( geometry, material );
	return sphere;
}

function createSceneObjects(sceneObject){
	var ground = createGroundSurface(2000, 2000, 'textures/grass.png', renderer.getMaxAnisotropy());
	scene.xBoundary = (0.92*2000)/2;
	scene.yBoundary = (0.92*2000)/2;
	scene.add(ground);

	var sky = createSkySphere(1000, 'textures/sky.jpg');
	scene.add(sky);

	var cloud = createCloud(25);
	cloud.translateZ(100);
	scene.add(cloud);
}