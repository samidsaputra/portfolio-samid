import * as THREE from 'three';

// This acts as a bridge between GSAP ScrollTrigger (which animates the string value)
// and Three.js (which reads the THREE.Color object).
export const ambientState = {
  // We use a hex string for GSAP to animate easily
  proxy: { color: "#3F3F46" },
  // The actual color used by the Three.js shader
  color: new THREE.Color("#3F3F46")
};
