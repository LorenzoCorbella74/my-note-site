# [Claude](https://www.anthropic.com/claude)
Claude è una famiglia di AI model "sicuri" costruiti da Anthropic (fondata nel 2021 da 7 ex dipendenti di OpenAI). Abbiamo, a salire per intelligenza e costo dal 22/10/2024:
- Haiku (leggero e veloce)
- [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) (21/06/2024 il + avanzato) che supera o eguaglia GPT4-4o 

Questi modelli eccellono in:
- advance reasoning (vanno oltre la semplice predizione ed il pattern recognition)
- vision analysis: riconoscimento di testo, immagini, grafici, audio, video
- code generation: scrivono codice in diversi linguaggi
- multilingual processing: supportano molte lingue

Per fare dei test utilizzare la [chat](https://claude.ai/new) mentre per generare una [API Key](https://console.anthropic.com/settings/keys)

Ho registrato una chiave chiamata `testAPI` tale chiave deve essere salvata in un file .env con la variabile d'ambiente `ANTHROPIC_API_KEY=testAPI`, a cui si può accedere in Node.js con process.env.ANTHROPIC_API_KEY .

Per fare una chiamata a Claude 3.5 Sonnet (200K context window) si può usare il seguente codice importando la dipendenza @anthropic-ai/sdk@0.24.3 d usando la [message API](https://docs.anthropic.com/en/api/messages):
```javascript

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    baseURL: 'https://apis.scrimba.com/api.anthropic.com/'
})

const text = textInputArea.value
    
const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300, // required
    system: 'You are a text summarizer. When asked to summarize a text, send back the summary of it. Please only send back the summary without prefixing it with things like "Summary" or telling where the text is from. Also give me the summary as if the original author wrote it and without using a third person voice.',
    messages: [
        {
            'role': 'user',
            'content': [
                {
                    'type': 'text', // tipo di response text, image
                    'text': `Summarize this text. Limit the length to ${summaryLength} words: ${text}`                }
            ]
        }
    ] 
}) 

console.log(response.content[0].text)
```

Nel caso volessi allegare una immagine al testo da analizzare, si può fare con il seguente codice:
```javascript
async function describe() {
    try {
        startLoading()
        const base64ImageData = await fetchImageAndReturnBase64ImageData(imageUrl);
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20240620',
            max_tokens: 300,
            system: 'You are an image describer. When asked to describe an image, provide an accurate description.',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: imageType,
                                data: base64ImageData
                            }
                        },
                        {
                            type: 'text',
                            text: `Describe the image with a limit the length to ${summaryLength} words.`
                        }
                    ]
                }
            ]
        })
        endLoading()
        descriptionOutputArea.value = response.content[0].text
    } catch(error) {
        handleError(error)
    }
}
```
      