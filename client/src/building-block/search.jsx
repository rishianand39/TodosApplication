import React from 'react'
import "../styles/scss/search.scss"
import SearchIcon from '@mui/icons-material/Search';

const Search = ({placeholder}) => {
  return (
    <div className="search">
      <SearchIcon />
        <input type="search" placeholder={placeholder} />
      </div>
  )
}

export default Search
