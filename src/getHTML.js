// import axios from 'axios';

// firstly i use allOrigins
// what i will get?
// then i use domparser
// what i get
// i need to do promises
// and then use the result to build state
// and then state to build the view

export default (feedLink) => {
  const allOriginsLink = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
  const linkToGo = allOriginsLink.concat(feedLink);
  console.log(`this is address ${linkToGo}`);
  return fetch(linkToGo);
};
