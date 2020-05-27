const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const Bot = require('./bot');

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const app = express();
const client = new line.Client(config);
const bot = new Bot(client);

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/api', line.middleware(config), async (req, res) => {
    console.log(req.body.events);
    //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
    if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return;
    }
    Promise
        .all(req.body.events.map(await bot.receive))
        .then((result) => res.json(result));
});

app.listen(PORT);
console.log(`Server running at ${PORT}`);
