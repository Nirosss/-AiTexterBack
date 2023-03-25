const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)



const translate = async (text, to) => {
  console.log(text)
  const prompt = getPrompt(text, to)
  
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.3,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  return response.data.choices[0].text
}

function getPrompt(text, to) {
  switch (to) {
    case "Formal":
      return `Convert the following text into a more formal and official style, giving it a more professional tone:\n\n\"${text}\"`
    case "grammar":
      return `Correct the grammar and spelling of the following text. don't leave any notes about the correction:\n\n\"${text}\"`
    case "Casual":
      return `Convert the following text into a more casual and popular style, giving it a more natural tone:\n\n\"${text}\"`
    case "Persuasive":
      return `Make the following text more persuasive, adding a sense of confidence and demand:\n\n\"${text}\"`
    case "Corporate":
      return `Give the following text a corporate tone by converting it into a formal and official style:\n\n\"${text}"`
    case "Viral":
      return `Convert the following text to be a viral social media post:\n\n\"${text}\"`
    case "Teacher":
      return `Transform the following text so it will sound like a teacher in a school speaking with children:\n\n\"${text}\"`
      case "60":
        return `Convert the following text so it will sound like a spoken in the 60\'s: \n\n\"${text}\"`
      case "Interviewer":
        return `Convert the following text so it will sound like an interviewer with a critical tone: \n\n\"${text}\"`
      default:
        return text
  }
}

module.exports = {
  translate,
}
