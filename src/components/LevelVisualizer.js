import * as THREE from 'three';

export class LevelVisualizer {
  constructor(scene) {
    this.scene = scene;
    this.objects = new Map();
  }

  createVisualization(level) {
    this.clearScene();
    
    switch(level) {
      case 1: return this.createDefaultChallenge();
      case 2: return this.createTwoFactorChallenge();
      case 3: return this.createPatternChallenge();
      case 4: return this.createHeaderChallenge();
      case 5: return this.createSQLChallenge();
      case 6: return this.createJWTChallenge();
      case 7: return this.createXSSChallenge();
      case 8: return this.createSteganographyChallenge();
      case 9: return this.createBufferChallenge();
      case 10: return this.createZKPChallenge();
      default: return this.createDefaultChallenge();
    }
  }

  createDefaultChallenge() {
    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    this.scene.add(torusKnot);
    this.objects.set('defaultObject', torusKnot);
  }

  createTwoFactorChallenge() {
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
    );
    ring2.rotation.x = Math.PI / 2;
    
    this.scene.add(ring1);
    this.scene.add(ring2);
    this.objects.set('ring1', ring1);
    this.objects.set('ring2', ring2);
  }

  createPatternChallenge() {
    const nodes = [];
    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      node.position.set(
        Math.cos(i * Math.PI/2) * 3,
        Math.sin(i * Math.PI/2) * 3,
        0
      );
      this.scene.add(node);
      nodes.push(node);
      this.objects.set(`node${i}`, node);
    }

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const points = nodes.map(node => node.position);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(line);
    this.objects.set('patternLine', line);
  }

  createHeaderChallenge() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.objects.set('cube', cube);

    for (let i = 0; i < 8; i++) {
      const header = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
      );
      header.position.set(
        Math.cos(i * Math.PI/4) * 3,
        Math.sin(i * Math.PI/4) * 3,
        0
      );
      this.scene.add(header);
      this.objects.set(`header${i}`, header);
    }
  }

  createSQLChallenge() {
    const dbGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const dbMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    const database = new THREE.Mesh(dbGeometry, dbMaterial);
    this.scene.add(database);
    this.objects.set('database', database);

    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00ff00
      })
    );
    this.scene.add(particles);
    this.objects.set('particles', particles);
  }

  createJWTChallenge() {
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.1, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
      );
      ring.position.x = (i - 1) * 2.5;
      this.scene.add(ring);
      rings.push(ring);
      this.objects.set(`jwtRing${i}`, ring);
    }
  }

  createXSSChallenge() {
    const shield = new THREE.Mesh(
      new THREE.OctahedronGeometry(2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    this.scene.add(shield);
    this.objects.set('shield', shield);
  }

  createSteganographyChallenge() {
    const pixels = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const pixel = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.2, 0.2),
          new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x00ff00 : 0x008800 
          })
        );
        pixel.position.set(
          (i - 3.5) * 0.3,
          (j - 3.5) * 0.3,
          0
        );
        this.scene.add(pixel);
        pixels.push(pixel);
        this.objects.set(`pixel${i}_${j}`, pixel);
      }
    }
  }

  createBufferChallenge() {
    const buffer = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 2, 32),
      new THREE.MeshBasicMaterial({ 
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      })
    );
    this.scene.add(buffer);
    this.objects.set('buffer', buffer);
  }

  createZKPChallenge() {
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
    );
    ring2.rotation.x = Math.PI / 2;
    
    this.scene.add(ring1);
    this.scene.add(ring2);
    this.objects.set('zkpRing1', ring1);
    this.objects.set('zkpRing2', ring2);
  }

  clearScene() {
    this.objects.forEach(object => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
      this.scene.remove(object);
    });
    this.objects.clear();
  }

  animate() {
    this.objects.forEach((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
      }
    });
  }
}