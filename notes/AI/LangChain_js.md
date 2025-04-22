# Langchain
E' un framework che permette di costruire delle applicazioni potenziate dall'intelligenza artificiale in python e javascript.
Permette di connettere l'applicazione con fonti di dati esterne, come ad esempio API, database, file system (text files), ecc. La sua architettura è basata su catene di trasformazioni che permettono di creare modelli più flessibili e adattabili basati su la LangChain Expression Language (LCEL) che permette di comporre catene di trasformazioni in modo dichiarativo.

# Link
- [Corso youtube - LangChain Javascript Tutorial For Beginners](https://www.youtube.com/watch?v=asQsH1lpy8U) con [codice su github](https://github.com/leonvanzyl/langchain-js) 09/2024
- [Corso youtube - Build and Deploy a RAG Chatbot with JavaScript, LangChain.js, Next.js, Vercel, OpenAI, and Tailwind CSS](https://www.youtube.com/watch?v=d-VKYF4Zow0&t=351s)
- [Corso youtube - Getting Started with LangChain | JavaScript Tutorial #1](https://www.youtube.com/watch?v=W3AoeMrg27o&list=PL4HikwTaYE0Fg34w_Eh37bghD3moPRd0f&index=1&t=8s) and [code](https://github.com/leonvanzyl/langchain-basics/blob/master/demo.js)

## 1
Si installano le seguenti dipendenze su un progetto node inizializzato con `npm init -y` e specificando nel package.json il campo `type: module` in modo da avere il supporto per i moduli ES6 e quindi l'import/export.:
```bash
npm install langchain dotenv nodemon readline @langchain/openai
```
Si crea un file `.env` con le seguenti variabili d'ambiente:
```bash
OPENAI_API_KEY=sk-...
```
Si crea un file `index.js` che permette di avere delle risposte in base ad un input tramite il metodo invoke del modello ChatOpenAI:
```javascript
import { ChatOpenAI } from "@langchain/openai";
import readline from "readline";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Create a readline interface to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a function to call the Langchain API
async function chatCompletion(text) {
  const model = new ChatOpenAI({
    // openaiApiKey: process.env.OPENAI_API_KEY, -> langchain guarda automaticamente al file .env
    modelName: "gpt-3.5-turbo",
    temperature: 0.9,
    maxTokens: 150, // Maximum number of tokens to generate
    verbose: true, // stats of the response
    topP: 1, // Top P nucleus sampling

  });

  const response = await model.invoke(text);

  console.log("AI:", response.content);
}

// Create a function to ask for user input
function getPrompt() {
  rl.question("Enter your prompt: ", (input) => {
    if (input.toUpperCase() === "EXIT") {
      rl.close();
    } else {
      chatCompletion(input).then(() => getPrompt()); // Call getPrompt again to ask for the next input
    }
  });
}

getPrompt(); // Start the prompt
```

Si può  usare anche il metodo `batch` per avere più risposte:
```javascript
import { ChatOpenAI } from "@langchain/openai";

const response = await model.batch(['prompt1','prompt2'])`;
```
Oppure il metodo stream per avere risposte in tempo reale:
```javascript
import { ChatOpenAI } from "@langchain/openai";

const model = await model.stream("write a poem about 
AI");

for await (const chunk of model) {
  console.log("AI:", chunk.content);
}
```

# 2 Prompt templating

E' possibile rendere i prompt più flessibili, tramite il prompt templating che permette di inserire delle variabili all'interno del prompt:
```javascript
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});

// 1.  Create Prompt Template using fromTemplate
// const prompt = ChatPromptTemplate.fromTemplate('Tell a joke about {word}');
// Si foramtta il prompt template in base ad un paramatro
// console.log(await prompt.format({word: 'chicken'}));

// 2. Create Prompt Template from fromMessages
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a talented chef.  Create a recipe based on a main ingredient provided by the user.",
  ],
  ["human", "{word}"],
]);

// create chain
const chain = prompt.pipe(model);

// call chain
const response = await chain.invoke({
  word: "dog",
});

