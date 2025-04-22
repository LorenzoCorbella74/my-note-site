# Hugging Face
Hugging face è una piattaforma ricca di modelli open source e dataset è [Hugging Face](https://huggingface.co/) su cui è possibile recuperare vari modelli come GGUF file o altri formati.

Tali modelli possono essere importati dentro Ollama. Selezionare nella TAG cloud a SX il formato `GGUF` (cioè con metadati che permettono di essere usati con Ollama). Copiare il nome del modello tramite btn alla DX del titolo del modello e poi scaricare il modello con:

```bash
> ollama run hf.co/<NOME_MODELLO_GGUF_COPIATO>
``` 

E' possibile testare i modelli di Hugging Face sul browser o in node tramite javascript e la libreria [trasformers.js](https://github.com/huggingface/transformers.js). Nel repo della libreria vedere i numerosi [esempi](https://github.com/huggingface/transformers.js/tree/main/examples) che permettono di:
- rimuovere lo sfondo ad una immagine
- text to speech
- traduzione

In node invece si può:
```js
const { pipeline } = require('@huggingface/node-fetchtransformers');

// create a pipeline for a sentiment analysis task
const pipe = TextClassificationPipeline = await pipeline({task:'sentiment-analysis'});

// run the pipeline on a text
const result = await pipe('I love you');
console.log(result);
```

 Se il browser supporta WebGPU, allora si ha un boost delle performance, vedere l'esempio [WebGPU Chat](https://github.com/huggingface/transformers.js/tree/main/examples/webgpu-chat)