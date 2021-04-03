var config = {
    DB_URL: "mongodb://localhost/mobicash-zen",
    server: {
        PORT: 3080
    },
    jwt: {
        SALT: "saltHashKey",
        auth: {
            secret: "authSecretKey",
            tokenTime: 30 * 60 * 1000
        },
        refresh: {
            secret: "refreshSecretKey",
            tokenTime: 30 * 24 * 60 * 60 * 1000
        },
    }
}

module.exports = config;