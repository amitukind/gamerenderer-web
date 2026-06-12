import * as THREE from 'three'

const BRIGHT = 0x9a5fce
const PURPLE = 0x793ea5
const DEEP = 0x5e3080
const WHITE = 0xffffff

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
  // Camera pulled back to z=6 so the outer orbit (radius 2.2) fits the frustum.
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 6

  const system = new THREE.Group()
  system.rotation.x = -0.5 // tilt ~28deg toward the camera
  scene.add(system)

  // Central star with additive glow shell.
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 24, 16),
    new THREE.MeshBasicMaterial({ color: WHITE })
  )
  system.add(star)

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 16),
    new THREE.MeshBasicMaterial({
      color: BRIGHT,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  )
  system.add(glow)

  // 5 planets: alternating purples plus one white, inner orbits faster.
  const planetSpecs = [
    { radius: 0.07, orbit: 0.8, speed: 0.6, color: BRIGHT, phase: 0.6 },
    { radius: 0.1, orbit: 1.15, speed: 0.4, color: PURPLE, phase: 2.4 },
    { radius: 0.06, orbit: 1.5, speed: 0.27, color: WHITE, phase: 4.1 },
    { radius: 0.15, orbit: 1.85, speed: 0.18, color: DEEP, phase: 1.5 },
    { radius: 0.11, orbit: 2.2, speed: 0.12, color: BRIGHT, phase: 5.2 }
  ]

  const planets = planetSpecs.map((spec, i) => {
    // Orbit path (drawn in the system's XZ plane).
    const orbitLine = new THREE.LineLoop(
      makeOrbitCircle(spec.orbit, 96),
      new THREE.LineBasicMaterial({ color: BRIGHT, transparent: true, opacity: 0.3 })
    )
    orbitLine.rotation.x = -Math.PI / 2
    system.add(orbitLine)

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(spec.radius, 20, 14),
      new THREE.MeshBasicMaterial({ color: spec.color })
    )
    system.add(planet)

    // Saturn-style ring on the 4th planet.
    if (i === 3) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.18, 0.3, 48),
        new THREE.MeshBasicMaterial({
          color: BRIGHT,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
          depthWrite: false
        })
      )
      ring.rotation.x = -Math.PI / 2 + 0.45
      ring.rotation.y = 0.2
      planet.add(ring)
    }

    return { mesh: planet, orbit: spec.orbit, speed: spec.speed, phase: spec.phase }
  })

  let rafId = 0
  let running = false
  const clock = new THREE.Clock()

  function render() {
    rafId = requestAnimationFrame(render)
    const t = clock.getElapsedTime()

    // Slow rotation of the whole system on y.
    system.rotation.y = t * 0.04

    for (const p of planets) {
      const angle = p.phase + t * p.speed
      p.mesh.position.set(Math.cos(angle) * p.orbit, 0, Math.sin(angle) * p.orbit)
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
