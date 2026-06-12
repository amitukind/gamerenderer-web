import * as THREE from 'three'

const BRIGHT = 0x9a5fce
const PURPLE = 0x793ea5
const DEEP = 0x5e3080

function makePolyPair(geometry, wireColor, wireOpacity, fillColor, fillOpacity) {
  const group = new THREE.Group()

  const fillMaterial = new THREE.MeshBasicMaterial({
    color: fillColor,
    transparent: true,
    opacity: fillOpacity,
    depthWrite: false
  })
  const fill = new THREE.Mesh(geometry, fillMaterial)
  group.add(fill)

  const edges = new THREE.EdgesGeometry(geometry)
  const wireMaterial = new THREE.LineBasicMaterial({
    color: wireColor,
    transparent: true,
    opacity: wireOpacity
  })
  const wire = new THREE.LineSegments(edges, wireMaterial)
  group.add(wire)

  return { group, fill, wire }
}

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 5

  const root = new THREE.Group()
  scene.add(root)

  // Main low-poly asset: large tumbling icosahedron.
  const main = makePolyPair(new THREE.IcosahedronGeometry(1.7, 0), BRIGHT, 0.55, PURPLE, 0.08)
  root.add(main.group)

  // Small companions orbiting/bobbing around the main solid.
  const companionSpecs = [
    {
      geometry: new THREE.OctahedronGeometry(0.4, 0),
      wireColor: BRIGHT,
      fillColor: PURPLE,
      orbitRadius: 2.45,
      orbitSpeed: 0.16,
      phase: 0.4,
      bobAmp: 0.22,
      bobSpeed: 0.5,
      tumble: 0.22,
      yBase: 0.35
    },
    {
      geometry: new THREE.TetrahedronGeometry(0.32, 0),
      wireColor: PURPLE,
      fillColor: DEEP,
      orbitRadius: 2.7,
      orbitSpeed: -0.11,
      phase: 2.6,
      bobAmp: 0.18,
      bobSpeed: 0.38,
      tumble: 0.3,
      yBase: -0.55
    },
    {
      geometry: new THREE.IcosahedronGeometry(0.26, 0),
      wireColor: BRIGHT,
      fillColor: PURPLE,
      orbitRadius: 2.2,
      orbitSpeed: 0.13,
      phase: 4.7,
      bobAmp: 0.26,
      bobSpeed: 0.44,
      tumble: 0.18,
      yBase: 0.85
    }
  ]

  const companions = companionSpecs.map((spec) => {
    const pair = makePolyPair(spec.geometry, spec.wireColor, 0.5, spec.fillColor, 0.1)
    root.add(pair.group)
    return { ...spec, group: pair.group }
  })

  let rafId = 0
  let running = false
  const clock = new THREE.Clock()

  function render() {
    rafId = requestAnimationFrame(render)
    const t = clock.getElapsedTime()

    // Slow tumble on two axes (~0.04-0.1 rad/s).
    main.group.rotation.x = t * 0.05
    main.group.rotation.y = t * 0.09

    // Subtle scale breathing (+/-2%) on the main solid.
    const breathe = 1 + Math.sin(t * 0.6) * 0.02
    main.group.scale.setScalar(breathe)

    for (const c of companions) {
      const angle = c.phase + t * c.orbitSpeed
      c.group.position.set(
        Math.cos(angle) * c.orbitRadius,
        c.yBase + Math.sin(t * c.bobSpeed + c.phase) * c.bobAmp,
        Math.sin(angle) * c.orbitRadius * 0.55
      )
      c.group.rotation.x = t * c.tumble
      c.group.rotation.y = t * c.tumble * 0.7
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
