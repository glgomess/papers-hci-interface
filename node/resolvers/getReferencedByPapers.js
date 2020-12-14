const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getReferencedByPapers({ id }) {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.GET_REFERENCED_BY_PAPERS(id), "papers")
      .then(r => {
        let _source = r['hits']['hits'];
        _source.map((item, i) => _source[i] = item._source);
        resolve(_source);
      });
  });
};

module.exports = {
  getReferencedByPapers
};