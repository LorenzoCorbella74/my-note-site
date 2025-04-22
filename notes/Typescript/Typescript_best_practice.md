# Typescript best practices
Linee guida per scrivere high quality, well structured, readable, maintainable e scalable code in typescript.

## Table of contents
- [Project architecture](#project-architecture)
- [Language features](#language-features)
- [Asyncronous programming](#asyncronous-programming)
- [Error handling](#error-handling)


## Project architecture
Per la struttura delle cartelle si usa il LIFT Principle (Locatable, Identifiable, Flat, Try DRY) dove `Locatable` indica dovrebbe essere facile da trovare, `Identifiable` indica che dovrebbe essere facile capire cosa fa un file, `Flat` indica che la struttura delle cartelle dovrebbe essere il più piatta possibile `Try DRY` (Don't repeat yourself) indica che dovrebbe essere evitata la duplicazione di codice.


Relativamente all'architettura, si deve favorire un "Modular design" favorendo la "Separation of concerns" e si possono distinguere tre layer :
- Data layer: getting and saving data
- Domain layer:  la business logic layer per manipolare i dati Puo essere suddivisa in:
    - entities: per la rappresentazione dei dati
    - services: per la logica di business
    - repositories: per l'accesso ai dati
    - use-cases: per le varie funzionalità o feature dell'applicazione
- Presentation layer: la UI composta da componenti della UI che possono essere realizzati con qualsiasi framework e se si cambia framework non si deve cambiare la logica di business...

L'idea generale è minimizzare la dipendenza tra i layer perchè meno sono connesse le parti del codice, più è facile da testare e mantenere il codice.
La regola da seguire è la "Dependancy rule" che dice che i moduli di alto livello non dovrebbero dipendere dai moduli di basso livello, ma entrambi dovrebbero dipendere da astrazioni. Inoltre, le astrazioni non dovrebbero dipendere dai dettagli, ma i dettagli dovrebbero dipendere dalle astrazioni, cioè le dipendenze sono:
- solo in un senso: da UI a business logic e da business logic a data layer 
- dovrebbero avere un solo livello di profondità


Un paradigma molto usato è il Domain Driven Design (DDD) che si basa su tre concetti:
- Entities: oggetti che hanno un identità unica (e non importano niente se non le relative dipendenze) e che sono definiti dai loro attributi e metodi: es. la classe di un TodoItem, la classe di un TodoList (con tutti i metodi per manipolare la lista), etc.
- repositories: oggetti che interagiscono con i data layer senza sapere nulla di come i dati sono salvati: es. la classe di un TodoRepository che ha i metodi per salvare, cancellare, modificare, etc. un TodoItem

## Links

- [Corso pluralsight](https://app.pluralsight.com/library/courses/typescript-best-practices/table-of-contents) 