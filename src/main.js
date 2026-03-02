import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { levels } from './levels/config.js';
import { LevelVisualizer } from './components/LevelVisualizer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.z = 15;

const gridHelper = new THREE.GridHelper(20, 20, 0x00ff00, 0x003300);
scene.add(gridHelper);

let currentLevel = 1;
const levelVisualizer = new LevelVisualizer(scene);
levelVisualizer.createVisualization(currentLevel);

function updateLevelUI() {
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return;

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
    button.onclick = handleLogin;
    button.textContent = 'Submit';
    form.appendChild(button);
}

let loginAttempts = 0;

function handleLogin() {
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return;

    const credentials = {};
    Object.keys(level.requirements).forEach(req => {
        const input = document.getElementById(req);
        if (input) {
            credentials[req] = input.value;
        }
    });

    loginAttempts++;
    document.getElementById('attempts').textContent = `Login Attempts: ${loginAttempts}`;

    if (level.validation(credentials)) {
        const packet = createPacket(0x00ff00);
        animatePacket(packet, () => {
            document.getElementById('status').textContent = 'Access Granted! Loading next level...';
            setTimeout(() => {
                if (currentLevel < levels.length) {
                    currentLevel++;
                    levelVisualizer.createVisualization(currentLevel);
                    updateLevelUI();
                    if (!helpPanel.classList.contains('hidden')) resetHelpPanel();
                    document.getElementById('status').textContent = 'Status: Monitoring';
                } else {
                    document.getElementById('form').innerHTML =
                        '<div class="hint" style="color:#00ff00;font-size:16px;">All levels complete. Well done.</div>';
                    document.getElementById('status').textContent = 'All Levels Cleared';
                }
            }, 1500);
        });
    } else {
        const packet = createPacket(0xff0000);
        animatePacket(packet, () => {
            document.getElementById('status').textContent = 'Access Denied! Try again.';
        });
    }
}

function createPacket(color) {
    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color });
    const packet = new THREE.Mesh(geometry, material);

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
            packet.geometry.dispose();
            packet.material.dispose();
            callback();
        }
    };
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    levelVisualizer.animate();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const helpToggle = document.getElementById('help-toggle');
const helpPanel = document.getElementById('help-panel');
const helpClose = document.getElementById('help-close');
const helpBody = document.getElementById('help-body');
const helpLearn = document.getElementById('help-learn');
const helpHints = document.getElementById('help-hints');
const helpNextHint = document.getElementById('help-next-hint');
const helpShowAnswer = document.getElementById('help-show-answer');
const helpAnswer = document.getElementById('help-answer');

let revealedHints = 0;

function esc(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function resetHelpPanel() {
    revealedHints = 0;
    helpHints.innerHTML = '';
    helpAnswer.classList.add('hidden');
    helpAnswer.innerHTML = '';
    helpShowAnswer.classList.add('hidden');
    helpNextHint.classList.remove('hidden');

    const level = levels.find(l => l.id === currentLevel);
    if (!level || !level.walkthrough) {
        helpLearn.innerHTML = '';
        return;
    }

    const skillBadge = level.devtoolsSkill
        ? `<div class="help-skill-badge">DevTools Skill: ${level.devtoolsSkill}</div>`
        : '';

    helpLearn.innerHTML =
        skillBadge +
        `<div class="help-learn-label">What is this?</div>` +
        `<div class="help-learn-text">${esc(level.walkthrough.learn)}</div>`;

    helpBody.scrollTop = 0;
}

function revealNextHint() {
    const level = levels.find(l => l.id === currentLevel);
    if (!level || !level.walkthrough) return;

    const hints = level.walkthrough.hints;
    if (revealedHints >= hints.length) return;

    const div = document.createElement('div');
    div.className = 'help-hint';
    div.innerHTML =
        `<span class="help-hint-label">Hint ${revealedHints + 1} of ${hints.length}</span>` +
        `<span class="help-hint-text">${esc(hints[revealedHints])}</span>`;
    helpHints.appendChild(div);
    revealedHints++;

    if (revealedHints >= hints.length) {
        helpNextHint.classList.add('hidden');
        helpShowAnswer.classList.remove('hidden');
    }

    requestAnimationFrame(() => {
        div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function revealAnswer() {
    const level = levels.find(l => l.id === currentLevel);
    if (!level || !level.walkthrough) return;

    helpAnswer.classList.remove('hidden');
    helpAnswer.innerHTML =
        `<div class="help-answer-label">Answer</div>` +
        `<div class="help-answer-text">${esc(level.walkthrough.answer)}</div>`;
    helpShowAnswer.classList.add('hidden');

    requestAnimationFrame(() => {
        helpAnswer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

helpToggle.addEventListener('click', () => {
    const wasHidden = helpPanel.classList.contains('hidden');
    helpPanel.classList.toggle('hidden');
    if (wasHidden) resetHelpPanel();
});

helpClose.addEventListener('click', () => {
    helpPanel.classList.add('hidden');
});

helpNextHint.addEventListener('click', revealNextHint);
helpShowAnswer.addEventListener('click', revealAnswer);

updateLevelUI();
