# Deepseek R1
E' una AI cinese che ha delle performance paragonabili a OpenAI O1/ Claude 3.5 Sonnet sia come [chat](https://chat.deepseek.com/) che come [API](https://api-docs.deepseek.com/) ma molto più veloce e sopratutto più economica.

Per poter lavorare in locale con [ollama](https://ollama.com/library/deepseek-r1/tags) sono stati messi a disposizione dei modelli `Distill` OPEN SOURCE da varie versioni di parametri (1.5B, 7B,8B,14B,32B) che sono delle versioni fine tune (tramite syntetic data generati dal modello Deepseek R1) di open source models (Llama e Qwen) con long chain of Thoughts e reasoning. Il migliore è il 32B che ha una performance paragonabile a O1


## Roo Cline + Deepseek R1
Recuperare una chiave API da [Deepseek](https://platform.deepseek.com/api_keys) 

Al momento cline non supporta il formato di output di deepseek R1, quindi l'utilizzo non è raccomandato, ma può essere utilizzato con Roo Cline (ora Roo Code) in modalità Architect. 

1. Impostare nei Providers settings:
- Configuration profile: `deepseek-reasoning`
- API Provider: Deepseek
- DeepSeek API Key: chiave recuperata
- Model: deepseek-reasoner -> punta a R1

2. impostare poi un profilecon `deepseek-chat` con le stesse impostazioni di prima ma con Model : deepseek-chat. 

L'idea è di usare la modalità Code e Architect entrambe con deepseek-reasoning oppure usare deepseek-r1 per la modalità architect e poi usare V3 per implementare i task (che è + economico e più veloce)

## Ollama
Si può utilizzare il modello distilled `deepseek-r1 32b BR1` in Ollama per aumentare le prestazioni.

## continue
Scegliere nella select del modello la voce "Add Chat model" e selezionare:
- Provider:  Ollama
- Model:autodetect
Si potrà poi selezionare nella select Autodetect - deepseek-r1:7b

## Aider
Si aggiorna aider:
```bash
> pip3 install --upgrade aider


# Impostando un .aider.config.yml con:
# model: deepseek/deepseek-reaasoner
# editor-model: deepseek/deepseek-chat
# è possibile istartare con
> aider

>>> make me a chat interface that uses OpenAI API and make sure it looks sleek and modern using html, css, js
```

L'`architect` farà il plan e la `chat` la realizzerà.


## Links
- [News presentazione](https://api-docs.deepseek.com/news/news250120)
- [Youtube video](https://www.youtube.com/watch?v=emXbPe86UVs&ab_channel=AICodeKing)
- [DeepSeek-R1-Distill-Qwen-32B-GGUF](https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-32B-GGUF)


### Esempio di prompt STEP BY STEP
```bash
>>> i want to create a website called <name>, the idea behind this website is to create a <description> that will help <target audience> to <goal>. I want the website to be <adjective> and <adjective>

>>> do all these in order, the task is not completed untill you've done all the steps in the list. continue operating until finished

use angular 19.1
create icons and svg as you are going. start with something simple
give the entire folder and file structure as you see it at the beginning, then give me the entire commands to create folders and files, i'm on a mac.
Do not use src directory

Step1:  ....xxxxx
Step2:  ....xxxxx
Step3:  ....xxxxx
```


## LM Studio
E' il competitor di ollama per installare e far girare i modelli LLM Open Source. La funzione di Search and Download è eseguita da [Hugging Face](https://huggingface.co/), repository di Machine Learning Models e comunità che collabora su modelli, datasets e applicazioni.
E' possibile uploadare documenti (pdf, docx, txt, csv) e di chattare con essi con la funzionalità `File Attachments and RAG`.

## Private LLM
Altro software solo per MAC e IOS per installare e far girare i modelli LLM Open Source.


## Links
- [You Tube video](https://www.youtube.com/watch?v=lWRebGpMb30&ab_channel=SimoneRizzo)
- [llm-studio](https://lmstudio.ai/)