import React from "react";
import SourceForm from "../forms/SourceForm";
import SourceTable from "../tables/SourceTable";
import SearchBar from "../components/SearchBar";
import KeywordTable from "../tables/KeywordTable";

export function Admin() {
  return (
    <div>
      <div>Admin</div>
      <KeywordTable />
      <SearchBar />
      <div>
        <SourceTable />
      </div>
      <SourceForm />
      
    </div>
  );
}
