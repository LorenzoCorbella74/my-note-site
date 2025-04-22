# Gemini 2 Flash Experimental
E' un modello avanzato con un context window di 2M. Supporta il multimodal, cioè riceve input di diversi tipi e genera output di diversi tipi (testo, audio, video).Si può usare in chat con [Google AI studio](https://aistudio.google.com/prompts/new_chat) senza limiti, o tramite API con un rate limit molto generoso (10 request per minuto(RPM), massimo 4 milioni di token per minuto (TPM), e 1500 richieste al giorno gratuitamente).

Premendo il btn sulla sx "Get API key" è possibile ottenere una chiave API per utilizzare il modello tramite API. Il modello è come se fosse un 70% di Anttropic 3.5 Sonnet, ma è gratuito.


## Aider
```bash
> pip3 install --upgrade aider-chat # aggiorna il pacchetto

# per setta l'API key
> export GEMINI_API_KEY=your_api_key # va fatto tutte le volte che si apre la CLI oppure si può creare un environment file .env con la variabile d'ambiente GEMINI_API_KEY=abcd e AIDER_MODEL=gemini/gemini-2.0-flash-exp

# si starta con
> aider --model gemini/gemini-2.0-flash-exp
```

## Clyde
Al momento la dropdown dell'API Provider non è stata aggiornata con "Google Gemini" ma si può utilizzare l'opzione:
- API Provider: "Open AI Compatible" 
- Base Url: https://generativelanguage.googleapis.com/v1beta/openai/
- API Key: la chiave API ottenuta da Google
- Model ID: gemini-2.0-flash-exp 

Da notare che la function calling del modello è particolarmente efficace.


## Links
- [youTube](https://www.youtube.com/watch?v=0l4hoQlyslw&ab_channel=AICodeKing)