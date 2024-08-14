import { useEffect, useState } from "react";
import SearchField from "react-search-field";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import "./table.css";

// Document: https://tanstack.com/table/v8/docs/framework/react/examples/basic
const Table = (props) => {
    // Data will display in table 
    const [data, setData] = useState(() => [...props.defaultData]);
    // Display columns in table 
    const columns = props.columns;
    // Value get from search input to display result in table (https://tanstack.com/table/v8/docs/framework/react/examples/filters-fuzzy)
    const [globalFilter, setGlobalFilter] = useState('');
    // Generate table with supported values
    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 50,
            },
        },
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
    });
    // Rows selected by the user when clicking the checkbox, add or delete button
    const selectedRows = table.getSelectedRowModel().rows;

    // useEffect handle when delete row in table
    useEffect(() => {
        if (props.isRowToDeleteInTable) {
            setData(data.filter(item => item.id !== props.isRowToDeleteInTable));
            // Delete rows table is completed
            props.isRowToDeleteInTableComplete(null);
        };
    }, [props.isRowToDeleteInTable]);

    return (
        <>
            <div className="search">
                <SearchField placeholder="Nhập từ khóa tìm kiếm"
                    value={globalFilter ?? ''}
                    onChange={value => setGlobalFilter(String(value))} />
            </div>
            <div className="control">
                <button className="add" type="button">Thêm</button>
                <button className="delete" type="button">Xóa</button>
            </div>
            <div className="container-table">
                <table className="table">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div
                                                        {...{
                                                            className: header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                            onClick: header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: <MdOutlineArrowUpward />,
                                                            desc: <MdOutlineArrowDownward />,
                                                        }[header.column.getIsSorted()] ?? null}
                                                    </div>
                                                </>
                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="paging">
                <div className="page">
                    <span className="present-page">
                        <p>Trang &nbsp;</p>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} /{' '}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                </div>
                <div className="button">
                    <button className="return-to-first-page-btn"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()} >
                        {'<<'}
                    </button>
                    <button className="return-to-first-page-btn"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()} >
                        {'<'}
                    </button>
                    <button className="return-to-next-page-btn"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        {'>'}
                    </button>
                    <button className="return-to-last-page-btn"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()} >
                        {'>>'}
                    </button>
                    <span className="go-to-page">
                        &nbsp;| Đi đến trang:&nbsp;
                        <input className="number-page-input"
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                if (Number(e.target.value) <= Number(table.getPageCount().toLocaleString())) {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }
                            }} />
                    </span>
                    <select className="select-number-page"
                        value={table.getState().pagination.pageSize}
                        onChange={e => { table.setPageSize(Number(e.target.value)) }}>
                        {[50, 100, 200, 300, 400, 500].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
};

export default Table;