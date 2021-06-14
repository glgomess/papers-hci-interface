import React, { useEffect, useState } from 'react'
import '../../node_modules/react-vis/dist/style.css'
import Pagination from '@material-ui/lab/Pagination';
import "../assets/css/paperList.css";
import PaperListElement from "./PaperListElement";


const PAPERS_PER_PAGE = 5;

const PapersList = ({ data, handleCurrentPaper, selectedPaper, selectedAuthor, selectedKeywords }: any) => {
  //console.log('PapersList', data);

  const [currentPage, setCurrentPage] = useState(1);
  const [shownPapers, setShownPapers] = useState<any>([]);
  const [numberPages, setNumberPages] = useState(1);

  let authorsList2: any = [];
  let keywordList: any = [];

  selectedAuthor.forEach(author => {
    authorsList2.push(author.person_name);
  });

  selectedKeywords.forEach(keyword => {
    keywordList.push(keyword.keyword_en);
  });

  useEffect( () =>{
    //PAGINATION CONFIG
    const pages = Math.ceil(data.length / PAPERS_PER_PAGE);
    setNumberPages( pages);
    paginationConfig();
  }, [data] );


  const pageChanged = (event: object, page: number) => {
    setCurrentPage(page);
    paginationConfig();
  }

  const paginationConfig = () => {
    const start = (currentPage -1) * PAPERS_PER_PAGE;
    const end = start + PAPERS_PER_PAGE;
    setShownPapers(data.slice(start, end));
  }


  return (
        <div>
        {
            shownPapers.length>0 && shownPapers.map((d:any, idx:number) => (

              <PaperListElement key={idx} paper={d}  selectedAuthor={selectedAuthor} selectedKeywords={selectedKeywords} 
              handleCurrentPaper={handleCurrentPaper}
              />
              
            ))
        }
        <Pagination className="pagination" count={numberPages} onChange={pageChanged}/>
        </div>

  )
}

export default PapersList
