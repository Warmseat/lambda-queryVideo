
exports.handler = async (event) => {
  // TODO implement
  console.log('queryVideo v0.0.1')
  console.log('heres the event!: ', event);
  const response = {
    statusCode: 200,
    body: JSON.stringify('URL: ' + event.youtubeURL + '. Query: ' + event.query),
  };
  return response;
};
