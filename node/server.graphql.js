const { makeExecutableSchema } = require('graphql-tools')
const { getAllPapers } = require('./resolvers/getAllPapers')
const { getYearsRange } = require('./resolvers/getYearsRange')
const { getPapersByYear } = require('./resolvers/getPapersByYear')
const { getPaper } = require('./resolvers/getPaper')

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
  paper_references: [Reference]
}

type Reference {
  paper_reference: String,
  paper_reference_id: Int
}

type PaperGroup {
  year: Int,
  total: Int,
  papers: [Paper]
}

type Query {
  getAllPapers: [Paper],
  getYearsRange: [Int],
  getPapersByYear: [PaperGroup],
  getPaper(id: Int): Paper,
}
`

module.exports = makeExecutableSchema({
  typeDefs: [SCHEMA_GRAPHQL],
  resolvers: {
    Query: {
      getAllPapers,
      getYearsRange,
      getPapersByYear,
      getPaper: (_, args) => getPaper(args['id'])
    },
  },
})
