import './ErrorFinding.scss'

import ErrorFindingImg from '../../../assets/Images/errorFinding.svg'

function ErrorFinding({text, ...props}) {
    return (
        <section className='error-finding-section' {...props}>
            <img src={ErrorFindingImg} alt="" />
            <p>{text}</p>
        </section>
    )
}

export default ErrorFinding