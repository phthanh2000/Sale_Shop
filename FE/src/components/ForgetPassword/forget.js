import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './forget.css';

export const ForgetPassWord = (props) => {
    // Value from email input
    const [emailReset, setEmailReset] = useState('');

    // Display message when error email input
    const [emailResetMessage, setEmailResetMessage] = useState('');

    // Display notifications form reset password successful
    const [isSubmitResetPassWord, setIsSubmitResetPassWord] = useState(false);

    // Event on click close icon on forget form 
    const onClickCloseIcon = () => {
        props.closeForgetForm(!props.showForgetPasswordForm, 'close');
    }

    // Event on click reset password button
    const onClickResetPassWordButton = () => {
        if(emailReset === ''){
            setEmailResetMessage("Email không được để trống");
        } else {
            setIsSubmitResetPassWord(!isSubmitResetPassWord);
            // Reset password API
        }
    }

    // Event on click return login form button on forget form
    const onClickReturnLoginFormButton = () => {
        props.closeForgetForm(!props.showForgetPasswordForm, 'return');
    }

    return (
        <div className="forget-form">
            <Modal
                open={props.showForgetPasswordForm}
                onClose={() => { }}
                center>
                {isSubmitResetPassWord ?
                    <>
                        <div className="header-forget-form">
                            <IoClose className="close-icon"
                                onClick={() => onClickCloseIcon('reset-password-success')} />
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Đặt lại mật khẩu thành công
                            </div>
                        </div>
                        <div className="footer-forget-form">
                            <div className="info-notification">
                                Email khôi phục lại mật khẩu đã được gửi lại thành công đến <strong>{emailReset}</strong>
                                <br></br>
                                Vui lòng kiểm tra email của bạn.
                            </div>
                            <div className="close">
                                <button className="button-close"
                                    type="button"
                                    name="close"
                                    onClick={() => onClickCloseIcon('reset-password-success')}>Đóng</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="header-forget-form">
                            <IoClose className="close-icon"
                                onClick={() => onClickCloseIcon()} />
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Quên mật khẩu
                            </div>
                        </div>
                        <div className="footer-forget-form">
                            <div className="info-warning">
                                Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.
                            </div>
                            <label>
                                Email:
                            </label>
                            <div className="input-email">
                                <input type="email"
                                    name="email"
                                    placeholder="Nhập Email" 
                                    value={emailReset}
                                    onChange={(e) => {setEmailReset(e.target.value)}}
                                    onClick={() => {setEmailResetMessage('')}}
                                    />
                            </div>
                            <div className={emailReset === ''? "message-notification show" : "message-notification hide"}>
                                {emailResetMessage}
                            </div>
                            <div className="reset">
                                <button className="button-reset"
                                    type="button"
                                    name="reset"
                                    onClick={() => onClickResetPassWordButton()} >
                                    Đặt lại mật khẩu
                                </button>
                            </div>
                            <div className="line" />
                            <div className="login">
                                <button className="button-login"
                                    type="button"
                                    name="login"
                                    onClick={() => onClickReturnLoginFormButton()}>
                                    Quay về trang đăng nhập
                                </button>
                            </div>
                        </div>
                    </>}
            </Modal>
        </div>
    )
}