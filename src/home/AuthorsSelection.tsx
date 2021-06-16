import React, { useState, useEffect } from 'react'
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";
import { useLazyQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PAPER_AUTHORS = gql`
query getMultipleAuthors($ids: [Int]) {
  getMultipleAuthors(ids: $ids) {
    person_name
    person_name_in_ref
    person_id
    papers_list
  }
}
`

const AuthorsSelection = ({ authors, getMultiplePapers, papersList, setPapersList, isAnd,selectedAuthor,setSelectedAuthor  }: any) => {


    const [getAuthors ] = useLazyQuery(GET_PAPER_AUTHORS, {
        onCompleted: (data) => {
            handleChange(data.getMultipleAuthors);
        }

    });

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let authors_papers: any = [];
        setSelectedAuthor(values);
       
        if(isAnd){
            let aux: any = [];
            values.forEach(value => {
                aux.push(value.papers_list)
            });
            authors_papers = aux.length != 0 ? aux.reduce((a, b) => a.filter(c => b.includes(c))) : aux ;
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
            let authorsIds: any = [];
            selectedAuthor.forEach(author => {
                authorsIds.push(author.person_id);
            });
            getAuthors({ variables: { ids: authorsIds } });
        }
    }, [isAnd, selectedAuthor] );


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
                        selectedValues = {selectedAuthor}
                    />
            </div>

           
        </div>

        </>
    )
}

export default AuthorsSelection

