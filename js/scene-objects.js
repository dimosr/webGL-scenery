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

function createLakeEllipsoid(lakeTextureIMG, positionX, positionY, positionZ, lakeRadius, lakeThickness){
	var lakeParametricEquation = function(u, v){
		var a=lakeRadius, b=lakeRadius, c=lakeThickness;
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

	lakeContainer.rocks = [];
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
			var a=Math.floor(lakeRadius/(rocksSettings[i].scale)), b=Math.floor(lakeRadius/(rocksSettings[i].scale)), c=lakeThickness*(rocksSettings[i].thick);
			u = u*2*Math.PI;
			v = v*Math.PI;
			return new THREE.Vector3( (a*Math.cos(u)*Math.sin(v)), b*Math.sin(u)*Math.sin(v), c*Math.cos(v) );
		}
		var rockGeometry = new THREE.ParametricGeometry(rockParametricEquation, 40, 40);
		var rockTexture = new THREE.ImageUtils.loadTexture( 'textures/rock.png' );
		var rockMaterial = new THREE.MeshPhongMaterial( {map: rockTexture, side: THREE.DoubleSide} );
		var rockEllipsoid = new THREE.Mesh( rockGeometry, rockMaterial );
		rockEllipsoid.translateX((rocksSettings[i].xPos)*lakeRadius);
		rockEllipsoid.translateY((rocksSettings[i].yPos)*lakeRadius);

		lakeContainer.add(rockEllipsoid);
		lakeContainer.rocks.push({'radius': (lakeRadius/(rocksSettings[i].scale)), 'positionX': (rockEllipsoid.position.x + positionX), 'positionY': (rockEllipsoid.position.y + positionY)});
	}
	
	lakeContainer.translateX(positionX);
	lakeContainer.translateY(positionY);
	lakeContainer.translateZ(positionZ);
	lakeContainer.positionX = positionX;
	lakeContainer.positionY = positionY;
	lakeContainer.radius = lakeRadius*1.04;
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
	var confs = [[25, spot1, spot1, spot2, 0.9], [50, spot2, spot1, spot2, 0.9], [70, spot1, spot2, spot2, 0.95], [90, spot3, spot1, spot2, 0.9],
				[25, spot1, spot1, spot4, 0.9], [50, spot2, spot1, spot3, 0.9], [70, spot1, spot2, spot5, 0.95], [90, spot3, spot1, spot6, 0.9],
				[50, -spot2, -spot1, spot2, 0.9], [70, -spot1, -spot2, spot2, 0.95], [90, -spot3, -spot1, spot2, 0.9], [50, -spot2, -spot1, spot3, 0.9],
				[70, -spot1, -spot1, spot5, 0.95], [90, -spot3, -spot1, spot5, 0.9], [50, -spot2, spot1, spot2, 0.9], [70, -spot1, spot2, spot2, 0.95],
				[90, -spot3, spot1, spot2, 0.9], [50, spot2, -spot2, spot2, 0.9], [70, spot4, -spot1, spot2, 0.95], [70, spot1, spot1, spot6, 0.9]];
	var clouds = [];
	for(var i=0; i<confs.length; i++){
		var cloud = createCloud(confs[i][0], confs[i][1], confs[i][2], confs[i][3], confs[i][4]);
		clouds.push(cloud);
	}
	return clouds;
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

function generateTrees(terrainDim){
	var t = terrainDim;
	var spots1 = [[t/10, t/10], [t/8, t/8], [t/6, t/6], [t/10, t/6], [t/1, t/3], [t/4, t/8], [t/2, t/2.5], [t/2, t/10], [t/10, t/8]];
	var spots2 = [[t/3, t/4],[t/3, t/6], [t/8, t/4], [t/6, t/8], [t, t], [t/2, t/8], [t, t/10], [t/4, t/4], [t/10, t/4]];
	var spots3 = [[t/1, t/6],[t/6, t/4], [t/6, t/10], [t/2, t/6], [t/2, t/2], [t, t/8], [t/10,t], [t/8, t/2], [t/10,t/2]];
	var trees = [];

	for(var i=0; i<spots1.length; i++){
		var tree = createFirTree(350, 4, 50, 'textures/trunk.png', 'textures/fir.png', spots1[i][0], 0, spots1[i][1]);
		trees.push(tree);
	}
	for(var i=0; i<spots2.length; i++){
		var tree = createTree(350, 4, 25, 'textures/trunk.png', 'textures/leaves.png', spots2[i][0], 0, spots2[i][1], "sphere");
		trees.push(tree);
	}
	for(var i=0; i<spots3.length; i++){
		var tree = createTree(350, 4, 25, 'textures/trunk.png', 'textures/leaves.png', spots3[i][0], 0, spots3[i][1], "torrus");
		trees.push(tree);
	}
	return trees;
}

