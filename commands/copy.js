const axios = require('axios');

exports.runQuery = function (matrixClient, room, userInput, registrar) {
  axios({
    method: 'POST',
    url: `${registrar.config.fediverse}/api/v1/statuses/${userInput}/reblog`,
    headers: { Authorization: `Bearer ${registrar.config.fediverseToken}` },
  }).then((response) => {
    matrixClient.sendHtmlNotice(room.roomId,
      '',
      `You have repeated:
      <blockquote>${response.data.content}`);
  })
    .catch((e) => {
      matrixClient.sendHtmlNotice(room.roomId,
        '', `${e}`);
    });
};