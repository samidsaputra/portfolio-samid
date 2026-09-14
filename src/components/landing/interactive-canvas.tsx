"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ambientState } from "@/lib/ambient-state";

// Fragment Shader with color input
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColor;

  // Simplex-like 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    vec2 noiseUv = uv * 2.0;
    noiseUv.x += uTime * 0.05;
    noiseUv.y += uTime * 0.03;
    
    vec2 mouseDist = uv - uMouse;
    float influence = exp(-dot(mouseDist, mouseDist) * 3.0);
    noiseUv -= mouseDist * influence * 0.1;
    
    float n = snoise(noiseUv) * 0.5 + 0.5;
    n += snoise(noiseUv * 2.0 + uTime * 0.1) * 0.25;
    
    n = smoothstep(0.3, 0.8, n);
    
    vec3 baseColor = uColor * (n * 0.8 + 0.2); 
    
    gl_FragColor = vec4(baseColor, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

function NoisePlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(
        typeof window !== 'undefined' ? window.innerWidth : 1, 
        typeof window !== 'undefined' ? window.innerHeight : 1
      ) },
      // Initialize with the SAME color as ambientState's initial value
      uColor: { value: new THREE.Color("#3F3F46") }
    }),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      if (material.current) {
        material.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (material.current) {
        material.current.uniforms.uMouse.value.set(
          e.clientX / window.innerWidth,
          1.0 - (e.clientY / window.innerHeight)
        );
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value += delta;
      material.current.uniforms.uColor.value.copy(ambientState.color);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function InteractiveCanvas() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
      setShouldRender(true);
      document.documentElement.classList.add("has-canvas");
    }
    
    return () => {
      document.documentElement.classList.remove("has-canvas");
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div suppressHydrationWarning className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: 0.85 }}>
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <NoisePlane />
      </Canvas>
    </div>
  );
}
