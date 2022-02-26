const h = require('../helpers/helper')
const tokenExtractor = require('../api/users/auth/components/extractToken')
const CTX = require('../config/constants')

exports.tokenExtractor = async (req, res, next) => {
    let result
    let token = req.headers['authorization']
    
    if (h.checkNullQueryAll(token)) {
        let response = CTX.templateResponse(401, false, 'no_token_provided')
        // result = await h.reportApiLogger(req, response, response.msg);
        return res.status(response.status).json(response)
    } else {
        try {
            let test = await tokenExtractor.extract(token)
            test = test.data
            if (!h.checkNullQueryAll(test)) {
                req.userId = test.ID_USER
                req.userRole = test.C_ROLE_ID
                if (h.checkNullQueryAllExtended([test.ID_USER, test.C_ROLE_ID])) {
                    return res.status(CTX.unauthorized().status).json(
                        CTX.unauthorized()
                    )
                } else {
                    next() 
                }
            } else {
                // result = await h.reportApiLogger(req, test, test.msg);
                return CTX.templateResponse(401, false, 'invalid_token')
            }
        } catch (error) {
            console.log({error});
            
            // result = await h.reportApiLogger(req, res, error);
            let response = CTX.systemError(400, error)
            return response
        }
    }
}

exports.tokenExtractorForRedis = async (token) => {
    let result
    if (h.checkNullQueryAll(token)) {
        return {status: false, msg: 'no_token_provided'}
    } else {
        try {
            let test = await tokenExtractor.extract(token)
            test = test.data
            if (test.status == 200) {
                return {status: true, msg: 'ok', data:{
                    userId :test.data.C_ADMIN_ID,
                    userRole: test.data.C_ROLE_ID
                }}
            } else {
                // result = await h.reportApiLogger(req, test, test.msg);
                return {status: test.data.success, msg: test.data.msg}
            }
        } catch (error) {
            return {status: error.response.data.success, msg: error.response.data.msg}
        }
    }
}