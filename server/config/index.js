// COLORS:
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const env = process.env.NODE_ENV || 'test';

console.log('\x1b[36m%s\x1b[0m', `_\|/_*** ENVIRONMENT: ${env} ***_\|/_`);
console.log('\x1b[36m%s\x1b[0m', `_\|/_*** DATABASE: ${env} ***_\|/_`);

exports.environment = require(`./env.${env}`);
exports.config = require('./config');