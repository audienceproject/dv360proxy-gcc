const BaseApi = require("./baseApi");

const displayVideo360ApiV3 = function (requestId) {
    const baseApi = new BaseApi(requestId);
    const dvApi = baseApi.configureApiClient("https://displayvideo.googleapis.com/v3", true);

    this.getAdvertiser = async (advertiserId) => {
        return await dvApi.get(`/advertisers/${advertiserId}`);
    };
};

module.exports = displayVideo360ApiV3;