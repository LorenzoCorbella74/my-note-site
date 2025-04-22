# Using Specialized Types and Language Features in TypeScript

Il corso si concentra su:

## Differentiation between types

Abbiamo tre tipi di meccanismi:

- typeof keyword per i value type
- instanceof per istanze di classe
- user defined type guards

```typescript
// se abbiamo un layer che può essere + tipi così
// si può differenziare la logica su tali tipi
// "layer is TextLayer" è una espressione di ritorno...
function isTextLayer(layer: Layer): layer is TextLayer {
  return layer.type === LayerType.Text;
}
```

## Conditional types

I "Conditional types" si possono usare solo con i generics.

```typescript
function setMeta<T extends TextLayer | ImageLayer>(
  layer: T,
  meta: T extends TextLayer ? TextMeta : ImageMeta
) {
  layer.meta = meta;
}
```

Se avessi una funzione che ritorna un tipo1 o un tipo2 quando poi vado a modificare l'obj ritornato con una prop che appartiene ad tipo1 ma non a tipo2 il compilatore si lamenta.

```typescript
type FactoryLayer<T> = T extends LayerType.Text ? TextLayer : ImageLayer;

function createLayer<T extends LayerType>(type: T): FactoryLayer<T> {
  if (type === LayerType.Text) {
    return {
      color: "#fff",
      fontSize: "10px",
      id: new Date().toISOString(),
      maxWidth: 10000,
      position: { x: 10, y: 10 },
      rotation: 0,
      text: "This is the default text",
      type: LayerType.Text,
    } as FactoryLayer<T>; // si deve specificare !!!
  }

  return {
    id: new Date().toISOString(),
    maxBounds: { width: 400 },
    position: { x: 0, y: 0 },
    rotation: 0,
    src: "ps-dark.png",
    type: LayerType.Image,
  } as FactoryLayer<T>; // si deve specificare !!!
}

const textLayer = createLayer(LayerType.Text);
textLayer.text = "can set this";
```

## Generate new types from existing types

Per prendere un subset di proprietà da un oggetto si usa il Partial type. Per unire quelle di due tipi si usa un "mapped type":

```typescript
import { TextLayer, ImageLayer } from "./types";

type FieldDescriptions = {
  [key in keyof (TextLayer & ImageLayer)]: string;
};

const fieldDescriptions: FieldDescriptions = {
  text: "This is the default text",
  color: "The color of the text",
  fontSize: "The size of the font",
  id: "The unique identify of the layer",
  maxWidth: "The max width of the text layer",
  position: "The position of the top left part of the layer",
  rotation: "The rotation angle of the layer between 0 and 360",
  type: "The type of the layer",
  maxBounds: "The max bounds for the image layer",
  src: "The relative location to the image file",
};
```

Per escludere delle proprietà si usa:

```typescript
type LayerCombined = TextLayer & ImageLayer;
type IgnoredProperties = "id" | "maxBounds" | "position" | "meta";

type FieldDescriptions = {
  [k in Exclude<keyof LayerCombined, IgnoredProperties>]: string;
};

const fieldDescriptions: FieldDescriptions = {
  text: "This is the default text",
  color: "The color of the text",
  fontSize: "The size of the font",
  maxWidth: "The max width of the text layer",
  rotation: "The rotation angle of the layer between 0 and 360",
  type: "The type of the layer",
  src: "The relative location to the image file",
  lastUpdated: new Date().toString()
};
`` `


## extending object with symbols (metaprogrammning )

## Links

- [corso Using Specialized Types and Language Features in TypeScript](https://app.pluralsight.com/course-player?courseId=155d3e7e-2910-45eb-ac34-b10b493e2d00)
- [code](https://www.github.com/hendrikswan/pluralsight-ts-advanced-types)
```
