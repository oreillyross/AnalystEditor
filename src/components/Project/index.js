import React from "react";
import ProjectForm from "./Form";
import { useQuery } from "@apollo/react-hooks";
import { GET_PROJECT } from "../../queries";

function Project({ userId }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { user_id: userId }
  });

  if (data) {
    console.log(data.Projects[0]);
    return (
      <div>
        This is the project screen where you can edit the title of your project
        assign an admin and attach users who can contribute to the project also
        there needs to be a description field and then a section where you can
        switch on or off the automated scraping for sources with a keyword and
        also set the time that these should happen. i.e every 15minutes, 1 hour,
        3 hour, 6 hours, once a day.
        <ProjectForm projectId={data.Projects[0]} />
      </div>
    );
  }
  return null;
}

export default Project;
