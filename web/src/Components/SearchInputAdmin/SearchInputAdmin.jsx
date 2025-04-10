import './SearchInputAdmin.scss'

function SearchInputAdmin({title, placeholder, className}) {
    return (
        <section className='search-input-admin-container'>
            <h3>{title}</h3>
            <input type="text" placeholder={placeholder} className={className}/>
        </section>
    )
}

export default SearchInputAdmin