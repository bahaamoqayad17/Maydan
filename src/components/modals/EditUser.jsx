import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { fetchCategories } from "@/store/CategorySlice";
import { updateUser } from "@/store/UserSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const EditUser = (props) => {
  const [item, setItem] = useState(props.item);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(item));
  };

  useEffect(() => {
    dispatch(fetchCategories({ page: -1 }));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>User</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          value={item.name}
          sx={{ mb: 2 }}
          fullWidth
        />

        <TextField
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
          value={item.email}
          sx={{ mb: 2 }}
          fullWidth
        />

        <TextField
          label="Mobile Number"
          variant="outlined"
          name="mobile_number"
          onChange={handleChange}
          value={item.mobile_number}
          sx={{ mb: 2 }}
          fullWidth
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item.role}
            label="Role"
            name="role"
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">Student</MenuItem>
            <MenuItem value="company">Company</MenuItem>
          </Select>
        </FormControl>

        {item?.role === "company" && (
          <>
            <Box display={"flex"}>
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                onChange={handleChange}
                value={item.address}
                sx={{ mb: 2 }}
                fullWidth
              />

              <TextField
                label="Work Time"
                variant="outlined"
                name="work_time"
                onChange={handleChange}
                value={item.work_time}
                sx={{ mb: 2 }}
                fullWidth
              />

              <TextField
                label="Work Hours"
                variant="outlined"
                name="work_hours"
                type="number"
                onChange={handleChange}
                value={item.work_hours}
                sx={{ mb: 2 }}
                fullWidth
              />
            </Box>

            <TextField
              label="Description"
              variant="outlined"
              name="description"
              multiline
              rows={4}
              onChange={handleChange}
              value={item.description}
              sx={{ mb: 2 }}
              fullWidth
            />

            <TextField
              label="Facebook"
              variant="outlined"
              name="facebook"
              onChange={handleChange}
              value={item.facebook}
              sx={{ mb: 2 }}
              fullWidth
            />

            <TextField
              label="Instagram"
              variant="outlined"
              name="insta"
              onChange={handleChange}
              value={item.insta}
              sx={{ mb: 2 }}
              fullWidth
            />

            <TextField
              label="Twitter"
              variant="outlined"
              name="twitter"
              onChange={handleChange}
              value={item.twitter}
              sx={{ mb: 2 }}
              fullWidth
            />
          </>
        )}

        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