function createTree(height, width, leavesRadius, trunkTextureIMG, leavesTextureIMG, positionX, positionY, positionZ, type){
	var treeContainer = new THREE.Object3D();

	var trunkGeometry = new THREE.CylinderGeometry( width, width, height);
	var trunkTexture = new THREE.ImageUtils.loadTexture( trunkTextureIMG );
	var trunkMaterial = new THREE.MeshPhongMaterial( {map: trunkTexture, side: THREE.DoubleSide, shininess: 100 } );
	var trunk = new THREE.Mesh( trunkGeometry, trunkMaterial );

	if(type = "torrus"){
		var leavesGeometry = new THREE.TorusKnotGeometry(leavesRadius);
	}
	else if(type = "sphere"){
		var leavesGeometry = new THREE.SphereGeometry(leavesRadius);
	}
	else{
		var leavesGeometry = new THREE.TorusKnotGeometry(leavesRadius);
	}
	var leavesTexture = new THREE.ImageUtils.loadTexture( leavesTextureIMG );
	var leavesMaterial = new THREE.MeshPhongMaterial( {color: 0x33cc33, map: leavesTexture, side: THREE.DoubleSide, shininess: 100} );
	var leaves = new THREE.Mesh( leavesGeometry, leavesMaterial);
	leaves.translateY(height/2);
	var coords = [[leavesRadius,0,0],[leavesRadius,leavesRadius,0],[leavesRadius,leavesRadius,leavesRadius],[0,leavesRadius,0],[0,leavesRadius,leavesRadius],[leavesRadius,leavesRadius,leavesRadius],[(-1)*leavesRadius,0,0],[0,(-1)*leavesRadius,0],[0,0,(-1)*leavesRadius],[(-1)*leavesRadius,(-1)*leavesRadius,(-1)*leavesRadius]]
	for(var i=0; i<10; i++){
		var parts = leaves.clone();
		parts.translateX(coords[i][0]);
		parts.translateY(coords[i][1]);
		parts.translateZ(coords[i][2]);
		treeContainer.add(parts);
	}

	treeContainer.add(trunk);
	treeContainer.add(leaves);
	treeContainer.rotateOnAxis(new THREE.Vector3( 1, 0, 0 ), degInRad(90));
	treeContainer.translateZ(positionZ);
	treeContainer.translateY(positionY + height/3);
	treeContainer.translateX(positionX);

	return treeContainer;
}

function createFirTree(height, width, leavesRadius, trunkTextureIMG, leavesTextureIMG, positionX, positionY, positionZ){
	var treeContainer = new THREE.Object3D();

	var trunkGeometry = new THREE.CylinderGeometry( width, width, height);
	var trunkTexture = new THREE.ImageUtils.loadTexture( trunkTextureIMG );
	var trunkMaterial = new THREE.MeshPhongMaterial( {map: trunkTexture, side: THREE.DoubleSide, shininess: 100 } );
	var trunk = new THREE.Mesh( trunkGeometry, trunkMaterial );

	var leavesGeometry = new THREE.CylinderGeometry(0, 50, height);
	var leavesTexture = new THREE.ImageUtils.loadTexture( leavesTextureIMG );
	var leavesMaterial = new THREE.MeshPhongMaterial( {color: 0x33cc33, map: leavesTexture, side: THREE.DoubleSide, shininess: 100} );
	var leaves = new THREE.Mesh( leavesGeometry, leavesMaterial);
	leaves.translateY(height/2);

	treeContainer.add(trunk);
	treeContainer.add(leaves);
	treeContainer.rotateOnAxis(new THREE.Vector3( 1, 0, 0 ), degInRad(90));
	treeContainer.translateZ(positionZ);
	treeContainer.translateY(positionY + height/3);
	treeContainer.translateX(positionX);

	return treeContainer;
}

function createSquareHouse(width, height, roofHeight){
	var houseContainer = new THREE.Object3D();

	var houseGeometry = new THREE.BoxGeometry(width, height, width);
	var houseMaterials = [new THREE.MeshBasicMaterial({color:0xFF0000, side: THREE.DoubleSide, shininess: 50}), 
                     	new THREE.MeshBasicMaterial({color:0x00FF00, side: THREE.DoubleSide, shininess: 50}), 
                    	new THREE.MeshBasicMaterial({color:0x0000FF, side: THREE.DoubleSide, shininess: 50}), 
                    	new THREE.MeshBasicMaterial({color:0xFFFF00, side: THREE.DoubleSide, shininess: 50}), 
                    	new THREE.MeshBasicMaterial({color:0x00FFFF, side: THREE.DoubleSide, shininess: 50}), 
                    	new THREE.MeshBasicMaterial({color:0xFFFFFF, side: THREE.DoubleSide, shininess: 50})];
    var houseMaterial = new THREE.MeshFaceMaterial(houseMaterials); 
	var house = new THREE.Mesh( houseGeometry, houseMaterial);

	var roofGeometry = new THREE.CylinderGeometry(0, width*0.69, roofHeight, 4, 4);
	var roofMaterial = new THREE.MeshPhongMaterial({color:0x0f2e4c, side: THREE.DoubleSide, shininess: 50});
	var roof = new THREE.Mesh( roofGeometry, roofMaterial);
	roof.translateZ(height*0.88);
	roof.rotateOnAxis(new THREE.Vector3(1,0,0), degInRad(90));
	roof.rotateOnAxis(new THREE.Vector3(0,1,0), degInRad(45));

	houseContainer.add(house);
	houseContainer.add(roof);
	houseContainer.translateZ(height*0.5);

	return houseContainer;
}

function createSceneObjects(sceneObject){
	var terrainDimension = 2000;
	var ground = createGroundSurface(terrainDimension, terrainDimension, 'textures/grass.png', renderer.getMaxAnisotropy());
	scene.xBoundary = (0.92*terrainDimension)/2;
	scene.yBoundary = (0.92*terrainDimension)/2;
	scene.add(ground);

	var sky = createSkySphere((terrainDimension/2), 'textures/sky.jpg');
	scene.add(sky);

	var clouds = generateClouds(terrainDimension);
	for(var i=0; i<clouds.length; i++){
		scene.add(clouds[i]);
	}

	var sun = createSun(Math.floor(terrainDimension/40), 'textures/sun.jpg', 100, 200, 900);
	scene.add(sun);

	var lake = createLakeEllipsoid("textures/lake.jpg", 600, 600, 0, 700, 5.3);
	scene.lake = lake;
	scene.add(lake);

	var trees = generateTrees(terrainDimension);
	for(var i=0; i<trees.length; i++){
		scene.add(trees[i]);
	}

	var house = createSquareHouse(200, 200, 150);
	scene.add(house);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
}