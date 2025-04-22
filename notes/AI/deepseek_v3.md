# Deepseek V3

Il modello Deepseek è stato aggiornato alla [V3](https://api-docs.deepseek.com/news/news1226) con 671M parametri avente un architettura che comprende molti modelli + piccoli ognuno allenato per task specifici (Mixture of Expert MoE) e grazie alla multi token prediction è velocissimo e molto economico rispetto a Claude/Sonnet in quanto l'API costa 15 volte meno.

Considerare che ogni app semplice può consumare 1M di token pari a circa un 1$ (15$ con sonnet).

## Cline
E' possibile utilizzare l'API con cline impostando:
- API provider: OpenAI Compatible
- Base URL: https://api.deepseek.com
- Api key
- Model ID: deepseek-chat

## Aider
E' possibile utilizzare l'API con Aider impostando:
```bash
export DEEPSEEK_API_KEY=your-api-key

aider --deepseek
```

## Source
- [youtube video](https://www.youtube.com/watch?v=lGI6CR-O44g&t=17s&ab_channel=AICodeKing)