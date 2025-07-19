'use client'

import { useEffect, useState } from 'react'

export function AccentColorStyleInjectorClientWrapper() {
  const [style, setStyle] = useState<JSX.Element | null>(null)
  
  useEffect(() => {
    const run = async () => {
      const { AccentColorStyleInjectorCore } = await import('./AccentColorStyleInjectorCore')
      const styleElement = await AccentColorStyleInjectorCore({})
      setStyle(styleElement)
    }
    
    run()
  }, [])
  
  return style
}
