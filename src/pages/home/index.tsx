import gql from 'graphql-tag'
import React, { useEffect, useRef, useState } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import PaperInfo from './PaperInfo'
import PapersChart from './PapersChart'
import SearchBar from './SearchBar'
import AuthorsSelection from './AuthorsSelection'
import KeywordSelection from './KeywordsSelection'
import ToggleButton from 'react-toggle-button'
import '../../assets/css/index.css'
import ToggleButtonUi from '@material-ui/lab/ToggleButton'
import ViewListIcon from '@material-ui/icons/ViewList'
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import PapersList from './PapersList'
import ReactTooltip from 'react-tooltip'

const GET_ALL_PAPERS = gql`
  {
    getAllPapers {
      paper_id
      paper_title
      paper_language
      paper_authors {
        person_name
        person_id
      }
      paper_keywords {
        keyword
        keyword_id
      }
      paper_year
    }
  }
`

const GET_PAPERS_BY_YEAR = gql`
  {
    getPapersByYear {
      year
      total
      papers {
        paper_id
        paper_title
      }
    }
  }
`

const GET_MULTIPLE_PAPERS_BY_YEAR = gql`
  query getMultiplePapers($ids: [Int]) {
    getMultiplePapersByYears(ids: $ids) {
      year
      total
      papers {
        paper_id
        paper_title
      }
    }
  }
`

const GET_PAPER = gql`
  query getPaper($id: Int) {
    getPaper(id: $id) {
      paper_id
      paper_title
      paper_language
      paper_abstract_pt
      paper_abstract_en
      paper_abstract_es
      paper_year
      paper_authors {
        person_name
        person_id
      }
      paper_keywords {
        keyword
        keyword_id
      }
      paper_references {
        paper_reference
        paper_reference_id
      }
    }
    getReferencedByPapers(id: $id) {
      paper_id
      paper_title
    }
  }
`

const GET_MULTIPLE_PAPERS = gql`
  query getMultiplePapers($ids: [Int]) {
    getMultiplePapers(ids: $ids) {
      paper_id
      paper_title
      paper_language
      paper_abstract_pt
      paper_abstract_en
      paper_abstract_es
      paper_authors {
        person_name
        person_id
      }
      paper_keywords {
        keyword
        keyword_id
      }
      paper_year
      paper_references {
        paper_reference
        paper_reference_id
      }
    }
  }
`

const GET_MULTIPLE_PAPERS_SORTED = gql`
  query getMultiplePapersSorted($ids: [Int], $sortDirection: String) {
    getMultiplePapersSorted(ids: $ids, sortDirection: $sortDirection) {
      paper_id
      paper_title
      paper_language
      paper_abstract_pt
      paper_abstract_en
      paper_abstract_es
      paper_year
      paper_authors {
        person_name
        person_id
      }
      paper_keywords {
        keyword
        keyword_id
      }
      paper_references {
        paper_reference
        paper_reference_id
      }
    }
  }
`

const GET_ALL_PAPERS_SORTED = gql`
  query getAllPapersSortedByYear($sortDirection: String) {
    getAllPapersSortedByYear(sortDirection: $sortDirection) {
      paper_id
      paper_title
      paper_language
      paper_abstract_pt
      paper_abstract_en
      paper_abstract_es
      paper_year
      paper_authors {
        person_name
        person_id
      }
      paper_keywords {
        keyword
        keyword_id
      }
      paper_references {
        paper_reference
        paper_reference_id
      }
    }
  }
`

const GET_AUTHORS = gql`
  {
    getAllAuthors {
      person_name
      person_name_in_ref
      person_id
      papers_list
    }
  }
`

const GET_KEYWORDS = gql`
  {
    getAllKeywords {
      keyword_en
      keyword_id
      papers_list
    }
  }
`

