import React, { useState, useEffect } from 'react'
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";


const AuthorsSelection = ({ authors, getMultiplePapers, papersList, setPapersList }: any) => {

    const [selectedAuthor, setSelectedAuthor] = useState<any>([]);

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let authors_papers: any = [];
        setSelectedAuthor([]);

        values.forEach(value => {
            value.papers_list.forEach(id => {
                authors_papers.push(id);
           });
            setSelectedAuthor(selectedAuthor.concat(value.person_name));
        });

        paper_ids.authors = authors_papers;
        setPapersList(paper_ids)
        getMultiplePapers(papersList);
    }


    return (
        <>
        <div>

       
            <div className="authors-dropdown">
                <Multiselect 
                        options = { authors}
                        displayValue = "person_name"
                        placeholder = "Selecione autor"
                        onSelect = {handleChange}
                        onRemove = {handleChange}
                        avoidHighlightFirstOption = {true}
                    />
            </div>

           
        </div>

        </>
    )
}

export default AuthorsSelection

