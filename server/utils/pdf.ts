import PDFDocument from 'pdfkit'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface CPData {
  name: string
  phone: string
  internet: string
  itService: string
  extraServices: string[]
  totalPrice: string
  oneTimePrice?: string
  monthlyPrice?: string
  date: string
  locale?: string
}

const translations: Record<string, any> = {
  ru: {
    title: 'КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ',
    forWhom: 'ЗАКАЗЧИК:',
    serviceDetail: 'ДЕТАЛИЗАЦИЯ ИЗБРАННОГО ТАРИФА',
    serviceCol: 'УСЛУГА',
    paramCol: 'ПАРАМЕТРЫ',
    paymentCol: 'ОПЛАТА',
    internet: 'Выделенный интернет',
    itSvc: 'IT-Аутсорсинг',
    itDesc: 'Поддержка инфраструктуры',
    extra: 'Дополнительно',
    totalMonthly: 'ИТОГО В МЕСЯЦ:',
    install: 'Инсталляция:',
    vat: 'сум (с учетом НДС 12%)',
    manager: 'Ваш персональный менеджер:',
    managerRole: 'Руководитель отдела корпоративных продаж',
    disclaimer: 'Все расчеты действительны в течение 14 дней. Данное предложение не является публичной офертой.',
    included: 'ВКЛЮЧЕНО'
  },
  en: {
    title: 'COMMERCIAL PROPOSAL',
    forWhom: 'CLIENT:',
    serviceDetail: 'SELECTED TARIFF DETAILS',
    serviceCol: 'SERVICE',
    paramCol: 'PARAMETERS',
    paymentCol: 'PAYMENT',
    internet: 'Dedicated Internet',
    itSvc: 'IT Outsourcing',
    itDesc: 'Infrastructure Support',
    extra: 'Extra Services',
    totalMonthly: 'TOTAL PER MONTH:',
    install: 'Installation:',
    vat: 'sum (incl. VAT 12%)',
    manager: 'Your Personal Manager:',
    managerRole: 'Head of Corporate Sales',
    disclaimer: 'All calculations are valid for 14 days. This proposal is not a public offer.',
    included: 'INCLUDED'
  },
  uz: {
    title: 'TIJORAT TAKLIFI',
    forWhom: 'BUYURTMACI:',
    serviceDetail: 'TANLANGAN TARIF TAFSIFOLARI',
    serviceCol: 'XIZMAT',
    paramCol: 'PARAMETRLAR',
    paymentCol: 'TO\'LOV',
    internet: 'Yuqori tezlikdagi internet',
    itSvc: 'IT-Autsorsing',
    itDesc: 'Infratuzilmani qo\'llab-quvvatlash',
    extra: 'Qo\'shimcha',
    totalMonthly: 'OYLIK TO\'LOV:',
    install: 'O\'rnatish:',
    vat: 'so\'m (QQS 12% bilan)',
    manager: 'Sizning shaxsiy menejeringiz:',
    managerRole: 'Korporativ sotuvlar bo\'limi rahbari',
    disclaimer: 'Barcha hisob-kitoblar 14 kun davomida amal qiladi. Ushbu taklif ommaviy oferta emas.',
    included: 'KIRITILGAN'
  }
}

