import React from "react";
import * as styles from "./HorizonTable.module.css";

function HorizonTable(props) {
  const data = React.useMemo(() => [{}, {}, {}]);
  const columns = React.useMemo(() => [{}, {}, {}]);
  return <div className={styles.form_body}>Table goes here</div>;
}

export default HorizonTable;
