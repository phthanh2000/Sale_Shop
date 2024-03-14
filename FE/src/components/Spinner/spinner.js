import { useState } from 'react';
import SpinnerIcon from '../../assets/spinner.gif'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './spinner.css';

export const Spinner = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal
            open={true}
            onClose={() => { }}
            center>
            <img className='spinner-image' src={SpinnerIcon} alt='spiner-icon' />
        </Modal>
    )
}