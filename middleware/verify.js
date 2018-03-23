import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

const getToken = function (user) {
    return jwt.sign(user.toJSON(), '12345-67890-09876-54321', {
        expiresIn: 3600
    });
};

const verifyOrdinaryUser = function (req, res, next) {
    console.log(req);
    // check header or url parameters or post parameters for token
    const token =
        req.headers['x-access-token'] ||
        req.signedCookies['configauthCookieName'] ||
        '';

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, '12345-67890-09876-54321', function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                console.log("everything is good");
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

export {getToken, verifyOrdinaryUser}