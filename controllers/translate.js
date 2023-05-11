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

  return extractSentences(response.data.choices[0].text)
  return response.data.choices[0].text
}

function getPrompt(text, to) {
  switch (to) {
    case "Formal":
      return `Display 10 variations of the following text: \n\n\"${text}" \n\n but Convert it into a more formal and official style, giving it a more professional tone`
    case "grammar":
      return `Correct the grammar and spelling of the following text. don't leave any notes about the correction:\n\n\"${text}\"`
    case "Casual":
      return `Display 10 variations of the following text: \n\n\"${text}" \n\n but Convert it into a more casual and popular style, giving it a more natural tone`
    case "Persuasive":
      return `Display 10 variations of the following text: \n\n\"${text}" \n\n but Make it to more persuasive, adding a sense of confidence and demand`
    case "Corporate":
      return `Display 10 variations of the following text: \n\n\"${text}" \n\n but Give it a corporate tone by converting it into a formal and official style"`
    case "Viral":
      return `Convert the following text to be a viral social media post:\n\n\"${text}\"`
    case "Teacher":
      return `Transform the following text so it will sound like a teacher in a school speaking with children:\n\n\"${text}\"`
      case "60":
        return `Convert the following text so it will sound like a spoken in the 60\'s: \n\n\"${text}\"`
      case "Interviewer":
        return `Convert the following text so it will sound like an interviewer with a critical tone: \n\n\"${text}\"`
      case "Costumers":
        return `Display 10 variations of the following text: \n\n\"${text}" \n\n BUT Convert the text so it will sound like a business chief talking to customers`
      case "Documentation":
        return `Display 10 variations of the following text: \n\n\"${text}" \n\n BUT Convert the text so it will sound like a documentation of an api or a web service`
      case "hr":
        return `Display 10 variations of the following text: \n\n\"${text}" \n\n BUT Convert the text so it will sound as an HR talking to an employee`
      default:
        return text
  }
}

function extractSentences(text) {
  const sentences = text.split("\n").filter(line => line !== "" && !line.startsWith("n"));
  return sentences.map(str => str.replace(/^\d+\.\s*/, ''));;
}

module.exports = {
  translate,
}
