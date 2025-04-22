Copilot certification:
https://avanade.sharepoint.com/sites/certs/SitePages/GitHub/GitHub-Certifications.aspx#account-setup-association

STUDIO
- GitHub Copilot Fundamentals - Understand the AI pair programmer (5kr 46min)
https://learn.microsoft.com/en-us/training/paths/copilot/
- Accelerate app development by using GitHub Copilot (8hr 32m)
https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/

I prodotti disponibili

- Azure AI Services: set di cloud based services (speech recognition, natural language processing, computer vision, decision making) che permettono di integrare soluzioni di AI all'interno di applicazioni.  Un subset di questi sono i Azure cognitive Services che forniscono prebuild ai models per text analysis, image recognition, language translation ed integrati nelle applicazioni tramite REST APIs.

- Azure AI Studio: Piattaforma web based che permette di creare, allenare e deploiare machine learning models usando una interfaccia visual (senza scrivere codice) + features come data preparation, model training + model evaluation

- AI Builder:è una feature di MS Power platform che permette di aggiungere AI capabilities come:
	- prebuild AI models per task comuni come prediction, form processing, object detection, text classification
	- custom models customizzati su specifici esigenze di business
	- easy integration dentro applicazioni costrite con Power apps

- Copilot studio: E' uno strumento che permette, senza scrivere codice, all'utente di creare e gestire chatbot basati su AI in quanto supporta natural language understanding (NLU) e natural language generation (NGL) tramite l'utilizzo di modelli e strumenti per progettare e allenare chatbots

- Semantic Kernel (open source) SDK:permette agli sviluppatori di implementare modelli AI all'interno del proprio codice tramite la creazione di AI Agents che possono automatizzare modelli di business.

- Visual Studio intellicode: E' una extension che fornisce AI powered recommendations a VS.

- ChatGPT: è un modello di conversational AI, general purpose, sviluppato da Open AI che può essere usato in chatbots, virtual assistant

- GitHub Copilot tools: E' una suite di AI assisted programming tools potenziati da openAI Codex:
GitHub Copilot, developed by GitHub and OpenAI,  è un AI pair programmer che aiuta generando suggerimenti  (automplete based on the context of the code) e codice in molteplici linguaggi e con una avanzata IDE Integration
Copilot Chat permette di interagire con GitHub copilot tramite chat testuale per code explanation, documentation generation, text case generation, code fixes. Ha viri tipi di account:
- individual: verified students, teachers, and maintainers of popular open source projects on GitHub
- business: è il copilot aziendale dove si possono dare accessi a teams o individuals all'interno di una azienda
- enterprices: è disponibile per organizzazioni attraverso GitHub Enterprice Cloud e permette di creare documentazione, avere suggerimenti e fare la review di pull request. Introdue rispetto al Business un extra layer of customization for organizations.

I tools forniscono:
- code completion
- chat integration
- pull request summaries (Enterprice only): descrive i cambiamenti delle PR
- Knoledge bases (Enterprice only), crea e gestisce collezioni di codumenti da usare come contest per chattare con copilot
- copilot in the cli: 


Si hanno migliori risultati quando si specifica il contest tarmite i chat participants:
- The @workspace participant has context about the code in your workspace and can help you navigate it, finding relevant files or classes.
@workspace Explain this project
@workspace /explain #file:MainWindow.xaml.cs
@workspace Generate a project summary that can be used at an executive briefing
@workspace Generate a readme markdown document that can be used as a repo description
@workspace /explain #MainWindow.xaml.cs How can I handle 
@workspace #selection generate inline documentation
exceptions thrown during the download process?
@workspace document this project
@workspace document the project dependencies
@workspace document this project. Include an overview and sections for dependencies, features, requirements, constraints, summary
format the documentation as markdown and show the raw markdown file contents

- The @vscode participant knows about commands and features in the Visual Studio Code editor itself, and can help you use them.
- The @terminal participant has context about the integrated terminal shell and its contents.


Esempio: invece di scrivere un prompt come, ad esempio, "Create a new workspace with Node.js Express Pug TypeScript" means that you want a new project, si può scrivere "@workspace /new Node.js Express Pug TypeScript" come abbrevizione. Questi "slash commands" sono dei built-in commands:

/help: Get help about using GitHub Copilot.
/doc: Generate code documentation.
/clear: Start a new chat session.
/explain: Explain how the selected code works.
/explain why is the selection causing an error
/tests: Generate unit tests for the selected code.
/fix: Propose a fix for the selected code.
/new: Scaffold code for a new workspace. Only the chat prompt is used as context.
/newNotebook: Create a new Jupyter Notebook. Only the chat prompt is used as context.

Examples using Chat participants combined with slash commands:

@workspace /explain: Generate an explanation of the full workspace.
@workspace /fix (or /fix): Propose a fix for the problems in the selected code.
@workspace /tests (or /tests): Generate unit tests for the selected code.
@vscode /api (or /api): Ask about Visual Studio Code extension development.
@workspace /new (or /new): Scaffold code for a new workspace.
@workspace /newNotebook (or /newNotebook): Create a new Jupyter Notebook.

Chat variables
- #selection: the visible source code in the active editor.
- #editor: the current selection in the active editor. The editor content is implicitly included in the Chat view context.
- #file: include a specified file in your workspace as context with your chat prompt.
- #terminalSelection: the active terminal's selection.
- #terminalLastCommand: the active terminal's last run command


## [Suggerimenti di GitHub Copilot/GC Chat](https://learn.microsoft.com/it-it/training/modules/develop-code-features-using-github-copilot-tools/)
I suggerimenti di completamento automatic permettono di creare codice tramite:
- completamenti di riga
- completamenti della riga di codice da un commento
- usando GC Chat (usando i partecipanti alla chat, i comandi slash e le variabili di chat
- visualizzazione chat ( CTRL + ALT+ I )  
- chat inline ( CTRL + I )
I suggerimenti si acettano con TAB (o CTRL + RightArrow)

## Procedure consigliate

- fornire contesto, file correlati
- commento di massimo livello (all'inizio del file)
- nomi di funzioni significativi
- commenti alle funzioni specifici e con ambiti ben definiti
- codice di esempio
- suddividere attività complesse in attività + semplici
- evitare ambiguità
- indicare il coice pertinente
- essere coerenti e mantenere standard elevati di qualità
- usare nel GC Chat i partecipanti alla chata, i comandi slash e le variabili della chat



DOVE SONO ARRIVATO:
https://learn.microsoft.com/it-it/training/modules/develop-code-features-using-github-copilot-tools/












