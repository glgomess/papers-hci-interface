const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getAllAuthors() {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.ALL_AUTHORS, "authors")
      .then(r => {
        let _source = r['hits']['hits'];
        _source.map((item, i) => _source[i] = item._source);
        // console.log('_source Authors', _source);
        resolve(_source);
      });
  });
};

module.exports = {
    getAllAuthors
};