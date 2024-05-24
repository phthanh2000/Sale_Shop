import { Link } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import { urlPages } from "../../utils/urlPage";
import './order.css';

const Order = () => {
    return (
        <div className="order-form">
            <div className="container-center">
                <div className="row">
                    <div className="order-left">
                        <div className='title'>
                            Tài khoản
                        </div>
                        <div className="order-list">
                            <ul>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[11].path}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={''}>
                                        Đơn mua
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[13].path}`}>
                                        Danh sách địa chỉ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="order-right">
                        ORDER PAGE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;