const { ElasticSearchClient } = require('../server.elasticsearch');
const ES_SCHEMA = require('../server.es.schema');

function getMultiplePapersByYears({ ids }) {
  return new Promise((resolve, reject) => {
    ElasticSearchClient(ES_SCHEMA.GET_MULTIPLE_PAPERS_BY_YEARS(ids), "papers")
      .then(r => {
        let buckets = r['aggregations']['papers_by_year']['buckets'];
        // console.log('buckets', buckets)
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
  getMultiplePapersByYears
};