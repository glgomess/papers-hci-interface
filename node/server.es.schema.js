// [Query] Retrieve all papers by matching any paper and setting a big limit of up to 1000 results.
const ALL_PAPERS = {
  size: 1000,
  query: {
    match_all: {},
  },
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


module.exports = {
  ALL_PAPERS,
  YEARS_RANGE,
  PAPERS_BY_YEAR
};
