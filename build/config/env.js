import { argv } from 'yargs'

// 环境：test|beta|prod，默认prod
export const envName = ['test', 'beta', 'prod'].find(e => argv[e]) || 'prod'

export const envConfig = {
    test: {
        publicPath: 'http://house-test-water.oss.aliyuncs.com/resource/iwjw-rent-h5_test/'
    },
    beta: {
        publicPath: 'http://house-test-water.oss.aliyuncs.com/resource/iwjw-rent-h5_beta/'
    },
    prod: {
        publicPath: 'https://files.iwjw.com/resource/iwjw-rent-h5/'
    }
}[envName]
