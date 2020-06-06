const client = require('./clients/es.client')

/**
 * TODO Ping the CLIENT to be sure
 * *** ElasticSearch *** is up
 */
client.ping(
  {
    requestTimeout: 3000,
  },
  function (error) {
    error ? console.error('ElasticSearch cluster is down!') : console.log('ElasticSearch is ok')
  }
)

function ElasticSearchClient(body) {
  // perform the actual search passing in the index, the search query and the type
  return client.search({ index: 'papers', body: body })
}

module.exports = {
  ElasticSearchClient,
}
