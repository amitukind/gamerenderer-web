import * as THREE from 'three'

const BRIGHT = 0x9a5fce
const DEEP = 0x5e3080
const WHITE = 0xffffff

const DEG = Math.PI / 180

function makeOrbitCircle(radius, segments) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
  const points = curve.getPoints(segments)
  return new THREE.BufferGeometry().setFromPoints(points)
}

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 5

  const atom = new THREE.Group()
  atom.rotation.x = -0.3 // tilt slightly toward the camera
  scene.add(atom)

  // Nucleus: 7 small spheres packed near origin, alternating brand colors.
  const nucleusGeometry = new THREE.SphereGeometry(0.16, 16, 12)
  const nucleusColors = [BRIGHT, WHITE, DEEP, BRIGHT, WHITE, DEEP, BRIGHT]
  const nucleusOffsets = [
    [0, 0, 0],
    [0.18, 0.08, 0.05],
    [-0.16, 0.12, -0.06],
    [0.06, -0.17, 0.1],
    [-0.1, -0.1, -0.14],
    [0.12, 0.05, -0.16],
    [-0.05, 0.16, 0.14]
  ]
  const nucleus = new THREE.Group()
  nucleusOffsets.forEach((offset, i) => {
    const material = new THREE.MeshBasicMaterial({ color: nucleusColors[i] })
    const sphere = new THREE.Mesh(nucleusGeometry, material)
    sphere.position.set(offset[0], offset[1], offset[2])
    nucleus.add(sphere)
  })
  atom.add(nucleus)

  // 3 electron orbits, each tilted to a distinct plane.
  const orbitRadius = 1.55
  const orbitGeometry = makeOrbitCircle(orbitRadius, 96)
  const electronGeometry = new THREE.SphereGeometry(0.07, 16, 12)
  const orbitSpecs = [
    { rotX: 0, rotY: 0, speed: 0.9, phase: 0.0 },
    { rotX: 60 * DEG, rotY: 30 * DEG, speed: 0.7, phase: 2.1 },
    { rotX: -60 * DEG, rotY: -30 * DEG, speed: 0.5, phase: 4.2 }
  ]

  const electrons = orbitSpecs.map((spec) => {
    const orbitGroup = new THREE.Group()
    orbitGroup.rotation.x = spec.rotX
    orbitGroup.rotation.y = spec.rotY

    const lineMaterial = new THREE.LineBasicMaterial({
      color: BRIGHT,
      transparent: true,
      opacity: 0.35
    })
    const ring = new THREE.LineLoop(orbitGeometry, lineMaterial)
    orbitGroup.add(ring)

    const electronMaterial = new THREE.MeshBasicMaterial({ color: WHITE })
    const electron = new THREE.Mesh(electronGeometry, electronMaterial)
    orbitGroup.add(electron)

    atom.add(orbitGroup)
    return { electron, speed: spec.speed, phase: spec.phase }
  })

  let rafId = 0
  let running = false
  const clock = new THREE.Clock()

  function render() {
    rafId = requestAnimationFrame(render)
    const t = clock.getElapsedTime()

    // Whole atom rotates slowly.
    atom.rotation.y = t * 0.05

    // Electrons travel along their (local XY-plane) circles at distinct speeds.
    for (const e of electrons) {
      const angle = e.phase + t * e.speed
      e.electron.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius, 0)
    }

    renderer.render(scene, camera)
  }

  function start() {
    if (running) return
    running = true
    clock.start()
    rafId = requestAnimationFrame(render)
  }

  function stop() {
    if (!running) return
    running = false
    cancelAnimationFrame(rafId)
  }

  function resize(width, height) {
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  function dispose() {
    stop()
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
        else obj.material.dispose()
      }
    })
    renderer.dispose()
  }

  return { start, stop, resize, dispose }
}
