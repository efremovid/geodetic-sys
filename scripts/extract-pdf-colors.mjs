import fs from 'fs'
import path from 'path'
import { pdf } from 'pdf-to-img'

const pdfPath = process.argv[2] || 'C:/Users/Игорь Ефремов/Downloads/Lending_Georgiy_Ya.pdf'
const outDir = path.resolve('scripts/pdf-preview')
fs.mkdirSync(outDir, { recursive: true })

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function sampleColors(buffer, step = 6) {
  // PNG signature check - use sharp-like manual decode is hard; write file and use pngjs
  return []
}

import { PNG } from 'pngjs'

async function analyzePng(buffer) {
  const png = PNG.sync.read(buffer)
  const counts = new Map()

  for (let y = 0; y < png.height; y += 6) {
    for (let x = 0; x < png.width; x += 6) {
      const i = (png.width * y + x) << 2
      const r = png.data[i]
      const g = png.data[i + 1]
      const b = png.data[i + 2]
      const a = png.data[i + 3]
      if (a < 128) continue
      const bucket = [r, g, b].map((v) => Math.round(v / 6) * 6)
      const key = bucket.join(',')
      counts.set(key, (counts.get(key) || 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([key, count]) => {
      const rgb = key.split(',').map(Number)
      return { hex: rgbToHex(...rgb), rgb, count }
    })
}

let pageNum = 0
for await (const image of await pdf(pdfPath, { scale: 1.5 })) {
  pageNum += 1
  const pngPath = path.join(outDir, `page-${pageNum}.png`)
  fs.writeFileSync(pngPath, image)
  const colors = await analyzePng(image)
  console.log(`\n=== Page ${pageNum} ===`)
  console.log(`Saved: ${pngPath}`)
  colors.forEach((c, i) => {
    console.log(`${String(i + 1).padStart(2, '0')}. ${c.hex} rgb(${c.rgb.join(', ')}) weight=${c.count}`)
  })
}
