
import { useEffect, useState, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table'
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { Service_User } from '../../../service/service_user';
import Overlay from '../../../components/Overlay/overlay';
import ErrorPopup from '../../../components/ErrorPopup/errorpopup';
import DeletePopup from '../../../components/DeletePopup/deletepopup';
import Table from '../../../components/Table/table';
import IndeterminateCheckbox from '../../../components/IndeterminateCheckbox/indeterminatecheckbox';
import AddEditUser from '../../../components/AddEditUser/addedituser';
import "./listUsers.css";

const ListUsers = () => {
  // Data
  const [defaultData, setDefaultData] = useState(() => []);
  // Create column
  const columnHelper = createColumnHelper();
  // Value column mapping with data
  const columns = useMemo(() => [
    columnHelper.accessor('select', {
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="checkbox">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
          <MdEdit className="edit-btn" />
          <MdDeleteOutline className="delete-btn"
            onClick={() => {
              setisShowDeletePopup({
                show: true,
                message: `Bạn muốn xóa người dùng`,
                delete: false,
                item: row.original
              })
            }} />
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('id', {
      header: () => 'ID',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('name', {
      header: () => 'Họ và tên',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('email', {
      header: () => 'Thư điện tử',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('address', {
      header: () => 'Địa chỉ',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('phone', {
      header: () => 'Số điện thoại',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('roleid', {
      header: () => 'Quyền',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('pass', {
      header: () => 'Mật khẩu',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
  ]);
  // Hide/ Show overlay or loading when handler loading data or on click update button
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  // Hide/ Show error message when handler loading data or on click confirm button error
  const [isShowErrorPopup, setIsShowErrorPopup] = useState({
    show: false,
    message: ''
  });
  // Hide/ Show delete popup when click delete button
  const [isShowDeletePopup, setisShowDeletePopup] = useState({
    show: false,
    message: '',
    delete: false,
    item: null,
  });
  // Row to delete in table
  const [isRowToDeleteInTable, setIsRowToDeleteInTable] = useState(null);

  useEffect(() => {
    // Async/ await
    async function fetchData() {
      try {
        // Show overlay when waiting loading data
        setIsShowOverlay(true);
        // Get users list
        const users = await Service_User.GetUser();
        setDefaultData(users);
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

  // useEffect handle when delete popup is pressed the ok button
  useEffect(() => {
    // Async/ await
    async function fetchData() {
      try {
        if (isShowDeletePopup.delete) {
          // Show overlay when waiting loading data
          setIsShowOverlay(true);
          // Delete user selected
          const deleteUser = await Service_User.DeleteUser('', isShowDeletePopup.item.id);
          if (deleteUser) {
            // Set delete row in table
            setIsRowToDeleteInTable(isShowDeletePopup.item.id);
          };
          // Hide overlay after loaded data 
          setIsShowOverlay(false);
        };
      } catch (error) {
        setIsShowErrorPopup({
          show: true,
          message: error
        });
      }
    }
    fetchData();
  }, [isShowDeletePopup.delete]);

  return (
    <div className="manage-user-list" style={{ paddingBottom: "10px" }}>
      <div className="container-center">
        <div className="title">
          <h2>Quản lý tài khoản</h2>
        </div>
        {defaultData.length !== 0 ?
          <Table defaultData={defaultData}
            columns={columns}
            isRowToDeleteInTable={isRowToDeleteInTable}
            isRowToDeleteInTableComplete={(e) => {
              setIsRowToDeleteInTable(e);
              setisShowDeletePopup({
                show: false,
                message: '',
                delete: false,
                item: null,
              });
            }} />
          :
          <div className="no-data">Không có dữ liệu để hiển thị.</div>}
      </div>
      {isShowOverlay && <Overlay />}
      <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
      <DeletePopup open={isShowDeletePopup}
        close={(e) => setisShowDeletePopup(e)}
        ok={(e) => { setisShowDeletePopup(e) }} />
    </div>
  )
};

export default ListUsers;