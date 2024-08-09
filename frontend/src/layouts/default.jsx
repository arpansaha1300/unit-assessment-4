import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createOrUpdateTab, removeTab } from "../redux/tabSlice";
import { Menu, MenuItem, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./default.module.css";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Container = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: "relative",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const openState = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const directToAdd = () => {
    const path = "/add-supplier";
    dispatch(createOrUpdateTab(path));
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
              ":hover": { backgroundColor: "rgba(255, 255, 255, 0.274)" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Inventory Management
          </Typography>
          <Box sx={{ position: "absolute", right: "0" }}>
            <IconButton
              color="inherit"
              id="basic-button"
              edge="start"
              aria-controls={openState ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openState ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                mr: 2,
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.274)" },
              }}
            >
              <AddIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openState}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  marginTop: "0.9rem"
                }}
              >
                <MenuItem onClick={() => {
                  directToAdd();
                  handleClose();
                  }}
                  sx={{height: "3rem"}}
                  >
                    <LocalShippingIcon sx={{marginRight: "1rem", color: "grey"}}/>
                    Add Supplier
                </MenuItem>
                <MenuItem onClick={() => {
                  directToAdd();
                  handleClose();
                  }}
                  sx={{height: "3rem"}}
                  >
                    <InventoryIcon sx={{marginRight: "1rem", color: "grey"}}/>
                    Add Package
                </MenuItem>
              </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerTabs />
      </Drawer>

      <Container open={open}>
        <DrawerHeader />
        <Box sx={{ marginBottom: "1rem" }}>
          <TabList />
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
}

function DrawerTabs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const drawerTabs = [
    {
      name: "Suppliers",
      icon: <LocalShippingIcon />,
      onClick: () => {
        dispatch(createOrUpdateTab("/suppliers-list"));
        navigate("/suppliers-list");
      },
    },
    {
      name: "Packages",
      icon: <InventoryIcon />,
      onClick: () => {
        dispatch(createOrUpdateTab("/package-list"));
        navigate("/package-list");
      },
    },
  ];

  return (
    <List>
      {drawerTabs.map((tab) => (
        <ListItem key={tab.name} disablePadding>
          <ListItemButton onClick={tab.onClick}>
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

function TabList() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const tabsMap = useSelector((state) => state.tabs.map);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  useEffect(() => {
    setTabs(Object.values(tabsMap));
  }, [tabsMap]);

  const handleChange = (_, newValue) => {
    navigate(newValue);
    setValue(newValue);
  };

  const closeTab = (e, tab, i) => {
    e.stopPropagation();

    if (value === tab.path) {
      if (i > 0) {
        navigate(tabs[i - 1].path);
      } else {
        navigate(tabs[i + 1].path);
      }
    }

    dispatch(removeTab(tab));
  };

  return tabs.length > 0 && value ? (
    <Box
      sx={{
        maxWidth: { xs: 320, sm: 480, md: 640, lg: 840 },
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, i) => (
          <Tab
            key={tab.path}
            value={tab.path}
            label={
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {tab.name}
                {tabs.length > 1 && (
                  <span
                    onClick={(e) => closeTab(e, tab, i)}
                    className={styles.tabButton}
                  >
                    <CloseIcon sx={{ width: "1.2rem", height: "1.2rem" }} />
                  </span>
                )}
              </span>
            }
          />
        ))}
      </Tabs>
    </Box>
  ) : null;
}
