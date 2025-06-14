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
        particleCount={200}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={150}
        moveParticlesOnHover={false}
        disableRotation={false}
        sizeRandomness={0.8}
        cameraDistance={20}
      />
    </div>
  )
}
