const blogs = [
  {
    title: 'How to Set Up an Integrated Development Environment (IDE)',
    author: 'M. S. Farzan',
    url: 'https://www.freecodecamp.org/news/how-to-set-up-an-integrated-development-environment-ide/',
    likes: 12,
    user: {
      username: 'pokumars',
      name: 'Oheneba Knobhead',
      id: '5dce9c2fd04e22385053da74'
    },
    id: '5dd4273a0dc4382e786862d3'
  },
  {
    title: 'Learn these quick tricks in PostgreSQL',
    author: 'PETER GLEESON',
    url: 'https://www.freecodecamp.org/news/postgresql-tricks/',
    likes: 0,
    user: {
      username: 'pokumars',
      name: 'Oheneba Knobhead',
      id: '5dce9c2fd04e22385053da74'
    },
    id: '5dd42a980dc4382e786862d7'
  },
  {
    title: '3 Ways to clone objects in JavaScript',
    author: 'Farzad YZ',
    url: 'https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d',
    likes: 0,
    user: {
      username: 'daenerys',
      id: '5dd42ee00dc4382e786862d8'
    },
    id: '5dd58806dcf3622af41ad14d'
  },
  {
    title: 'Tottenham appoint Mourinho as new manager',
    author: 'Josh Thomas',
    url: 'https://www.goal.com/en-us/news/tottenham-appoint-mourinho-as-new-manager/494s2cxg4leh1jvc4bex8b3uy',
    likes: 0,
    user: {
      username: 'mojo',
      name: 'Jose Mourinho',
      id: '5dd58930dcf3622af41ad14e'
    },
    id: '5dd58cf88c2b143edc2ffe98'
  }
];
let token;

const setToken= (newToken) => {
  token =`bearer ${newToken}`;
};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };