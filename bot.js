module.exports = class Bot {
    constructor(client) {
        this.client = client;
    }
    recieve = async (event) => {
        return this.client.replyMessage(event.replyToken, {
            type:"text",
            text:"筋トレしたか？？？？？"
        })
    }
}
