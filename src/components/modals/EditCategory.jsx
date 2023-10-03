import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory } from "@/store/CategorySlice";

const EditCategory = (props) => {
  const [item, setItem] = useState(props.item || { name: { ar: "", en: "" } });

  const handleChange = (e) => {
    setItem({
      ...item,
      name: { ...item.name, [e.target.name]: e.target.value },
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item._id) {
      dispatch(updateCategory(item));
    } else {
      dispatch(addCategory(item));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Category</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name Arabic"
          variant="outlined"
          name="ar"
          onChange={handleChange}
          value={item.name.ar}
          sx={{ mb: 2 }}
          fullWidth
        />

        <TextField
          label="Name English"
          variant="outlined"
          name="en"
          onChange={handleChange}
          value={item.name.en}
          sx={{ mb: 2 }}
          fullWidth
        />

        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditCategory;
