# [Roo Cline](https://github.com/RooVetGit/Roo-Cline) + API Sonnet

Roo cline ha rispetto a Cline i Chat modes che permettono di avere dei prompt diversi a seconda di cosa si sceglie:
- Code: default mode
- Architect: high level technical design (non può eseguire comandi oscrivere codice) per cui ci vogliono reasdoning model (O1)
- Ask: perfetto per fare domande sul codebase o approfondire concetti (non può eseguire comandi oscrivere codice).
L'idea è quella di chiedere all'architect di definire l'app e al code di implementarla (c'è memoria tra i diversi stati...).

Inoltre ha accesso al Visual Studio Code LM Api che ha accesso a GitHub Copilot/Claude 3.5 Sonnet per sole 50 request al mese o con 10$ di iscrizione a Github Copilot un numero illimitato.

Ha inoltre il btn per il "prompt enhancement" come con Bolt.new. Dato un prompt generico quale:
```
build a web app with Angular 19 and ng-bootstrap to create, edit and delete markdown notes. 
```
si ottiene premendo il btn "Enhance prompt":
```
Create a web application using Angular 19 and ng-bootstrap that implements a markdown note-taking system with the following requirements:

Core Features:
1. Create a responsive single-page application with a clean, modern UI using ng-bootstrap components
2. Implement CRUD operations for markdown notes:
   - Create new notes with a title, tags and markdown content
   - Read/view notes with rendered markdown preview
   - Update existing notes and tags with real-time markdown preview
   - Delete notes with confirmation dialog

Technical Specifications:
1. Use Angular 19's latest features and best practices
2. Implement proper component architecture and state management
3. Include client-side data persistence (localStorage or IndexedDB)
4. Use a markdown parser library (e.g., marked or showdown)
5. Implement proper error handling and loading states

UI Requirements:
1. Create a navigation bar with:
   - App title
   - Create new note button
   - Search/filter functionality for notes
2. Implement a split-view editor with:
   - Markdown input panel
   - Real-time rendered preview panel
3. Display a list of existing notes with:
   - Note titles
   - Creation/modification dates
   - Delete and edit buttons
4. Add responsive design for mobile devices

Additional Features:
1. Implement markdown syntax highlighting
2. Add keyboard shortcuts for common actions
3. Include a dark/light theme toggle
4. Add note categories or tags
5. Enable note sharing functionality

Please provide detailed code implementation focusing on Angular best practices, TypeScript type safety, and responsive design principles.
```

