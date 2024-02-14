/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { urlPages } from "../../../utils/urlPage";
import "./footer.css";

// Footer page
const Footer = () => {
    // Footer menu 
    const Menu = [
        {
            name: 'Đăng nhập',
            path: urlPages[5].path
        },
        {
            name: 'Đăng ký',
            path:  urlPages[6].path
        },
        {
            name: 'Giỏ hàng',
            path: urlPages[7].path
        },
    ]; 

    // Footer advertising information 
    const advertisingInformation = [
        {
            name: 'Hàng mới về',
            path: urlPages[1].path
        },
        {
            name: 'Giới thiệu',
            path:  urlPages[2].path
        },
    ]; 

    return (
        <div className="footer">
            <div className="footer-line"></div>
            <div className="container-center">
                <div className="row">
                        <div className="footer-top-left">
                            <a>Tài khoản</a>
                            <ul className="account-menu">
                                {
                                    Menu?.map((menu, menuKey) => (
                                        <li key={menuKey}>
                                            <Link to={menu?.path}>
                                                {menu?.name}
                                                </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="footer-top-center">
                            <a>Thông tin quảng cáo</a>
                            <ul className="advertising-information">
                                {
                                    advertisingInformation?.map((advertisingInformation, advertisingInformationKey) => (
                                        <li key={advertisingInformationKey}>
                                            <Link to={advertisingInformation?.path}>
                                                {advertisingInformation?.name}
                                                </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="footer-top-right">
                            <img className="logo-introduce" alt="logo-introduce" src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1704563865/introducelogo_vugzg2.png"/>
                            <div className="introduce-shop">
                            <a>KaPi Store</a>
                            <b>&emsp;Thời trang – nơi tôn vinh cái đẹp</b>
                            <p>Chuyên thời trang Quảng Châu kiểu hot trend sỉ & lẻ các phụ kiện, túi xách, balo, v.v... </p>
                            <p>Nhận sỉ từ 6 sản phẩm bất kì</p>
                            </div>
                        </div>
                </div>
                <div className="row">
                        <div className="footer-bottom-left">
                            <a>Thông tin liên hệ</a>
                            <p>
                                <b>Địa chỉ:</b>
                                <Link className="link" to="https://maps.app.goo.gl/5zKWY96beBQB7jDN9" title="address">&nbsp;550/31 đường Hồng Bàng, Phường 16, Quận 11, Tp Hồ Chí Minh</Link>
                            </p>
                            <p>
                                <b>Thời gian làm việc:</b>
                                <span>&nbsp;8:30 đến 17:00 <b>(từ T2 đến T6 hàng tuần)</b></span>
                            </p>  
                            <p>
                                <b>Thư điện tử:</b>
                                <Link className="link" to="mailto:kimphung09102000@gmail.com" title="mail">&nbsp;kimphung09102000@gmail.com</Link>
                            </p>  
                            <p>
                                <b>Số điện thoại:</b>
                                <Link className="link" to="tel:0794042204" title="0794042204">&nbsp;0794042204</Link>
                            </p> 
                            <iframe className="google-map" title="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7363497914016!2d106.64460207326361!3d10.754791259596038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e8c1c804991%3A0xeda46e6de3fe8ffa!2zNTUwLzMxIMSQLiBI4buTbmcgQsOgbmcsIFBoxrDhu51uZyAxNiwgUXXhuq1uIDExLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1704366820162!5m2!1svi!2s" width="300" height="300" style={{border:0}} loading="lazy"/>
                        </div>
                        <div className="footer-bottom-right">
                            <iframe className="facebook-page" title="facebook" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61553882820336&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="500" height="308" style={{border:"none",overflow:"hidden"}} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Footer