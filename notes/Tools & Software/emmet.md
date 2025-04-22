[Back to index](../README.md)

## EMMET
- Si valorizza con `{  }`: `section.hero.is-info>.hero-body>.container>h1.title{Hello!}`

- Si raggruppa con le `( )`: `.columns>(.column>.box>h2{I am a box})+(.column>.box>h3{I am another box})`

- Si risale all'indietro con `^^`: `.columns>.column>.box>h2{Box}^^.column>.box>h3{Box}`

- Con `$` si prevede un numero: `p>strong{I am level $ strong!!!!}*10`

- Tag espansion in HTML:
    - `!`: Full HTML page
    - `a`: <a href=""></a>
    - `base`: <base href="" />
    - `link:css`: <link rel="stylesheet" href="style.css" />
    - `script:src`: <script src=""></script>
    - `input:text:` <input type="text" name="" id="" />
    - `input:t:` <input type="text" name="" id="" />

- si usa `[ ]` per gli attributi: `input[type=email].my-input`

- Tag balancing: in VSC: `Emmet: Balance (Outward)`