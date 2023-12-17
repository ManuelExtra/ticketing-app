module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.polls = 300;
        return config;
    }
}