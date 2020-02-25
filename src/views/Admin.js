import React from "react";
import SourceForm from "../forms/SourceForm";
import SourceTable from "../tables/SourceTable";

export function Admin() {
  return (
    <div>
      <div>Admin</div>
      <div>
        <SourceTable />
      </div>
      <SourceForm />
    </div>
  );
}
