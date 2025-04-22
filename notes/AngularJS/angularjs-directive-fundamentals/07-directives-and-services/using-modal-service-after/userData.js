angular.module('app').service('users', function() {
  return [{
    id:1,
    name: 'Luke Skywalker',
    address: {
      street: 'PO Box 123',
      city: 'Secret Rebel Base',
      planet: 'Yavin 4'
    },
    likes: [
      { id:2, name:'Han Solo'},
      { id:3, name:'Chewbacca'},
      { id:4, name:'Leia'}
    ],
    likedBy: [
      { id:2, name:'Han Solo'},
      { id:3, name:'Chewbacca'},
      { id:4, name:'Leia'}
    ]
  }, {
    id:2,
    name: 'Han Solo',
    address: {
      street: 'PO Box 123',
      city: 'Mos Eisley',
      planet: 'Tattoine'
    },
    likes: [
      { id:1, name:'Luke Skywalker'},
      { id:3, name:'Chewbacca'},
      { id:4, name:'Leia'}
    ],
    likedBy: [
      { id:1, name:'Luke Skywalker'},
      { id:3, name:'Chewbacca'},
      { id:4, name:'Leia'}
    ]
  }, {
    id:3,
    name: 'Chewbacca',
    address: {
      street: 'PO Box 123',
      city: 'Big Tree',
      planet: 'Kashyyyk'
    },
    likes: [
      { id:1, name:'Luke Skywalker'},
      { id:2, name:'Han Solo'},
      { id:4, name:'Leia'}
    ], 
    likedBy: [
      { id:1, name:'Luke Skywalker'},
      { id:2, name:'Han Solo'},
      { id:4, name:'Leia'}
    ]
  }, {
    id:4,
    name: 'Leia',
    address: {
      street: 'PO Box 123',
      city: 'Imperial City',
      planet: 'Alderaan'
    },
    likes: [
      { id:1, name:'Luke Skywalker'},
      { id:2, name:'Han Solo'},
      { id:3, name:'Chewbacca'}
    ],
    likedBy: [
      { id:1, name:'Luke Skywalker'},
      { id:2, name:'Han Solo'},
      { id:3, name:'Chewbacca'}
    ]
  }
  ]

});