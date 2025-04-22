# AI Prompt Engineering for Game Developers
L'AI può essere utilizzata come un tool per il game development che permette di:
- generare codice, debug code, fare domande sul game engine usato
- creare contenuti ed idee e enhance the game design and gameplay, parse information, NPC dialogue and in game tutorials
- design documents and product pages





## generate script and functions
```bash
> generate a GDscript 2 for the version 4  of the Godot engine that creates a new scene for an enemy  with a Character body 2D and a sprite2D and destroy it after a specified time

> i\'m havig problems with this gdscript function . Can you tell me what is wrong with it?

# game engine specific
> in godot 4 where can i found the option to disable running in the backgraound?
> in unreal how do i make my animation loop?
```


## generate game ideas
L'AI è grande a generare idee per i giochi o espandere quelle già esistenti.
```bash
> give me ideas for an easy to make 2d game, based on time travels, with an interesting core mechanic Explain it in only one paragraph ## oppure
> give me ideas for an easy to make 2d game based on farming for a solo game developer? can you list out the game idea, mechanics, game loop and art style?

> what\'s a unique mechanic i can add to my FPS game in order to make it more fun and interesting?
```


## Design documents
Quando si crea giochi è opportuno delineare le idee in un game design document. L'AI può aiutare a creare modelli di documenti.
```bash
> can you provide me with a template for a game design document?
> i will also need for an art bible. This will layout the game\'s art style, color palette, character designs, and environment concepts. PLease provide reference
```
l'AI può essere utile per promuovere e advertising the game geenrating the product descritpion and the game page, taglines, font suggestions, color palettes, event websites, and social media posts.

```bash
> I have an action packed video game where you.....create a short tagline i can use for my steam page. Waht tags on steam would this game fit into?

> I have an action packed video game where you.....Can you provide me some Google fonts that would best fit for this game aestheitc? Can you also provide possible color palettes

> using the Oswalf font and vintage film noir color palette, can you provide a html website to promote the release of the game coming out on steam at the end of 2023. The tagline should be "The future is now....."

> within the website, can you provide a section for the game description, a section for the game features, a section for the game trailer, and a section for the game screenshots. Can you replace the pre order button with an image logo that features the text "whishlist now" and a link to the steam page. Here is the image:
https://www.example.com/image.jpg
```


## Gameplay
L'AI può aiutare a creare tutorial, dialoghi NPC, e a generare contenuti per il gioco o può essere usata per prendere delle decisioni "in game" e tali decisioni possono essere parsate e gestire.
```bash
> Sei un game master che decide quale player deve ricevere un premio in un video game. Questi sono i personaggi e loro relativi score che devi prendere in considerazione.  rispondi a questa domanda semplicemente con il nome del personaggio prescelto.

## npc dialogue
> I have a character in my game that is a shopkeeper. Can you provide me with some dialogue options for when the player interacts with them?

## BAD
> act as an npc in a fantasy video game. You are a warrior  walking down the road, you are frustated, hot headed. Respond to my message

## GOOD
> act as an npc in a fantasy video game. You must respond to me in character and only respond with your dialogue options. you must not mention that you are an ai. You are a warrior walking down the road, you are frustated, hot headed. 
Respond only in your dialogue and any actions you may want to do can be defined within square brackets, suh as [laughs] or [draws sword].

Here are some example dialogue responses:
- "What do you want?"
- "I don't have time for this"
- "I'm not in the mood for talking"
- "I'm busy, go away"
- "I'm not interested in talking to you"
- "I'mdone talking to you [walks away]"
```

## In game tutorial
```bash
> act as a personal assistant ai for a player playing a video game. The player is new to the game and needs help understanding the controls. Respond to the player as if you were an ai assistant in the game. 

> act as a personal assistant ai for a player playing a video game. You must respond in one sentence based on the current state of the player, suggesting what they should do next. Only respond in character, do not mention that you are an ai and respond only with your dialogue. 
The player has been currently spaweend in a forest with 3 logs in their inventory and has been given a sword. 


> act as an ai assistant in a video game. The game is an RPG and the player has the ability to build structure in order to generate resources. Each structure has a cost, but each turn generate resources. 

The player has 100 money, 10 wood, 50 stone, 2 food.
Th epossible structure to build: timber for 20 money, mine for 20 money, farm for 15 money. 
Respond only in character and in a single sentence suggesting what the player should do.
```

# Links
- [Zenva course](https://academy.zenva.com/course/ai-prompt-engineering-for-game-developers/)