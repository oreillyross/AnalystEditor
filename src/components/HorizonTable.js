import React from "react";
import { useTable, useSortBy } from "react-table";
import "./HorizonTable.css";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { IconContext } from "react-icons";

function HorizonTable(props) {
  const data = React.useMemo(() => props.data || []);
  const columns = React.useMemo(() => props.columns || []);
  const tableInstance = useTable({ columns, data }, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;
  return (
    <div className="form_body">
      {" "}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => {
            return (
              <IconContext.Provider
                value={{
                  style: {
                    fontSize: "12px",
                    color: "blue"
                  }
                }}
              >
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(header => (
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      {header.render("Header")}
                      {header.isSorted ? (
                        header.isSortedDesc ? (
                          <FaSortAlphaDown />
                        ) : (
                          <FaSortAlphaUp />
                        )
                      ) : (
                        ""
                      )}
                    </th>
                  ))}
                </tr>
              </IconContext.Provider>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HorizonTable;
