import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import * as secrets from './../constants/secrets.js'
import * as httpStatus from './../constants/httpStatus.js'
import AuthException from './AuthException.js'

const bearer = 'Bearer '

export default async (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (!authorization) throw new AuthException(httpStatus.UNAUTHORIZED, "Access token was not informed")
        let accessToken = authorization
        if (accessToken.includes(bearer)) {
            accessToken = accessToken.replace(bearer, "")
        }
        let decoded
        jwt.verify(accessToken, secrets.API_SECRET, (err, verified) => {
            if (err) throw new AuthException(httpStatus.UNAUTHORIZED, err.message)
            decoded = verified
        })
        req.authUser = decoded.authUser
        return next()
    } catch (error) {
        return res.status(error.status).json({
            status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }

}