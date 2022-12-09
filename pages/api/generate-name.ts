import { Configuration, OpenAIApi } from "openai";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
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

  const { values, words, type } = req.body
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(values, words, type),
    temperature: 0.7,
    presence_penalty: 0.5,
    frequency_penalty: 0.5,
    max_tokens: 256,
    top_p: 1
  });

  if (!completion.data.choices) {
    res.status(422).json({ result: 'error on openAPI' });
  }

  console.log(completion.data)
  // @ts-ignore
  const formattedResult = completion.data.choices[0].text.trim().replace(/[.\s]/g, "").split(',')
  res.status(200).json({ result: formattedResult });
}

function generatePrompt(values: any, words: any, type: any) {
  return `I would like to generate a brand identity for client.
   What would you like your brand name to be that represents ${values}, is associated with words like ${words} and reflects the ${type} you own?
   Now, generate a minimum of 20 lists of names based on the description above and return me the result in comma-separated value:`
}