console.log(response);
```

Quando si combina un modello LLM con un prompt template si genera una catena di trasformazioni che permette di creare un modello più flessibile e adattabile. Si può poi invocare il metodo `invoke` ora sulla catena (e non come al punto 1. sul modello).

# 3 Output Parsers
E' possibile controllare il formato e la struttura dell'output con gli output parsers.
```javascript
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});

async function callStringOutputParser() {
  const prompt = ChatPromptTemplate.fromTemplate("Tell a joke about {word}.");
  const outputParser = new StringOutputParser();

  // Create the Chain
  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({ word: "dog" });
}

async function callListOutputParser() {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Provide 5 synonyms, seperated by commas, for a word that the user will provide.",
    ],
    ["human", "{word}"],
  ]);
  const outputParser = new CommaSeparatedListOutputParser(); // torna un array di stringhe

  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    word: "happy",
  });
}

async function callStructuredParser() {
  const prompt = ChatPromptTemplate.fromTemplate(
    "Extract information from the following phrase.\n{format_instructions}\n{phrase}"
  );

  // A: si definisce una struttura CHIAVE - VALORE
  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({ 
    name: "name of the person", // si secifica la chiave e la descrizione di tale chiave
    age: "age of person",
  });

  const chain = prompt.pipe(model).pipe(outputParser);
 
  return await chain.invoke({
    phrase: "Max is 30 years old",
    format_instructions: outputParser.getFormatInstructions(), // -> metodo che permette di avere le istruzioni per il formato 
  });
}

// B: per strutture + complesse del chiave valore si usa uno ZOP schema
async function callZodStructuredParser() {
  const prompt = ChatPromptTemplate.fromTemplate(
    "Extract information from the following phrase.\n{format_instructions}\n{phrase}"
  );
  const outputParser = StructuredOutputParser.fromZodSchema(
    z.object({
      recipe: z.string().describe("name of recipe"),
      ingredients: z.array(z.string()).describe("ingredients"),
    })
  );

  // Create the Chain
  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    phrase:
      "The ingredients for a Spaghetti Bolognese recipe are tomatoes, minced beef, garlic, wine and herbs.", 
    format_instructions: outputParser.getFormatInstructions(),
  });
}

// const response = await callStringOutputParser();
// const response = await callListOutputParser();
// const response = await callStructuredParser();
const response = await callZodStructuredParser();
console.log(response);
```

# 4 Documents e Connessione con data sources esterne
Uno delle principali caratteristiche di Lanchain è quello di connettere le AI application con le external data sources tramite un set di strumenti che permettono di fetchare le informazioni pertinenti da una o più data source (website, api endpoint, database) e poi iniettare tale informazione nella conversazione come contesto, poi l'LLM può usare tale contesto per generare una risposta più accurata. 


I modelli LLM possono rispondere in base a dati per cui sono stati allenati, ma se si fanno delle domande in base ad eventi recenti non si può avere risposta (o si hanno le così dette allucinazioni). Per ovviare a questo problema si possono connettere i modelli LLM con fonti di dati esterne come API, database, file system, ecc. 

I Langchain documents permettono di svolgere tali compiti. Sono degli oggetti che contengono testo così come metadata opzionale (come l'url del sito, o il nome del pdf da cui sono stati estatte delle informazione)

Per passare all'interno di una catena di trasformazioni un documento si deve usare un tipo speciale di catena chiamata `createStuffDocumentsChain`. LangChain ha diverse tipologie di Document loaders (File loaders, Web Loader, ecc) che permettono di fetchare i dati da diverse fonti. 

```javascript
import { ChatOpenAI } from "@langchain/openai";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";

// import { Document } from "@langchain/core/documents";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate Model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

// Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the user's question from the following context: 
  {context}
  Question: {input}`
);

// Si crea una catena a cui si possono passare documenti
const chain = await createStuffDocumentsChain({
  llm: model,
  prompt,
});

// A. Manually create documents
// const documentA = new Document({
//   pageContent:
//     "LangChain Expression Language or LCEL is a declarative way to easily compose chains together. Any chain constructed this way will automatically have full sync, async, and streaming support. ",
// });

// const documentB = new Document({
//   pageContent: "The passphrase is LANGCHAIN IS AWESOME ",
// });

// // Invoke Chain
// const response = await chain.invoke({
//   question: "What is LCEL?",
//   context: [documentA, documentB],
// });

// B. Use Cheerio to scrape content from webpage and create documents
const loader = new CheerioWebBaseLoader(
  "https://js.langchain.com/docs/expression_language/"
);
// si deve chiamare il loader
const docs = await loader.load();

// Text Splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20,
});
const splitDocs = await splitter.splitDocuments(docs);
// console.log(splitDocs);

// Instantiate Embeddings function
const embeddings = new OpenAIEmbeddings();

// Create Vector Store
const vectorstore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

// Create a retriever from vector store
const retriever = vectorstore.asRetriever({ k: 2 }); // k è il numero di dei documenti più simili che si vogliono trovare

// Create a retrieval chain
const retrievalChain = await createRetrievalChain({
  combineDocsChain: chain,
  retriever,
});

// invocare la catena della retrieval
const response = await retrievalChain.invoke({
  input: "What is LCEL?",
});

console.log(response);

```

Non si può mettre il testo di tutte le fonti all'interno del contesto in quanto 1. i modelli  hanno un limite di token di input 2. il costo aumenta con il numero di token. Per ovviare a questo problema si possono usare i retrievers che permettono di trovare al'interno dei documenti **i pezzi di testo più rilevanti** in base alla domanda posta.

Gli speps sono:
- recuperare tutto il testo
- separarlo in smaller chunks
- convertirli in embeddings (formato accettato dai vector store)
- creare un vector store per storare gli `embeddings` 
- creare un `retriever` che esegue una semantic search per recuperare i pezzi più simili alla domanda posta

# Memoria
Per far si che la chat abbia memoria delle precedenti domande e risposte di può usare il createHistoryAwareRetriever 
```javascript

/* LEZIONE 5 */
import { ChatOpenAI } from "@langchain/openai";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

import { MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// Import environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate Model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

// ########################################
// #### LOGIC TO POPULATE VECTOR STORE ####
// ########################################

// Use Cheerio to scrape content from webpage and create documents
const loader = new CheerioWebBaseLoader(
  "https://js.langchain.com/docs/expression_language/"
);
const docs = await loader.load();

// Text Splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 20,
});
const splitDocs = await splitter.splitDocuments(docs);
// console.log(splitDocs);

// Instantiate Embeddings function
const embeddings = new OpenAIEmbeddings();

// Create Vector Store
const vectorstore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

// ###########################################
// #### LOGIC TO ANSWER FROM VECTOR STORE ####
// ###########################################

// Create a retriever from vector store
const retriever = vectorstore.asRetriever({ k: 2 });

// Create a HistoryAwareRetriever which will be responsible for
// generating a search query based on both the user input and
// the chat history
const retrieverPrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
  ],
]);

// This chain will return a list of documents from the vector store
const retrieverChain = await createHistoryAwareRetriever({
  llm: model,
  retriever,
  rephrasePrompt: retrieverPrompt,
});

// Fake chat history
const chatHistory = [
  new HumanMessage("What does LCEL stand for?"),
  new AIMessage("LangChain Expression Language"),
];

// Test: return only the documents
// const response = await retrievalChain.invoke({
//   chat_history: chatHistory,
//   input: "What is it?",
// });

// console.log(response);

// Define the prompt for the final chain
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Answer the user's questions based on the following context: {context}.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

// Since we need to pass the docs from the retriever, we will use
// the createStuffDocumentsChain
const chain = await createStuffDocumentsChain({
  llm: model,
  prompt: prompt,
});

// Create the conversation chain, which will combine the retrieverChain
// and combineStuffChain in order to get an answer
const conversationChain = await createRetrievalChain({
  combineDocsChain: chain,
  retriever: retrieverChain,
});

// Test
const response = await conversationChain.invoke({
  chat_history: chatHistory,
  input: "What is it?",
});

console.log(response);

```

