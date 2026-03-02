import * as THREE from 'three';

export class LevelVisualizer {
  constructor(scene) {
    this.scene = scene;
    this.objects = [];
  }

  createVisualization(level) {
    this.clearScene();

    switch (level) {
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

  track(object) {
    this.objects.push(object);
    this.scene.add(object);
    return object;
  }

  createDefaultChallenge() {
    this.track(new THREE.Mesh(
      new THREE.TorusKnotGeometry(2, 0.5, 100, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    ));
  }

  createTwoFactorChallenge() {
    this.track(new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    ));

    const ring2 = this.track(new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
    ));
    ring2.rotation.x = Math.PI / 2;
  }

  createPatternChallenge() {
    const positions = Array.from({ length: 4 }, (_, i) => new THREE.Vector3(
      Math.cos(i * Math.PI / 2) * 3,
      Math.sin(i * Math.PI / 2) * 3,
      0
    ));

    positions.forEach(pos => {
      const node = this.track(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      ));
      node.position.copy(pos);
    });

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(positions);
    this.track(new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: 0x00ff00 })
    ));
  }

  createHeaderChallenge() {
    this.track(new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.5 })
    ));

    for (let i = 0; i < 8; i++) {
      const header = this.track(new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
      ));
      header.position.set(
        Math.cos(i * Math.PI / 4) * 3,
        Math.sin(i * Math.PI / 4) * 3,
        0
      );
    }
  }

  createSQLChallenge() {
    this.track(new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 2, 32),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    ));

    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.track(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, color: 0x00ff00 })));
  }

  createJWTChallenge() {
    for (let i = 0; i < 3; i++) {
      const ring = this.track(new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.1, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
      ));
      ring.position.x = (i - 1) * 2.5;
    }
  }

  createXSSChallenge() {
    this.track(new THREE.Mesh(
      new THREE.OctahedronGeometry(2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    ));
  }

  createSteganographyChallenge() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const pixel = this.track(new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.2, 0.2),
          new THREE.MeshBasicMaterial({
            color: ((i + j) % 2 === 0) ? 0x00ff00 : 0x008800
          })
        ));
        pixel.position.set((i - 3.5) * 0.3, (j - 3.5) * 0.3, 0);
      }
    }
  }

  createBufferChallenge() {
    this.track(new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 2, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.5 })
    ));
  }

  createZKPChallenge() {
    this.track(new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    ));

    const ring2 = this.track(new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
    ));
    ring2.rotation.x = Math.PI / 2;
  }

  clearScene() {
    for (const obj of this.objects) {
      this.scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }
    this.objects = [];
  }

  animate() {
    for (const obj of this.objects) {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
      }
    }
  }
}
