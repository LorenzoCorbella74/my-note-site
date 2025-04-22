## Codestral V2
E' uscito una nuova versione del modello di Mistral Codestral, chiamato [Codestral25.01](https://mistral.ai/news/codestral-2501/), che ha la caratteristica di generare codice 2 volte + velocemente della precedente versione (e nel fill in the middle performa meglio di Deepseek V3 oltre che buono nel code completion). E' considerato la 1° scelta per copilot-arena. Il modello NON è open source ma se si accede tramite la codestral-api allora è free e senza rate limit.

Può essere utilizzato con:

1. tramite il plugin di VSC [Continue](https://www.continue.dev/) specificando nella select "Add chat model" specificando poi "Mistral" come provider e "Codestral" come Model inserendo poi la API key e premendo il btn Connect. Da notare che Connect ha ora mCP tools che permette di leggere, creare file e fare altre operazioni come Clyde. Il modello può anche essere poi usato come "Autocomplete provider" specificando nel file config.json:

```json
{
  "tabAutocompleteModel": {
    "title": "Codestral",
    "provider": "mistral",
    "model": "codestral-latest",
    "api_key": "your_api_key"
  }
}
```
2. [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) Specificando nei settings:
- API Provider: OpenAI Compatible
- API Key: your_api_key
- Model ID: codestral-latest
- Base Url: https://codestral.mistral.ai/v1

3. [Aider, AI pair programming in your terminal](https://github.com/Aider-AI/aider). Per aggiornare [aider](https://aider.chat/) usare il comando:
```bash
>pip3 install --upgrade aider-chat

> export CODESTAL_API_KEY=6zl2zkJUzpiVyAgtqoPCmeUJ4eUcviL8 (MAC)
> CODESTRAL_API_KEY=6zl2zkJUzpiVyAgtqoPCmeUJ4eUcviL8 (WIN)

> aider --model codestral/codestral-latest
```

4. [bolt.diy](https://github.com/stackblitz-labs/bolt.diy). Una volta installato localmente NON si può usare sceglendo "Mistral" come provider e "Codestral" come modello inserendo poi la API key, ma si deve invece usare il comando:
```bash
# si installa il server llm
> pip3 install litellm

# si setta la API key
> export CODESTAL_API_KEY=your_api_key

# si esegue il server llm
> litellm --model codestral/codestral-latest
```
Poi andare nei settings e negli endpoint "OpenAi like" indicare `http://localhost:4000` come URL. e poi dal pannello frontale scegliere "OpenAILike" come provider, "codestral/codestral-latest" come modello e poi la api-key.

[Source](https://www.youtube.com/watch?v=HG5z_UeGJ2M&ab_channel=AICodeKing)


Oppure dal seguente [video tutorial](https://www.youtube.com/watch?v=j3cjbY4TzBM&ab_channel=MervinPraison) spiega come usare il modello con [Praison AI](https://github.com/MervinPraison/PraisonAI) e con Continue:

```json
{
  "models":[
    {
      "apiKey": "your_api",
      "title": "Codestral",
      "model": "codestral-latest",
      "contextLength":32000,
      "provider": "mistral",
    }
  ]
}
```