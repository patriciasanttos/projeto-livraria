import './AdminAddButton.scss'
import PlusIcon from '../../assets/icons/plus-icon.svg'

function AdminAddButton({title, onClick}) {
    return (
        <section className='plus-icon-container' onClick={onClick}>
            <h3>{title}</h3>
            <img src={PlusIcon} alt="" />
        </section>
    )
}

export default AdminAddButton