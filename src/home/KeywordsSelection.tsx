import React, { useState, useEffect } from 'react'
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";
import { useLazyQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PAPER_KEYWORDS = gql`
query getMultipleKeywords($ids: [Int]) {
  getMultipleKeywords(ids: $ids) {
    keyword_en
    keyword_id
    papers_list
  }
}
`


const KeywordSelection = ({ keywords, getMultiplePapers, papersList, setPapersList, isAnd, selectedKeywords, setSelectedKeywords }: any) => {

    const [getKeywords ] = useLazyQuery(GET_PAPER_KEYWORDS, {
        onCompleted: (data) => {
            handleChange(data.getMultipleKeywords);
        }

    });

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let keyword_papers: any = [];
        setSelectedKeywords(values);

        if(isAnd){
            let aux: any = [];
            values.forEach(value => {
                aux.push(value.papers_list)
            });
            keyword_papers = aux.length != 0 ? aux.reduce((a, b) => a.filter(c => b.includes(c))) : aux ;
        }
        else{
            values.forEach(value => {
                value.papers_list.forEach(id => {
                    keyword_papers.push(id);
               });
            });
        }

        paper_ids.keywords = keyword_papers;
        setPapersList(paper_ids)
        //console.log("paper_ids", paper_ids);
        getMultiplePapers(papersList);
    }

    useEffect( () =>{
        if(selectedKeywords.length > 0){
            let keywordsIds: any = [];
            selectedKeywords.forEach(keyword => {
                keywordsIds.push(keyword.keyword_id);
            });
            getKeywords({ variables: { ids: keywordsIds } });
        }
       
    }, [isAnd, selectedKeywords] );

    return (
        <>
        <div>

       
            <div className="authors-dropdown">
                <Multiselect 
                        options = { keywords}
                        displayValue = "keyword_en"
                        placeholder = "Selecione palavra-chave"
                        onSelect = {handleChange}
                        onRemove = {handleChange}
                        avoidHighlightFirstOption = {true}
                        selectedValues = {selectedKeywords}
                    />
            </div>

           
        </div>

        </>
    )
}

export default KeywordSelection

