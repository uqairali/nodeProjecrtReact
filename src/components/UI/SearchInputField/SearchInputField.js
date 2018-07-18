import React from 'react';
import * as Icon from 'react-icons/lib/fa'

const searchInput=(props)=>{
    return(
        <div>
          <div className="form-group">
  <div className="form-group">
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span onClick={props.SwithToCreateNotes} style={{backgroundColor:'#007BFF',color:'white',cursor:'pointer'}} className="input-group-text"><Icon.FaPlus /></span>
      </div>
      <input value={props.Searchvalue} onChange={props.handleSearchInputChange} type="text" className="form-control" placeholder="search for note by title..." />
      <div className="input-group-append">
        <span onClick={props.searchButtonClick} style={{backgroundColor:'#007BFF',color:'white',cursor:'pointer'}} className="input-group-text"><Icon.FaSearch/></span>
      </div>
    </div>
  </div>
</div>  
        </div>
    )
}
export default searchInput;