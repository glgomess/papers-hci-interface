import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import PaperInfo from './PaperInfo'
import PapersChart from './PapersChart'
import SearchBar from './SearchBar'
import AuthorsSelection from "./AuthorsSelection"
import KeywordSelection from "./KeywordsSelection"

const GET_PAPERS_BY_YEAR = gql`
  {
    getPapersByYear  {
      year,
      total,
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
      year,
      total,
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
      paper_authors
      paper_references {
        paper_reference,
        paper_reference_id
      }
      paper_keywords
    }
    getReferencedByPapers(id: $id) {
      paper_id,
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
      paper_authors
      paper_references {
        paper_reference,
        paper_reference_id
      }
    }
  }
`

const GET_AUTHORS = gql`
{
  getAllAuthors  {
    person_name
    person_name_in_ref
    person_id
    papers_list
  }
}
`

const GET_KEYWORDS = gql`
{
  getAllKeywords  {
    keyword_en
    keyword_id
    papers_list
  }
}
`

const Home = () => {
  const handleCurrentPaper = (paper_id: number | string) => {
    const id = typeof (paper_id) === 'string' ? parseInt(paper_id) : paper_id
    getPaper({ variables: { id: id } })
  }

  const [authors, setAuthors] = useState<any>([])
  useQuery(GET_AUTHORS, {
    onCompleted(data) {
      setAuthors(data.getAllAuthors)
    }
  })

  const [keywords, setKeywords] = useState<any>([])
  useQuery(GET_KEYWORDS, {
    onCompleted(data) {
      setKeywords(data.getAllKeywords)
      //console.log("keywords", data.getAllKeywords)
    }
  })

  function getMultiplePapers(papers_ids: any = []) {
    let finalPapersIds: any = [];

    if(papers_ids.authors){
      papers_ids.authors.forEach( id =>{
        finalPapersIds.push(id);
      });
    }
    
    if(papers_ids.keywords){
      papers_ids.keywords.forEach( id =>{
        if(finalPapersIds.indexOf(id) == -1){
          finalPapersIds.push(id);
        }
      });
    }

    //select all papers
    if(finalPapersIds.length == 0){
      getAllPapers({});
    }
    else{
      getPapers({ variables: { ids: finalPapersIds } })

    }
  }

  const [papers, setPapers] = useState<any>([])
  useQuery(GET_PAPERS_BY_YEAR, {
    onCompleted(data) {
      setPapers(data.getPapersByYear)
    }
  })

  const [papersList, setPapersList] = useState<any>([])

  const [getPaper, { data: selectedPaper, loading: loadingSelectedPaper }] = useLazyQuery(GET_PAPER);
  const [getPapers, { data: selectedPapers }] = useLazyQuery(GET_MULTIPLE_PAPERS_BY_YEAR , {
    onCompleted: (data) =>{
      // console.log('papers', papers);
      //console.log('data.getMultiplePapersByYears', data);
      setPapers(data.getMultiplePapersByYears);
    }
  });

  const [getAllPapers] = useLazyQuery(GET_PAPERS_BY_YEAR , {
    onCompleted: (data) =>{
      setPapers(data.getPapersByYear);
    }
  });

  return (
    <>
      <div className="ma4 flex">
        <div style={{backgroundColor: "aquamarine"}}>
            <p>
              Author:
            </p>
            <AuthorsSelection
              authors={authors || []}
              getMultiplePapers={getMultiplePapers}
              papersList = {papersList || []} 
              setPapersList = {setPapersList}
            />

            <p>
              Keywords:
            </p>
            <KeywordSelection
              keywords={keywords || []}
              getMultiplePapers={getMultiplePapers}
              papersList = {papersList || []} 
              setPapersList = {setPapersList}
            />
        </div>
        <div className="w-70">
          <div className="flex flex-column w-100 mh5">
            <SearchBar
              handleCurrentPaper={handleCurrentPaper}
            />
          </div>
          <div className="w-100 mv4">
            <PapersChart
              data={papers || []}
              handleCurrentPaper={handleCurrentPaper}
              selectedPaper={selectedPaper}
            />
          </div>
          <div className="w-100 mv2">
            <PaperInfo
              paper={selectedPaper}
              loading={loadingSelectedPaper}
              handleCurrentPaper={handleCurrentPaper}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
