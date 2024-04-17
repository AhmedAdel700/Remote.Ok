import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { EmploymentType, tags, keywords, locations } from "../../data/Data";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const HirePage = () => {
  const [details, setDetails] = useState({
    employmentType: "",
    primaryTag: "",
    keywords: "",
    company: "",
    position: "",
  });
  const [open, setOpen] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event, field) => {
    setDetails({
      ...details,
      [field]: event.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clearForm = () => {
    setDetails({
      employmentType: "",
      primaryTag: "",
      keywords: "",
      company: "",
      position: "",
    });
  };

  const handlePhoto = (event) => {
    setSelectedPhoto(event.target.files[0]); // Update selected photo state
  };

  const onSubmit = (data) => {
    if (data.companyName && data.position) {
      console.log("Form Data:", data);
      console.log("Selected Photo:", selectedPhoto); // Log selected photo to console
      handleClick();
      clearForm();
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ display: "flex", margin: "10px 0 0 0" }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            "& > :not(style)": { m: 1, width: "fitContent" },
            display: "flex",
            flexDirection: "column",
            width: "98%",
            margin: "auto",
            gap: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="companyName"
            label="Company Name"
            placeholder="Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc."
            variant="filled"
            sx={{ flex: 1 }}
            error={errors.companyName}
            helperText={
              errors.companyName
                ? "This Field Can't Be Empty Or Less Than 3 Characters"
                : null
            }
            {...register("companyName", { required: true, minLength: 3 })}
            value={details.company}
            onChange={(e) => handleChange(e, "company")}
          />
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Your company's brand/trade name: without Inc., Ltd., B.V., Pte.,
            etc.
          </Typography>

          <TextField
            id="position"
            label="Position"
            placeholder='Please specify as single job position like "Marketing Manager" Also DO NOT WRITE IN FULL CAPS.'
            variant="filled"
            sx={{ flex: 1 }}
            error={errors.position}
            helperText={
              errors.position
                ? "This Field Can't Be Empty Or Less Than 3 Characters"
                : null
            }
            {...register("position", { required: true, minLength: 3 })}
            value={details.position}
            onChange={(e) => handleChange(e, "position")}
          />
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Please specify as single job position like "Marketing Manager" or
            "Node JS Developer", not a sentence like "Looking for PM / Biz Dev /
            Manager". We know your job is important but please DO NOT WRITE IN
            FULL CAPS. If posting multiple details, please create multiple job
            posts. A job post is limited to a single job. We only allow real
            jobs, absolutely no MLM-type courses "learn how to work online"
            please.
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="employment-type-label">Employment Type</InputLabel>
            <Select
              labelId="employment-type-label"
              value={details.employmentType}
              onChange={(e) => handleChange(e, "employmentType")}
              variant="filled"
            >
              {EmploymentType.map((type) => (
                <MenuItem key={type.id} value={type.value}>
                  {type.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="primary-tag-label">Primary Tag</InputLabel>
            <Select
              labelId="primary-tag-label"
              value={details.primaryTag}
              onChange={(e) => handleChange(e, "primaryTag")}
              variant="filled"
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="keywords-label">Tags Keywords Or Stack</InputLabel>
            <Select
              labelId="keywords-label"
              value={details.keywords}
              onChange={(e) => handleChange(e, "keywords")}
              variant="filled"
            >
              {keywords.map((keyword) => (
                <MenuItem key={keyword.id} value={keyword.value}>
                  {keyword.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Short tags are preferred. Use tags like industry and tech stack. The
            first 3 or 4 tags are shown on the site, the other tags aren't but
            the job will be shown on each tag specific page (like
            /remote-react-jobs). We also sometimes generate tags automatically
            after you post/edit to supplement.
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="location-label">
              Job Is Restricted To Locations
            </InputLabel>
            <Select
              labelId="location-label"
              value={details.location}
              onChange={(e) => handleChange(e, "loaction")}
              variant="filled"
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.value}>
                  {location.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            If you'd only like to hire people from a specific location or
            timezone this remote job is restricted to (e.g. Europe, United
            States or Japan). If not restricted, please leave it as "Worldwide".
            The less restricted this is, the more applicants you will get.
            Keeping it "Worldwide" is highly recommended as you'll have access
            to a worldwide pool of talent. To promote fairness in remote work
            positions, worldwide jobs are ranked higher.
          </Typography>

          {/*Uploading Your Pic */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={handlePhoto}
            sx={{width:"240px"}}
          >
            Upload Company Logo
            <VisuallyHiddenInput type="file" />
          </Button>
          <Typography
            variant="body2"
            sx={{ color: "#9e9e9e"}}
          >
            COMPANY LOGO (.JPG OR .PNG, SQUARE OR ROUND)
          </Typography>

          <Box>
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ float: "right" }}
            >
              Post A New Job
            </Button>

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="info"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Job Posted Successfully
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default HirePage;
