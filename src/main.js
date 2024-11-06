import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { levels } from './levels/config.js';
import { LevelVisualizer } from './components/LevelVisualizer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 15;

const gridHelper = new THREE.GridHelper(20, 20, 0x00ff00, 0x003300);
scene.add(gridHelper);

let currentLevel = 1;
const levelVisualizer = new LevelVisualizer(scene);
levelVisualizer.createVisualization(currentLevel);

function updateLevelUI() {
    const level = levels.find(l => l.id === currentLevel);
    document.getElementById('level-info').textContent = 
        `Level ${level.id}: ${level.name} (${level.difficulty})`;
    
    const form = document.getElementById('form');
    form.innerHTML = '';
    
    Object.keys(level.requirements).forEach(req => {
        const input = document.createElement('input');
        input.type = req === 'password' ? 'password' : 'text';
        input.id = req;
        input.placeholder = req.charAt(0).toUpperCase() + req.slice(1);
        input.required = true;
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = level.hint;
    form.appendChild(hint);

    const button = document.createElement('button');
    button.onclick = simulateLogin;
    button.textContent = 'Submit';
    form.appendChild(button);
}

let loginAttempts = 0;
window.simulateLogin = async () => {
    const level = levels.find(l => l.id === currentLevel);
    const credentials = {};

    Object.keys(level.requirements).forEach(req => {
        const input = document.getElementById(req);
        if (input) {
            credentials[req] = input.value;
        }
    });

    if (level.validation(credentials)) {
        const packet = createPacket(0x00ff00);
        animatePacket(packet, () => {
            document.getElementById('status').textContent = 'Access Granted! Loading next level...';
            setTimeout(() => {
                currentLevel++;
                if (currentLevel <= levels.length) {
                    levelVisualizer.createVisualization(currentLevel);
                    updateLevelUI();
                } else {
                    document.getElementById('status').textContent = 'Congratulations! You completed all levels!';
                }
            }, 2000);
        });
    } else {
        const packet = createPacket(0xff0000);
        animatePacket(packet, () => {
            document.getElementById('status').textContent = 'Access Denied! Try again.';
        });
    }

    loginAttempts++;
    document.getElementById('attempts').textContent = `Login Attempts: ${loginAttempts}`;
};

function createPacket(color) {
    const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color })
    );
    
    packet.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );
    
    scene.add(packet);
    return packet;
}

function animatePacket(packet, callback) {
    const animate = () => {
        packet.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        if (packet.position.length() > 0.1) {
            requestAnimationFrame(animate);
        } else {
            scene.remove(packet);
            callback();
        }
    };
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    levelVisualizer.animate();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

updateLevelUI();