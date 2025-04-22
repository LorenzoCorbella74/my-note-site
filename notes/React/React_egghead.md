# React 
Corso [Eggheads](https://egghead.io/courses/the-beginner-s-guide-to-react)

## Fragment
React.Fragment permettono di mettere degli elementi uno accanto all'altro (siblings) senza metterli dentro un div. Si può utilizzare `<React.Fragment>` oppure `<>`.

```html
<script src="https://unpkg.com/react@16.12.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.8.3/babel.js"></script>
  <script type="text/babel">
    const element = (
      <>
        <span>Hello</span> <span>World</span>
      </>
    )
    ReactDOM.render(element, document.getElementById('root'))
  </script>
  ```


  Tutti i componenti di React devono avere la lettera maiscola

## PropTypes
Per validare le props si usano i propTypes (non sono applicati in production):
```html
<script src="https://unpkg.com/prop-types@15.6.1/prop-types.js"></script>
<script type="text/babel">
    const rootElement = document.getElementById('root')

    function SayHello({firstName, lastName}) {
      return (
        <div>
          Hello {firstName} {lastName}!
        </div>
      )
    }
    SayHello.propTypes = {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }

    const element = <SayHello firstName={false} />

    ReactDOM.render(element, rootElement)
  </script>
  ```

  In JSX è possibile mettere varie interpolazioni una di seguito all'altra (senza if, loop switch) o innestate

  ```javascript
  function CharacterCount({text}) {
      return (
        <div>
          {`The text "${text}" has `}
          {text.length ? <strong>{text.length}</strong> : 'No'}
          {' characters'}
        </div>
      )
    }
  ```

  ## Styke with className and inline style
  ```html
 <style>
    .box {
      border: 1px solid #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
    .box--large {
      width: 270px;
      height: 270px;
    }
    .box--medium {
      width: 180px;
      height: 180px;
    }
    .box--small {
      width: 90px;
      height: 90px;
    }
  </style>
  <script type="text/babel">
    function Box({style, size, className = '', ...rest}) {
      const sizeClassName = size ? `box--${size}` : ''
      return (
        <div
          className={`box ${className} ${sizeClassName}`}
          style={{fontStyle: 'italic', ...style}}
          {...rest}
        />
      )
    }

    const element = (
      <div>
        <Box size="small" style={{backgroundColor: 'lightblue'}}>
          small lightblue box
        </Box>
        <Box size="medium" style={{backgroundColor: 'pink'}}>
          medium pink box
        </Box>
        <Box size="large" style={{backgroundColor: 'orange'}}>
          large orange box
        </Box>
        <Box>sizeless box</Box>
      </div>
    )

    ReactDOM.render(element, document.getElementById('root'))
  </script>
  ```


  Il parametro di default di useState è importante per il 1° render del componente ma poi è ignorato per i rendering successivi, cioè useState è inizializzato al primo render ma poi non viene più fatta girare.
  Verificare che non sia invece `()=> return <value>`
  
  
   useEffect è chiamata invece tutte le volte che il componente è renderizzato a meno che non si specifiche nel 2° parametro la lista delle proprietà da guardare per poi scatenare degli effetti. Se la lista è un array vuoto allora si useEffect gira solo al 1° render.


## Custom hook
La convenzione prevede che si chiamino use qualcosa ...
```html
  <script type="text/babel">
    function useLocalStorageState(key, defaultValue = '') {
      const [state, setState] = React.useState(
        () => window.localStorage.getItem(key) || defaultValue,
      )

      React.useEffect(() => {
        window.localStorage.setItem(key, state)
      }, [key, state])

      return [state, setState]
    }

    function Greeting() {
      const [name, setName] = useLocalStorageState('name')

      const handleChange = event => setName(event.target.value)

      return (
        <div>
          <form>
            <label htmlFor="name">Name: </label>
            <input value={name} onChange={handleChange} id="name" />
          </form>
          {name ? <strong>Hello {name}</strong> : 'Please type your name'}
        </div>
      )
    }

    ReactDOM.render(<Greeting />, document.getElementById('root'))
  </script>
  ```

  # Manipolare il DOM con React refs
  refs ha una proprietà current che permette di accedere al valore corrente dell'elemento e possiamo variare il valore di tale proprietà senza scatenare un re-rendering del componente. Quindi si possono utilizzare i refs oltre che per i nodi DOM anche per tutti i valori che si vuole modificare nel tempo senza avere un re-rendering del componente.

  ```html
   <script type="text/babel">
    function Tilt({children}) {
      const tiltRef = React.useRef()

      React.useEffect(() => {
        const tiltNode = tiltRef.current
        const vanillaTiltOptions = {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
        }
        VanillaTilt.init(tiltNode, vanillaTiltOptions)
        return () => {
          tiltNode.vanillaTilt.destroy()
        }
      }, [])

      return (
        <div ref={tiltRef} className="tilt-root">
          <div className="tilt-child">{children}</div>
        </div>
      )
    }

    function App() {
      const [showTilt, setShowTilt] = React.useState(true)
      return (
        <div>
          <label>
            <input
              type="checkbox"
              checked={showTilt}
              onChange={e => setShowTilt(e.target.checked)}
            />{' '}
            show tilt
          </label>
          {showTilt ? (
            <Tilt>
              <div className="totally-centered">vanilla-tilt.js</div>
            </Tilt>
          ) : null}
        </div>
      )
    }

    ReactDOM.render(<App />, document.getElementById('root'))
  </script>
  ```

## Hook FLOW

```bash
$ npx hook-flow
```


L'idea è quella di avere lo stato il più vicino possibile al codice che lo usa, ma quando si hanno dei siblings che devono usare lo stesso stato si deve alzare lo stato al parent contenente i siblings (lift the state)