export async function generateCP(data: CPData): Promise<Buffer> {
  const locale = data.locale || 'ru'
  const t = translations[locale] || translations.ru

  console.log('[PDF Gen] Starting generation with locale:', locale)

  return new Promise((resolve, reject) => {
    try {
        const doc = new PDFDocument({ 
            margin: 0,
            size: 'A4',
            bufferPages: true
        })
        
        const chunks: Buffer[] = []
        doc.on('data', (chunk) => chunks.push(chunk))
        doc.on('end', () => {
            console.log('[PDF Gen] Stream ended. Total size:', Buffer.concat(chunks).length)
            resolve(Buffer.concat(chunks))
        })
        doc.on('error', (err) => {
            console.error('[PDF Gen] Stream ERROR:', err)
            reject(err)
        })

        const fontRegular = path.join(process.cwd(), 'server/assets/fonts/Roboto-Regular.ttf')
        const fontBold = path.join(process.cwd(), 'server/assets/fonts/Roboto-Bold.ttf')

        console.log('[PDF Gen] Using fonts:', { fontRegular, fontBold })

        const primaryColor = '#4F46E5'   // Indigo 500
        const bgDark = '#0F172A'        // Slate 900
        const cardBg = '#1E293B'        // Slate 800
        const textWhite = '#F8FAFC'     // Slate 50
        const textMuted = '#94A3B8'     // Slate 400
        const borderGray = '#334155'    // Slate 700

        // 1. Full Page Background
        doc.rect(0, 0, 595.28, 841.89).fill(bgDark)
        doc.rect(0, 0, 595.28, 5).fill(primaryColor)

        // 2. Logo & Company Info
        doc.fillColor(textWhite).font(fontBold).fontSize(24).text('Optikom Business', 40, 40)
        doc.fontSize(10).font(fontRegular).fillColor(primaryColor).text(t.title, 40, 70)

        doc.fillColor(textMuted).fontSize(9)
           .text('+998 (71) 200-02-02', 400, 45, { align: 'right', width: 155 })
           .text('www.optikom.biz', 400, 60, { align: 'right', width: 155 })
           .text('Tashkent, Uzbekistan', 400, 75, { align: 'right', width: 155 })

        // 3. Client Card
        let currentY = 130
        doc.rect(40, currentY, 515, 80).fill(cardBg)
        doc.fillColor(primaryColor).font(fontBold).fontSize(9).text(t.forWhom, 60, currentY + 15)
        doc.fillColor(textWhite).font(fontBold).fontSize(14).text(data.name, 60, currentY + 30)
        doc.fillColor(textMuted).font(fontRegular).fontSize(10).text(`Tel: ${data.phone}`, 60, currentY + 52)
        doc.fillColor(textMuted).font(fontRegular).fontSize(9).text(`${data.date}`, 400, currentY + 15, { align: 'right', width: 135 })

        // 4. Services
        currentY += 110
        doc.fillColor(textWhite).font(fontBold).fontSize(12).text(t.serviceDetail, 40, currentY)

        currentY += 25
        doc.rect(40, currentY, 515, 30).fill(borderGray)
        doc.fillColor(textWhite).font(fontBold).fontSize(9)
           .text(t.serviceCol, 60, currentY + 10)
           .text(t.paramCol, 220, currentY + 10)
           .text(t.paymentCol, 460, currentY + 10, { align: 'right', width: 80 })

        currentY += 30
        // Internet Row
        doc.rect(40, currentY, 515, 60).fill('#161E2E')
        doc.fillColor(primaryColor).circle(50, currentY + 22, 5).fill() // Decorative icon
        doc.fillColor(textWhite).font(fontBold).fontSize(11).text(t.internet, 65, currentY + 15)
        doc.fillColor(textMuted).font(fontRegular).fontSize(9).text('Unlimited High-Speed Channel', 65, currentY + 32)
        doc.fillColor(textWhite).fontSize(10).text(data.internet, 220, currentY + 25)
        doc.fillColor(primaryColor).font(fontBold).fontSize(11).text(`${data.monthlyPrice || data.totalPrice} sum`, 460, currentY + 25, { align: 'right', width: 80 })

        currentY += 60
        // IT Row
        doc.rect(40, currentY, 515, 60).fill(cardBg)
        doc.fillColor(primaryColor).circle(50, currentY + 22, 5).fill()
        doc.fillColor(textWhite).font(fontBold).fontSize(11).text(t.itSvc, 65, currentY + 15)
        doc.fillColor(textMuted).font(fontRegular).fontSize(9).text(t.itDesc, 65, currentY + 32)
        doc.fillColor(textWhite).font(fontRegular).fontSize(9).text(data.itService, 220, currentY + 15, { width: 220 })
        doc.fillColor(textWhite).font(fontBold).fontSize(10).text(t.included, 460, currentY + 25, { align: 'right', width: 80 })

        if (data.extraServices?.length > 0) {
            currentY += 60
            doc.rect(40, currentY, 515, 20 + (data.extraServices.length * 20)).fill('#161E2E')
            doc.fillColor(textWhite).font(fontBold).fontSize(11).text(t.extra, 60, currentY + 15)
            data.extraServices.forEach((svc, i) => {
                doc.fillColor(textMuted).font(fontRegular).fontSize(9).text(`• ${svc}`, 220, currentY + 15 + (i * 18))
            })
            currentY += 20 + (data.extraServices.length * 20)
        }

        // 5. Financial Summary
        currentY += 40
        doc.rect(340, currentY, 215, 90).fill(cardBg)
        let totalY = currentY + 20
        if (data.oneTimePrice && data.oneTimePrice !== '0') {
            doc.fillColor(textMuted).font(fontRegular).fontSize(9).text(t.install, 360, totalY)
            doc.fillColor(textWhite).font(fontBold).fontSize(9).text(`${data.oneTimePrice} sum`, 460, totalY, { align: 'right', width: 80 })
            totalY += 22
        }
        doc.fillColor(textWhite).font(fontBold).fontSize(10).text(t.totalMonthly, 360, totalY)
        doc.fillColor(primaryColor).font(fontBold).fontSize(18).text(`${data.monthlyPrice || data.totalPrice}`, 440, totalY - 4, { align: 'right', width: 100 })
        doc.fillColor(textMuted).font(fontRegular).fontSize(8).text(t.vat, 440, totalY + 14, { align: 'right', width: 100 })

        // 6. Manager Details
        const footerY = 700
        doc.fillColor(textWhite).font(fontBold).fontSize(11).text(t.manager, 40, footerY)
        doc.fillColor(primaryColor).font(fontBold).fontSize(13).text('Abbos Rustamov', 40, footerY + 20)
        doc.fillColor(textMuted).font(fontRegular).fontSize(10).text(t.managerRole, 40, footerY + 40)
        doc.fillColor(textWhite).font(fontRegular).fontSize(10).text('E: info@optikom.biz | T: +998 (71) 200-02-02', 40, footerY + 55)

        doc.fillColor(textMuted).font(fontRegular).fontSize(8).text(t.disclaimer, 40, 780, { align: 'center', width: 515 })

        console.log('[PDF Gen] Ending document...')
        doc.end()
    } catch (e: any) {
        console.error('[PDF Gen] Initialization FAILED:', e)
        reject(e)
    }
  })
}
