(function(){
	window.onload = function(){
		var renderer = new THREE.WebGLRenderer();
		var scene = new THREE.Scene();
		var cube = null;
		var alpha = 0;
		renderer.setSize(1600,1080);//设置画布大小
		renderer.setClearColor(0x848484);//设置背景颜色
		document.getElementsByTagName('body')[0].appendChild(renderer.domElement);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		var camera = new THREE.OrthographicCamera(-10, 10, 8, -8,1, 50);
				   camera.position.set(5, 15, 25);
				   camera.lookAt(new THREE.Vector3(0, 0, 0));
				   scene.add(camera);
		var plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 16, 16),
		new THREE.MeshLambertMaterial({color: 0x00ff00}));
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -5;
		plane.receiveShadow = true;
		scene.add(plane);
		// var light = new THREE.SpotLight(0xffffff, 1, 100);
		// light.target.position.set(10, 50, 10);
		// light.castShadow = true;
		// // light.target = cube;
		// scene.add(light);
		//
		var texture = THREE.ImageUtils.loadTexture('/images/dog.jpg', {}, function() {
			console.log('图层加载成功');
	    	renderer.render(scene, camera);
		});
		var cube = new THREE.Mesh(new THREE.CubeGeometry(6,4,4),new THREE.MeshPhongMaterial({
				color: 0xa8a8a8,
				map:texture
				// emissive: 0xffffff
	        }));
			// cube.position.set(0,0,0);
			cube.rotation.y = -Math.PI / 50;
		 	cube.receiveShadow = true;
			cube.castShadow = true;
			scene.add(cube);
			var cicle = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.2,20,28),new THREE.MeshPhongMaterial({
			         color: 0xa8a8a8,
			     }));
			var cicle1 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.2,20,28),new THREE.MeshPhongMaterial({
			 	     color: 0xa8a8a8,
			 	 }));
			cicle.position.set(2,-2,2.3);
			cicle1.position.set(-2,-2,2);
			cicle.rotation.y = -Math.PI / 50;
			cicle1.rotation.y = -Math.PI / 50;
			cicle.castShadow = true;
			cicle1.castShadow = true;
			scene.add(cube);
			scene.add(cicle);
			scene.add(cicle1);
			var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
			light.position.set(-8, 10, 10);
			light.target = cube;
			light.castShadow = true;//设置生成动态阴影
			light.shadowCameraNear = 2;
			light.shadowCameraFar = 10;
			light.shadowCameraFov = 30;
			light.shadowCameraVisible = true;
			light.shadowMapWidth = 1024;
			light.shadowMapHeight = 1024;
			light.shadowDarkness = 0.3;
			scene.add(light);

			var ambient = new THREE.AmbientLight(0x666666);
			scene.add(ambient);

			requestAnimationFrame(draw);
			function draw() {
				alpha = 0.01;
				if (alpha > Math.PI * 2) {
					alpha -= Math.PI * 2;
				}

				// plane.position.set(2 * Math.cos(alpha), -5, 2 * Math.sin(alpha));

				cube.position.set(cube.position.x+alpha,cube.position.y,cube.position.z+alpha);
				cicle.position.set(cicle.position.x+alpha,cicle.position.y,cicle.position.z+alpha);
				cicle1.position.set(cicle1.position.x+alpha,cicle1.position.y,cicle1.position.z+alpha);
				renderer.render(scene, camera);
				if(cube.position.x<10){
					requestAnimationFrame(draw);
				}

			}
	}
})()
