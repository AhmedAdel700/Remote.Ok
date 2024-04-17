import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import { Box, Stack, Typography } from "@mui/material";

import axios from "axios";

import { jobs, regions, benefits } from "../data/Data";

const useStyles = makeStyles(() => ({
  formControl: {
    margin: "8px",
    width: 300,
  },
}));

const ITEM_HEIGHT = 60;
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

const SelectField = ({ label, options, selectedValue, handleChange }) => (
  <Box sx={{ bgcolor: "white", width: "300px", height: "59px" }}>
    <FormControl
      variant="filled"
      className={useStyles().formControl}
      color="error"
    >
      <InputLabel id={`demo-single-country-label-${label}`} sx={selectStyles}>
        {label}
      </InputLabel>
      <Select
        labelId={`demo-single-country-label-${label}`}
        id={`demo-single-country-${label}`}
        value={selectedValue}
        onChange={(event) => handleChange(event, label)}
        MenuProps={menuProps}
        sx={{ width: "300px", height: "59px" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default function SingleSelect() {
  const [countries, setCountries] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    Search: "",
    Location: "",
    Benefits: "",
  });

  const [showSalaryRange, setShowSalaryRange] = useState(false);
  const salaryRangeRef = useRef(null); // Ref to hold the salary range element

  const handleClickOutside = (event) => {
    if (showSalaryRange && !salaryRangeRef.current.contains(event.target)) {
      setShowSalaryRange(false);
    }
  };

  useEffect(() => {
    // Add event listener on mount, remove on unmount
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSalaryRange]); // Re-run effect when showSalaryRange changes

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

  const handleChange = (event, field) => {
    setSelectedValues({
      ...selectedValues,
      [field]: event.target.value,
    });
  };

  function valueText(value) {
    return `${value}K`;
  }

  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1.2}
      spacing={1.2}
      sx={{
        backgroundColor: "#b0bec5",
        padding: "10px",
        maxWidth: "100vw",
        borderBottom: "3px solid red",
        borderTop: "3px solid red",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SelectField
        label="Search"
        options={jobs}
        selectedValue={selectedValues.Search}
        handleChange={handleChange}
      />
      <SelectField
        label="Location"
        options={regions}
        selectedValue={selectedValues.Location}
        handleChange={handleChange}
      />
      <SelectField
        label="Benefits"
        options={benefits}
        selectedValue={selectedValues.Benefits}
        handleChange={handleChange}
      />

      <Box ref={salaryRangeRef} sx={{ position: "relative" }}>
        <Box
          component={"button"}
          onClick={() => setShowSalaryRange(true)}
          sx={{
            width: "300px",
            height: "59px",
            border: "none",
            borderBottom: "3px solid gray",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              paddingLeft: "10px",
              color: "red",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
              transition: "0.35s",
            }}
          >
            Salary Range $
          </Typography>
        </Box>
        {showSalaryRange && (
          <Box
            sx={{
              width: 300,
              bgcolor: "white",
              padding: "0.25rem 1rem",
              position: "absolute",
              top: "59px",
              zIndex: "5",
            }}
          >
            <Typography variant="body2" color={"error"} fontWeight={"bold"}>
              Minimum Annual Salary $$
            </Typography>
            <Slider
              aria-label="Small steps"
              defaultValue={0}
              getAriaValueText={valueText}
              step={25}
              min={25}
              max={250}
              valueLabelDisplay="auto"
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
}
