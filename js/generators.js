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