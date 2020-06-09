const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getPapersByYear() {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.PAPERS_BY_YEAR)
      .then(r => {
        let buckets = r['aggregations']['papers_by_year']['buckets'];
        buckets = buckets.reduce((prev, curr) => {
          return [
            ...prev,
            {
              year: curr['key'],
              total: curr['doc_count'],
              papers: curr['papers']['hits']['hits'].map((item) => item._source)
            }
          ]
        }, [])
        resolve(buckets);
      });
  });
};

module.exports = {
  getPapersByYear
};