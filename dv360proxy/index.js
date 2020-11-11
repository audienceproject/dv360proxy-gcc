const getConfig = require("./config");
const DV360API = require("./api");
const validateRequest = require("./validator");

async function processRequest(request) {
    try {
        var config = await getConfig();
        // Make sure that API request is allowed by business rules
        const validationResult = await validateRequest(config, request);
        if (validationResult !== true) {
            throw new Error(validationResult.reason);
        }

        // Find the function to be called
        var api = new DV360API((Math.random() * 100000000000).toFixed());
        var operation = api[request.operation];

        if (!operation) {
            throw new Error(`Unsupported operation ${request.operation}`);
        }

        // Invoke the function and return the result
        const response = operation(request.arguments);
        return response;
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err.message
        };
    }
}
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.dv360request = (req, res) => {
    processRequest(req.body).then(response => {
        res.status(200);
        res.json(response);
    }, err => {
        res.status(200);
        res.json({
            error: true,
            message: err.message
        });
    });
};
