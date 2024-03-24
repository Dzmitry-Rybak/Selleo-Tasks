import { CSSTransition } from 'react-transition-group';
import './modal.scss';

const Modal = ({children, show}) => {
    return (
        <CSSTransition
            in={show}
            timeout={5000}
            classNames='modal'>
                <div className='modal'>
                    {children}
                </div>
        </CSSTransition>
    )
}

export default Modal;