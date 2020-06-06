const { makeExecutableSchema } = require('graphql-tools')
const { getAllPapers } = require('./resolvers/papers')

const SCHEMA_GRAPHQL = `
type Paper {
  paper_id: Int,
  paper_title: String,
  paper_acm_key: String,
  paper_acm_category: String,
  paper_acm_terms: String,
  paper_num_authors: Int,
  paper_abstract_pt: String,
  paper_abstract_en: String,
  paper_abstract_es: String,
  paper_year: Int,
  paper_theme: String,
  paper_language: String
}
type Query {
  papers: [Paper]
}
`

module.exports = makeExecutableSchema({
  typeDefs: [SCHEMA_GRAPHQL],
  resolvers: {
    Query: {
      getAllPapers,
    },
  },
})
