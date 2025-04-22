# SVELTE

# Cos'è
E' un nuovo framework JS che tramite un compiler permette di avere una dimensione del bundle finale ridotta ed ottimizzata (è solo codice js senza il peso del framework): inoltre ripensa la reattività, non ha Virtual DOM e permette a parità di prodotto finale di scrivere meno codice (più dichiarativo), semplice e reattivo pertanto è indicato per progetti "faster development".

# Components
I componenti di svelte hanno estensione `.svelte` e sono costituiti da <script></script> contenente lo stato e la logica del component, lo <style></style> con lo stile del solo componente o tramite la key `:global` lo stile globale condiviso con gli altri componenti, ed il template:

```html
<script>
    import Example from './Example.svelte'; /* importazione componenti */
    let say = 'hi';
</script>

<style>
    div {color: red; }
    :global(div) {background: blue;}    /* questo si vede dappertutto */
</style>

<div>
    Say: {say}
    <Example input={4}/>   <!-- uso componenti importati-->
</div>

// dentro Example si definisce l'import:
<script>
    export let input = "test"; /* si dichiara un input con un valore di default, questa è la modalità con cui svelte indica l'esposizione di una variabile al componente contenitore */
</script>
   
```
E possibile passare degli input ai componenti tramite le così dette `props` che possono essere testo, numeri, oggetti o funzioni callback (il componente padre passa delle funzioni al componente figlio che le invoca) ma in quest'ultimo caso è preferibile usare una comunicazione basata su eventi dove un componente, al suo interno geenra un evento custom, e qualcun altro componente (generalmente un componente padre) sarà in ascolto di tale evento e farà qualcosa una volta azionato.

# Templating e slot
La sintassi per il template engine prevede interpolazioni con `{}`, loop e condizioni secondo la seguente sintassi:
```html
<Container>
    <!-- condizioni if/else-->
    {#if say} 
        <div>
            Hi!
        </div>
    {:else if !say}
        not saying anything..
    {/if}

    <!-- LOOP -->
    {#each [2,1,0] as faceIndex}
        <Face index={faceIndex} />
    {/each}
</Container>
```

TODO: await per async data....

E' possibile mettere dentro ai componenti informazioni esterne tramite gli <slot></slot> mettendo nel template:
```html
<div class="Container">
    <slot></slot>
</div>

<style>
	.Container {
		height: 100vh;
		width: 100vw;
		font-family: 'Nunito', sans-serif;
		border: solid  #40b3ff 20px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>

Nel componente ospitante si avrà:

<script>
    import Container from './Container.svelte';
    let say = 'hi';
</script>

<Container>
    <div>
        Say: {say}   <!-- esempio di interpolazione -->
    </div>
</Container>
```


# Events ed event dispatcher
Essendo Button un componente di svelte  si può associare un evento indicandolo dentro il componente:
```html
<Buttons on:click={() => {showHeader = true}} /> <!-- on:nome-evento = {funzione associata...} -->
```
ma dentro il template di `Button` si deve mettere `on:click` per l'event forwarding.
Si può mandare eventi tramite l'event dispatcher dall'interno del componente:
```html
<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();    
</script>

<button on:click={() => dispatch('click', true)}>
    Show
</button>
<button on:click={() => dispatch('click', false)}>
    Hide
</button>
```
E dentro il componente contenitore:

```html
<Container>
    <Buttons on:click={(e) => {showHeader = e.detail}} />
</Container>
```

# Reactivity
Tramite i `reactive statement`, che usano la sintassi `$:` è possibile aggiornare le variabili "dipendenti" (notare che non c'è bisogno di specificare `let` prima della var dipendente) :
```html
<script>
    let score = 0;
    $: smileySays = 'Hi there, your score is: ' + score;
    $: if (score < -4) smileySays = 'Wow your score is low!'
</script>
```html

# Bindings
Il two way binding è realizzato con:
```html
<script>
    let name = '';
</script>

<Container>
    <input type="text" bind:value={name}>
</Container>

```

# Transition

# Context
Per far comunicare componenti tra loro distanti dove non c'è una relazione padre figlio + possibile usare la Context API o gli stores. Per la Context APi si usano principalmente due metodi `setContext` e `getContext`:
```html
<script>
import { setContext } from 'svelte'

const someObject = {}

setContext('someKey', someObject)
</script>

<!-- Into another component you can use getContext to retrieve the object assigned to a key: -->

<script>
import { getContext } from 'svelte'

const someObject = getContext('someKey')
</script>
```

# Stores
Tramite gli store è possibile avere degli oggetti reattivi tra più componenti.


# Life cicle methods, Actions
```html

App.svelte

<script>
	import { onMount } from "svelte";
	import SecretValue from "./SecretValue.svelte";
	import GuessComponents from "./GuessComponent.svelte";

	let secret = null;
	let showSecret = false;

	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const guessNumber = () => {
		showSecret = false;
		secret = getRandomInt(1, 10);
		console.log(secret);
	}

	const onGuess = value => {
		if(value == secret){
			showSecret = true;
		}
	}

	onMount(() => {
		guessNumber();
	});

</script>

<main>
	<h1>Guess a Number</h1>
	<SecretValue showSecret={showSecret} secret={secret} on:restart={guessNumber} />    <!--  si passa una funzione del padre da eseguire al dispatcher del figlio-->
	<GuessComponents onGuess={onGuess} /> <!--  si passa una funzione -->
</main>


SecretValue.svelte

<script>
    import { createEventDispatcher } from 'svelte';

    export let secret = null;
    export let showSecret = false;

    const dispatch = createEventDispatcher();
    
    const playAgain = () => {
        dispatch("restart");
    }

</script>

<div>
    <p>{showSecret ? secret : "???"}</p>
    { #if showSecret }
        <p>You won</p>
        <button on:click={playAgain}>Play again</button>
    { /if }
</div>

GuessComponent.svelte

<script>
    let guessValue = "";
    export let onGuess = null;

    const guess = e => {
        onGuess(guessValue);
    }
</script>

<div>
    <input bind:value={guessValue} />
    <button on:click={guess}>Guess</button>
</div>
```

# Sapper

