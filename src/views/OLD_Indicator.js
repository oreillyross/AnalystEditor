import { useFormik } from "formik";
import styled from "styled-components";
import {
  TextField,
  InputLabel,
  Input,
  Button,
  FormLabel,
  Paper
} from "@material-ui/core";
import "../style.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { ADD_INDICATOR } from "../queries";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400
    }
  }
}));

const Indicator = ({ indicator }) => {
  const classes = useStyles();

  const [addIndicator, { data, error }] = useMutation(ADD_INDICATOR, {
    onCompleted: () => {
      showDialog();
    }
  });
  if (error) console.log(error);
  if (data) console.log(data);

  const formik = useFormik({
    initialValues: {
      indicatorName: "",
      indicatorDescription: ""
    },
    onSubmit: values => {
      addIndicator({
        variables: {
          name: values.indicatorName,
          description: values.indicatorDescription
        }
      }).then(result => console.log(result));
    }
  });
  return (
    <Paper>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <FormLabel className="form-label"> Indicator Form</FormLabel>
        <div>
          <TextField
            id="indicatorName"
            className={classes.textField}
            margin="dense"
            name="indicatorName"
            variant="outlined"
            required
            label="Name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.indicatorName}
          />
        </div>
        <div>
          <TextField
            id="indicatorDescription"
            name="indicatorDescription"
            multiline
            rows={4}
            margin="dense"
            label="Description"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.indicatorDescription}
          />
        </div>
        <div style={{ paddingRight: ".8rem", textAlign: "right" }}>
          <Button color="secondary  ">Cancel</Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Indicator;
