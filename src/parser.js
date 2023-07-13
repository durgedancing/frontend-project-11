const domParser = new DOMParser();

export default (feedBody) => {
  console.log(`this is came from fetch: ${feedBody}`);
  const xmlDocument = domParser.parseFromString(feedBody, 'text/xml');
  console.log(xmlDocument);
  return xmlDocument;
};
