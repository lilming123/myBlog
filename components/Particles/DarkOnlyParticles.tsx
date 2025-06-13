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
        particleCount={150}
        particleSpread={15}
        speed={0.1}
        particleBaseSize={200}
        moveParticlesOnHover={true}
        disableRotation={false}
        sizeRandomness={0.5}
        cameraDistance={80}
      />
    </div>
  )
}
