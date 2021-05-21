import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Select, FormControl, MenuItem, InputLabel, TextField } from '@material-ui/core';
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";
import { AiFillCloseCircle } from "react-icons/ai";
//import '../utils/style.css';


const AuthorsSelection = ({ authors, getMultiplePapers, papersList, setPapersList }: any) => {

    const [selectedAuthor, setSelectedAuthor] = useState<any>([]);

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let authors_papers: any = [];

        values.forEach(value => {
            value.papers_list.forEach(id => {
                authors_papers.push(id);
           });
            setSelectedAuthor(selectedAuthor.concat(value.person_name_in_ref));
        });

       

        console.log("authors_papers",authors_papers)
        paper_ids.authors = authors_papers;
        setPapersList(paper_ids)
        console.log("paper_ids", paper_ids);
        getMultiplePapers(papersList);
    }

    //console.log("Authors", authors)

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

