import { Link } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import { urlPages } from "../../utils/urlPage";
import './address.css';

const Address = () => {
    return (
        <div className="address-form">
            <div className="container-center">
                <div className="row">
                    <div className="address-left">
                        <div className='title'>
                            Tài khoản
                        </div>
                        <div className="address-list">
                            <ul>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[11].path}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[12].path}`}>
                                        Đơn mua
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={''}>
                                        Danh sách địa chỉ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="address-right">
                        ADDRESS PAGE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address;