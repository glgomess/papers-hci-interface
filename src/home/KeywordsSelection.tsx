import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Select, FormControl, MenuItem, InputLabel, TextField } from '@material-ui/core';
import { Multiselect} from 'multiselect-react-dropdown';
import "../assets/css/authors.css";
import { AiFillCloseCircle } from "react-icons/ai";
//import '../utils/style.css';


const KeywordSelection = ({ keywords, getMultiplePapers, papersList, setPapersList }: any) => {

    const [selectedKeywords, setselectedKeywords] = useState<any>([]);

    const handleChange = (values: any) => {
        let paper_ids = papersList;
        let keyword_papers: any = [];

        console.log("value", values);
        values.forEach(value => {
            value.papers_list.forEach(id => {
                // let pos = paper_ids.indexOf(id);
                // if(pos == -1){
                //     paper_ids.push({
                //         id: id,
                //         type: "keyword"
                //     });
                // }
                // else{
                //     paper_ids[pos].type = "both";
                // }
                keyword_papers.push(id);
           });
            //setselectedKeywords(selectedKeywords.concat(value.person_name_in_ref));
        });

        // if (values.length == 0 ){
           
        //     paper_ids.forEach(paper =>{
        //         if( paper.type != "keyword"){
        //             finalPapers.push(paper);
        //         }
        //         else if (paper.type == "both"){
                    
        //         }
        //     })
        // }
        console.log("keyword_papers",keyword_papers)
        paper_ids.keywords = keyword_papers;
        setPapersList(paper_ids)
        console.log("paper_ids", paper_ids);
        getMultiplePapers(papersList);
    }

    //console.log("Keywords",keywords)

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

