// Generates slides.pdf using reveal.js ?print-pdf mode + puppeteer.
// Run AFTER a local server is already up on port 8000.
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })

  // ?print-pdf tells reveal.js to lay all slides out as a vertical print document
  await page.goto('http://localhost:8000/slides.html?print-pdf', {
    waitUntil: 'networkidle0',
    timeout: 60000,
  })

  // Give reveal.js + highlight.js time to fully render
  await new Promise((r) => setTimeout(r, 4000))

  await page.pdf({
    path: 'slides.pdf',
    width:  '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()
  console.log('✓ slides.pdf generated')
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
