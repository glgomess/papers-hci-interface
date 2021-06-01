import React, { useState, useEffect } from 'react'
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";


const KeywordSelection = ({ keywords, getMultiplePapers, papersList, setPapersList }: any) => {

    const [selectedKeywords, setselectedKeywords] = useState<any>([]);

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let keyword_papers: any = [];

        values.forEach(value => {
            value.papers_list.forEach(id => {
                keyword_papers.push(id);
           });
        });

        paper_ids.keywords = keyword_papers;
        setPapersList(paper_ids)
        //console.log("paper_ids", paper_ids);
        getMultiplePapers(papersList);
    }

    return (
        <>
        <div>

       
            <div className="authors-dropdown">
                <Multiselect 
                        options = { keywords}
                        displayValue = "keyword_en"
                        placeholder = "Select keyword"
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

