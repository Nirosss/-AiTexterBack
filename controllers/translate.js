const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const translate = async (text, to) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `## Rewrite this text:\n${text} in a ${to} English`,
    temperature: 0.3,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  return response.data.choices[0].text
}

module.exports = {
  translate,
}
