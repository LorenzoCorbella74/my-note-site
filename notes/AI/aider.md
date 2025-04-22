# [Aider](https://aider.chat/)

Aider è un tool di pair programming basato su IA che può essere usato nel terminale. Genera codice e crea ed edita files. Per installare (se già presente Python 3.8-3.13) usare il comando:

```bash

python -m pip install aider-install
aider-install
# oppure
pip install aider-chat

# Change directory into your code base
cd /to/your/project

# Work with Claude 3.5 Sonnet on your code
aider --model sonnet --anthropic-api-key your-key-goes-here


## oppure 
export ANTHTOPIC_API_KEY=your_api_key

aider --model anthropic/claude-3-5-sonnet-20241022
```
Il comando sopra crea un .git repo dove si possono costuire app e monitorare le modifiche inserendo le istruzioni nella console.

## Ollama
```bash
> ollama pull llama3.2 #2GB
> aider --model ollama/llama3.2If you already have python 3.8-3.13 installed, you can get started quickly like this:

python -m pip install aider-install
aider-install

# Change directory into your code base
cd /to/your/project

# Work with Claude 3.5 Sonnet on your code
aider --model sonnet --anthropic-api-key your-key-goes-here

```


## Links
- [Aider Github](https://github.com/Aider-AI/aider)
- [youtube video](https://www.youtube.com/watch?v=ooEQm0dyCjU&ab_channel=MervinPraison)