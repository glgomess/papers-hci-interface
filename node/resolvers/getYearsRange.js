const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getYearsRange() {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.YEARS_RANGE)
      .then(r => {
        let buckets = r['aggregations']['unique_years']['buckets'];
        buckets.map((item, i) => buckets[i] = item.key);
        resolve(buckets);
      });
  });
};

module.exports = {
  getYearsRange
};