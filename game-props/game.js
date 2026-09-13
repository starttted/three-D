const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a1a);
scene.fog = new THREE.Fog(0x0a0a1a, 12, 30);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(5, 4, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0x404060, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const base = new THREE.Mesh(
  new THREE.CylinderGeometry(2.5, 2.8, 0.4, 32),
  new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.2, metalness: 0.8 })
);
base.position.y = -0.2;
scene.add(base);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(2.6, 0.05, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x00ffcc, emissiveIntensity: 2 })
);
ring.rotation.x = Math.PI / 2;
ring.position.y = 0.01;
scene.add(ring);

const propsGroup = new THREE.Group();

const chestMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
const chestBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 1.2), chestMat);
chestBody.position.set(-0.9, 0.7, 0);
propsGroup.add(chestBody);
const chestLid = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.3, 1.2), chestMat);
chestLid.position.set(-0.9, 1.35, 0);
chestLid.rotation.x = -0.4;
propsGroup.add(chestLid);

const gemMat = new THREE.MeshStandardMaterial({
  color: 0x00ffcc,
  emissive: 0x00ffcc,
  emissiveIntensity: 1.5,
  transparent: true,
  opacity: 0.9
});
const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.5), gemMat);
gem.position.set(1.2, 1, 0.5);
propsGroup.add(gem);

const coinMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.2 });
for (let i = 0; i < 3; i++) {
  const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), coinMat);
  coin.position.set(0.8 + i * 0.15, 0.05 + i * 0.05, -0.5 - i * 0.1);
  coin.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
  propsGroup.add(coin);
}

scene.add(propsGroup);

const animate = () => {
  requestAnimationFrame(animate);
  propsGroup.rotation.y += 0.005;
  gem.rotation.y += 0.02;
  gem.position.y = 1 + Math.sin(Date.now() * 0.003) * 0.2;
  ring.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});