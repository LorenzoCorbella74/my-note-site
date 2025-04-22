#AI, #software 

# Ollama
[Ollama](https://ollama.com) è un software per WIN, MAC, Linux che permette di eseguire **in locale** i modelli LLM quali Llama3.2 (prodotto da Meta in versione 1B e 3B (3 milioni di parametri), modelli esclusivamente testuali e large language model multilingue), Mistral, etc per avere un assistente personale e chattare con esso. Notare che ogni modello ha un peso in GB pertanto si deve avere un quantitativo di memoria sufficiente per far girare il modello scelto (si utilizza la memoria della GPU e e non la RAM!!!!). DA Verificare: Il modello che funziona meglio con la lingua italiana è [Mistral](https://ollama.com/library/mistral) e [Zephyr](https://ollama.com/library/zephyr). 

[Documentazione ufficiale](https://github.com/ollama/ollama/tree/main/docs)

### Installazione

Scaricare il software dal [sito](www.ollama.com) e guardare la [guida video in ITA](https://www.youtube.com/watch?v=y7ZnVxj-6P4&ab_channel=AvvocatieMac) e relativo [articolo](https://www.avvocati-e-mac.it/blog/2024/3/15/installazione-ed-utilizzo-di-ollama-su-mac-guida-per-principianti-per-chattare-con-il-tuo-llm-personale). L'installer chiederà di installare il software per la CLI.

### Context length
Il default di solito è impostato a 2048 tokens di input che il modello considera , cruciali per gestire la quantità di informazioni processate in una singola request, ma può essere adattato in base ai requisiti:
```
> /set parameter num_ctx 4096

# nelle richieste
> curl http://localhost:11434/api/generate -d '{ "model": "llama3", "prompt": "Why is the sky blue?", "options": { "num_ctx": 4096 } }'

# oppure tramite modello custom
> ollama pull qwen2.5-coder:7b #4,7GB
> touch Modelfile
> vi Modelfile

# contenuto del file Modelfile
# FROM qwen2.5-coder:7b
# PARAMETER num_ctx 32768

> ollama create -f Modelfile qwen2.5-coder:custom
> ollama show qwen2.5-coder:7b # è possibile vedere il context length modificato...
```
E' comunque sempre importante vedere quanto il context è impostato nel modello corrente:
```
> ollama show qwen2.5-coder:7b
```

## CLI
Ollama è composto da due componenti principali, il CLIENT e il SERVER. Il CLIENT è un'interfaccia a riga di comando (CLI o REPL) che permette di interagire con il SERVER (che gira in background e pubblica l'API REST a http://localhost:11434/api).
I principali comandi sono:
```bash
> ollama -v # per vedere la versione
> ollama -h --help # lista comandi
> ollama list # o "ls" per vedere i modelli istallati
> ollama ps # mostra il modello corrente (il modello rimane in memoria di default per 5 min)
> ollama run llama2 # permette di eseguire il modello o di scaricarlo se non presente (si può specificare anche --format json per avere tale formato come output, --verbose per avere dei dettagli della risposta e --keepalive 20 per indicare la durata in memoria)
> ollama pull llama2 # per scaricarlo (senza eseguirlo)
> ollama rm llama2 # per rimuovere un modello
> ollama push nomemodello # pusha un nuovo modello su ollama.com

>>> 			/? # help dei comandi disponibili
>>> /? shortcuts   # lista di keyboard shortkuts
>>> /bye           # per uscire (in alternativa COMMAND + D)
>>> /load /save    # caricare e salvare una sessione di chat con un modello specifico
>>> /show          # mostra le informazioni del modello
>>> /set           # setta le variabili della sessione di chat
>>> /set system    # permette di personalizzare il c.d. _system prompt_ dell’LLM, ovvero la “personalità” dell’LLM. Ad esempio si può dire all’LLM è una IA italiana e deve rispondere solo in italiano;
>>> /set template # creare un template o modello di domanda di “riciclare”;
>>> /set verbose # permette di avere le statistiche dell’LLM ad esempio il tempo impegato per dare la risposta piuttosto che il valore token per secondi.
>>> """ # per scrivere un messaggio su più righe
```

Vedere anche i comandi nel seguente [articolo](https://www.avvocati-e-mac.it/blog/2024/3/3/lintegrazione-dellintelligenza-artificiale-in-uno-studio-legale-usando-un-macmini-m1-vantaggi-e-sfide):
```bash
> cat output.txt | llm -m mistral "riassumi il testo in circa 400 parole, utilizza la lingua italiana per il riassunto" >> "risposta LLM.txt"
```
## Cos'è un modello

L'idea è quella di usare il modello con la minore dimensione di parametri e con la minore quantization che dà i migliori risultati nella maggior parte dei casi, non ha senso aspettare più minuti per una risposta leggermente migliore.

Un modello è una collezione di nodi (una parola o una frase) tra loro combinati secondo dei weights e biases (a cui sci si riferisci definendoli parametri,  dove B indica Billion of parameters) secondo diverse "quantizzazioni" . Per creare un modello si usa:
```bash
> ollama create nomemodello -f ./modelfile  # permette di creare un modello da un modello + un template ed un system prompt

> ollama run nomemodello # per eseguire il modello
```
Mentre per il template "modelfile" si ha>
```:
FROM llama3.1
SYSTEM """
You are an english teacher...
"""
```
E' possibile creare un modello da un weight file che può essere scaricato da hugginface come GGUF file convertito e quantizzato da qualcun'altro.

## [Integrazioni con altri software](https://github.com/ollama/ollama?tab=readme-ov-file#web--desktop)
Esistono dei software open source desktop come [Rivet](https://rivet.ironcladapp.com/) che permettono visualmente di combinare, tramite un Node based editor, senza codice, dei flussi permettendo di creare degli **AI Agents** complessi. L'utilizzo permette ad esempio, tramite il plugin di ollama di estrarre testo da un .pdf convertirlo in .md, e generare un riassunto tramite il modello llama2. Guardare [l'articolo](https://www.avvocati-e-mac.it/blog/2024/3/20/rivet-una-soluzione-facile-e-veloce-per-creare-agenti-ai-con-llm-in-locale) ed [il filmato](https://www.youtube.com/watch?v=y6fbGp32iBw&ab_channel=AvvocatieMac). Tale software di fatto dialoga con l'API di ollama (è come un server che risponde al path http://192.168.1.126:11434) per utilizzare le funzionalità di quest'ultimo. Vedere [la guida](https://www.avvocati-e-mac.it/blog/2024/4/15/configurazione-rivet-per-utilizzarlo-con-ollama) per configurare  Rivet con ollama.

E' presente per raycast un [plugin](https://www.raycast.com/massimiliano_pasquini/raycast-ollama) che permette di eseguire Ollama e mostrare l'output in UI. Vedere i due articoli  l'[articolo](https://krgr.dev/blog/local-genai-with-raycast-ollama-and-pytorch/) che combina questi tool per avere una AI generativa locale:
- [writing assistance](https://calvincchan.com/blog/240217_free_offline_ai_writing_assistance_for_mac_with_local_llm)
- [raycast ollama & pytoarch](https://krgr.dev/blog/local-genai-with-raycast-ollama-and-pytorch/)

E' possibile utilizzare l'app shortcuts per mac per interrogare il server ollama tramite chiamate POST e mostrare il risultato dell'interrogazione come spiegato nell'[articolo](https://www.avvocati-e-mac.it/blog/2024/9/29/comandi-rapidi-ed-ollama-le-basi)

## Third party UI
Una UI frequentemente usata per mostrare l'output di ollama è [open web UI](https://openwebui.com/) oppure [Msty](https://msty.app/) che permettono di gestire + facilmente la memoria di una conversazione (quante volte sarà possibile avere risposte senza perdere il contesto)

## RAG
Ogni modello ha dei punti di debolezza (Hallucinations, lack of consistency, no recent info). I modelli impiegano mesi per essere allenati e questo implica che sono sempre NON aggiornati. Per superare questo problema si usa RAG (Retrieval Augmented Generation). Il modello genera una risposta che è poi aumentata da quello che può essere recuperato da una collezione di documenti.
Si deve:
- considerare il tipo di documento (+ è facile prendere il raw text e meglio è)
- recuperare il contenuto del documento in un formato opportuno (vector database)
- separazione (chunk) del testo
- embed the text = gli embedding model producono delle rappresentazioni numeriche del testo che indicano il significato semantico del chunk passato e rappresentato in un vettore multidimensionale (quante dimensioni dipende dal modello) che permette di valutare i chunk più affini al prompt dato.
Quando si esegue un prompt si crea un embedding del prompt e si esegue una query nel db per trovare i chunks simili nel DB e si costruisce un prompt con la query original + i chunks e poi si passa la query final al modello.


## Rest API
E' possibile interagire con ollama tramite una REST API con due endpoint principali, `chat` (indicata per le chat) e `generate` (più indicata per chiamate singole):
```bash
# Generate a response
| curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt":"Why is the sky blue?",
  "stream":false,
  "keep_alive": 60, # in secondi in memoria (di default è 5)
  "images": ["fdsfdsjfkajsfkjsdkfjalkjdsfkjafkdasdfa....."], # per modelli multi modal (solo base64),
}'
# Chat with a model
| curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    { "role": "user", "content": "why is the sky blue?" }
  ]
}'
```
Esistono due librerie per interagire con la REST API di ollama una [Javascript](https://github.com/ollama/ollama-js) ed una [Python](https://github.com/ollama/ollama-python)

# Links
- [Ollama and LangChain.js for RAG | Complete code example](https://www.youtube.com/watch?v=3bz0nzs1tRA&t=195s) and [code](https://github.com/anelook/memory-service-ollama) 09/2024
- [Ollama and Langchain](https://js.langchain.com/docs/integrations/chat/ollama/)
- [Level Up Your Typescript Skills: Adding Ollama To Your Apps!](https://www.youtube.com/watch?v=kaK3ye8rczA&t=133s) and [code](https://github.com/technovangelist/videoprojects/tree/main/2024-03-28-intro-dev-tsjs) esempi progressivi
- [Building rag with typescript + chromaDB](https://github.com/technovangelist/videoprojects/tree/main/2024-04-08-build-rag-with-typescript)
- [function calling with tools](https://github.com/technovangelist/videoprojects/tree/main/2024-07-10-functioncalling-with-tools) + [video](https://www.youtube.com/watch?v=hb5iwDpsPwc)
- [Freecode Camp - Ollama Course – Build AI Apps Locally](https://www.youtube.com/watch?v=GWB9ApTPTv4&t=6706s) - (python)
- [Corso Ollama e LangChain in Typescript](https://www.youtube.com/playlist?list=PLoZNHBEyxFQGylexl7fB3dJuM0XB4ldUB) + [codice](https://github.com/johnnypax/langchain-javascript-ollama-yt)

- [Chat FE in vanilla JS](https://medium.com/@santoshmouriya1234567890/ollama-js-make-your-own-chatbot-with-ollama-js-nodejs-and-html-css-and-javascript-d9fc225bf92f)

- [How to Create Your Own Dataset from Scratch with Ollama Locally](https://www.youtube.com/watch?v=Lie8uMoAVec)