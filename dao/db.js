module.exports = class DB {
    constructor() {
        const {
            Client
        } = require('pg');
        this.client = new Client({
            user: process.env.PG_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            password: process.env.PG_PASS,
            port: 5432,
        });
        this.client.connect(() => {
            console.log('PG_USER is ' + process.env.PG_USER);
            console.log('PG_PASS is ' + process.env.PG_PASS);
            console.log('DATABASE_URL is ' + process.env.DATABASE_HOST);
            console.log('DATABASE_NAME is ' + process.env.DATABASE_NAME);
            console.log('DB connected.');
        }, () => {
            console.log('PG_USER is ' + process.env.PG_USER);
            console.log('PG_PASS is ' + process.env.PG_PASS);
            console.log('DATABASE_URL is ' + process.env.DATABASE_HOST);
            console.log('DATABASE_NAME is ' + process.env.DATABASE_NAME);
            console.log('connect failure');
        });

        this.accessDBforGet = this.accessDBforGet.bind(this);
        this.accessDBforPost = this.accessDBforPost.bind(this);
    }

    accessDBforGet(q) {
        console.log(`called UDUtil.accessDBforGet, query: ${q.text}`);
        return this.client.query(q)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error('DB ERROR !!!');
                console.error(err.stack);
            });
    }

    accessDBforPost(q) {
        console.log(`called UDUtil.accessDBforPost, query: ${q.text}`);
        this.client.query(q);
    }
}