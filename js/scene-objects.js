function createGroundSurface(dimensionX, dimensionY, textureIMG, anisotropy){
	var geometry = new THREE.PlaneGeometry( dimensionX, dimensionY);
	var texture = new THREE.ImageUtils.loadTexture( textureIMG );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50,50);
	texture.anisotropy = anisotropy;
	var material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, shininess: 100, specular: 0x33cc33});
	var plane = new THREE.Mesh( geometry, material );
	return plane;
}

function createSkySphere(radius, textureIMG){
	var geometry = new THREE.SphereGeometry(radius);
	var texture = new THREE.ImageUtils.loadTexture( textureIMG );
	texture.minFilter = THREE.NearestFilter;
	var material = new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, specular: 0x000000} );
	var sphere = new THREE.Mesh( geometry, material );
	return sphere;
}

function createLakeEllipsoid(lakeTextureIMG, positionX, positionY, positionZ, lakeDiameter, lakeThickness){
	var lakeParametricEquation = function(u, v){
		var a=lakeDiameter, b=lakeDiameter, c=lakeThickness;
		u = u*2*Math.PI;
		v = v*Math.PI;
		return new THREE.Vector3( (a*Math.cos(u)*Math.sin(v)), b*Math.sin(u)*Math.sin(v), c*Math.cos(v) );
	}
	var lakeGeometry = new THREE.ParametricGeometry(lakeParametricEquation, 40, 40);
	var lakeTexture = new THREE.ImageUtils.loadTexture( lakeTextureIMG );
	var lakeMaterial = new THREE.MeshPhongMaterial( {map: lakeTexture, side: THREE.DoubleSide} );
	var lakeEllipsoid = new THREE.Mesh( lakeGeometry, lakeMaterial );

	var lakeContainer = new THREE.Object3D();
	lakeContainer.add(lakeEllipsoid);

	var rocksSettings = [
		{'scale': 5, 'thick': 50,'xPos': -0.8, 'yPos': 0.55},
		{'scale': 5, 'thick': 50,'xPos': -1.1, 'yPos': 0.35},
		{'scale': 12, 'thick': 30,'xPos': -1, 'yPos': 0.15},
		{'scale': 20, 'thick': 20,'xPos': -1.15, 'yPos': 0.1},
		{'scale': 30, 'thick': 10,'xPos': -1.05, 'yPos': 0.05},
		{'scale': 5, 'thick': 50,'xPos': 0.3, 'yPos': -0.95},
		{'scale': 6, 'thick': 40,'xPos': 0.3, 'yPos': -1.05},
		{'scale': 14, 'thick': 30,'xPos': 0.1, 'yPos': -1.05},
		{'scale': 18, 'thick': 10,'xPos': -0.025, 'yPos': -1},
		{'scale': 35, 'thick': 10,'xPos': -0.02, 'yPos': -1.075}
	]
	for(var i=0; i < 10; i++){
		var rockParametricEquation = function(u, v){
			var a=Math.floor(lakeDiameter/(rocksSettings[i].scale)), b=Math.floor(lakeDiameter/(rocksSettings[i].scale)), c=lakeThickness*(rocksSettings[i].thick);
			u = u*2*Math.PI;
			v = v*Math.PI;
			return new THREE.Vector3( (a*Math.cos(u)*Math.sin(v)), b*Math.sin(u)*Math.sin(v), c*Math.cos(v) );
		}
		var rockGeometry = new THREE.ParametricGeometry(rockParametricEquation, 40, 40);
		var rockTexture = new THREE.ImageUtils.loadTexture( 'textures/rock.png' );
		var rockMaterial = new THREE.MeshPhongMaterial( {map: rockTexture, side: THREE.DoubleSide} );
		var rockEllipsoid = new THREE.Mesh( rockGeometry, rockMaterial );
		rockEllipsoid.translateX((rocksSettings[i].xPos)*lakeDiameter);
		rockEllipsoid.translateY((rocksSettings[i].yPos)*lakeDiameter);

		lakeContainer.add(rockEllipsoid);
	}
	
	lakeContainer.translateX(positionX);
	lakeContainer.translateY(positionY);
	lakeContainer.translateZ(positionZ);
	lakeContainer.positionX = 600;
	lakeContainer.positionY = 600;
	lakeContainer.radius = 730;
	return lakeContainer;
}

function generateRocks(){

}

function generateClouds(terrainDim){
	var spot1 = Math.floor(terrainDim/10);
	var spot2 = Math.floor(terrainDim/5);
	var spot3 = Math.floor(terrainDim/3.333);
	var spot4 = Math.floor(terrainDim/4);
	var spot5 = Math.floor(terrainDim/2.85);
	var spot6 = Math.floor(terrainDim/2.5);

	var cloud1A = createCloud(25, spot1, spot1, spot2, 0.9);
	scene.add(cloud1A);
	var cloud2A = createCloud(50, spot2, spot1, spot2, 0.9);
	scene.add(cloud2A);
	var cloud3A = createCloud(70, spot1, spot2, spot2, 0.95);
	scene.add(cloud3A);
	var cloud4A = createCloud(90, spot3, spot1, spot2, 0.9);
	scene.add(cloud4A);

	var cloud1B = createCloud(25, spot1, spot1, spot4, 0.9);
	scene.add(cloud1B);
	var cloud2B = createCloud(50, spot2, spot1, spot3, 0.9);
	scene.add(cloud2B);
	var cloud3B = createCloud(70, spot1, spot2, spot5, 0.95);
	scene.add(cloud3B);
	var cloud4B = createCloud(90, spot3, spot1, spot6, 0.9);
	scene.add(cloud4B);

	var cloud5A = createCloud(50, -spot2, -spot1, spot2, 0.9);
	scene.add(cloud5A);
	var cloud6A = createCloud(70, -spot1, -spot2, spot2, 0.95);
	scene.add(cloud6A);
	var cloud7A = createCloud(90, -spot3, -spot1, spot2, 0.9);
	scene.add(cloud7A);

	var cloud5B = createCloud(50, -spot2, -spot1, spot3, 0.9);
	scene.add(cloud5B);
	var cloud6B = createCloud(70, -spot1, -spot1, spot5, 0.95);
	scene.add(cloud6B);
	var cloud7B = createCloud(90, -spot3, -spot1, spot5, 0.9);
	scene.add(cloud7B);

	var cloud8 = createCloud(50, -spot2, spot1, spot2, 0.9);
	scene.add(cloud8);
	var cloud9 = createCloud(70, -spot1, spot2, spot2, 0.95);
	scene.add(cloud9);
	var cloud10 = createCloud(90, -spot3, spot1, spot2, 0.9);
	scene.add(cloud10);

	var cloud11 = createCloud(50, spot2, -spot2, spot2, 0.9);
	scene.add(cloud11);
	var cloud12 = createCloud(70, spot4, -spot1, spot2, 0.95);
	scene.add(cloud12);
	var cloud13 = createCloud(70, spot1, spot1, spot6, 0.9);
	scene.add(cloud13);
}

function createCloud(size, positionX, positionY, positionZ, opacity){
	var material = new THREE.MeshPhongMaterial( { color: 0xe6e6e6, transparent: true } );
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
	directionalLight.position.set((-6)*radius, (-6)*radius, (-40)*radius);

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

	lake = createLakeEllipsoid("textures/lake.jpg", 600, 600, 0, 700, 5.3);
	scene.lake = lake;
	scene.add(lake);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
}