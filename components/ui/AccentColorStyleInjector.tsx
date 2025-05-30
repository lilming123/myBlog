import chroma from 'chroma-js'
import Color from 'colorjs.io'
import {createPngNoiseBackground} from "@/lib/noise";


const hexToOklchString = (hex: string) => {
  return new Color(hex).oklch
}
const accentColorLight = [
  // 浅葱
  '#33A6B8',
  
  '#FF6666',
  '#26A69A',
  '#fb7287',
  '#69a6cc',
]
const accentColorDark = [
  // 桃
  '#F596AA',
  
  '#A0A7D4',
  '#ff7b7b',
  '#99D8CF',
  '#838BC6',
]
const defaultAccentColor = { light: accentColorLight, dark: accentColorDark }

const lightBg = 'rgb(250, 250, 250)'
const darkBg = 'rgb(0, 2, 18)'
export async function AccentColorStyleInjector({
                                                 color,
                                               }: {
  color?: {
    light?: string[]
    dark?: string[]
  } 
}) {
  const { light, dark } = color ?? defaultAccentColor
  
  const lightColors = light ?? accentColorLight
  const darkColors = dark ?? accentColorDark
  
  const Length = Math.max(lightColors.length ?? 0, darkColors.length ?? 0)
  const randomSeedRef = (Math.random() * Length) | 0
  const currentAccentColorLRef = lightColors[randomSeedRef]
  const currentAccentColorDRef = darkColors[randomSeedRef]
  
  const lightOklch = hexToOklchString(currentAccentColorLRef)
  const darkOklch = hexToOklchString(currentAccentColorDRef)
  
  const [hl, sl, ll] = lightOklch
  const [hd, sd, ld] = darkOklch
  
  const [lightBgImage, darkBgImage] = await Promise.all([
    createPngNoiseBackground(currentAccentColorLRef),
    createPngNoiseBackground(currentAccentColorDRef),
  ])
  
  return (
    <style
      id="accent-color-style"
      data-light={currentAccentColorLRef}
      data-dark={currentAccentColorDRef}
      dangerouslySetInnerHTML={{
        __html: `
        html[data-theme='light'].noise body::before {
          background-image: ${lightBgImage}
        }
        html[data-theme='dark'].noise body::before {
          background-image: ${darkBgImage}
        }
        html[data-theme='light'] {
          --a: ${`${hl} ${sl} ${ll}`};
        }
        html[data-theme='dark'] {
          --a: ${`${hd} ${sd} ${ld}`};
        }
        html {
          --root-bg: ${chroma.mix(lightBg, currentAccentColorLRef, 0.05, 'rgb').hex()};
          background-color: var(--root-bg) !important;
        }
        html[data-theme='dark'] {
          --root-bg: ${chroma.mix(darkBg, currentAccentColorDRef, 0.12, 'rgb').hex()};
        }
        `,
      }}
    />
  )
}
