# CI / CD
Con gli acronimi CI (Continuos integration) / CD (Continuos delivery) e Continuos deployment si intende un metodo per consegnare (deliver) con una certa frequenza applicazioni di alta qualità al cliente introducendo l'automazione nelle varie fasi dello sviluppo software (building, testing, deploy, etc) minimizzando attività manuale umana. 

Una volta che si è impostata questa pipeline di automazione uno sviluppatore può cambiare del codice ed avere tale modifica live in produzione in tempi rapidissimi. 

Non è un insieme di tool ma un insieme di pratiche, un gruppo di principi operativi che hanno bisogno di essere recepiti a livello di cultura lavorativa.

## Continuos integration
Adottare la pratica di una continua "integrazione" del codice in un repository centrale condiviso + volte al giorno è il 1° requisito per la produzione di software di qualità. Ogni commit è verificata da automated builds and test che girano sui server di CI. Gli obiettivi sono:
- Trovare i bug + velocemente
- aumentare la qualità del codice
- ridurre il tempo per validare e rilasciare nuovi aggiornamenti software

## Continuos Delivery
Un software pronto per essere deploiato è un software che ha superato un processo standardizzato di test. Gli artefatti prodotti dai server CI sono deploiati su server di test (staging) e poi su server di produzione secondo quindi un flusso di TEST -> BUILD -> DELIVER -> RELEASE.  ___Prevede una fase di approvazione  e conseguente intervento umano___.

## Continuos Deployment
La fase finale di un processo automatizzato di sviluppo del software in cui il software è consegnato frequentemente attraverso sistemi automatici di Deployment (distribuzione dei software artifacts all'utente finale) ___che non hanno bisogno di approvazione___.

## Software Development Lifecycle (SLDC)
Processo "sistematico" iterativo per produrre software di qualità:
- planning: si recupera tutte le informazioni ed aspettative dal cliente
- defining: una volta che i requisiti sono chiari si crea un documento con le specifiche dei requisiti del software
- designing: si crea un documento con le specifiche di design ed architettura e si seleziona la migliore soluzione
- building: scrittura codice
- testing: si valuta la qualità del software prodotto cercando di sistemare i difetti 
- deployment: si rilascia il software e si provvede alla manutenzione 

In un processo ciclico si riparte dal planning! per new features, revisioni, etc.

Senza un approccio automatico si hanno tanti passaggi manuali che sono sorgenti di errori e sprechi di tempo:
![errori](./img/no_automation.jpg)

Con la CI/CD si ha compressioni dei tempi e migliore efficienza dell'intero processo di produzione:
![automazione](./img/automation.jpg)


























```bash
& npx 
```