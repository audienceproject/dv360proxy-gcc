module.exports = async function () {
    const configJSON = process.env.DV360_PROXY_CONFIG;
    if (!configJSON) {
        throw new Error('DV360_PROXY_CONFIG env variable is not passed');
    }
    let runtimeConfig;
    try {
        runtimeConfig = JSON.parse(configJSON);
    } catch (err) {
        const error = new Error('Unable to parse DV360_PROXY_CONFIG')
        error.stack = err.stack;
        throw error;
    }
    return {
        //credentials: JSON.parse(credentialsJSON),
        runtimeConfig
    };
};