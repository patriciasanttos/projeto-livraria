import './Loading.scss'

function Loading({title, ...props}) {
    return (
      <section className='loading-section'>
        <div className="loader" {...props}></div>
        <h1>
            {title}
        </h1>
      </section>
    );
}

export default Loading