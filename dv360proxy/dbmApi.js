const baseApi = require("./baseApi");

const doubleClickBidManagerApi = function () {
    const dbmApi = baseApi.configureApiClient("https://www.googleapis.com/doubleclickbidmanager/v1.1");

    this.getQueries = async (requestId, pageToken) => {
        return await baseApi.processRequest(async () => {
            const queriesResponse = await dbmApi.get("/queries", { params: { pageToken: pageToken } });
            return queriesResponse.data;
        }, requestId, 'DV360API.getQueries', '');
    };
    
    this.getQuery = async (requestId, queryId) => {
        return await baseApi.processRequest(async () => {
            const queriesResponse = await dbmApi.get(`/query/${queryId}`);
            return queriesResponse.data;
        }, requestId, 'DV360API.getQuery', queryId);
    };

    this.createQuery = async (requestId, query) => {
        return await baseApi.processRequest(async () => {
            const queriesResponse = await dbmApi.post("/query", query);
            return queriesResponse.data;
        }, requestId, 'DV360API.createQuery', query);
    };

    this.runQuery = async (requestId, queryId, data) => {
        return await baseApi.processRequest(async () => {
            const queriesResponse = await dbmApi.post(`/query/${queryId}`, data);
            return queriesResponse.data;
        }, requestId, 'DV360API.runQuery', queryId);
    };

    this.deleteQuery = async (requestId, queryId) => {
        return await baseApi.processRequest(async () => {
            await dbmApi.delete(`/query/${queryId}`);
            return true;
        }, requestId, 'DV360API.deleteQuery', queryId);
    };

    this.getQueryReports = async (requestId, queryId, pageToken) => {
        return await baseApi.processRequest(async () => {
            const queriesResponse = await dbmApi.get(`/queries/${queryId}/reports`, { params: { pageToken: pageToken } });
            return queriesResponse.data;
        }, requestId, 'DV360API.getQueryReports', queryId);
    };
};

module.exports = doubleClickBidManagerApi;