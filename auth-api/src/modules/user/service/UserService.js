import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepository from './../repository/UserRepository.js'
import * as httpStatus from './../../../config/constants/httpStatus.js'
import * as secrets from './../../../config/constants/secrets.js'
import UserException from '../exceptions/UserException.js'

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params
            this.validateRequestData(email)
            let user = await UserRepository.findByEmail(email)
            this.validateUserNotFound(user)
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
    }

    async getAccessToken(req) {
        try {
            const { email, password } = req.body
            this.validateAccessTokenData(email, password)
            let user = await UserRepository.findByEmail(email)
            this.validateUserNotFound(user)
            await this.validatePassword(password, user.password)
            const authUser = { id: user.id, name: user.name, email: user.email }
            const accessToken = jwt.sign({ authUser }, secrets.API_SECRET, { expiresIn: '1d'})
            return  {
                status: httpStatus.SUCCESS,
                accessToken
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }

    }

    async validatePassword(password, hashPassord) {
        let isValid = await bcrypt.compare(password, hashPassord)
        console.log(isValid)
        if (!isValid) throw new UserException(httpStatus.UNAUTHORIZED, 'Password do not match')
    }

    validateAccessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORIZED, 'E-mail and passord must be informed.')
        }
    }

    validateRequestData(email) {
        if (!email) throw new UserException(httpStatus.BAD_REQUEST, 'User e-mail was not informed.')
    }

    validateUserNotFound(user) {
        if (!user) throw new UserException(httpStatus.BAD_REQUEST, 'User was not found.')
    }
}

export default new UserService()