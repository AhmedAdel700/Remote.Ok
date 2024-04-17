import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import axios from "axios";
import { Box, Stack } from "@mui/material";

import { jobs, regions, benefits } from "../data/Data";

const useStyles = makeStyles(() => ({
  formControl: {
    margin: "8px",
    width: 300,
  },
}));

const ITEM_HEIGHT = 60; // Set the desired item height in pixels
const ITEM_PADDING_TOP = 8;

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const selectStyles = { color: "red", fontWeight: "600" };

export default function SingleSelect() {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data;
        const formattedCountries = countryData
          .map((country) => ({
            value: country.name.common,
            label: country.name.common,
          }))
          .sort((a, b) => (a.label < b.label ? -1 : 1));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Stack
      direction="row"
      spacing={1.2}
      sx={{ backgroundColor: "#b0bec5", padding: "10px", width: "100vw" }}
    >
      <Box sx={{ bgcolor: "white"}}>
        <FormControl
          variant="filled"
          className={classes.formControl}
          color="error"
        >
          <InputLabel id="demo-single-country-label" sx={selectStyles}>
            Search
          </InputLabel>
          <Select
            labelId="demo-single-country-label"
            id="demo-single-country"
            value={selectedValue}
            onChange={handleChange}
            MenuProps={menuProps}
          >
            {jobs.map((job) => (
              <MenuItem key={job} value={job}>
                {job}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ bgcolor: "white" }}>
        <FormControl
          className={classes.formControl}
          variant="filled"
          color="error"
        >
          <InputLabel id="demo-single-country-label" sx={selectStyles}>
            Location
          </InputLabel>
          <Select
            labelId="demo-single-country-label"
            id="demo-single-country"
            value={selectedValue}
            onChange={handleChange}
            // input={<OutlinedInput label="Location" />}
            MenuProps={menuProps}
          >
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}

            {/*Separator*/}
            <MenuItem key="separator" value="" disabled>
              -------
            </MenuItem>

            {countries.map((country) => (
              <MenuItem
                key={country.value}
                value={country.value}
                style={{ height: 40 }}
              >
                {country.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ bgcolor: "white" }}>
        <FormControl
          variant="filled"
          className={classes.formControl}
          color="error"
        >
          <InputLabel id="demo-single-country-label" sx={selectStyles}>
            Benefits
          </InputLabel>
          <Select
            labelId="demo-single-country-label"
            id="demo-single-country"
            value={selectedValue}
            onChange={handleChange}
            MenuProps={menuProps}
          >
            {benefits.map((benefit) => (
              <MenuItem key={benefit} value={benefit}>
                {benefit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
