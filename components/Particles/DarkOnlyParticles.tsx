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
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        disableRotation={false}
        cameraDistance={20}
      />
    </div>
  )
}
