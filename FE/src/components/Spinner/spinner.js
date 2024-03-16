import SpinnerIcon from '../../assets/spinner.gif'
import './spinner.css';

const Spinner = () => {
    return (
        <div className='spinner'>
            <img className='spinner-image' src={SpinnerIcon} alt='spiner-icon' />
        </div>
    )
}

export default Spinner;