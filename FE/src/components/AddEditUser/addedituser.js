import { useState } from "react";
import { Modal } from 'react-responsive-modal';
import { IoIosClose } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import './addedituser.css';

const AddEditUser = (props) => {
    // Display password
    const [isShowPassword, setIsShowPassword] = useState(false);
    // Display re-password
    const [isShowRePassword, setIsShowRePassword] = useState(false);
    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowPassword(!isShowPassword);
        } else {
            setIsShowRePassword(!isShowRePassword);
        }
    };
    return (
        <Modal open={false}
            onClose={() => { }}
            center
            className='add-edit-user-modal'>
            <div className='add-edit-user-header'>
                <h2>Thay đổi thông tin</h2>
                <IoIosClose className="close-icon"></IoIosClose>
            </div>
            <div className='add-edit-user-center'>
                <p className='name'>Họ và tên:</p>
                <input type="text"
                    name="name"
                    placeholder="Nhập tên người dùng"
                    maxLength={100}
                    className='input-name'></input>
                <p className='name'>Thư điện tử:</p>
                <input type="email"
                    name="email"
                    placeholder="Nhập email"
                    maxLength={50}
                    className='input-email'></input>
                <p className='address'>Địa chỉ:</p>
                <input type="text"
                    name="address"
                    placeholder="Nhập địa chỉ"
                    className='input-address'></input>
                <p className='phone'>Số điện thoại:</p>
                <input type="tel"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    maxLength={10}
                    className='input-phone'></input>
                <div className='form-pass'>
                    <p className='pass'>Mật khẩu:</p>
                    <input type={isShowPassword ? 'text' : 'password'}
                        name="pass"
                        placeholder="Nhập mật khẩu"
                        maxLength={50}
                        className='input-password'></input>
                    {isShowPassword ?
                        <IoEye onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                        :
                        <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                    }
                </div>
                <div className='form-re-pass'>
                    <p className='re-pass'>Nhập lại mật khẩu:</p>
                    <input type={isShowRePassword ? 'text' : 'password'}
                        name="re-pass"
                        placeholder="Nhập lại mật khẩu"
                        maxLength={50}
                        className='input-password'></input>
                    {isShowRePassword ?
                        <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                        :
                        <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                    }
                </div>
                <p className='role'>Quyền:</p>
                <select className='select-role'>
                </select>
            </div>
            <div className='add-edit-user-footer'>
                <button className='cancel'>Hủy bỏ</button>
                <button className='ok'>Thêm</button>
            </div>
        </Modal>
    )
};

export default AddEditUser;