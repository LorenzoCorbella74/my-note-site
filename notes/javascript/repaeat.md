Per generare una lista a partire da un array

```js
// an array of colors
let colors = ['red', 'green', 'blue'];

// a function to build a list
let makeTemplate = function (data) {
  let newList = '';
  data.forEach(function(element) {
    newList += `<li>${element}</li>`;
  });
  return newList;
};

// build a container template
let template = `<ul>${makeTemplate(colors)}</ul>`;

// add the template to the page
document.getElementById('result').innerHTML = template;

/** output
* <ul>
*   <li>red</li>
*   <li>green</li>
*   <li>blue</li>
* </ul>
*/

```