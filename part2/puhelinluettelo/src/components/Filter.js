const Filter = (props) => {
    return(
        <>
        <div>
        filter names with <input 
        onChange={props.handleFilterChange} />
      </div>
        </>
    )
}

export default Filter;