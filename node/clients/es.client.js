const ElasticSearch = require('elasticsearch')

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */

const ES_HOST = process.env.ES_HOST || 'http://127.0.0.1:9200'

const client = new ElasticSearch.Client({
  hosts: [ES_HOST],
})

module.exports = client
