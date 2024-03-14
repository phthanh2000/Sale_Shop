import { useState } from 'react';
import SpinnerIcon from '../../assets/spinner.gif'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './overlay.css';

export const Overlay = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal
            open={true}
            onClose={() => { }}
            center>
        </Modal>
    )
}