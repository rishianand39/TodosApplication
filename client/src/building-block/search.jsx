import React from 'react'
import "../styles/scss/search.scss"
import SearchIcon from '@mui/icons-material/Search';

const Search = ({placeholder, setSearchText, searchText, handleFindMember}) => {
  return (
    <div className="search">
      <SearchIcon />
        <input value={searchText} type="search" placeholder={placeholder} onChange={(e)=>handleFindMember(e.target.value)} />
      </div>
  )
}

export default Search
