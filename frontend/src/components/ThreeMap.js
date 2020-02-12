/**
 * React+Three.js 三维地球
 */
import './ThreeMap.css';
import React, { Component } from 'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import Stats from '../common/threejslibs/stats.min.js';
import satellite from 'satellite.js'
import { Timeline } from 'antd';

class ThreeMap extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.initThree();
	}
	initThree() {
		let stats;
		let camera, scene, renderer;
		let group;
		let group2;
		let group3;
		let container = document.getElementById('WebGL-output');
		let width = container.clientWidth, height = container.clientHeight;

		init();
		animate();

		function init() {
			scene = new THREE.Scene();
			group = new THREE.Group();
			group2 = new THREE.Group();
			group3 = new THREE.Group();
			scene.add(group2);
			scene.add(group);
			scene.add(group3);

			camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
			camera.position.x = -30;
			camera.position.y = 45;
			camera.position.z = 1500;
			camera.lookAt(scene.position);
			let orbitControls = new /*THREE.OrbitControls*/Orbitcontrols(camera);
			orbitControls.autoRotate = false;
			let ambi = new THREE.AmbientLight(0x686868);
			scene.add(ambi);
			let spotLight = new THREE.DirectionalLight(0xffffff);
			spotLight.position.set(camera.position.x, camera.position.y, camera.position.z);
			spotLight.intensity = 0.6;
			scene.add(spotLight);
			let loader = new THREE.TextureLoader();
			let planetTexture = require("../assets/imgs/planets/Earth.png");
			let satellite2 = require("../assets/imgs/planets/sat.png");
			loader.load(planetTexture, function (texture) {
				let geometry = new THREE.SphereGeometry(637.1, 200, 200);
				let material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
				let mesh = new THREE.Mesh(geometry, material);
				group2.add(mesh);
				group2.rotation.y += Math.PI*24/24;
			});

			let loader2 = new THREE.TextureLoader();
			loader2.load(satellite2, function (texture) {
				let geometry = new THREE.BoxGeometry(20, 20, 20, 10, 10, 10);
				let material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
				let mesh = new THREE.Mesh(geometry, material);
				group.add(mesh);
				let now = new Date();
				for (var i = 0; i < 60 * 60; i++) {
					//console.log(i);
					let temp = new Date(now.getTime() + i * 2000);
					var tleLine1 = '1 43944U 19005C   19324.55636076  .00000730  00000-0  46065-4 0  9991',
						tleLine2 = '2 43944  97.5126  58.5656 0012288 328.4538 126.0451 15.12157735 45819';

					var positionEci = get(tleLine1, tleLine2, temp);

					var x1 = positionEci.y / 10,
						y1 = positionEci.z / 10,
						z1 = positionEci.x / 10;
					let geometry = new THREE.SphereGeometry(1, 2, 2);
					let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
					let mesh = new THREE.Mesh(geometry, material);
					mesh.position.set(x1, y1, z1);
					group3.add(mesh);
				}
			});
			renderer = new THREE.WebGLRenderer();
			renderer.setClearColor(0x00000);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(width, height);
			container.appendChild(renderer.domElement);
			stats = new Stats();
			//container.appendChild(stats.dom);  //增加状态信息 
		}

		function get(tleLine1, tleLine2, temp) {
			var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
			var positionAndVelocity = satellite.propagate(satrec, temp);
			var positionEci = positionAndVelocity.position;
			var gmst = getgmst();
			var positionEcf = satellite.eciToEcf(positionEci, gmst);
			return positionEci;
		}

		function updateposition(group, scene) {
			var tleLine1 = '1 43944U 19005C   19324.55636076  .00000730  00000-0  46065-4 0  9991',
				tleLine2 = '2 43944  97.5126  58.5656 0012288 328.4538 126.0451 15.12157735 45819';
			var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
			var positionAndVelocity = satellite.propagate(satrec, new Date());
			var positionEci = positionAndVelocity.position,
				velocityEci = positionAndVelocity.velocity;
			var positionGd = satellite.eciToGeodetic(positionEci, new Date());
			var gmst = getgmst();
			var positionEcf = satellite.eciToEcf(positionEci, gmst);
			var satelliteX = positionEci.y,
				satelliteY = positionEci.z,
				satelliteZ = positionEci.x;
			//console.log(positionEcf);
			group.position.set(satelliteX / 10, satelliteY / 10, satelliteZ / 10);
		}

		function getgmst() {
			var date = new Date();
			var time = date.getTime();
			var jdut1 = Math.floor((time / 86400000) - (date.getTimezoneOffset() / 1440) + 2440587.5);
			var tut1 = (jdut1 - 2451545.0) / 36525.0;
			var temp = -6.2e-6 * tut1 * tut1 * tut1 + 0.093104 * tut1 * tut1 +
				(876600.0 * 3600 + 8640184.812866) * tut1 + 67310.54841;  //#  sec
			temp = (temp * Math.PI/180/240.0) % (Math.PI*2); // 360/86400 = 1/240, to deg, to rad

			if (temp < 0.0) {
				temp += Math.PI*2;
			}
			return temp;
		}

		function animate() {
			requestAnimationFrame(animate);
			render();
			stats.update();
		}
		function render() {
			updateposition(group);
			var date = new Date();
			var arg1 = ((date.getMonth()-3)*30+date.getDay()-22)*2*Math.PI/365;
			var arg2 = (date.getHours()-12)*2*Math.PI/24;
			var arg3 = arg1-2*Math.PI/3+arg2-Math.PI/6;
			group2.rotation.y = arg3; 
			 //这行可以控制地球自转
			renderer.render(scene, camera);
		}
	}
	render() {
		return (
			<div id='WebGL-output'></div>
		)
	}
}

export default ThreeMap;