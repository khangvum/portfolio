import { useState, useEffect, type MouseEvent } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import { useLanguage } from "@app/i18n/useLanguage";
import { getLocalePath, supportedLocales, type Locale } from "@app/i18n/config";

import "./Navbar.css";
import coatOfArms from "@app/assets/coat-of-arms.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState<HTMLElement | null>(
    null,
  );
  const theme = useTheme();
  const { locale, translations, setLocale } = useLanguage();

  const navItems = [
    { label: translations.nav.about, id: "about" },
    { label: translations.nav.experience, id: "experience" },
    { label: translations.nav.projects, id: "projects" },
    { label: translations.nav.contact, id: "contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageOpen = (event: MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => setLanguageAnchor(null);

  const selectLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
    handleLanguageClose();
    setMobileOpen(false);
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
      sx={{ backgroundColor: "primary.main" }}
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
              href={getLocalePath(locale)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
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
                alt={translations.hero.imageAlt}
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
            <Typography
              component="span"
              aria-hidden="true"
              sx={{ mx: 1, opacity: 0.55 }}
            >
              |
            </Typography>
            <Button
              color="inherit"
              className="nav-link nav-language"
              onClick={handleLanguageOpen}
              aria-label={`${translations.nav.language}: ${locale.toUpperCase()}`}
              aria-haspopup="menu"
              aria-expanded={Boolean(languageAnchor)}
              sx={{ minWidth: 0, px: 2, opacity: 0.75 }}
            >
              {locale.toUpperCase()}
            </Button>
            <Menu
              anchorEl={languageAnchor}
              open={Boolean(languageAnchor)}
              onClose={handleLanguageClose}
              slotProps={{
                paper: {
                  sx: {
                    minWidth: 56,
                    border: "2px solid #B87F0D",
                    py: 0.5,
                  },
                },
              }}
            >
              {supportedLocales.map((supportedLocale) => (
                <MenuItem
                  key={supportedLocale}
                  selected={supportedLocale === locale}
                  onClick={() => selectLanguage(supportedLocale)}
                  sx={{
                    minHeight: 32,
                    justifyContent: "center",
                    px: 1.5,
                    fontSize: "0.85rem",
                  }}
                >
                  {supportedLocale.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <IconButton
            color="inherit"
            aria-label={translations.nav.openMenu}
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
                    slotProps={{
                      primary: {
                        className: "nav-link",
                        sx: {
                          textAlign: "center",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem
              disablePadding
              className="mobile-language-switcher"
              aria-label={translations.nav.language}
            >
              {supportedLocales.map((supportedLocale) => (
                <ListItemButton
                  key={supportedLocale}
                  selected={supportedLocale === locale}
                  className={
                    supportedLocale === locale
                      ? "mobile-language-selected"
                      : undefined
                  }
                  onClick={() => selectLanguage(supportedLocale)}
                  sx={{ minWidth: 0, px: 1.25, py: 0.75 }}
                >
                  <ListItemText
                    primary={
                      <span
                        style={{
                          color:
                            supportedLocale === locale
                              ? "var(--secondary-main)"
                              : "var(--nav-text)",
                        }}
                      >
                        {supportedLocale.toUpperCase()}
                      </span>
                    }
                    slotProps={{
                      primary: {
                        className: `nav-link${
                          supportedLocale === locale
                            ? " mobile-language-current"
                            : ""
                        }`,
                        sx: {
                          textAlign: "center",
                          fontSize: "0.9rem",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              ))}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
