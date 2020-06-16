import React from "react";
import ProjectForm from "./Form";

function Project({ userId }) {
  console.log(userId);
  return (
    <div>
      This is the project screen where you can edit the title of your project
      assign an admin and attach users who can contribute to the project also
      there needs to be a description field and then a section where you can
      switch on or off the automated scraping for sources with a keyword and
      also set the time that these should happen. i.e every 15minutes, 1 hour, 3
      hour, 6 hours, once a day.
      <ProjectForm userId={userId} />
    </div>
  );
}

export default Project;
