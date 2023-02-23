const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const translate = async (text, to) => {
  let promptString = setPrompt(text, to)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptString,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  return response.data.choices[0].text
}

function setPrompt(text, formatStyle) {
  let prompt = ''
  switch (formatStyle) {
    case 'grammar correct':
      prompt = `## Rewrite this text:\n"${text}"\n in a ${formatStyle} English`
      break
    case 'Formal':
    case 'Casual':
    case 'Persuasive':
      prompt = `## Rewrite this text:\n"${text}"\n in a ${formatStyle} English`
      break
    case 'Senior program developer':
    case 'HR specialist':
      prompt = `## Rewrite this text:\n"${text}"\n like a ${formatStyle} would say it`
      console.log(prompt)
      break
    case 'Corporate':
      prompt = `## Rewrite this text:\n"${text}"\n in a ${formatStyle} style`
      break
  }
  return prompt
}
module.exports = {
  translate,
}
