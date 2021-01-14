const axios = require('axios');
const fs = require('fs');

exports.runQuery = function (matrixClient, room, registrar) {
  setInterval(() => {
    axios({
      method: 'GET',
      url: `${registrar.config.fediverse.domain}/api/v1/notifications`,
      headers: { Authorization: `Bearer ${registrar.config.fediverse.token}` },
    }).then((notifications) => {
      const event = fs.readFileSync('notification.json', 'utf8');
      fs.writeFileSync('notification.json', notifications.data[0].created_at, 'utf8');

      if (event !== notifications.data[0].created_at) {
        if (notifications.data[0].type === 'follow') {
          matrixClient.sendHtmlNotice(room.roomId,
            '',
            `<b><a href="${registrar.config.fediverse.domain}/${notifications.data[0].account.id}">
            ${notifications.data[0].account.acct}</a></b>
          <font color="#03b381"><b>has followed you.</b></font>
          <br><i>${notifications.data[0].account.note}</i>`);
        } else if (notifications.data[0].type === 'favourite') {
          matrixClient.sendHtmlNotice(room.roomId,
            '',
            `<b><a href="${registrar.config.fediverse.domain}/${notifications.data[0].account.id}">
            ${notifications.data[0].account.acct}</a></b>
          <font color="#03b381"><b>has <a href="${notifications.data[0].status.uri}">favorited</a>
          your post:</b></font>
          <br><blockquote><i><b>${notifications.data[0].status.content}</i></b></blockquote>`);
        } else if (notifications.data[0].type === 'mention') {
          matrixClient.sendHtmlNotice(room.roomId,
            '',
            `<b><a href="${registrar.config.fediverse.domain}/${notifications.data[0].account.id}">
            ${notifications.data[0].account.acct}</a></b>
          <font color="#03b381"><b>has <a href="${notifications.data[0].status.uri}">mentioned</a>
          you:</b></font><br><blockquote><i><b>${notifications.data[0].status.content}
          <br>(id: ${notifications.data[0].status.id}) ${registrar.media.visibilityEmoji(notifications.data[0].status.visibility)}</i></b>
          </blockquote>`);
        } else if (notifications.data[0].type === 'reblog') {
          matrixClient.sendHtmlNotice(room.roomId,
            '',
            `<b><a href="${registrar.config.fediverse.domain}/${notifications.data[0].account.id}">
            ${notifications.data[0].account.acct}</a></b>
          <font color="#03b381"><b>has <a href="${notifications.data[0].status.uri}">repeated</a>
          your post:</b></font><br>
          <blockquote><i><b>${notifications.data[0].status.content}</i></b></blockquote>`);
        }
      }
    });
  }, 8000);
};