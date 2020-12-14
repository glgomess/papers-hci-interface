const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getAllPapers() {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.ALL_PAPERS, "papers")
      .then(r => {
        let _source = r['hits']['hits'];
        _source.map((item, i) => _source[i] = item._source);
        resolve(_source);
      });
  });
};

module.exports = {
  getAllPapers
};