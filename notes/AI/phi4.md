# [Phi4](https://ollama.com/library/phi4)
Il context è in sintesi la memoria che il modello ha, quindi maggiore è e maggiore la sua conoscenza. Phi4 è  un modello molto completo di 14b che performa al pari di modelli con 72b. E' possibile usare il modello  con: 

## VSC + Cline
E' possibile configurare [cline](https://github.com/cline/cline) premendo la rotella dei settings ed impostando i seguenti:
- API provider: Ollama
- Base Url: http://localhost:11434
- Model ID: phi4

## BOLT DIY
E' possibile clonare il repo di bolt DIY, installre le dipendenze tramite `pnpm install`, e poi eseguire `pnpm run dev` per avere l'ambiente up and running su: http://localhost:5173. Scegliere poi `Ollama` come provider ed apparirà `phi4:latest` nel dropdown di modello. **Notare che il contesto del modello è soltanto 16k**. 