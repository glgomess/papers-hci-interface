import { TextField, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import { debounce } from '../../utils/functions'

const SEARCH_PAPER = gql`
  query searchPaper($props: SearchProps) {
    searchPaper(props: $props) {
      paper_id
      paper_title
    }
  }
`

interface SearchProps {
  handleCurrentPaper: Function
}

const SearchBar = ({ handleCurrentPaper }: SearchProps) => {
  const [searchPaper, { data: searchResult }] = useLazyQuery(SEARCH_PAPER)

  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false)
  useEffect(() => {
    searchResult?.searchPaper?.length ? setOpenSearchResults(true) : setOpenSearchResults(false)
  }, [searchResult])

  return (
    <>
      <div className="mw7 flex-auto">
        <TextField
          id="input-search"
          label="Pesquisar"
          style={{ margin: 8 }}
          placeholder="Ex: Young Adults Perspective on Managing Digital Legacy"
          helperText="Digite o nome de um artigo!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e) => {
            const inputText = e.target.value
            debounce((inputText: string) => searchPaper({ variables: { props: { title: inputText } } }), inputText, 250)
          }}
          onFocus={() => {
            searchResult?.searchPaper?.length && setOpenSearchResults(true)
          }}
          onBlur={() => {
            //setTimeout(() => setOpenSearchResults(false), 250)
          }}
        />
      </div>
      {openSearchResults && (
        <div className="relative z-1">
          <div className="absolute ma2">
            <div className="ba b--gray bg-white br3 bw1 pv2">
              {searchResult?.searchPaper.map((paper: any) => (
                <div
                  key={paper.paper_id}
                  className="flex flex-row bg-animate bg-white hover-bg-light-gray ph3 items-center pointer"
                  onClick={() => {
                    handleCurrentPaper(paper.paper_id)
                    setOpenSearchResults(false)
                  }}
                >
                  <div className="mr1 flex">
                    <SearchIcon />
                  </div>
                  <Typography>{paper.paper_title}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBar
