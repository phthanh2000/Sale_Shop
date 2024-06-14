import { Link } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import { urlPages } from "../../utils/urlPage";
import './orderHistory.css';

const OrderHistory = () => {
    return (
        <div className="order-history-form">
            <div className="container-center">
                <div className="row">
                    <div className="order-history-left">
                        <div className='title'>
                            Tài khoản
                        </div>
                        <div className="order-history-list">
                            <ul>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[11].path}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[13].path}`}>
                                        Thay đổi mật khẩu
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[12].path}`}>
                                        Lịch sử mua hàng
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="order-history-right">
                        ORDER PAGE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory;