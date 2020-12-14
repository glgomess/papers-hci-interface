import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';



const AuthorsSelection = ({ authors, getMultiplePapers }: any) => {

    const [selectedAuthor, setSelectedAuthor] = useState();

    let authorsDrop: any = [];

    if (authors !== undefined) {
        authors.forEach((author: any) => {
            authorsDrop.push(
                {
                    key: author.person_id,
                    label: author.person_name,
                    value: author
                }
            )
        });
    }

    const handleChange = (e: any) => {
        const value = e.target.value;
        setSelectedAuthor(value);
        getMultiplePapers(value?.papers_list);
    }




    return (
        <>

       
            <FormControl className="mh5"  style={{minWidth: "200px"}}>
                <InputLabel id="authorSelect" > Selecione o autor</InputLabel>
                <Select
                    labelId="authorSelect"
                    value={selectedAuthor}
                    label="Select Author"
                    onChange={handleChange}

                >
                    <MenuItem key='None' value={undefined} >
                         Nenhum
                    </MenuItem>
                    {
                        authorsDrop.map((author: any) => {
                            return (
                                
                                <MenuItem key={author.key} value={author.value}>
                                    {author.label} ({author.value.papers_list.length})
                                </MenuItem>
                            )
                        })

                    }


                </Select>



            </FormControl>


        </>
    )
}

export default AuthorsSelection

