/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Divider, IconButton, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { deepOrange } from "@mui/material/colors";
import {
  MenuButton,
  MenuItems,
  MenuItem,
  MenuWrapper,
} from "../components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth } from "../redux/authSlice";
import { createOrUpdateTab } from "../redux/tabSlice";

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

export default function Navbar({ drawerOpen, handleDrawerOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.id);
  const userRole = useSelector((state) => state.auth.role);

  const directToAddSupplier = () => {
    const path = "/add-supplier";
    dispatch(createOrUpdateTab(path));
    navigate(path);
  };
  const directToAddPackage = () => {
    const path = "/add-package";
    dispatch(createOrUpdateTab(path));
    navigate(path);
  };
  const handleLogout = () => {
    new Promise((res) => {
      dispatch(resetAuth(false));
      res();
    }).then(() => {
      navigate(0);
    });
  };

  return (
    <AppBar position="fixed" open={userRole === "ADMIN" && drawerOpen}>
      <Toolbar>
        {userRole === "ADMIN" && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              mr: 2,
              ...(drawerOpen && { display: "none" }),
              ":hover": { backgroundColor: "rgba(255, 255, 255, 0.274)" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          Inventory Management
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginLeft: "auto",
          }}
        >
          {userRole === "ADMIN" && (
            <MenuWrapper>
              <MenuButton>
                <AddIcon />
              </MenuButton>
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
                  <InventoryIcon sx={{ marginRight: "1rem", color: "grey" }} />
                  Add Package
                </MenuItem>
              </MenuItems>
            </MenuWrapper>
          )}

          <MenuWrapper>
            <MenuButton>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: "30px",
                  height: "30px",
                }}
              >
                A
              </Avatar>
            </MenuButton>
            <MenuItems>
              {userRole === "SUPPLIER" && (
                <Link
                  to={`/suppliers-list/${userId}/edit`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>
                    <Edit sx={{ marginRight: "1rem", color: "grey" }} />
                    Edit Profile
                  </MenuItem>
                </Link>
              )}
              {userRole === "SUPPLIER" && <Divider />}
              <MenuItem onClick={handleLogout} sx={{ color: "black" }}>
                <Logout sx={{ marginRight: "1rem", color: "grey" }} />
                Logout
              </MenuItem>
            </MenuItems>
          </MenuWrapper>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