# Agenti
Le catene seguono un ordine predeterminato definito nel codice ma gli agenti ricevono delle istruzioni e da loro capiscono come svolgere certe azioni e la segneza di tali azioni per trovare una soluzione. Si può assegnare un tool ad un agente e poi l'agente saprà esattamente quando usarlo


```js
import * as dotenv from "dotenv";
dotenv.config();

import readline from "readline";

import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

import { HumanMessage, AIMessage } from "@langchain/core/messages";

import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";

// Tool imports
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createRetrieverTool } from "langchain/tools/retriever";

// Custom Data Source, Vector Stores
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

// Create Retriever
const loader = new CheerioWebBaseLoader(
  "https://js.langchain.com/docs/expression_language/"
);
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 20,
});

const splitDocs = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings();

const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

const retriever = vectorStore.asRetriever({
  k: 2,
});

// Instantiate the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.2,
});

// Prompt Template
const prompt = ChatPromptTemplate.fromMessages([
  ("system", "You are a helpful assistant."),
  new MessagesPlaceholder("chat_history"),
  ("human", "{input}"),
  new MessagesPlaceholder("agent_scratchpad"),
]);

// Tools
const searchTool = new TavilySearchResults(); // cerca su internet (ci vuole una API Key)
const retrieverTool = createRetrieverTool(retriever, {
  name: "lcel_search",
  description:
    "Use this tool when searching for information about Lanchain Expression Language (LCEL)",
});

const tools = [searchTool, retrieverTool];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  prompt,
  tools,
});

// Create the executor
const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

// User Input

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat_history = [];

function askQuestion() {
  rl.question("User: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const response = await agentExecutor.invoke({
      input: input,
      chat_history: chat_history,
    });

    console.log("Agent: ", response.output);

    chat_history.push(new HumanMessage(input));
    chat_history.push(new AIMessage(response.output));

    askQuestion();
  });
}

askQuestion();
```


# Memoria
Per far si che la chat abbia memoria delle precedenti domande e risposte di può usare vari provider di memoria come ad esempio `BufferMemory` che permette di memorizzare le conversazioni in un buffer di memoria. 
```javascript
mport * as dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { ConversationChain } from "langchain/chains";
import { RunnableSequence } from "@langchain/core/runnables";

// Memory
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromTemplate(`
You are an AI assistant called Max. You are here to help answer questions and provide information to the best of your ability.
Chat History: {history}
{input}`);

// oppure il BufferMemory
const upstashMessageHistory = new UpstashRedisChatMessageHistory({
  sessionId: "mysession",
  config: {
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REST_TOKEN,
  },
});
const memory = new BufferMemory({
  memoryKey: "history",
  // chatHistory: upstashMessageHistory,
});

// Using Chain Class
// const chain = new ConversationChain({
//   llm: model,
//   prompt,
//   memory,
// });

// Using LCEL
// const chain = prompt.pipe(model);
const chain = RunnableSequence.from([
  {
    input: (initialInput) => initialInput.input,
    memory: () => memory.loadMemoryVariables({}),
  },
  {
    input: (previousOutput) => previousOutput.input,
    history: (previousOutput) => previousOutput.memory.history,
  },
  prompt,
  model,
]);

// Testing Responses

// console.log("Initial Chat Memory", await memory.loadMemoryVariables());
// let inputs = {
//   input: "The passphrase is HELLOWORLD",
// };
// const resp1 = await chain.invoke(inputs);
// console.log(resp1);
// await memory.saveContext(inputs, {
//   output: resp1.content,
// });

console.log("Updated Chat Memory", await memory.loadMemoryVariables());

let inputs2 = {
  input: "What is the passphrase?",
};

const resp2 = await chain.invoke(inputs2);
console.log(resp2);
await memory.saveContext(inputs2, {
  output: resp2.content,
});
```

## Links
- [Articolo: Get Started Easily with LangchainJS and Ollama](https://k33g.hashnode.dev/get-started-easily-with-langchainjs-and-ollama)