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

function generateClouds(terrainDim){
	var spot1 = Math.floor(terrainDim/10);
	var spot2 = Math.floor(terrainDim/5);
	var spot3 = Math.floor(terrainDim/3.333);
	var spot4 = Math.floor(terrainDim/4);
	var spot5 = Math.floor(terrainDim/2.85);
	var spot6 = Math.floor(terrainDim/2.5);

	var cloud1A = createCloud(25, spot1, spot1, spot2, 0.7);
	scene.add(cloud1A);
	var cloud2A = createCloud(50, spot2, spot1, spot2, 0.85);
	scene.add(cloud2A);
	var cloud3A = createCloud(70, spot1, spot2, spot2, 0.95);
	scene.add(cloud3A);
	var cloud4A = createCloud(90, spot3, spot1, spot2, 0.65);
	scene.add(cloud4A);

	var cloud1B = createCloud(25, spot1, spot1, spot4, 0.7);
	scene.add(cloud1B);
	var cloud2B = createCloud(50, spot2, spot1, spot3, 0.85);
	scene.add(cloud2B);
	var cloud3B = createCloud(70, spot1, spot2, spot5, 0.95);
	scene.add(cloud3B);
	var cloud4B = createCloud(90, spot3, spot1, spot6, 0.7);
	scene.add(cloud4B);

	var cloud5A = createCloud(50, -spot2, -spot1, spot2, 0.7);
	scene.add(cloud5A);
	var cloud6A = createCloud(70, -spot1, -spot2, spot2, 0.95);
	scene.add(cloud6A);
	var cloud7A = createCloud(90, -spot3, -spot1, spot2, 0.85);
	scene.add(cloud7A);

	var cloud5B = createCloud(50, -spot2, -spot1, spot3, 0.7);
	scene.add(cloud5B);
	var cloud6B = createCloud(70, -spot1, -spot1, spot5, 0.95);
	scene.add(cloud6B);
	var cloud7B = createCloud(90, -spot3, -spot1, spot5, 0.85);
	scene.add(cloud7B);

	var cloud8 = createCloud(50, -spot2, spot1, spot2, 0.7);
	scene.add(cloud8);
	var cloud9 = createCloud(70, -spot1, spot2, spot2, 0.95);
	scene.add(cloud9);
	var cloud10 = createCloud(90, -spot3, spot1, spot2, 0.85);
	scene.add(cloud10);

	var cloud11 = createCloud(50, spot2, -spot2, spot2, 0.7);
	scene.add(cloud11);
	var cloud12 = createCloud(70, spot4, -spot1, spot2, 0.95);
	scene.add(cloud12);
	var cloud13 = createCloud(70, spot1, spot1, spot6, 0.75);
	scene.add(cloud13);
}

function createCloud(size, positionX, positionY, positionZ, opacity){
	var material = new THREE.MeshBasicMaterial( { color: 0xe6e6e6, transparent: true } );
	material.opacity = opacity;
	var geometry = new THREE.TorusKnotGeometry( size);
	var torusKnot = new THREE.Mesh( geometry, material );
	torusKnot.translateZ(positionZ);
	torusKnot.translateX(positionX);
	torusKnot.translateY(positionY);
	return torusKnot;
}

function createSun(radius, textureIMG, positionX, positionY, positionZ){
	var sunContainer = new THREE.Object3D();
	var geometry = new THREE.SphereGeometry(radius);
	var texture = new THREE.ImageUtils.loadTexture( textureIMG );
	var material = new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, shininess: 100 } );
	var sunSphere = new THREE.Mesh( geometry, material );

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set((-3)*radius, (-3)*radius, (-50)*radius);

	sunContainer.add(sunSphere);
	sunContainer.add(directionalLight);

	sunContainer.translateZ(positionZ);
	sunContainer.translateX(positionX);
	sunContainer.translateY(positionY);
	
	return sunContainer;
}

function createSceneObjects(sceneObject){
	var terrainDimension = 2000;
	var ground = createGroundSurface(terrainDimension, terrainDimension, 'textures/grass.png', renderer.getMaxAnisotropy());
	scene.xBoundary = (0.92*terrainDimension)/2;
	scene.yBoundary = (0.92*terrainDimension)/2;
	scene.add(ground);

	var sky = createSkySphere((terrainDimension/2), 'textures/sky.jpg');
	scene.add(sky);

	generateClouds(terrainDimension);

	var sun = createSun(Math.floor(terrainDimension/40), 'textures/sun.jpg', 100, 200, 900);
	scene.add(sun);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
}