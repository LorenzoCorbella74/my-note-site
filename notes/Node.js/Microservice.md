# Microservice

A microservice is a single self-contained unit which, together with many others, makes up a large application. By splitting your app into small units every part of it is independently deployable and scalable, can be written by different teams and in different programming languages and can be tested individually. — Max Stoiber
A microservice architecture means that your app is made up of lots of smaller, independent applications capable of running in their own memory space and scaling independently from each other across potentially many separate machines. — Eric Elliot

L'idea è quella di mettere in comunicazione dei servizi che girano su porte diverse tramite API Rest: ogni servizio manipola soltanto i dati di cui è responsabile e può essere manutenuto, esteso e deploiato senza impattare gli altri servizi.

```javascript

// in heros.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.argv.slice(2)[0];  // si starta con node ./heroes.js 8081
const app = express();
app.use(bodyParser.json());

const powers = [
  { id: 1, name: 'flying' },
  { id: 2, name: 'teleporting' },
  { id: 3, name: 'super strength' },
  { id: 4, name: 'clairvoyance'},
  { id: 5, name: 'mind reading' }
];
const heroes = [
  { id: 1, type: 'spider-dog', displayName: 'Cooper', powers: [1, 4], img: 'cooper.jpg', busy: false },
  { id: 2, type: 'flying-dogs', displayName: 'Jack & Buddy', powers: [2, 5], img: 'jack_buddy.jpg', busy: false },
  { id: 3, type: 'dark-light-side', displayName: 'Max & Charlie', powers: [3, 2], img: 'max_charlie.jpg', busy: false },
  { id: 4, type: 'captain-dog', displayName: 'Rocky', powers: [1, 5], img: 'rocky.jpg', busy: false }
];
app.get('/heroes', (req, res) => {
  res.send(heroes); // Returning heroes list
});

app.get('/powers', (req, res) => {
  res.send(powers); // Returning powers list
});

app.post('/hero/**', (req, res) => {
  const heroId = parseInt(req.params[0]);
  const foundHero = heroes.find(subject => subject.id === heroId);
  if (foundHero) {
      for (let attribute in foundHero) {
          if (req.body[attribute]) {
              foundHero[attribute] = req.body[attribute];
              console.log(`Set ${attribute} to ${req.body[attribute]} in hero: ${heroId}`);
          }
      }
      res.status(202).header({Location: `http://localhost:${port}/hero/${foundHero.id}`}).send(foundHero);
  } else {
      console.log(`Hero not found.`);
      res.status(404).send();
  }
});
app.use('/img', express.static(path.join(__dirname,'img')));

app.listen(port, ()=> console.log(`Heroes service listening on port ${port}`););

// in threats.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());
const heroesService = 'http://localhost:8081';

const threats = [
  { id: 1, displayName: 'Pisa tower is about to collapse.', necessaryPowers: ['flying'], img: 'tower.jpg', assignedHero: 0 },
  { id: 2, displayName: 'Engineer is going to clean up server-room.', necessaryPowers: ['teleporting'], img: 'mess.jpg', assignedHero: 0 },
  { id: 3, displayName: 'John will not understand the joke', necessaryPowers: ['clairvoyance'], img: 'joke.jpg', assignedHero: 0 }
];
app.get('/threats', (req, res) => {
  res.send(threats);    // Returning threats list
});
app.post('/assignment', (req, res) => {

    // si modifica l'entità nell'altro servizio
  request.post({
      headers: {'content-type': 'application/json'},
      url: `${heroesService}/hero/${req.body.heroId}`,
      body: `{
          "busy": true
      }`
  }, (err, heroResponse, body) => {
      if (!err) {
          const threatId = parseInt(req.body.threatId);
          const threat = threats.find(subject => subject.id === threatId);
          threat.assignedHero = req.body.heroId;
          res.status(202).send(threat);
      } else {
          res.status(400).send({problem: `Hero Service responded with issue ${err}`});
      }
  });
});
app.use('/img', express.static(path.join(__dirname,'img')));

app.listen(port, ()=> console.log(`Threats service listening on port ${port}`););
```




## Source:
- [building-javascript-microservices-with-node](https://medium.com/swlh/building-javascript-microservices-with-node-js-d88bf0bb2b92)
- [building-javascript-microservices-with-node (code)](https://github.com/maciejtreder/introduction-to-microservices)

# Series
- [microservice + doker](https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b)
- [microservice + doker (code)](https://github.com/Crizstian/cinema-microservice)

## Fullstack with SMF framework
-[fullstack app in minutes](https://medium.com/@krawa76/fullstack-javascript-microservice-web-app-in-minutes-448c523a919b)

## RabbitMQ
- [real time exchange with RabbitMQ](https://medium.com/swlh/real-time-exchange-information-with-microservices-and-nodejs-e6bf6623bca6)

## Express
- [designing-microservices-with-expressjs](https://itnext.io/designing-microservices-with-expressjs-eb23e4f02192)
- [article code](https://github.com/yildizberkay/microservices-with-expressjs)

## Microservice with COTE Framework
- [article](https://arm.ag/microservices-made-easy-with-node-js-f41bb2be2d3c)
- [cote on github](https://github.com/dashersw/cote)

## Moleculer
- [moleculer](https://medium.com/moleculer/moleculer-a-modern-microservices-framework-for-nodejs-bc4065e6b7ba)
- [moleculer tutorial](https://medium.com/moleculer/5-easy-steps-to-create-your-rest-microservice-in-nodejs-94aede3249fc)