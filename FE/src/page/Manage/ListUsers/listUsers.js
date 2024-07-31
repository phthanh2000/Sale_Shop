
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table'
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { Service_User } from '../../../service/service_user';
import Overlay from '../../../components/Overlay/overlay';
import ErrorPopup from '../../../components/ErrorPopup/errorpopup';
import Table from '../../../components/Table/table';
import IndeterminateCheckbox from '../../../components/IndeterminateCheckbox/indeterminatecheckbox';
import "./listUsers.css";

const ListUsers = () => {
  // Data
  const [defaultData, setDefaultData] = useState([]);
  // Create column
  const columnHelper = createColumnHelper();
  // Value column mapping with data
  const columns = [
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
          <MdDeleteOutline className="delete-btn" />
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
      header: () => 'Name',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('address', {
      header: () => 'Address',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('phone', {
      header: () => 'Phone',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('pass', {
      header: () => 'Password',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('roleid', {
      header: () => 'Role',
      cell: info => <p>{info.getValue()}</p>,
      footer: info => info.column.id,
    }),
  ];
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

  return (
    <div className="manage-user-list" style={{ paddingBottom: "10px" }}>
      <div className="container-center">
        <div className="title">
          <h2>Quản lý tài khoản</h2>
        </div>
        {defaultData.length !== 0 ?
          <Table defaultData={defaultData} columns={columns} />
          :
          <div className="no-data">Không có dữ liệu để hiển thị.</div>}
      </div>
      {isShowOverlay && <Overlay />}
      <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
    </div>
  )
};

export default ListUsers;