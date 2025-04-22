# Tailwindcss

[Codice corso](https://github.com/iamshaunjp/tailwind-tutorial) (5 anni fa)

E' un framework CSS costituito da classi di ultilità "low level"(che fanno solo una cosa...) che messe insieme permettono di produrre componenti responsivi, e altamente customizzabili e di strutturare un design flessibile senza codice css custom:

```bash
# installare node poi dentro una cartella 
& npm init -y
& npm install tailwindcss
```
Può essere usato da solo o come plugin di PostCss, vediamo il 1° caso: si crea il file di partenza `src/style.css` con le tre direttive principali di tailwind che verrà processato per produrre lo stile:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Nel package.json si mette lo script che permette di generare lo stile compilato:
```json
{
    "build-css": "tailwind build src/styles.css -o public/style.css"
}
```

# File di configurazione
Permette di configurare ed aggiungere le classi di tailwind. Tramite il comando sotto si crea il file `tailwind.config.js` con tutte le configurazioni del framework che possono essere cambiate ed aggiunte (si deve riprocessare tramite lo script build-css):
```bash
& npx tailwindcss init --full # --full mette tutti i valori di default
```

L'idea è comunque quello non di cambiare il file ma di generare uno nuovo che poi estenderà il default:
```bash
& npx tailwindcss init  # senza il --full flag
```

```javascript
module.exports = {
  purge: [],
  theme: {
    extend: {   /*  SI ESTENDEEEE !!!!!! */
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        }
      },
      fontFamily: {
        body: ['Nunito'] // se ne può mettere + di uno ...
      }
    },
  },
  variants: {},
  plugins: [],
}
```
e poi mettere il custom font dentro style.css
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@1,900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Si potrà così utilizzare le nuove classi `text-primary` e `text-secondary` ed un nuovo Font.

# Direttiva @apply 
All'interno del file `src/style.css` è possibile utilizzare la direttiva `@apply` che permette, come per i mixin in sass, di mescolare varie classi in un'unica classe padre.

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@1,900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

.card{
  @apply rounded bg-white border-gray-200 shadow-md overflow-hidden relative;
}

.badge{
  @apply absolute top-0 ml-2 p-2 mt-2 bg-secondary-100 text-secondary-200 text-xs uppercase font-bold rounded-full;
}

.btn{
  @apply rounded-full py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer;
}

```
All'interno dell'html si può quindi mettere:
```html
<div class="card"> 
    <img src="img/stew.jpg" alt="stew" class="h-32 sm:h-48 w-full object-cover">
    <div class="m-4">
        <span class="font-bold">5 Bean Chili Stew</span>
        <span class="block text-gray-500 text-sm">Recipe by Mario</span>
    </div>
    <div class="badge">
        <span>25 mins</span>
    </div>
</div>

<!-- AL POSTO DI: -->
<div class="rounded bg-white border-gray-200 shadow-md overflow-hidden relative"> 
    <!-- DIMENSIONI -->
    <img src="img/stew.jpg" alt="stew" class="h-32 sm:h-48 w-full object-cover">
    <div class="m-4">
    <span class="font-bold">5 Bean Chili Stew</span>
    <span class="block text-gray-500 text-sm">Recipe by Mario</span>
    </div>
    <!-- POSITION -->
    <div class="absolute top-0 ml-2 mt-2 p-2 bg-secondary-100 text-secondary-200 text-xs uppercase font-bold rounded-full">
    <span>25 mins</span>
    </div>
</div>
```

# [Flexbox](https://tailwindcss.com/docs/flex)
```html
    <main class="px-16 py-6">
      <div class="flex justify-center md:justify-end">
        <a href="#" class="text-primary">Log in</a>
        <a href="#" class="text-primary ml-2">Sign up</a>
      </div>

      <header>
        <h2 class="text-gray-700 text-6xl font-semibold">Recipes</h2>
        <h3 class="text-2xl font-semibold">For Ninjas</h3>
      </header>

      <div>
        <h4 class="font-bold pb-2 mt-12 border-b border-gray-200">Latest Recipes</h4>
  
        <div class="mt-8">
          <!-- cards go here -->
          <div> 
            <img src="img/stew.jpg" alt="stew">
            <div>
              <span>5 Bean Chili Stew</span>
              <span>Recipe by Mario</span>
            </div>
          </div>
        </div>

        <h4 class="font-bold pb-2 mt-12 border-b border-gray-200">Most Popular</h4>

        <div class="mt-8">
          <!-- cards go here -->
        </div>
      </div>

      <div class="mt-12 flex justify-center">
        <div class="bg-secondary-100 text-secondary-200">Load more</div>
      </div>    
    </main>
  </div>
```

# [Grid](https://tailwindcss.com/docs/grid-template-columns)
```html
<div class="grid grid-cols-3 md:grid-cols-6 gap-4">
  <div class="col-span-1">1/3</div>
  <div class="col-span-2">2/3</div>
</div>
```

# [Responsive classes](https://tailwindcss.com/docs/breakpoints)
Tailwind ha le classi responsive `sm` , `md` , `lg`, `xl` che ___prefissano le classi normali___ che permettono di non scrivere media query manualmente, pertanto ad esempio `sm:bg-green-50` indica che soltanto per schermi piccoli cambia il colore del background, oppure `justify-center md:justify-end` indica che per schermi piccoli gli elementi sono centrati ma quando lo schermo si allarga vanno a dx. Da notare che, ad esempio, `md:` indica che le proprietà vengono applicate ___dal breakpoint 768px a salire___.

# Icons
Si usa come esempio singole icone recuperate da [heroicons](https://heroicons.dev), siaggiungono gli elementi svg alla pagina html a cui si aggiungono classi tailwind:
```html
 <svg class="inline-block w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

```

# Hover effect
Similarmente alle responsive classes si usano classi particolari che prefissano classi normali quali `hover:text-gray-300`.

# Responsive navbar
```html
<body class="text-gray-600 font-body">

  <div class="grid md:grid-cols-3">
    <div class="md:col-span-1 md:flex md:justify-end">
      <nav class="text-right">
        <div class="flex justify-between items-center">
          <h1 class="font-bold uppercase p-4 border-b border-gray-100">
            <a href="/" class="hover:text-gray-700">Food Ninja</a>
          </h1>
          <div class="px-4 cursor-pointer md:hidden" id="burger">
            <svg class="w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </div>
        </div>
        <ul class="text-sm mt-6 hidden md:block" id="menu">
          <li class="text-gray-700 font-bold py-1">
            <a href="#" class="block px-4 flex justify-end border-r-4 border-primary">
              <span>Home</span>
              <svg class="w-5 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </a>
          </li>
          <li class="py-1">
            <a href="#" class="block px-4 flex justify-end border-r-4 border-white">
              <span>About</span>
              <svg class="w-5 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </a>
          </li>
          <li class="py-1">
            <a href="#" class="block px-4 flex justify-end border-r-4 border-white">
              <span>Contact</span>
              <svg class="w-5 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  
    <main class="px-16 py-6 md:col-span-2 bg-gray-100">
      <div class="flex justify-center md:justify-end">
        <a href="#" class="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500">Log in</a>
        <a href="#" class="btn text-primary ml-2 border-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500">Sign up</a>
      </div>

      <header>
        <h2 class="text-gray-700 text-6xl font-semibold">Recipes</h2>
        <h3 class="text-2xl font-semibold">For Ninjas</h3>
      </header>

      <div>
        <h4 class="font-bold pb-2 mt-12 border-b border-gray-200">Latest Recipes</h4>
  
        <div class="mt-8 grid lg:grid-cols-3 gap-10">
          <!-- cards go here -->
          <div class="card hover:shadow-lg"> 
            <img src="img/stew.jpg" alt="stew" class="h-32 sm:h-48 w-full object-cover">
            <div class="m-4">
              <span class="font-bold">5 Bean Chili Stew</span>
              <span class="block text-gray-500 text-sm">Recipe by Mario</span>
            </div>
            <div class="badge">
              <svg class="inline-block w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>25 mins</span>
            </div>
          </div>
          <div class="card hover:shadow-lg"> 
            <img src="img/noodles.jpg" alt="noodles" class="h-32 sm:h-48 w-full object-cover">
            <div class="m-4">
              <span class="font-bold">Veg Noodles</span>
              <span class="block text-gray-500 text-sm">Recipe by Mario</span>
            </div>
            <div class="badge">
              <svg class="inline-block w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>25 mins</span>
            </div>
          </div>
          <div class="card hover:shadow-lg"> 
            <img src="img/curry.jpg" alt="curry" class="h-32 sm:h-48 w-full object-cover">
            <div class="m-4">
              <span class="font-bold">Tofu Curry</span>
              <span class="block text-gray-500 text-sm">Recipe by Mario</span>
            </div>
            <div class="badge">
              <svg class="inline-block w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>25 mins</span>
            </div>
          </div>
        </div>

        <h4 class="font-bold pb-2 mt-12 border-b border-gray-200">Most Popular</h4>

        <div class="mt-8">
          <!-- cards go here -->
        </div>
      </div>

      <div class="mt-12 flex justify-center">
        <div class="btn bg-secondary-100 text-secondary-200 inline-block hover:shadow-inner transform hover:scale-125 hover:bg-opacity-50 transition ease-out duration-300">Load more</div>
      </div>    
    </main>
  </div>

  <script src="index.js"></script>
</body>
```

in the script:

```javascript
const burger = document.querySelector('#burger');
const menu = document.querySelector('#menu');

burger.addEventListener('click', (e) => {
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
});
```



# Transition
Da uno stato originale all'hover state si deve aggiungere:
- una classe `transition` 
- una classe per l' easing function (`ease-in`, `ease-out`)
- una classe per la durata (`duration-500`) 

Se si vuole applicare una transformazione si deve aggiungere una classe:
- `transform` e poi hover:scale-125 hover:bg-opacity-50


# VSC
E' consigliato installare l'estenzione [Tailwind VSC intellisence](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) che permette di avere l'intellisense all'interno dell html. E' richiesto avere un file `tailwind.config.js`.

# Links
- [sito ufficiale](https://tailwindcss.com/docs)
- [cheatsheet 1](https://tailwindcomponents.com/cheatsheet/)
- [cheatsheet 2](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind CSS with Create React App](https://tailwindcss.com/docs/guides/create-react-app)
- [Cheatsheet V3 / V4 ](https://kombai.com/tailwind/cheat-sheet/)