import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Select, FormControl, MenuItem, InputLabel, TextField } from '@material-ui/core';
import { Multiselect} from 'multiselect-react-dropdown';
//import '../utils/style.css';


const AuthorsSelection2 = ({ authors, getMultiplePapers }: any) => {

    const [selectedAuthor, setSelectedAuthor] = useState<any>([]);

    const handleChange = (values: any) => {
        let paper_ids: any = [];        
        values.forEach(value => {
            value.papers_list.forEach(id => {
                paper_ids.push(id);
           });
        });
        getMultiplePapers(paper_ids);
    }




    return (
        <>
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


        </>
    )
}

export default AuthorsSelection2

