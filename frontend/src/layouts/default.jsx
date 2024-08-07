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
import { createOrUpdateTab } from "../redux/tabSlice";
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

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

function getRouteName(path, label) {
  switch (path) {
    case "/package-list": {
      return "Packages"
    }
    case "/suppliers-list": {
      return "Suppliers"
    }
    default: {
      if (path.startsWith("/suppliers-list") && path.endsWith("/edit")) {
        if (!label) return "Edit Supplier"
        return label + "| Edit Supplier"
      }
    }
  }
}

export default function Layout() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(
      createOrUpdateTab({
        name: getRouteName(location.pathname),
        path: location.pathname,
      })
    );
  }, [dispatch, location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
            sx={{ mr: 2, ...(open && { display: "none" }), ":hover": {backgroundColor: "rgba(255, 255, 255, 0.274)"} }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Inventory Management
          </Typography>
          <Box sx={{position: "absolute", right: "0"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }), ":hover": {backgroundColor: "rgba(255, 255, 255, 0.274)"} }}
          >
            <AddIcon />
          </IconButton>
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
        dispatch(
          createOrUpdateTab({ name: "Suppliers", path: "/suppliers-list" })
        );
        navigate("/suppliers-list");
      },
    },
    {
      name: "Packages",
      icon: <InventoryIcon />,
      onClick: () => {
        dispatch(
          createOrUpdateTab({ name: "Packages", path: "/package-list" })
        );
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
  const [value, setValue] = useState(null);
  const tabsMap = useSelector((state) => state.tabs.map);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  useEffect(() => {
    setTabs(Object.values(tabsMap));
  }, [tabsMap]);

  const handleChange = (event, newValue) => {
    navigate(newValue);
    setValue(newValue);
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
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.name} value={tab.path} />
        ))}
      </Tabs>
    </Box>
  ) : null;
}
