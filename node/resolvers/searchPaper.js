const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function searchPaper({ title }) {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.SEARCH_BY_TITLE(title))
      .then(r => {
        let _source = r['hits']['hits'];
        _source.map((item, i) => _source[i] = item._source);
        resolve(_source);
      });
  });
};

module.exports = {
  searchPaper
};