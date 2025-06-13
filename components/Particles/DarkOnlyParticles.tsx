'use client'
import { useTheme } from 'next-themes'
import Particles from "@/components/Particles/index";

export function DarkOnlyParticles() {
  const { resolvedTheme } = useTheme()
  
  if (resolvedTheme !== 'dark') return null
  
  return (
    <div className="fixed inset-0 z-1">
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={100}
        particleSpread={20}
        speed={0.5}
        particleBaseSize={300}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={true}
        cameraDistance={100}
      />
    </div>
  )
}
