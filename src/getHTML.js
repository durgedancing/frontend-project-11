import axios from 'axios';

export default (feedLink) => {
  const allOriginsLink = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
  const linkToGo = allOriginsLink.concat(feedLink);
  console.log(`this is address ${linkToGo}`);
  return axios.get(linkToGo)
    .catch(() => Promise.reject(new Error('networkError')))
    .then((response) => {
      const responseData = response.data.contents;
      return Promise.resolve(responseData);
    });
};

/* const getHttpContents = (url) => getAllOriginsResponse(url)
  .catch(() => Promise.reject(new Error('networkError')))
  .then((response) => {
    const responseData = response.data.contents;
    return Promise.resolve(responseData);
  }); */
