const domParser = new DOMParser();

export default (feedBody) => {
  const xmlDocument = domParser.parseFromString(feedBody, 'text/xml');
  console.log(xmlDocument);
  return xmlDocument;
};
