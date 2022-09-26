const Filter = (props) => {
    return(
        <>
        <div>
        search countries: <input 
        onChange={props.handleFilterChange} />
      </div>
        </>
    )
}

export default Filter;