const domParser = new DOMParser();

export default (feedBody) => {
  console.log(`this is came from fetch: ${JSON.stringify(feedBody)}`);
  const xmlDocument = domParser.parseFromString(feedBody, 'text/xml');
  console.log(xmlDocument);
  return xmlDocument;
};
