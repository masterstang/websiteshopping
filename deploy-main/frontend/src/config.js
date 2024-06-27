const isProd = !(process.env.NODE_ENV || process.env.NODE_ENV == 'development')
const configs = {
    isProd,
    UrlPrefix: isProd ? '' : 'http://localhost:8000'
}
export default configs;
