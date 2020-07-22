import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SOURCE_SCRAPING } from "../queries";
import { Loading } from "../components/Loading";
import "./SourceAdminView.css";
import { useTable } from "react-table";

export default function SourceAdminView() {
  //TODO remove hardcoded project id
  const { loading, error, data: source_data } = useQuery(GET_SOURCE_SCRAPING, {
    variables: { projectId: "ec214cf2-ba69-4d70-9bb6-43c91ad2fda7" }
  });

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (source_data && source_data.Source_Scraping) {
      const rows = source_data.Source_Scraping.map(sc => ({
        col1: sc.Source.name,
        col2: sc.frequency,
        col3: sc.scraping ? "On" : "Off",
        col4: sc.Source_Scraping_Keywords.reduce(
          (acc, keyword) => acc + ", " + keyword.Keyword.name,
          ""
        )
      }));
      setData(rows);
    }
  }, [source_data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Source Name",
        accessor: "col1" // accessor is the "key" in the data
      },
      {
        Header: "Frequency",
        accessor: "col2"
      },
      {
        Header: "On/Off",
        accessor: "col3"
      },
      {
        Header: "Keywords",
        accessor: "col4"
      }
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  if (loading) return <Loading message="getting sources to be scraped..." />;
  if (error) return <div>Oops something went wrong...</div>;
  if (source_data) {
    return (
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return <div> Here goes the table view </div>;
}
