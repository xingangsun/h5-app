import fs from 'fs'
import sampleConfig from './sample'

let mineConfig
try {
  fs.accessSync(`${__dirname}/mine.js`)
  mineConfig = require('./mine')
  // console.log(mineConfig)
} catch (err) {
  mineConfig = {}
}

export default Object.assign({}, sampleConfig, mineConfig)
