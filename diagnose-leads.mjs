const hosts = ['localhost', '127.0.0.1']
const ports = [3000, 3001, 3002]

async function test() {
  for (const host of hosts) {
    for (const port of ports) {
      const url = `http://${host}:${port}`
      try {
        process.stdout.write(`Testing ${url}... `)
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 2000)
        
        const response = await fetch(`${url}/api/leads`, {
          method: 'POST',
          body: JSON.stringify({
            name: 'Diagnostic Test',
            phone: '+998901234567',
            company: 'Test Co',
            message: 'Testing PDF generation',
            locale: 'ru',
            tariffDetails: {
              internet: '100 Мбит/с',
              itService: 'Базовый',
              monthlyPrice: '500 000',
              totalPrice: '500 000'
            }
          }),
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal
        })
        clearTimeout(timeout)
        
        if (response.ok) {
          const data = await response.json()
          console.log('✅ OK')
          console.log('Success:', data.success)
          console.log('PDF Length:', data.pdf ? data.pdf.length : 'NULL')
          if (data.pdf) {
            process.exit(0)
          }
        } else {
          console.log(`❌ FAILED (${response.status})`)
        }
      } catch (e) {
        console.log(`❌ ERROR (${e.name === 'AbortError' ? 'Timeout' : 'Connect error'})`)
      }
    }
  }
}

test()
