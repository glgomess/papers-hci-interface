const { makeExecutableSchema } = require('graphql-tools')
const { getAllPapers } = require('./resolvers/getAllPapers')
const { getYearsRange } = require('./resolvers/getYearsRange')

const SCHEMA_GRAPHQL = `
type Paper {
  paper_id: ID!,
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
  paper_authors: [String],
  paper_references: String
}
type Query {
  getAllPapers: [Paper],
  getYearsRange: [Int]
}
`

module.exports = makeExecutableSchema({
  typeDefs: [SCHEMA_GRAPHQL],
  resolvers: {
    Query: {
      getAllPapers,
      getYearsRange
    },
  },
})
