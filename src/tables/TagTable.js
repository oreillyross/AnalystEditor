import React from "react";
import { StyledTags } from "../styles/common";
import { Button, Icon } from "semantic-ui-react";
import { GET_TAGS, DELETE_TAG } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const assert = require("assert");

function TagTable({ tags = [] }) {
  const [queryDeleteTag] = useMutation(DELETE_TAG);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteIt, setDeleteIt] = React.useState(false);

  function deleteTag(id, e) {
    assert(id);
    setDeleting(true);
    if (deleteIt) {
      queryDeleteTag({
        variables: { id },
        update(cache, { data }) {
          console.log(data);
          const getExistingTags = cache.readQuery({ query: GET_TAGS });
          const existingTags = getExistingTags ? getExistingTags.Tags : [];
          const deletedTag = data.delete_Tags
            ? data.delete_Tags.returning[0]
            : {};
          cache.writeQuery({
            query: GET_TAGS,
            data: { Tags: existingTags.filter(tag => tag.id !== deletedTag.id) }
          });
        }
      });
    }
  }

  function handleDeleteAction(goDeleteIt) {
    setDeleteIt(goDeleteIt);
  }
  return (
    <StyledTags>
      <Dialog
        open={deleting}
        onClose={() => handleDeleteAction(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteAction(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleDeleteAction(true)}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {tags.map(tag => (
        <React.Fragment key={tag.id}>
          <Button
            type="button"
            style={{ margin: ".3rem", height: "40px", borderRadius: "20px" }}
            basic
            color="blue"
          >
            {tag.name}

            <Icon
              onClick={() => deleteTag(tag.id)}
              corner="top right"
              size="small"
              name="delete"
            />
          </Button>
        </React.Fragment>
      ))}
    </StyledTags>
  );
}

export default TagTable;
