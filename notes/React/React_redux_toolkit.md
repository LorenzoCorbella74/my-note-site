# React Redux Redux toolkit and Typescript

Installare

```bash
> npm install react-redux @reduxjs/toolkit
```

Creare un file `store.ts` con il seguente contenuto:

```javascript
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
```

Wrappare l'app con il `Provider`

```javascript
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Per splittare il redux store in molteplici Slices si usa il metodo createSlice:

```javascript
// cartSlices.ts
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  items: { [productID: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;

// in ProductSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../app/api";

export interface ProductsState {
  products: { [id: string]: Product };
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {},
});

export default productsSlice.reducer;
```

Si combinano i reducer insieme aggiornando lo store.ts:

```ts
import { configureStore } from "@reduxjs/toolkit";
// slices
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

# Links

- [corso egghead](https://github.com/xjamundx/redux-shopping-cart)

## React con RXJS

```jsx
import React, { useState, useEffect } from "react";
import "./style.css";
import { interval } from "rxjs";

export default function App() {
  const [state, setState] = useState();

  const observable$ = interval(1000);

  useEffect(() => {
    const subscription = observable$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Hello RxJS!</h1>
      <p>Observable value: {state}</p>
    </div>
  );
}
```
