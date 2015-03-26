function createCameraEquipment(){
	var cameraEquipment, camera, neck;
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
	neck = new THREE.Object3D();
	neck.rotateOnAxis(new THREE.Vector3(1, 0, 0), degInRad(90));
	neck.up = new THREE.Vector3(0, 0, 1);
	neck.position.z = 40;
	neck.getNeckOffsetY = function(){
		return 40;
	}
	neck.position.y = 0;
	neck.add(camera);
	cameraEquipment = {
		camera : camera,
		neck : neck,
		getCamera : function(){
			return this.camera;
		},
		getNeck : function(){
			return this.neck;
		}
	};
	return cameraEquipment;
}