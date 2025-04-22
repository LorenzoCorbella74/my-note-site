# Github Copilot

E' un Ai coding assistant che permette di scrivere codice velocemente e con meno sforzo. L'idea è quella che sia un aiutante e non il pilota dell'aereo, quindi verificare sempre le risposte che produce e editare il codice secondo il seguente ordine di modifica:
- ghost text
- inline chat
- chat panel


 La versione Free permette di avere, 50 chat requests e 2000 completamenti al mese.


## 1. Code completion
Inserendo un commento o semplicemente attendendo si possono ricevere suggerimenti (code completion as ghost text) che possono essere accettati premendo `TAB`. Nota bene anche il code completion può essere pensata come una query del tipo: `you are a code completion agent. The current file you have to complete is {file}, the language of the file is {language}. Return the result as a plain text without the "". Finish the following code snippets  {{prefix}}[MARKER]{suffix}} . Only return the exact replacement for the marker. Do not return multiple suggestions`.

## 2. Inline Chat
Premendo `cmd + I` si può avere una chat inline che permette di avere un'interazione più veloce con Copilot e limitata alla porzione di codice ed al file che sto editando (`ESC` per chiudere tale chat inline) _ed è consigliata rispetto ad inserire un commento ed aspettare l'autocompletamento_. Inoltre usare inoltre la feeback e rating feature (i btn per dare un voto ai suggerimenti) per migliorare la qualità dei suggerimenti nel tempo.

## 3. Chat
Tramite la chat in basso è possibile:

- chattare (anche oralmente premendo il microfono) sul codice del file corrente o fare domande generiche (`Puoi darmi 15 React interview questions and answers`) 
- chiedere a copilot di eseguire dei task come `create a fancy login form` ed indicare cambiamenti usando il linguaggio naturale oppure `regex to match the phone number in the format (xxx) xxx-xxxx`.
- allegare file di contesto
- usare i `participants` scrivendo nella chat il carattere `@`. Questi permettono di specificare il contesto in cui si vuole lavorare ed eseguire azioni.

### [Participants](https://code.visualstudio.com/docs/copilot/getting-started-chat#_use-chat-participants)
Potrei scrivere nella chat `Qual'è lo shortcut per aprire il terminale?` e copilot andrebbe online per trovare la risposta ma correttamente si dovrebbe usare `@vscode qual'è lo shortcut per aprire il terminale sul mac?`, oppure `#terminal top ten git command` se si vuole avere informazioni sul terminale di VSC o `@workspace` se si vuole avere informazioni sul workspace (tutti i file del progetto).

### @workspace
E' sempre bene specificarlo nella chat se invece di fare domande generiche si vuole fare domande esclusivamente al contesto del progetto. Ad esempio `@workspace create a new component in src/features/products to manage CRUD operation on products`. oppure `@workspace where is the AuthComponent referenced`.

Notare che è possibile riusare dei prompts usando la UP ARROW e DOWN ARROW per navigare tra i precedenti messaggi.

### Shortcuts
per non rieseguire lo stesso task si usano gli **slach command** _sottolineando il codice_ ed inserendo `/` per poi avere una lista di comandi disponibili. Ad esempio:
 - `/doc` per documentare il codice,
 - `/edit` per modificare il codice, 
- `/explain` per spiegare il codice,
- `/fix` per correggere il codice,
- `/generate` per aggiungere codice,
- `/test` per testra eil codice,

Notare che premendo `/` nella chat si possono avere + comandi rispetto all'inline chat, come ad esempio `/new` che permette di creare un nuovo file o `/clear` che pulisce la history della chat.


### [Copilot Edit](https://code.visualstudio.com/docs/copilot/copilot-edits)
Accando al btn `Chat`(ctrl - alt + I) c'è il btn `Copilot Edit`(ctrl - shift + I in WIN e cmd + shift + I su MAC) che permette di selezionare dei file di contesto e di poter applicare delle modifiche su ciascuno di questi. 
Tramite drag & drop si possono selezionare i file di contesto e poi si può specificare l'azione da eseguire come `update the home page to list the artistd from the attached .csv file and add link to the about.htm and contact.htm page`. Noatre che una volta suggerite le modifiche verranno mostrati due btn `Accept` e `Discard` per accettare o rifiutare le modifiche globalmente (sulla chat) o singolarmente (sullo specifico file).





NB:  A seconda della licenza ci dovrebbe essere anche una dropdown che permette di scegliere il modello da utilizzare (Chat GPT4o ma anche Antropic Claude  3.5 Sonnet)


# Links
- [Github Copilot in VSC](https://code.visualstudio.com/docs/copilot/overview)
- [Official documentation](https://docs.github.com/en/copilot)
- [Coding best practices](https://www.youtube.com/watch?v=2q0BoioYSxQ)
- [@workspaces Deep dive](https://www.youtube.com/watch?v=3Yz48eenPEE)



## Essential AI prompts for developers
Per scrivere i prompt abbiamo le seguenti 4 strategie:
- **Q&A** strategy prompt: 
`#worksppace propose a file/folder structure for this project. Ask me a series of yes/no questions tthat will help you provide a better answer`
- P**ros & Cons** prompt
`what are a few different ways that i can implement this db connection logic. Give me the pros and cons of each suggestion #file:db.ts` -> `rewrite the code as suggestion 2` -> `give me an example for how to use this in my application`
- **Step by step** prompt
`Help me refactor the code in #file:vehicleSrv.ts. Go one step at a time. Do not move to the next step until i give you the keywork "next". Begin` 
- **Role** Prompt
`You are a skilled instructor who makes complex task easy to understand. You came up with fun exercises so that your students can learn by doing. your goal is to teach students to be proficient with {regex}. Move one step at a time and wait for the student to provide the correct answer before you move on the next step. If the student provide the wrong answer, give them a hint. Begin`

Source: [Essential AI prompts for developers](https://www.youtube.com/watch?v=H3M95i4iS5c)


