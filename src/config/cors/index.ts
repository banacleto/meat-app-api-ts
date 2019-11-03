// Configuring CORS w/ Dynamic Origin
const whitelist = ['http://localhost:4200', 'http://localhost:4300']
export const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    }
}