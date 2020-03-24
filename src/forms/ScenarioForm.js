import React from "react";

function ScenarioForm() {
  return (
    <div>
      Scenario Form
      <Button
        style={{ margin: "0 2rem" }}
        onClick={() => {
          navigate("/forms/newsource");
        }}
        basic
        color="blue"
      >
        Add a Source
      </Button>
    </div>
  );
}
