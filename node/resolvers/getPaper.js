const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getPaper(id) {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.GET_PAPER(id))
      .then(r => {
        if(r['hits']['total']['value'] == 0) reject('Not found')
        let _source = r['hits']['hits'][0]['_source'];
        resolve(_source);
      });
  });
};

module.exports = {
  getPaper
};