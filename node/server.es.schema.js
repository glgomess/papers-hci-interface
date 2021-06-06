// [Query] Retrieve all papers by matching any paper and setting a big limit of up to 1000 results.
const ALL_PAPERS = {
  size: 1000,
  query: {
    match_all: {},
  },
};

// [Query] Retrieve all authors by matching any paper and setting a big limit of up to 1000 results.
const ALL_AUTHORS = {
  size: 1000,
  query: {
    match_all: {},
  },  
  sort: [
    {
      "person_name.keyword": {
        order: "asc"
      }
    }
  ]
};

// [Query] Retrieve all keywords by matching any paper and setting a big limit of up to 1000 results.
const ALL_KEYWORDS = {
  size: 2000,
  query: {
    match_all: {},
  },  
  sort: [
    {
      "keyword_en.keyword": {
        order: "asc"
      }
    }
  ]
};

// [Query] All papers have a year of publication. Here we retrieve all the unique year values.
// We do this using agregation. Setting a big limit of up to 50 results.
// And ordering descending, so the greater year values come before minor year values.
// This way we always get the 50 most recent years.
const YEARS_RANGE = {
  size: 0,
  aggs: {
    "unique_years": {
      terms: {
        field: "paper_year",
        order: {
          _key: "desc"
        },
        size: 50
      }
    }
  }
};

// [Query] All papers grouped by year of publication.
// We do this using agregation. Setting a limit of up to 20 years and 100 papers by year.
// And ordering descending, so the greater year values come before minor year values.
// This way we get the 20 most recent years.
const PAPERS_BY_YEAR = {
  size: 0,
  aggs: {
    "papers_by_year": {
      terms: {
        field: "paper_year",
        order: {
          _key: "desc"
        },
        size: 20
      },
      aggs: {
        "papers": {
          top_hits: {
            size: 100
          }
        }
      }
    }
  }
};

// [Query] Get paper by id.
const GET_PAPER = (id) => {
  return {
    query: {
      match: {
        "paper_id": id
      }
    }
  }
};

// [Query] Get paper by id.
const GET_MULTIPLE_PAPERS = (ids) => {
  return {
    size: 50,
    query: {
      bool: {
          filter: {
              terms: {
                  "paper_id": ids
              }
          }
      }
  }
  }
};

const GET_MULTIPLE_PAPERS_BY_YEARS = (ids) => {
  return {
    size: 0,
    query: {
      bool: {
          filter: {
              terms: {
                  "paper_id": ids
              }
          }
      }
    },
    aggs: {
      "papers_by_year": {
        terms: {
          field: "paper_year",
          order: {
            _key: "desc"
          },
          size: 20
        },
        aggs: {
          "papers": {
            top_hits: {
              size: 100
            }
          }
        }
      }
    }
  }
};

// [Query] Search for paper by paper title. Get top 5 papers.
const SEARCH_BY_TITLE = (title) => {
  return {
    size: 5,
    query: {
      match: {
        "paper_title": title
      }
    }
  }
};

// [Query] Get papers thats used this paper as reference. Search by paper id.
// Setting a limit of up to 100 reference by results.
const GET_REFERENCED_BY_PAPERS = (id) => {
  return {
    size: 100,
    query: {
      match: {
        "paper_references.paper_reference_id": id
      }
    }
  }
};

module.exports = {
  ALL_PAPERS,
  ALL_AUTHORS,
  ALL_KEYWORDS,
  YEARS_RANGE,
  PAPERS_BY_YEAR,
  GET_PAPER,
  GET_MULTIPLE_PAPERS,
  SEARCH_BY_TITLE,
  GET_REFERENCED_BY_PAPERS,
  GET_MULTIPLE_PAPERS_BY_YEARS
};