const Home = () => {
  const handleCurrentPaper = (paper_id: number | string) => {
    const id = typeof paper_id === 'string' ? parseInt(paper_id) : paper_id
    getPaper({ variables: { id: id } })
  }

  const [allPapersByYear, setAllPapersByYear] = useState<any>([])
  useQuery(GET_PAPERS_BY_YEAR, {
    onCompleted: (data) => {
      setAllPapersByYear(data.getPapersByYear)
    },
  })

  const [isLoadingListPaper, setIsLoadingListPaper] = useState<boolean>(true)
  const [allPapers, setAllPapers] = useState<any>([])
  useQuery(GET_ALL_PAPERS_SORTED, {
    variables: { sortDirection: 'desc' },
    onCompleted: (data) => {
      setAllPapers(data.getAllPapersSortedByYear)
      setPapersListView(data.getAllPapersSortedByYear)
      setIsLoadingListPaper(false)
    },
  })

  const [authors, setAuthors] = useState<any>([])
  useQuery(GET_AUTHORS, {
    onCompleted(data) {
      setAuthors(data.getAllAuthors)
    },
  })
  const [selectedAuthor, setSelectedAuthor] = useState<any>([])

  const [keywords, setKeywords] = useState<any>([])
  useQuery(GET_KEYWORDS, {
    onCompleted(data) {
      setKeywords(data.getAllKeywords)
      //console.log("keywords", data.getAllKeywords)
    },
  })
  const [selectedKeywords, setSelectedKeywords] = useState<any>([])

  function getMultiplePapers(papers_ids: any = []) {
    let finalPapersIds: any = []

    if (!papers_ids.authors && !papers_ids.keywords) return

    if (isAnd) {
      if (
        !papers_ids.authors ||
        !papers_ids.keywords ||
        papers_ids.authors?.length == 0 ||
        papers_ids.keywords?.length == 0
      ) {
        finalPapersIds = !papers_ids.authors ? papers_ids.keywords : papers_ids.authors
      } else {
        papers_ids.keywords.forEach((id) => {
          if (papers_ids.authors.indexOf(id) != -1) {
            finalPapersIds.push(id)
          }
        })
      }
    } else {
      if (papers_ids.authors) {
        papers_ids.authors.forEach((id) => {
          finalPapersIds.push(id)
        })
      }

      if (papers_ids.keywords) {
        papers_ids.keywords.forEach((id) => {
          if (finalPapersIds.indexOf(id) == -1) {
            finalPapersIds.push(id)
          }
        })
      }
    }

    //select all papers
    if (finalPapersIds.length == 0) {
      //isGraph ? setPapers(allPapersByYear) : {setPapersListView(allPapers)};
      if (isGraph) {
        setPapers(allPapersByYear)
      } else {
        setPapersListView(allPapers)
      }
    } else {
      if (isGraph) {
        getPapersByYear({ variables: { ids: finalPapersIds } })
      } else {
        //getPapers({ variables: { ids: finalPapersIds } });
        getPapersSorted({ variables: { ids: finalPapersIds, sortDirection: 'desc' } })
      }
    }
  }

  const [papers, setPapers] = useState<any>([])
  useQuery(GET_PAPERS_BY_YEAR, {
    onCompleted(data) {
      setPapers(data.getPapersByYear)
    },
  })

  const [papersList, setPapersList] = useState<any>([])

  const [papersListView, setPapersListView] = useState<any>([])

  const [getPaper, { data: selectedPaper, loading: loadingSelectedPaper }] = useLazyQuery(GET_PAPER)
  const [getPapersByYear, { data: selectedPapersByYear }] = useLazyQuery(GET_MULTIPLE_PAPERS_BY_YEAR, {
    onCompleted: (data) => {
      setPapers(data.getMultiplePapersByYears)
    },
  })

  const [getPapers, { data: selectedPapers }] = useLazyQuery(GET_MULTIPLE_PAPERS, {
    onCompleted: (data) => {
      setPapersListView(data.getMultiplePapers)
    },
  })

  const [getPapersSorted, { data: selectedPapersSorted }] = useLazyQuery(GET_MULTIPLE_PAPERS_SORTED, {
    onCompleted: (data) => {
      setPapersListView(data.getMultiplePapersSorted)
    },
  })

  const [getAllPapers] = useLazyQuery(GET_PAPERS_BY_YEAR, {
    onCompleted: (data) => {
      setPapers(data.getPapersByYear)
    },
  })

  const [isAnd, setIsAnd] = useState<boolean>(false)
  const [isGraph, setIsGraph] = useState<boolean>(true)

  useEffect(() => {
    getMultiplePapers(papersList)
  }, [isGraph])

  const paperInfoRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (selectedPaper && paperInfoRef.current) {
      paperInfoRef.current.scrollIntoView()
    }
  }, [selectedPaper])

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: boolean) => {
    if (nextView != null) {
      setIsGraph(nextView)
    }
  }

  return (
    <>
      <div className="ma4 flex">
        <div className="filter-box">
          <p>
            Filtros
            <span className="toggle">
              <ToggleButton
                inactiveLabel="OU"
                activeLabel="E"
                value={isAnd}
                onToggle={(value) => {
                  setIsAnd(!value)
                }}
              />
            </span>
          </p>

          <p>Author:</p>
          <AuthorsSelection
            authors={authors || []}
            getMultiplePapers={getMultiplePapers}
            papersList={papersList || []}
            setPapersList={setPapersList}
            isAnd={isAnd}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
          />

          <p>Palavra-chave:</p>
          <KeywordSelection
            keywords={keywords || []}
            getMultiplePapers={getMultiplePapers}
            papersList={papersList || []}
            setPapersList={setPapersList}
            isAnd={isAnd}
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
          />
        </div>
        <div className="w-70">
          <div className="flex flex-row mr-5">
            <div className="flex flex-column w-100 mh5">
              <SearchBar handleCurrentPaper={handleCurrentPaper} />
            </div>
            <ToggleButtonGroup size="medium" value={isGraph} exclusive onChange={handleChange} className="view-button">
              <ToggleButtonUi value={false} data-tip="Modo Lista">
                <ViewListIcon />
              </ToggleButtonUi>
              <ToggleButtonUi value={true} data-tip="Modo Gráfico">
                <InsertChartOutlinedOutlinedIcon />
              </ToggleButtonUi>

              <ReactTooltip type="light" />
            </ToggleButtonGroup>
          </div>
          <div className="w-100 mv4">
            {isGraph && (
              <PapersChart data={papers || []} handleCurrentPaper={handleCurrentPaper} selectedPaper={selectedPaper} />
            )}
            {!isGraph && (
              <PapersList
                data={papersListView || []}
                handleCurrentPaper={handleCurrentPaper}
                selectedPaper={selectedPaper}
                selectedAuthor={selectedAuthor}
                selectedKeywords={selectedKeywords}
                isLoading={isLoadingListPaper}
              />
            )}
          </div>
          <div className="w-100 mv2" ref={paperInfoRef}>
            <PaperInfo
              paper={selectedPaper}
              loading={loadingSelectedPaper}
              handleCurrentPaper={handleCurrentPaper}
              setSelectedKeywords={setSelectedKeywords}
              selectedKeywords={selectedKeywords}
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
