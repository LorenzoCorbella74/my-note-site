# Prompt Engineering for Web Developers

- Section 1: Prompt Engineering strategies
- Section 2: AI assisted code
- Section 3: AI for Job Search

## Difetti del'AI

- try to predict which words should come next given a sequence of words
- only as good as the data it was trained on
- sometimes it can generate allucinations
- effectiveness goes down as complexity goes up

Con il termine prompt engineering si intende la creazione di prompt (richiesta)
che guidino l'AI a produrre risultati desiderati (si progetta l'input per far
avere l'output desiderato). Nel nostro caso si tratta di creare istruzioni
(input) per l'AI che siano in grado di generare codice (output).

La stategia per avere dei prompt efficaci è:

- essere specifici: invece di chiedere `come centro qualcosa?` chiedere
  `qual'è il modo migliore per centrare orizzontalmente e verticalmente un elemento in un div usando CSS?`
  oppure
  `Spiega il metodo reduce() in Javascript come se fossi uno sviluppatore principiante che ha appena iniziato a programmare. Indica i suoi casi d'uso e fornisci degli esempi di utilizzo. (Oppure fai un esempio specifico di trasformazione di array in oggetto)`
- usare termini tecnici
- fornire contesto
- fare esempi
- iterare

```text
Create am example react component that takes at least one prompt and demostrate how use useEffect and useState. The example should not be too simple like a counter, but should be a real world example that shows how to use these hooks in a practical and effective way.
```

```text
What are the recommended CSS media query breakpoints for mobile, tablet, and desktop views to ensure my website is responsive across various devices?
```

# Control response lenght & Format

```text
> provide a brief two step explanation of creating a  {custom javascript event} in {a React component}.

> Compare {css grid and flexbox} highlighting the main differences and use cases for each in a {tabular format}.

> Summarize in 3 bullet points why innerHtml should be avoided, followed by a short explanation and a code example of what should be used instead.

> list the top 5 {JavaScript array methods}, and provide a brief one sentence explanation of each and one sentence about why it's important for learning {react.js}

> create a flowcart describing how to submit a pull request using github

> create a pseudo code in the form of code comments describing how to create a {function} that takes {a date} and returns {in user's local time zone}.

> Explain {what to explain} in one paragraph (in one sentence, in 30 word or less)

> how can i do {something} in {a programming language} in {a few words} witout using external tools or libraries

> explain the concept of {something} in {a programming language} in {a few words} using analogies or real world examples

> Here is some code. Please comment every line explaining what it does

> in your response include only the code that need to be modified.

> explain how to use {redux} step by step using a simple code example such as as tracking whever or not a user is logged in. Provice one sentence explanation of each step. At the end give me a brief summary of the entire process and an acronym that will help me remember the steps.

>
```

## Break it down

Invece di mettere dentro tutto un unico prompt si può spezzare in più prompt più
piccoli.

- Break tasks or instruction into smaller steps
- build features applications in smaller chunks

Vediamo un esempio di prompt spezzato in più parti: Parte 1

```text
help me build a small React applications to help users visualize their budget. Make sure to meets the following requirements:
1. include a form component with tree inputs, budget title, budget amount, and budget category
2. when the form issubmitted add the new budget to an array of budgets
3. display the list of budgets in a table format
4. include a button to delete a budget from the list
```

Parte 2

```text
5. add a feature to calculate the total budget amount and display it on the page
6. add a feature to filter the budgets by category
7. add style to the form, assume from an external stylesheet. Make sure the example CSS abbressed the following:
    - should be responsive
    - the form inputs stack one on top of another
    - fields are styled similar to bootstrap  (but do not introduce any outside libraries)
```

Parte 3: test

```text
8. create dummy data so i can test my apllication. Here is a reminder of what data comes in the form of:
    - budget title: string
    - budget amount: number
    - budget category: string
```

Parte 4

```text
I want to make the following changes to the application:
9. add a feature to edit a budget
```

## Prompt iteratively

E' un processo trial/error che prevede un prompt iniziale, si valuta la risposta
dell'AI e si rivedere il prompt iniziale per arrivare a un risultato desiderato.

```text
this is great but i want to make the following changes:
1. ...
2. ...
3. ...
```

## Optimize the prompt

E' possibile usare l'AI per ottimizzare e migliorare il prompt e poi nuovamente
in discussione il prompt per avere risultati èiù efficaci. La strategia è:

1. Give AI an overview of what you'd like to do, prompt to ask clarifying
   questions
2. Answer AI's clarifying questions
3. When AI returns an optimized prompt, feed the prompt back to ChatGPT

```text
I'm going to give you a prompt and i want you to help me optimize it. Ask me claryfing questions if needed, then suggest a more effective prompt that will yield a more accurate and detailed output. Got it?

-> UNa volta che si riceve la lista di domande si risponde e si rivede il prompt iniziale.

Could you provide me an example code for {a specific task} in {a specific programming language} meet the following requirements
```

## Role base Prompting

