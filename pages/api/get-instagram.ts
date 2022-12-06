const { chromium, webkit, firefox } = require('playwright');

export default async function handler(req: any, res: any) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/' + req.query.name);
  const check = await page.isVisible("text='Sorry, this page isn\'t available.'")
  await browser.close();
  if (!check) {
    res.end(JSON.stringify({ instagram: { available: false }}))
  } else {
    res.end(JSON.stringify({ instagram: { available: true }}))
  }

}