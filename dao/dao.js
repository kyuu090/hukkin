module.exports = class GameDao {
    constructor() {
        this.db = new DB();
    }
    async getHukkin (userId, date) {
        const query = {
            text: "SELECT hukkin from kintore where userid = $1 and date = $2",
            values: [userId, date]
        };
        const result = await this.db.accessDBforGet(query);
        return result.rows[0];
    }

    async getUdetate (userId, date) {
        const query = {
            text: "SELECT udetate from kintore where userid = $1 and date = $2",
            values: [userId, date]
        };
        const result = await this.db.accessDBforGet(query);
        return result.rows[0];
    }

    async getSukuwatto (userId, date) {
        const query = {
            text: "SELECT sukuwatto from kintore where userid = $1 and date = $2",
            values: [userId, date]
        };
        const result = await this.db.accessDBforGet(query);
        return result.rows[0];
    }
}
