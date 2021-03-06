const session = require('express-session');
const name = 'connect.sid';
module.exports = {
    sessionDeclare: session(
        {
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: null,
            },
            name: name,
            secret: process.env.COOKIE_SECRET || '12345',
            // @see https://github.com/expressjs/session#resave
            resave: false,
            // @see https://github.com/expressjs/session#saveuninitialized
            saveUninitialized: true,
        }
    ),
    sessionMiddleware: function (request, response, next) {
        // console.log('sessionMiddleware()');
        // console.log('request.session', request.session);
        // console.log("request.sessionID: ", request.sessionID); // eslint-disable-line
        // console.log("request.session.id: ", request.session.id); // eslint-disable-line
        // console.log("request.session.cookie: ", request.session.cookie); // eslint-disable-line
        // if (request.session.views) {
        //     request.session.views = +request.session.views + 1;
        // } else {
        //     request.session.views = 1;
        // }
        // console.log('request.session.views', request.session);
        next();
    }
}