import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { jobSectionData } from "../data/Data";

const JobSection = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const applyBtnStyle = {
    color: "white",
    backgroundColor: "red",
    fontWeight: "bold",
  };

  const detailsSyle = {
    borderRadius: "50px",
    bgcolor: "red",
    color: "white",
    padding: "10px 15px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        marginTop: "2rem",
      }}
    >
      {jobSectionData.map((job) => (
        <Paper
          key={job.id}
          sx={{
            width: isSmallScreen ? "90%" : "85%",
            padding: "20px",
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "auto",
            bgcolor: "#e0e0e0",
            userSelect: "none",
            marginBottom: "1rem",
          }}
          elevation={3}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={job.companyLogo}
              alt="Company Logo"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                marginRight: isSmallScreen && "1rem",
              }}
            />

            <Box sx={{ marginLeft: isSmallScreen ? 0 : 2 }}>
              <Typography variant="h6">
                {job.jobTitle}
                <Box component={"div"} sx={{ color: "red", fontSize: "1rem" }}>
                  Salary: {job.salary}$ / Year
                </Box>
              </Typography>
            </Box>
          </Box>

          <Stack direction={"row"} gap={2} sx={{ marginTop: "1rem" }}>
            <Box sx={detailsSyle}>{job.partOrFullTime}</Box>
            <Box sx={detailsSyle}>{job.benefits}</Box>
            <Box sx={detailsSyle}>{job.region}</Box>
          </Stack>

          <Stack
            direction={isSmallScreen ? "column" : "row"}
            gap={isSmallScreen ? 2 : 3}
            alignItems={"center"}
            sx={{ marginTop: isSmallScreen ? "1rem" : 0 }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
              {job.dateOfThePost}
            </Typography>
            <Button sx={applyBtnStyle} variant="contained">
              Apply
            </Button>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default JobSection;
