const { makeExecutableSchema } = require('graphql-tools')
const { getAllPapers } = require('./resolvers/getAllPapers')
const { getAllAuthors } = require('./resolvers/getAllAuthors')
const { getAllKeywords } = require('./resolvers/getAllKeywords')
const { getYearsRange } = require('./resolvers/getYearsRange')
const { getPapersByYear } = require('./resolvers/getPapersByYear')
const { getMultiplePapersByYears } = require('./resolvers/getMultiplePapersByYears')
const { getPaper } = require('./resolvers/getPaper')
const { getMultiplePapers } = require('./resolvers/getMultiplePapers')
const { getMultipleKeywords } = require('./resolvers/getMultipleKeywords')
const { searchPaper } = require('./resolvers/searchPaper')
const { getReferencedByPapers } = require('./resolvers/getReferencedByPapers')

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
  paper_references: [Reference],
  paper_keywords: [Int]
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

type Author {
  person_name: String,
  person_name_in_ref: String,
  person_id: Int,
  papers_list: [Int]
}

type Keyword {
  keyword_en: String,
  keyword_id: Int,
  papers_list: [Int]
}

input SearchProps {
  title: String
}

type Query {
  getAllPapers: [Paper],
  getAllAuthors: [Author],
  getAllKeywords: [Keyword],
  getYearsRange: [Int],
  getPapersByYear: [PaperGroup],
  getPaper(id: Int): Paper,
  getMultiplePapers(ids: [Int]): [Paper],
  getMultipleKeywords(ids: [Int]): [Keyword],
  getMultiplePapersByYears(ids: [Int]): [PaperGroup],
  searchPaper(props: SearchProps): [Paper],
  getReferencedByPapers(id: Int): [Paper],
}
`

module.exports = makeExecutableSchema({
  typeDefs: [SCHEMA_GRAPHQL],
  resolvers: {
    Query: {
      getAllPapers,
      getAllAuthors,
      getAllKeywords,
      getYearsRange,
      getPapersByYear,
      getPaper: (_, args) => getPaper(args),
      getMultiplePapers: (_, args) => getMultiplePapers(args),
      getMultipleKeywords: (_, args) => getMultipleKeywords(args),
      getMultiplePapersByYears: (_, args) => getMultiplePapersByYears(args),
      searchPaper: (_, args) => searchPaper(args.props),
      getReferencedByPapers: (_, args) => getReferencedByPapers(args),
    },
  },
})
