const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getMultiplePapers({ ids }) {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.GET_MULTIPLE_PAPERS(ids), "papers")
      .then(r => {
        if (r['hits']['total']['value'] == 0) reject('Not found')
        let _source = r['hits']['hits'];
        _source.map((item, i) => _source[i] = item._source);
        resolve(_source);
      });
  });
};

module.exports = {
    getMultiplePapers
};