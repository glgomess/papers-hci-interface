import React, { useState, useEffect } from 'react'
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";


const KeywordSelection = ({ keywords, getMultiplePapers, papersList, setPapersList, isAnd, selectedKeywords, setSelectedKeywords }: any) => {


    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let keyword_papers: any = [];
        setSelectedKeywords(values);

        if(isAnd){
            let aux: any = [];
            values.forEach(value => {
                aux.push(value.papers_list)
            });
            keyword_papers = aux.reduce((a, b) => a.filter(c => b.includes(c)));
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
        if(selectedKeywords.lenght > 0){
            handleChange(selectedKeywords);
        }
       
    }, [isAnd] );

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
                    />
            </div>

           
        </div>

        </>
    )
}

export default KeywordSelection

