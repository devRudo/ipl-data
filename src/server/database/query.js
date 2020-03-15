const pool = require('./connect');

let query = async (q, param) => {
    const client = await pool.connect();
    try {
        if (param === undefined) {
            const res = await client.query(q);
            return res;
        }
        else {
            const res = await client.query(q, param);
            return res;
        }
    } finally {
        client.release();
    }
}

module.exports = query;