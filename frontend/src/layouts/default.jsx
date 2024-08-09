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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { createOrUpdateTab, removeTab } from "../redux/tabSlice";
import { Avatar, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./default.module.css";
import { removeEditSupplierSession } from "../redux/editSupplierSlice";
import { removeEditPackageSession } from "../redux/editPackageSlice";
import { deepOrange } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";
import {
  MenuButton,
  MenuItems,
  MenuItem,
  MenuWrapper,
} from "../components/Menu";
import Edit from "@mui/icons-material/Edit";
import { setAuthenticated, setEmail, setId, setRole } from "../redux/authSlice";
import axios from "axios";

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
  const userRole = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.id);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const directToAddSupplier = () => {
    const path = "/add-supplier";
    dispatch(createOrUpdateTab(path));
    navigate(path);
  };
  // const openEditSupplierTab = async () => {
  //   const path = `/suppliers-list/${userId}/edit`;
  //   const response = await axios.get(
  //     `http://localhost:8080/api/suppliers/${userId}`
  //   );

  //   dispatch(
  //     createOrUpdateTab({
  //       path: path,
  //       data: response.data,
  //     })
  //   );
  //   navigate(path);
  // };
  const directToAddPackage = () => {
    const path = "/add-package";
    dispatch(createOrUpdateTab(path));
    navigate(path);
  };
  const handleLogout = () => {
    dispatch(setEmail(""));
    dispatch(setRole(""));
    dispatch(setId(""));
    dispatch(setAuthenticated(false));
    navigate("/");
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
            <MenuWrapper>
              <MenuButton>
                {userRole === "ADMIN" ? (
                  <AddIcon />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    A
                  </Avatar>
                )}
              </MenuButton>

              {userRole === "ADMIN" ? (
                <MenuItems>
                  <MenuItem
                    onClick={() => {
                      directToAddSupplier();
                    }}
                  >
                    <LocalShippingIcon
                      sx={{ marginRight: "1rem", color: "grey" }}
                    />
                    Add Supplier
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      directToAddPackage();
                    }}
                  >
                    <InventoryIcon
                      sx={{ marginRight: "1rem", color: "grey" }}
                    />
                    Add Package
                  </MenuItem>
                </MenuItems>
              ) : (
                <MenuItems>
                  <Link to={`/suppliers-list/${userId}/edit`}  style={{ textDecoration: 'none',color:'black' }}>
                    <MenuItem>
                      <Edit sx={{ marginRight: "1rem", color: "grey" }} />
                      Edit Profile
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{color:'black'}}>
                    <Logout sx={{ marginRight: "1rem", color: "grey" }} />
                    Logout
                  </MenuItem>
                </MenuItems>
              )}
            </MenuWrapper>
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

    if (tab.type === "edit-supplier") {
      dispatch(removeEditSupplierSession({ id: tab.data.id }));
    } else if (tab.type === "edit-package") {
      dispatch(removeEditPackageSession({ id: tab.data.id }));
    }
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
                    role="button"
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
