# AI Prompt Engineering for Programmers

## Index
- code generation, comments and placeholder data e conversione tra un linguaggio ad un altro.
- code optimisation
- devlopment tools (git commit messages, documentation)- - come avere la risposta desiderata
- general tips

## Generating code
```bash
> add comments to this code that a beginner will undestand
> converti questo codice da Python a C#
> generate a 15 record CSV file with placeholder data for username, password, email, and phone number.
> initiate a Python disctionary to each country in europe with the value representing that country\'s population
```
## Code optimisation
Si può usare per diminuire la quantità di codice, rimuover redundancy e reinforce best practices:
```bash
> ottimizza questo codice python
> come posso migliorare questo codice?
> formatta il codice to meet the c# coding standard
> re write the code to follow the standard python style
> refactor this code to make it more readable
> this code is to large. can you help me break it down into smaller parts?
```
Molti linguaggi hanno "coding standard" or "best practices". Se si ha un file che è troppo grande l'AI può aiutare a compartimentare il codice in parti più piccole.


## Development tools
L'AI può aiutare a scrivere messaggi di commit, generare test cases, scrivere documentazione e consigliare su file/folder structure.
```bash
> scrivi un messaggio di commit per il seguente codice
> create a gitignore file for this project that will be using angular and bootstrap
> generate 5 test cases from this code
> i have  a python function  i want to test. Give me 20 example parameters i could use to test it
> write a one page document for this code explaining what it does, the input, the outputs as well as use cases.
```

Se si vogliono imparare framework o librerie nuove, si può chiedere all'AI di fornire risorse o esempi.
```bash
> se voglio processare delle immagini quali sono le top 5 image libraries
> quale consiglieresti di usare per compiti come l\'aggiustamento del conrasto e la riduzione del rumore?
```

Quando si inizia un progetto l'AI può aiutare a strutturare la struttura del progetto e dei file/folder.
```bash
> what is the best way to structure a python project?
```



## Getting the desired response
```bash
> you are a senior developer and an expert in explaining complex concept in simple terms. How can i add...
> I\'m a expert in the javascritp language and i want to learn python. What are the key differences between the two languages?
# indicare il livello di conoscenza
> I \'m an expert programmer or I\'m a total beginner, can you explain the concept of recursion to me in one paragraph?

## step by step
> show me an example of inheritance in javascript step by step

## style or format of the response
> why should i learn python over c++? List the reason inside a table
> i want to learn SQL. Can you provide me with a list of resources that are free and easy to understand, along with a one sentence description for each? The course name should be in bold heading with a link to that specific course.
> in one paragraph explain what a compiler is and how it works. Use bullet points to list the steps involved in the process.
> in 30 words explain what a compiler is
> in one sentence explain what a compiler is
> in 5 words explain what a compiler is

> explain object oriented programming as a song or haiku
```
## references
L'AI ha ricuperato informazioni da internet e come può fornire risposte dettagliate su un argomento può specificare anche le referenze di tali informazioni.
```bash
> what is the difference between a linked list and an array? please provide reference of your response
> what is computer networking? please provide reference to books
```

## general tips

### Context
L'idea è che più contesto diamo all'AI e migliore sarà la risposta. E' possibile fare un raffinamento della response dando più dettagli possibile.
```bash
## BAD
> what project i can make in python?

## GOOD
> I\'m a beginner in pyton and I have been learning for the past two weeks. What is a project i can realistically make at my skill level in a single day 
```

### give examples
Fornendo esempi si fa un fine tune della request:
```bash 
## BAD
> can you give me an idea for a fun mobile game?

## GOOD
> can you give me an idea for a fun mobile game, similar in complexity to flappy bird or Fruit ninja?
```

## Summarize
Siccome l'AI ha memoria della conversazione può essere utile avere un riassunto dell'intera conversazione.
```bash
> in one paragraph can you summarize what we have discussed so far?
> Based on our conversation what are the top 5 thimgs to take away from this?
```

## Elaborate
Se si vuole una risposta più dettagliata si può chiedere all'AI di elaborare la risposta.
```bash
> Parlami delle 5 librerie più popolari per il machine learning rispondendo con un elenco puntato
> dimmi di più del punto 3
```





## Links
- [zenva course](https://academy.zenva.com/course/ai-prompt-engineering-for-developers/)