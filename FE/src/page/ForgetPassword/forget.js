import { useState } from "react";
import './forget.css';
import { Service_User } from "../../service/service_user";

const ForgetPassword = () => {
    // Value from email input
    const [emailReset, setEmailReset] = useState('');

    // Display message when error email input
    const [emailResetMessage, setEmailResetMessage] = useState('');

    // Display notifications form reset password successful
    const [isSubmitResetPassWord, setIsSubmitResetPassWord] = useState(false);

    // Event on click reset password button
    const onClickResetPassWordButton = async () => {
        setEmailResetMessage('');
        if (emailReset === '') {
            setEmailResetMessage("Email không được để trống");
        } else {
            try {
                // Reset password API
                const result = await Service_User.ResetPasswordUser({email: emailReset});
                if(result === "User does not exists") {
                    setEmailResetMessage('Tài khoản không tồn tại');
                } else {
                    setIsSubmitResetPassWord(!isSubmitResetPassWord);
                }
            } catch (error) {
                console.log(error);
            };
        }
    }

        // Event on enter input form
        const onKeyEnter = async (event) => {
            if (event.key === 'Enter') {
                onClickResetPassWordButton();
            }
        }

    return (
        <div className="forget-form">
            <div className="container-center">
                {isSubmitResetPassWord ?
                    <>
                        <div className="header-forget-form">
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Chúc mừng bạn đặt lại mật khẩu thành công
                            </div>
                        </div>
                        <div className="footer-forget-form">
                            <div className="info-notification">
                                <i>Yêu cầu khôi phục lại mật khẩu đã được gửi đến email</i>
                                <br></br>
                                <strong>{emailReset}</strong>
                                <br></br>
                                <i>Vui lòng kiểm tra email của bạn.</i>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="header-forget-form">
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
                                <strong>Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi cho bạn một email để kích hoạt lại mật khẩu mới.</strong>
                            </div>
                            <label>
                                Email:
                            </label>
                            <div className="input-email">
                                <input type="email"
                                    name="email"
                                    placeholder="Nhập Email"
                                    maxLength={50}
                                    value={emailReset}
                                    onChange={(e) => { setEmailReset(e.target.value) }}
                                    onClick={() => { setEmailResetMessage('') }}
                                    onKeyDown={(e) => onKeyEnter(e)}
                                />
                            </div>
                            <div className={emailReset === '' ? "message-notification show" : "message-notification hide"}>
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
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default ForgetPassword;