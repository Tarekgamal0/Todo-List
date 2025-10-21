import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const btnStyle = { fontSize: "20px" };

export default function CustomNavTabs() {
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setTabValue(0);
    else if (location.pathname === "/Completed") setTabValue(1);
    else if (location.pathname === "/all") setTabValue(2);
  }, [location]);

  return (
    <Box sx={{ width: "*0%", bgcolor: "background.paper", paddingBottom: "5px" }}>
      <Tabs value={tabValue} centered textColor="secondary" indicatorColor="secondary">
        <Tab label="غير منجز" component={Link} to="/" sx={btnStyle} />
        <Tab label="منجز" component={Link} to="/Completed" sx={btnStyle} />
        <Tab label="الكل" component={Link} to="/all" sx={btnStyle} />
      </Tabs>
    </Box>
  );
}
