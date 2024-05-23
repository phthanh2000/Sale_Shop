/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { FaFacebook, FaSquareInstagram, FaUserLarge, FaCartShopping } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { FiMenu } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaHouseUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import SearchField from "react-search-field";
import { Link, useNavigate } from "react-router-dom";
import { urlPages } from "../../../utils/urlPage";
import ErrorPopup from "../../../components/ErrorPopup/errorpopup";
import { Service_User } from "../../../service/service_user";
import "./header.css";

// Header page  
const Header = () => {
    //
    const navigate = useNavigate();

    // Header menu
    const Menu = [
        {
            name: 'Trang chủ',
            path: urlPages[0].path
        },
        {
            name: 'Hàng mới về',
            path: urlPages[1].path
        },
        {
            name: 'Giới thiệu',
            path: urlPages[2].path
        },
        {
            name: 'Liên hệ',
            // path: urlPages[3].path,
            isShowMenu: false,
            child: [
                {
                    name: 'Điện thoại liên hệ',
                    link: 'tel:6031112298',
                    target: ''
                },
                {
                    name: 'Địa chỉ cửa hàng',
                    link: 'https://maps.app.goo.gl/bNHciwfoGcchorJY8',
                    target: '_blank'
                }
            ]
        },
        {
            name: 'Khác',
            path: urlPages[4].path
        },
    ];

    // Item menu
    const Item = [
        {
            name: 'Áo',
            path: '',
            child: [
                {
                    name: 'Nam',
                    path: ''
                },
                {
                    name: 'Nữ',
                    path: ''
                }
            ]
        },
        {
            name: 'Quần',
            path: '',
            child: [
                {
                    name: 'Nam',
                    path: ''
                },
                {
                    name: 'Nữ',
                    path: ''
                }
            ]
        },
        {
            name: 'Giày',
            path: '',
            child: [
                {
                    name: 'Nam',
                    path: ''
                },
                {
                    name: 'Nữ',
                    path: ''
                }
            ]
        },
        {
            name: 'Phụ kiện',
            path: '',
            child: [
                {
                    name: 'Balo',
                    path: ''
                },
                {
                    name: 'Túi xách',
                    path: ''
                }
            ]
        }
    ];

    // Hide/ Show error message when handler on click confirm button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });

    // Login status of user
    const [loginStatus, setLoginStatus] = useState(false);

    // User info
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Async/ await
        async function fetchData() {
            try {
                // Get token value to check whether you are logged in or not 
                const userToken = localStorage.getItem('TokenUser');
                if (userToken) {
                    // Check expiration time of localtorage tokenUser
                    const data = JSON.parse(userToken);
                    const now = new Date().getTime();
                    if (now > data.expirationTime) {
                        // If token expiration will remove TokenUser key
                        localStorage.removeItem('TokenUser');
                        window.location.reload();
                    }
                    // Get user info logged
                    const userInfo = await Service_User.GetUserInfo({ token: data.result });
                    if (userInfo) {
                        // Set user info
                        setUser(userInfo);
                        // Convert status login to true
                        setLoginStatus(!loginStatus);
                    }
                }
            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
        }
        fetchData();
    }, []);

    // Value show item menu
    const [menuItem, setMenuItem] = useState(false);

    // Event when click on item menu icon
    const onClickMenuAllItems = () => {
        menuItem === true ? setMenuItem(false) : setMenuItem(true);
    }

    // On click scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // On click log out 
    const logOut = () => {
        localStorage.removeItem('TokenUser',);
        navigate(`/${urlPages[0].path}`);
        window.location.reload();
    }

    return (
        <div className="header">
            <div className="header-link">
                <div className="connect-link">
                    <div style={{ float: 'left', fontWeight: '600' }}>Kết nối với chúng tôi</div>
                    <Link className="facebook-link" to={"https://www.facebook.com/profile.php?id=61553882820336"}>
                        <FaFacebook />
                    </Link>
                    <Link className="instagram-link" to={"https://www.instagram.com/jf09th20/?fbclid=IwAR2VIGb7q3m9SUdno1V1HV-jtS2TkyMnWjm871yxXcwIyr6AKK8lFb0cHm8"}>
                        <FaSquareInstagram />
                    </Link>
                    <Link className="zalo-link" to={"https://zalo.me/0794042204"}>
                        <SiZalo />
                    </Link>
                </div>
            </div>
            <div className="container-center">
                <div className="row">
                    <div className="header-top-left">
                        <Link to={urlPages[0].path}>
                            <img className="logo" alt="Logo" src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1704562430/logoShop_vr4zyy.png" />
                        </Link>
                    </div>
                    <div className="header-top-center">
                        <SearchField
                            placeholder="Nhập từ khóa tìm kiếm"
                        />
                    </div>
                    <div className="header-top-right">
                        <ul className="cart-user">
                            <li className="li">
                                <Link to={""}>
                                    <div className="cart">
                                        <FaCartShopping className="cart-icon" />
                                        <span>9</span>
                                    </div>
                                    <div>Giỏ hàng</div>
                                </Link>
                            </li>
                            <li className="li">
                                {loginStatus ?
                                    <>
                                        <Link className="user">
                                            <FaUserLarge className="user-icon" />
                                            <p className="overflow">
                                                {user.name}
                                            </p>
                                        </Link>
                                        <ul className="user-dropdown ">
                                            <li>
                                                <Link to={urlPages[11].path}>
                                                    <div>
                                                        <FaHouseUser className="icon" />
                                                        <div className="text">Thông tin cá nhân</div>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={urlPages[0].path} onClick={logOut}>
                                                    <div>
                                                        <CiLogout className="icon" />
                                                        <div className="text">Đăng xuất</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <Link className="user" to={urlPages[5].path} onClick={scrollToTop}>
                                            <FaUserLarge className="user-icon" />
                                            <p className="overflow">
                                                Đăng nhập
                                            </p>
                                        </Link>
                                    </>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="header-bottom-left">
                        <div className="menu-icon-text" onClick={() => onClickMenuAllItems()}>
                            <FiMenu className="menu-icon" />
                            <div className="menu-text">Tất cả danh mục</div>
                        </div>
                        <div className="menu-item">
                            <ul className={menuItem === true ? "menu-item-show" : "menu-item-hidden"}>
                                {
                                    Item?.map((item, itemKey) => (
                                        <li className="menu-item-tag-li" key={itemKey} onClick={() => setMenuItem(false)}>
                                            <Link to={item?.path} className="menu-item-tag-a">
                                                {item?.name}
                                            </Link>
                                            {
                                                item.child && (
                                                    <ul className="menu-item-child">
                                                        {
                                                            item.child?.map((itemChild, itemChildKey) => (
                                                                <li className="menu-item-child-tag-li" key={`${itemChild} - ${itemChildKey}`}>
                                                                    <Link to={itemChild?.path} className="menu-item-child-tag-a">
                                                                        {itemChild?.name}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="header-bottom-right">
                        <ul className="header-menu">
                            {
                                Menu?.map((menu, menuKey) => (
                                    <li key={menuKey}>
                                        <Link to={menu?.path}>
                                            {menu?.name}
                                            {menu.child ? <RiArrowDropDownLine className="dropdown-icon" /> : ''}
                                        </Link>
                                        {
                                            menu.child && (
                                                <ul className="header-contact-dropdown">
                                                    {
                                                        menu.child?.map((menuChild, menuChildKey) => (
                                                            <li key={`${menuKey} - ${menuChildKey}`}>
                                                                <Link to={menuChild?.link} target={menuChild?.target} rel="noopener noreferrer">
                                                                    {menuChild?.name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
        </div>
    );
};

export default Header