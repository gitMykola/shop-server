module.exports = {
    app: {
        API_URL: 'http://localhost:2345/api/',
        SHOP_URL: 'http://localhost:2345/shop/'
    },
    auth: {
        type: 'passport',
        header: 'Authorization',
        headerKey: 'Token',
        google: {
            apiKey: "AIzaSyCQqiOB_uS2YEbV5d9vsPUpb4s5VavxulQ",
            clientId: "614754642660-hhpv7vv258h3f4h55uavv5glnhb46ctu.apps.googleusercontent.com",
            clientSecret: "460dDbvoTichx4JLr4E_RDse",
            scopes: "profile",
            tokenURL: "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token="
        }
    }
};
