# AI Assisted coding

L'AI può:

- generare project ideas
- pianificare projects, write user stories and jira tickets
- scrivere codice
- generare mock data
- generare documentazione
- scrivere test
- get refactor suggestions
- convert code from one format to antoher
- imparare nuove tecnologie e argomenti avanzati più velocemente

## Uso di pseudo code

Nei prompt è possibile usare dello pseudo code:

```
Write a JavaScript function findBookById which takes two arguments, bookArr and id
- for each book in bookArr, compare each bookArr id with passed in id 
  - if found, return book
  - if not found, return error object, "Sorry, no book found"
```

```
- Create a pseudo code language similar to Markdown that will help me quickly describe a React component so you can convert it to example code. 
- Respond with a template I can use, as well an example component. Keep the template and the component as simple as possible. 

# ComponentName

State:
- stateVariable: initialValue

Props:
- propName: propType

Render:
- Description of render content

Event Handlers:
- handlerName: Description of handler functionality
```

## Edge cases

L'AI può aiutare a trovare edge cases per testare il codice:

```
# Prompt 1
Write a JavaScript function that takes in an array and returns a new array with any duplicate items removed.

# Prompt 2 
List 8 edge cases this function should account for, and provide test cases for each. Give me the edge case tests in a single code block, and denote the edge case as part of the console.log.
```

Se i test non passano si puà chiedere all'AI di eseguire un refactor:

```
please refactor my <nome> function to handle the edge cases you provided
```

## Debugging & Error messages

L'AI può aiutare a correggere gli errori:

```
this.function should return {x} but instead I'm getting the following error: {error message}. Fix the errors and explain the fixes with code commensts. Comment out the old code rather than replacing so i can better understand the changes.
```

## Convert code

L'AI può convertire:

- codice da un linguaggio all'altro (es. JavaScript a Python)
- codice da un formato all'altro (es. csv a json)
- framework to another (es. React to Vue)
- CSS to SCSS, etc

Facciamo degli esempi:

```
Convert the following {JavaScript} code to {Python}: {code}
```

```
Convert the following css code to Tailwind:
```

```
Convert this.csv file to json. Make sure you do the following:
- lowercase and concat headers to one snake-cased word
- convert Main Item to an array
- year and average_num are numbers
```

## Document code

```
please document this function using JSDoc syntax
```

```
please generate a markdown file with the documentation for this project
```

```
document this react component using Storybook
```

```
I want to create a simple Javascript style guide. Ask me 10 questions about best practices and style conventions and use my answers to generate a markdown file with the style guide.
```

## Learning with AI

Con l'AI si può:

- riassumere e spiegare concetti, anche complessi, in una miriade di modi.
- trovare risorse di apprendimento
- creare study guide e flashcards e quiz e schedule
- testare le conoscenze

### Spiegare concetti

E' possibile far assumere all'AI il ruolo di tutor assumento:

- una specifica audience
- un livello di conoscenza o abilità
- un obiettivo di apprendimento

```
suggeriscimi 4 argomenti avanzati  che ogni sviluppatore junior o intermedio dovrebbe conoscere
```
```
concentriamoci sull'{argomento uno}: spiegami come funziona {argomento uno} in modo semplice, come se fossi un principiante ed includi degli esempi applicativi pratici ma non banali.
```
```
I still don't quite understand. Can you explain {topic} using a metaphor or analogy? Can you provide a couple more use cases?
```
```
You are a senior engineer and you are mentoring a junior developer. He is struggling to understand the concept of {topic}. How would you explain it in a way that is easy to understand and remember?
```

### Find resources

```
List 5 great articles and 5 youtube videos i can read to understand {dynamic programming}
```

### Create study guide

Da notare che chiedere all'AI per risorse aggiornate può portare ad
allucinazioni, informazioni non corrette o non aggiornate e a fonti non
esistenti.

```
Create a study guide for {topic} including outside resources for further study. Assume I already have a basic understanding of the {sub topic} and want to deepen my knowledge, but i have a strong grasp of {sub topic 2}.
```
```
Based on this study guide, create a study schedule for me. Assume i want to
spend about 10 hours a week studying this topic. For each study session, include
the topic i should study along with the additional resources, and practice
exercises.
```

```
I've been studying Typescript generics. Quiz me on my knoledge of the topic. Ask
me 10 questions with multiple choice answers.
```

```
I want to create a study guide for learning React. Ask me 10 questions about React concepts and best practices, and use my answers to generate a markdown file with the study guide.
```
```
give me five small coding problems to pratice my knowledge of {topic}
```

## Quando è meglio non usare l'AI
- Quando non si stanno ottenendo risultati sperati **dopo molte iterazioni**
- quando non si capisce più il codice
- quando si è presi dalla sindrome del copy & paste & pray loop
- quando l'ai sembra più ottusa del solito
- quando l'ai dimentica