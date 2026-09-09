import { useState, useEffect, type CSSProperties } from "react";
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
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import "./Navbar.css";
import coatOfArms from "../assets/coat-of-arms.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const theme = useTheme();

  const styleVars = {
    "--primary-main": theme.palette.primary.main,
    "--secondary-main": theme.palette.secondary.main,
    "--nav-text":
      theme.palette.primary.main === "#f2efde"
        ? theme.palette.primary.dark
        : "#ffffff",
    backgroundColor: "var(--primary-main)",
  } as CSSProperties;

  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Target the Hero section
    const heroSection =
      document.querySelector("#hero") ||
      document.querySelector("section") ||
      document.body.firstElementChild;

    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show logo when Hero section is no longer intersecting near the top of the screen
        setShowLogo(!entry.isIntersecting);
      },
      {
        threshold: 0.2, // Triggers when 80% of Hero has scrolled off-screen
      },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      className="navbar-root"
      style={styleVars}
    >
      <Box sx={{ width: "100%", px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters>
          {/* Brand & Scroll-Aware Logo Container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1, // Takes up remaining space in Toolbar
            }}
          >
            {/* Clickable Brand Link - Only wraps logo and text */}
            <Box
              component="a"
              href="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                userSelect: "none",
                textDecoration: "none",
                color: "inherit",
                width: "fit-content", // Restricts clickable area strictly to content
              }}
            >
              <Box
                component="img"
                src={coatOfArms}
                alt="Coat of Arms"
                className={`nav-logo${showLogo ? " visible" : ""}`}
              />
              <Typography variant="h6" className="nav-brand">
                Khang Vu
              </Typography>
            </Box>
          </Box>

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
              color:
                theme.palette.primary.main === "#f2efde"
                  ? "primary.dark"
                  : "#ffffff",
              width: 150,
              borderLeft: "3px solid #B87F0D",
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
                    sx={{
                      "& .MuiTypography-root": {
                        className: "nav-link",
                        textAlign: "center",
                        variant: "body1",
                      },
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
