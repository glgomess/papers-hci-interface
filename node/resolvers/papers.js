const { ElasticSearchClient } = require('../server.elasticsearch');
const elasticSearchSchema = require('../server.es.schema');

function papers() {
  return new Promise((resolve, reject) => {
    ElasticSearchClient({ ...elasticSearchSchema })
      .then(r => {
        let _source = r['hits']['hits'];
        _source.map((item, i) => _source[i] = item._source);
        resolve(_source);
      });
  });
};

module.exports = {
  papers
};