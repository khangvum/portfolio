import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      className="navbar-root"
    >
      <Box sx={{ width: "100%", px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters>
          <Typography variant="h6" className="nav-brand" sx={{ flexGrow: 1 }}>
            Khang Vu
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Button 
                key={item.id} 
                color="inherit" 
                className="nav-link"
                component="a"
                href={`#${item.id}`}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            aria-label="Open Drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "primary.main",
              color: "white",
              width: 150,
              borderLeft: "3px solid #D4AF37",
            },
          },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  onClick={handleDrawerToggle} 
                  sx={{ py: 1.5 }}
                  component="a"
                  href={`#${item.id}`}
                >
                  <ListItemText
                    primary={item.label}
                    primaryytypographyprops={{
                      className: "nav-link",
                      textAlign: "center",
                      variant: "body1",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;