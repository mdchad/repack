import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const { chromium, webkit, firefox } = require('playwright');

export default async function handler(req: any, res: any) {
  const supabase = createServerSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    })
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.namecheckr.com/');
  await page.type('input[name=name]', req.query.name);
  await page.click('button[name=btnSubmit]');
  const response = await page.waitForResponse((response: any) => response.url().includes('facebook') && response.status() === 200);
  console.log('RESPONSE ' + (await response.body()));
  const bodyResponse = await response.body()

  await browser.close();

  res.end(bodyResponse)
}