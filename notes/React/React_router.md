# React router (v6)

Si installa con:

```bash
> npm i -D react-router-dom
# oppure aggiornando da un progetto con V5
> npm i -D react-router-dom@latest
```
Si deve poi configurare il BrowserRouter (eventuamente indicando anche un alias per il componente):

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```
Poi si devono includere il tag padre `Routes` e i tag figli `Route` dove in questi si specifica il path ed il componente da usare.
E' possibile avere rotte innestate (come quella di Layout che contiene altre rotte).

Con `index` si specifica il componente di default tra n figli, mentre con `*` vale per tutte quelle rotte che non matchano le precedenti (no match rule).

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="users" element={<Users users={users} />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

IL componente Layout avrà dentro l' `Outlet` per renderizzare dentro i figli. Tramite il componente `Link` è possibile avere il redirect al path specificato nell'attributo `to`.

```javascript
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
```

E' possibile avere dei link \<Navlink /> con stili condizionali a seconda se attivi.

```javascript
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
};
```

Quando il link è quello corrente una class `active` è applicata all'elemento e tramite questa classe si può 1) applicare degli stili in css:

```css
nav a {
  margin-right: 1rem;
}
nav a.active {
  text-decoration: none;
  font-weight: bold;
}
```

oppure si può 2) applicare una funzione in jsx:

```jsx
export const Navbar = () => {

  const style={navLinkStyles} = ({isActive})=> {
    return{
      fontWeight: isActive? 'bold':'normal';
      textDecoration: isActive? 'none':'underline';
    }
  }
  return (
    <nav>
      <NavLink style={navLinkStyles} to="/">Home</NavLink>
      <NavLink style={navLinkStyles} to="/about">About</NavLink>
    </nav>
  );
};
```

Notare che per le rotte di tipo lista '/list' che rimandano ad una rotta di un singolo item '/list/1234' si deve specificare il path RELATIVO. Nei componenti che devono lettere i path params si usa l'hook `useParams`.

```javascript
// componente per path /users
const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}> //  link relativo  !!!!
              {user.fullName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// componente mostrato per /users/1234
import {
  useNavigate
  useParams,
} from 'react-router-dom';

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const goBack = ()=>{
    navigate('/users'); // PROGRAMMATICAMENTE
  }

  return (
    <>
      <h2>User: {userId}</h2>
      <button onClick={goBack}>Back</button>
      <Link to="/users">Back to Users</Link>
    </>
  );
};
```

## Parametri di search

Per i query string (chiamati in React Router "search params") tipo /users?name=robin si usa l'hook useSearchParams:

```javascript
import {useSearchParams} from 'react-router-dom';

const Users = ({ users }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('name') || '';

  const handleSearch = (event) => {
    const name = event.target.value;
    if (name) {
      setSearchParams({ name: event.target.value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <h2>Users</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {users
          .filter((user) =>
            user.fullName
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          )
          .map((user) => (
            <li key={user.id}>
              <Link to={user.id}>{user.fullName}</Link>
            </li>
          ))}
      </ul>
      <Outlet />
    </>
  );
};
```

# Nested Routes (e parametri)

Le rotte figlie si specificano direttamente dentro il componente:

```javascript
// nell' About Component
import { Route, useNavigate, Routes } from "react-router-dom";

// nested routes
import Offers from "./Offers";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <h2>About Us</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>

      <button onClick={() => navigate("/products")}>See our products</button>

      <Routes>
        <Route path="offers" element={<Offers />} />
      </Routes>
    </div>
  );
}
```

Nell'app component si deve specificare la rotta About con `*`. In tale modo si potrà renderizzare solo l' About component quando si ha un path `/about` ma anche il componente About + gli altri componenti interni quando si ha un path ad esempio `/about/offers`.

```javascript
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [cartIsEmpty] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        I link stanno dentro
        <nav>
          <h1>The Ninja Clothing Company</h1>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/products/:id/*" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/test"
            element={
              <div>
                <h2>Test page</h2>
              </div>
            }
          />
          <Route path="/redirect" element={<Navigate to="/about" />} />
          <Route
            path="/checkout"
            element={
              cartIsEmpty ? <Navigate to="/products" /> : <p>checkout</p>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

## Lazy loading

Per dynamic import si deve avere un default export del componente. Una promise è ritornata dal dynamic import che è poi convertito in un modulo che deve essere wrappato da un `React.Suspense`.

```javascript

const LazyAbout = React.lazy(()=> import ('./components/About'))
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route
            path="/about"
            element={
              <React.Suspense fallback='Loading....'>
                <LazyAbout />
              </React.Suspense>
              }
          />
        </Routes>
      </BrowserRouter>
}
```

## Protezione rotte

Per proteggere le rotte, si provvede condizionalmente in base alla presenza dell'user (che deve essere salvato in uno stato globale):

```javascript
const App = ()=>{
    const [user, setUser]= useState(null);

    // al 1° giro (refresh pagina)
    useEffect(()=>{
        const u = localStorage.getItem("user");
        u && JSON.parse(u) ? setUser(true), setUser(false);
    },[])

    // tutte le volte che viene settato l'user /ri-rendering
    useEffect(()=>{
        localstorage.setItem("user", user);
    },[user])

    return (
        <Routes>
        // quando non c'è un utente -> login
        { !user && (
            <Ruote path="/login" element={<Login authenticate=(()=> setUser(true)) />} />
        )}
        // quando ci sta un utente
        { user && (
            <>
            <Ruote path="/profile" element={<Profile logout= (()=> setUser(true)) />} />
            <Ruote path="/dashboard" element={<Dasboard />} />
            </>
        )}
        // redirect a login in caso contrario
        <Route path="*" element={<Navigate to={user?"/profile": "/login"}>}>
    )
}
```

La soluzione è stata mostrata nel [video](https://www.youtube.com/watch?v=rGmJYIUwxdo)

## [Authentication](https://www.youtube.com/watch?v=X8eAbu1RWZ4&list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG&index=15)

Tutto è basato su un field (se l'utente è loggato o no) che deve essere disponibile globalmente a tutto il component tree tramite ad esempio il React Context:

```javascript
// in auth.js
import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };
  const logoyt = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={(user, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
```

Si deve poi wrappare tutto il component tree con il contesto e proteggere le protected pages tramite un WrapperComponent \<RequireAuth /> che decide se il componente può essere renderizzato o reindirizzato alla login:

```javascript
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="blogs"
              element={
                <RequireAuth>
                  <Blogs />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <User />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

Sarà poi possibile accedere al contesto dai componenti tramite il custom hook `useAuth` ed applicare la logica condizionale in funzione dell'esistenza dell'user:

```javascript
// login.js
import {useState} from 'react';
import {useAuth} from './auth'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState('')
  const auth= useAuth()
  const navigate = useNavigate()

  const handleLogin = ()=>{
    auth.login(user);
    navigate('/')
  }
  return (
    <div>
    <input type="text" onChange={(e)=> setUser(e.target.value)}>
    <button onClick={HandleLogin}>Login </button>
    </div>
  )
}

```

Il componente RequireAuth:

```javascript
import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return { children };
};
```

## Links

- [Official page](https://reactrouter.com/en/v6.3.0)
- [w3schools](https://www.w3schools.com/react/react_router.asp)
- [Sunto 1](https://www.robinwieruch.de/react-router/)
- [Net ninjia](https://github.com/iamshaunjp/React-Router-Version-6)
- [Corso codeevolution](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG)
