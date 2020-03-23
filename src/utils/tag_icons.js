import React from "react";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PersonIcon from "@material-ui/icons/Person";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HealingIcon from "@material-ui/icons/Healing";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";

function getIcon(type) {
  switch (type) {
    case "person":
      return <PersonIcon />;
    case "place":
      return <LocationCityIcon />;
    case "activity":
      return <PersonPinCircleIcon />;
    case "group":
      return <PeopleAltIcon />;
    case "hazard":
      return <HealingIcon />;
    case "organisation":
      return <HomeWorkIcon />;
    default:
      return <TurnedInNotIcon />;
  }
}

export default getIcon;
