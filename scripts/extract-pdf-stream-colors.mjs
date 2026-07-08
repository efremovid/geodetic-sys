import fs from 'fs'
import zlib from 'zlib'

const pdfPath = process.argv[2] || 'C:/Users/Игорь Ефремов/Downloads/Lending_Georgiy_Ya.pdf'
const buf = fs.readFileSync(pdfPath)
const text = buf.toString('latin1')

const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g
const colors = new Map()

function addColor(label, values) {
  const key = `${label}:${values.join(',')}`
  colors.set(key, (colors.get(key) || 0) + 1)
}

let match
while ((match = streamRegex.exec(text)) !== null) {
  let stream = match[1]
  let decoded = stream

  try {
    decoded = zlib.inflateSync(Buffer.from(stream, 'latin1')).toString('latin1')
  } catch {
    try {
      decoded = zlib.inflateRawSync(Buffer.from(stream, 'latin1')).toString('latin1')
    } catch {
      continue
    }
  }

  for (const m of decoded.matchAll(/(\d+\.?\d*)\s+(\d+\.?\d*)\s+(\d+\.?\d*)\s+(rg|RG|k|K)/g)) {
    if (m[4] === 'rg' || m[4] === 'RG') {
      const rgb = [m[1], m[2], m[3]].map((v) => Math.round(Number(v) * 255))
      addColor('rgb', rgb)
    }
  }

  for (const m of decoded.matchAll(/(\d+\.?\d*)\s+(\d+\.?\d*)\s+(\d+\.?\d*)\s+(\d+\.?\d*)\s+(k|K)/g)) {
    const c = Number(m[1])
    const y = Number(m[2])
    const kVal = Number(m[4])
    const r = Math.round(255 * (1 - c) * (1 - kVal))
    const g = Math.round(255 * (1 - Number(m[2])) * (1 - kVal))
    const b = Math.round(255 * (1 - Number(m[3])) * (1 - kVal))
    addColor('cmyk', [r, g, b])
  }
}

const sorted = [...colors.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 40)

function toHex([r, g, b]) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

console.log('Top colors from PDF streams:')
sorted.forEach(([key, count], i) => {
  const rgb = key.split(':')[1].split(',').map(Number)
  console.log(`${String(i + 1).padStart(2, '0')}. ${toHex(rgb)} rgb(${rgb.join(', ')}) count=${count}`)
})
