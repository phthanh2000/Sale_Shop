import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Service_User } from "../../service/service_user";
import { urlPages } from "../../utils/urlPage";
import Overlay from "../../components/Overlay/overlay";
import ErrorPopup from "../../components/ErrorPopup/errorpopup";
import './account.css';

const Account = () => {
    const navigate = useNavigate();
    // Id 
    const [id, setId] = useState('');

    // Name
    const [name, setName] = useState('');

    // Address
    const [address, setAddress] = useState('');

    // Phone
    const [phone, setPhone] = useState(0);

    // Email
    const [email, setEmail] = useState('');

    // Message when phone input error
    const [phoneMessage, setPhoneMessage] = useState('');

    // Hide/ Show overlay or loading when handler loading data or on click update button
    const [isShowOverlay, setIsShowOverlay] = useState(false);

    // Hide/ Show error message when handler loading data or on click confirm button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });

    useEffect(() => {
        // Async/ await
        async function fetchData() {
            try {
                // Get token value to check whether you are logged in or not 
                const userToken = localStorage.getItem('TokenUser');
                if (!userToken) {
                    // If user logged will return home page
                    navigate(`/${urlPages[0].path}`);
                    window.location.reload();
                }
                // Parse json
                const data = JSON.parse(userToken);
                // Show overlay when waiting loading data
                setIsShowOverlay(true);
                // Get user info from userToken 
                const userInfo = await Service_User.GetUserInfo({ token: data.result });
                if (userInfo) {
                    // Set info
                    setId(userInfo.id);
                    setName(userInfo.name);
                    setAddress(userInfo.address ? userInfo.address : '');
                    setPhone(userInfo.phone);
                    setEmail(userInfo.email);
                }
                // Hide overlay after loaded data 
                setIsShowOverlay(false);
            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
        };
        fetchData();
    }, []);

    // Event on click update button on account form
    const onClickUpdateButton = async () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            setPhoneMessage('Số điện thoại không đúng định dạng (chỉ gồm số và có 10 số)');
        }
        if (name !== '' && address !== '' && phone !== '' && phoneRegex.test(phone)) {
            try {
                // Show overlay when waiting loading data
                setIsShowOverlay(true);
                // Set phone message empty
                setPhoneMessage('');
                // New data
                const newData = {
                    name: name,
                    address: address,
                    phone: phone
                }
                // Check value and update user
                const updateUser = await Service_User.UpdateUser('', id, newData);
                if (updateUser === 'Phone is registered') {
                    setPhoneMessage('Số điện thoại đã được đăng ký');
                } else {
                    setPhoneMessage('Cập nhật thông tin thành công !');
                }
            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
            // Hide overlay after handle data 
            setIsShowOverlay(false);
        }
    };

    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickUpdateButton();
        }
    }

    // On click scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="account-form">
            <div className="container-center">
                <div className="row">
                    <div className="account-left">
                        <div className='title'>
                            Tài khoản
                        </div>
                        <div className="account-list">
                            <ul>
                                <li>
                                    <IoCaretForward />
                                    <Link to={''} onClick={() => { scrollToTop() }}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[13].path}`} onClick={() => { scrollToTop() }}>
                                        Thay đổi mật khẩu
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[12].path}`} onClick={() => { scrollToTop() }}>
                                        Lịch sử mua hàng
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="account-line" />
                    <div className="account-right">
                        <div className="account-right-top">
                            <FaUserCircle />
                            <a>Thông tin cá nhân</a>
                        </div>
                        <div className="account-right-center">
                            <div className="title">
                                <p className="name">
                                    Tên người dùng: <strong style={{ color: "#cc3300" }}>*</strong>
                                </p>
                                <p className="address">
                                    Địa chỉ: <strong style={{ color: "#cc3300" }}>*</strong>
                                </p>
                                <p className="phone">
                                    Số diện thoại: <strong style={{ color: "#cc3300" }}>*</strong>
                                </p>
                                <p className="email">
                                    Thư điện tử: <strong style={{ color: "#cc3300" }}>*</strong>
                                </p>
                            </div>
                            <div className="input">
                                <input className={name ? "name" : "warning"}
                                    type="text"
                                    placeholder="Nhập Tên người dùng"
                                    maxLength={100}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                <input className={address ? "address" : "warning"}
                                    type="text"
                                    placeholder="Nhập Địa chỉ (Số nhà, tên đường, phường(xã), quận(huyện), thành phố...)"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                <input className={phone ? "phone" : "warning"}
                                    type="tel"
                                    placeholder="Nhập Số điện thoại"
                                    maxLength={10}
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                <input className="email"
                                    disabled="true"
                                    value={email} />
                            </div>
                        </div>
                        <div className={phoneMessage ? "account-message show" : "account-message hide"}>
                            {phoneMessage}
                        </div>
                        <div className="account-right-bottom">
                            <button onClick={() => onClickUpdateButton()}>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShowOverlay && <Overlay />}
            <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
        </div>
    )
}

export default Account;