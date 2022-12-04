const { chromium, webkit, firefox } = require('playwright');

export default function handler(req: any, res: any) {
  const { pid } = req.query
  res.end(`Post: ${pid}`)
}