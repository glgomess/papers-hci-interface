import React, { useState, useEffect } from 'react'
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";


const AuthorsSelection = ({ authors, getMultiplePapers, papersList, setPapersList, isAnd }: any) => {

    const [selectedAuthor, setSelectedAuthor] = useState<any>([]);

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let authors_papers: any = [];
        setSelectedAuthor(values);
       
        if(isAnd){
            let aux: any = [];
            values.forEach(value => {
                aux.push(value.papers_list)
            });
            authors_papers = aux.reduce((a, b) => a.filter(c => b.includes(c)));
        }
        else{
            values.forEach(value => {
                value.papers_list.forEach(id => {
                    authors_papers.push(id);
               });
            });
        }        
       
        paper_ids.authors = authors_papers;
        setPapersList(paper_ids)
        getMultiplePapers(papersList);
    }

    useEffect( () =>{
        if(selectedAuthor.length > 0){
            handleChange(selectedAuthor);
        }
    }, [isAnd] );


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

