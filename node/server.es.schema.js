// [Query] Retrieve all papers by matching any paper and setting a big limit of up to 1000 results.
const ALL_PAPERS = {
  size: 1000,
  query: {
    match_all: {},
  },
};

//  [Query] All papers have a year of publication. Here we retrieve all the unique year values.
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


module.exports = {
  ALL_PAPERS,
  YEARS_RANGE
};
