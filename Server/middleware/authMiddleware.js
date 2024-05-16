import jwt from 'jsonwebtoken';


export const isAuthenticated = async (req, res, next) => {

    try {

        next()
    } catch (error) {
        next(error)
    }
}