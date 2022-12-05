const { chromium, webkit, firefox } = require('playwright');

export default async function handler(req: any, res: any) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.namecheckr.com/');
  await page.type('input[name=name]', req.query.name);
  await page.click('button[name=btnSubmit]');
  const response = await page.waitForResponse((response: any) => response.url().includes('facebook') && response.status() === 200);
  console.log('RESPONSE ' + (await response.body()));
  const bodyResponse = await response.body()
  console.log('RESPONSE1 ' + JSON.parse(bodyResponse));

  await browser.close();

  res.end(`Finish: ${bodyResponse}`)
}