`Act as a` or `You are a ...`

```text
You are a software architect. Advise a junior developer on how to structure a new React application. Include the following in your response:
- libraries i should use
- how to structure the project
- how to manage state

oppure

Act as an expert in system design and architecture, and advise me on how to design the frontend of a React applications that helps users keep track of {a specific task}. Include the following in your response:

oppure

You are a product owner for a {new e-commerce website}. You need to create a list of requirements for the website. Provide a list of features that you think are essential for the website to be successful. Ask me clarifying questions if needed.

Oppure 

I now want you to act as a {product_manager}. Write user stories based on the above requirements. Include acceptance criteria for each user story.

oppure 
You are the product Manager of this application. Please advice me as a software engineer which user stories are most necessary to create a minimum viable product (MVP) for prototyping and demo purposed.

oppure 

Act as a software engineer and write a user story for a feature that allows users to {do something}. Include acceptance criteria and any other relevant information.

You and I are a software engineering team. Discuss the requirements and features fotr the first 3 user stories and turn them into tickets to be entered in jira.

Let's concentrate first on Point 1. Include:
- o list of ...
```

## Prompting with examples

```text
write a function to {do something} in {a programming language} that takes {input} and returns {output}. 
example input: {input}
example output: {output}
Provide an example of how to use this function with the following input: {input}.
```

## Generate dummy data

```text
I need some dummy data to test my application for {music_events}. Include the following fields, plus any other that would be typical to this type of data: name, date, location
Put the data in an order that make sense. Make dummy data for no more than n items
```

# Recap: Prompt Engineering 

## Be Specific, Use Technical Terms, and Provide Context

❌ "How do I center something?"
✅ "What's the best way to center a div element horizontally and vertically on a webpage?" 

❌ "Explain reduce"  
✅ Specify language/technology and request examples:
"Explain JavaScript's reduce() method, and include two code examples." 
 
✅ Include additional context like audience and project status: 
"Explain JavaScript's reduce() method to me as if I am a beginning developer just learning how to code. Provide an example of how I can use reduce() to calculate the total price of several items in a shopping cart" 

❌ "How do I create a form?" 
✅ "Please create a form in JavaScript with one input that accepts a string and, on submit, prints that word to the webpage in reverse." 

❌ "Show me an example React component" 
✅ "Please create an example React component that takes in at least one prop and demonstrates how to use hooks like useState and useEffect. The example should not be a typical 'Hello World' example like a counter or a greeting. Assume that I have already set up a React project." 

## Control the Length and formatting of the responses
✅ Ask for steps: "Provide a brief 2-step explanation of creating a custom JavaScript event" 
✅ Info as a table: "Highlight the differences between React and Vue in a tabular format"  
✅ Summarize with bullet points: "Please summarize in 3 bullet points why innerHTML should be avoided" 
✅ Prompt for most important concepts: "List the 5 most important JavaScript concepts a beginning developer should know before learning React."  
✅ Summarize as flow chart: "Use a flowchart to explain how to make a pull request on Github" 
✅ Summarize as pseudo code: "Create pseudo code in the form of code comments describing how I can write a React component that displays the time in a user's local timezone." 
✅ Ask for analogy or metaphor: "Explain the concept of a JavaScript event loop using an analogy" 

## Break tasks into smaller steps  

❌ Avoid very long prompts with many instructions: 

"Help me build a small React application to help users visualize their budget. The application should consist of a form with three inputs: a budget title, a total budget, and current expenditures. When the user submits the form, a progress bar should be added to the page. The progress bar should be green if less than 50% ..."

✅ Break project into subtasks, and subtasks into numbered or bulleted lists:

"Help me build a small React application to help users visualize their budget. Make sure it meets the following requirements: 
1. Include a form component with three inputs: budget title, budget and spent
2. When the form is submitted, add the new budget to an array of budgets" 

## Optimize prompts 
1. Prompt ChatGPT to ask clarifying questions about a broad prompt:

"I'm going to give you a prompt, and I want you to ask me clarifying questions to help me optimize it, then suggest a more effective prompt based on my answers that will yield a more accurate and detailed output. The prompt is: Please give me an example prompt for a React accordion menu." 

2. Answer ChatGPT's clarifying questions. 
3. When ChatGPT returns an optimize prompt, feed the prompt back to ChatGPT
4. Success!

## Role-Base Prompting
✅ Act as a  
... product owner or manager and help me define crucial features for my app / write user stories
... software architect and help me determine which technologies to use for my app
... senior engineer and advise me on best practices 

## Prompt with Examples

✅ "Please write a function to total an array of numbers and return the value as a dollar amount: 

Example input: [5, 40.5, 9, 45, 23, 50]
Example output: $172.50

✅ Please generate some dummy JSON data for music events. Include the following properties: 
- band name
- event date and time
- ticket cost
- venue
- band genre


## Links
- [corso Scrimba](https://scrimba.com/prompt-engineering-for-web-developers-c02o:toc)

