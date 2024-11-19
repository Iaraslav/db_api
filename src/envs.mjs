/**
 * @typedef {object} INFLUX_CONF
 * @property {string} HOST Address to InfluxDB
 * @property {string} ORG Organization
 * @property {string} BUCKET Bucket name
 * @property {string} TOKEN Token name
 */

/**
 * @typedef {object} ENV
 * @property {number} PORT 1024-65535
 * @property {string} HOST IP or FQDN
 * @property {INFLUX_CONF} INFLUX
 */

/** @type {ENV} */
const ENV = {
    PORT: -1,
    HOST: '',
    INFLUX: {
        HOST: '',
        ORG: '',
        BUCKET: '',
        TOKEN: ''
    }
}

/**
 * Gets the environment variables
 * @returns {ENV}
 * @throws {Error}
 */
export const getEnvs = () => {
    if (ENV.PORT == -1) {
        try {
            // Load host address
            ENV.HOST = process.env.HOST !== undefined ? process.env.HOST : (() => {throw new Error('HOST is not defined in the .env')});
            const port = parseInt(process.env.PORT, 10);
            if (isNaN(port) || port < 1024 || port > 65535) {
                throw new Error('PORT must be 1024-65535')
            }
            ENV.PORT = port;
            // influx
            ENV.INFLUX.HOST = process.env.DB_INFLUX_HOST || 'http://localhost:8086';
            ENV.INFLUX.ORG = process.env.DB_INFLUX_ORG || (() => { throw new Error('INFLUX_ORG is not defined'); })();
            ENV.INFLUX.BUCKET = process.env.DB_INFLUX_BUCKET || (() => { throw new Error('INFLUX_BUCKET is not defined'); })();
            ENV.INFLUX.TOKEN = process.env.DB_INFLUX_TOKEN || (() => { throw new Error('INFLUX_TOKEN is not defined'); })();
            return ENV;
        } catch(err) {
            console.error(err);
            process.exit(1);
        }
    } else {
        return ENV;
    }
};