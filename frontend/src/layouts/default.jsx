import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeTab } from "../redux/tabSlice";
import { Tab, Tabs, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./default.module.css";
import { removeEditSupplierSession } from "../redux/editSupplierSlice";
import { removeEditPackageSession } from "../redux/editPackageSlice";
import Navbar from "../components/Navbar";
import { clearAddSupplierSession } from "../redux/addSupplierSessionSlice";
import { clearAddPackageSession } from "../redux/addPackageSessionSlice";

const drawerWidth = 240;

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
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userRole = useSelector((state) => state.auth.role);
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar drawerOpen={open} handleDrawerOpen={handleDrawerOpen} />

      {userRole === "ADMIN" && (
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
      )}

      <Container open={userRole === "ADMIN" ? open : true}>
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
  const navigate = useNavigate();

  const drawerTabs = [
    {
      name: "Suppliers",
      icon: <LocalShippingIcon />,
      onClick: () => {
        navigate("/suppliers-list");
      },
    },
    {
      name: "Packages",
      icon: <InventoryIcon />,
      onClick: () => {
        navigate("/package-list");
      },
    },
    {
      name: "Estimation",
      icon: <ShoppingCartIcon />,
      onClick: () => {
        navigate("/estimation");
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
    } else if (tab.type === "add-supplier") {
      dispatch(clearAddSupplierSession());
    } else if (tab.type === "add-package") {
      dispatch(clearAddPackageSession());
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
