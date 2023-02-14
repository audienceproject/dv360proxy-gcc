const BaseApi = require("./baseApi");

const displayVideo360Api = function (requestId) {
    const baseApi = new BaseApi(requestId);
    const dvApi = baseApi.configureApiClient("https://displayvideo.googleapis.com/v1", true);

    this.getAdvertiser = async (advertiserId) => {
        return await dvApi.get(`/advertisers/${advertiserId}`);
    };
};

module.exports = displayVideo360Api;