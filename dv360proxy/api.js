const configLoader = require("./config");
const dvApi = require("./dvApi");
const dbmApi = require("./dbmApi");
const dbmApiV2 = require("./dbmApiV2");

const API = function (requestId) {
    this.getQueries = async ({pageToken}) => {
        return await dbmApi.getQueries(requestId, pageToken);
    };

    this.getQueries_v2 = async ({pageToken}) => {
        return await dbmApiV2.getQueries(requestId, pageToken);
    };

    this.getQuery = async ({queryId}) => {
        return await dbmApi.getQuery(requestId, queryId);
    };

    this.getQuery_v2 = async ({queryId}) => {
        return await dbmApiV2.getQuery(requestId, queryId);
    };

    this.createQuery = async ({query}) => {
        return await dbmApi.createQuery(requestId, query);
    };

    this.createQuery_v2 = async ({query}) => {
        return await dbmApiV2.createQuery(requestId, query);
    };

    this.runQuery = async ({queryId, data}) => {
        return await dbmApi.runQuery(requestId, queryId, data);
    };

    this.runQuery_v2 = async ({queryId, data}) => {
        return await dbmApiV2.runQuery(requestId, queryId, data);
    };

    this.deleteQuery = async ({queryId}) => {
        return await dbmApi.deleteQuery(requestId, queryId);
    };

    this.deleteQuery_v2 = async ({queryId}) => {
        return await dbmApiV2.deleteQuery(requestId, queryId);
    };

    this.getQueryReports = async ({queryId, pageToken}) => {
        return await dbmApi.getQueryReports(requestId, queryId, pageToken);
    };

    this.getQueryReports_v2 = async ({queryId, pageToken}) => {
        return await dbmApiV2.getQueryReports(requestId, queryId, pageToken);
    };

    this.ping = async () => {
        return await ping(async () => await dbmApi.getQueries(requestId));
    }

    this.ping_v2 = async () => {
        return await ping(async () => await dbmApiV2.getQueries(requestId));
    }

    async function ping(dbmCheck) {
        const response = {
            ok: true,
            canAccessDV360Api: false,
            canAccessDBMApi: false,
            serviceAccount: null,
            errors: [],
            availableAdvertisers: [],
            unavailableAdvertisers: []
        };

        let config;
        try {
            config = await configLoader();
        } catch (err) {
            response.ok = false;
            response.error.push(err.stack);
            return response;
        }

        //FIXME: add client email from auth.getCredentials()
        //response.serviceAccount = config.credentials.client_email;
        const partners = config.runtimeConfig.partners;
        await dvApi.checkAdvertisers(response, partners);

        try {
            await dbmCheck();
            response.canAccessDBMApi = true;
        } catch (err) {
            response.ok = false;
            response.errors.push("Unable to connect to DBM API. " + err.stack);
        }

        return response;
    }   
};

module.exports = API;
