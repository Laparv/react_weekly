const Filter = ({value, handleFilterChange}) => {
    return(
        <>
        <div >
        search countries: <input value={value}
        onChange={handleFilterChange} />
      </div>
        </>
    )
}

export default Filter;