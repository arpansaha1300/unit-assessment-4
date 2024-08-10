/* eslint-disable react/prop-types */
import { IconButton, Menu } from "@mui/material";
import RMenuItem from "@mui/material/MenuItem";
import { createContext, useContext, useMemo, useState } from "react";

const MenuContext = createContext(null);

function useMenuContext() {
  return useContext(MenuContext);
}

export function MenuWrapper({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const value = useMemo(
    () => ({
      anchorEl,
      setAnchorEl,
      openState: Boolean(anchorEl),
    }),
    [anchorEl]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function MenuButton({ children }) {
  const { setAnchorEl, openState } = useMenuContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <IconButton
      color="inherit"
      id="basic-button"
      edge="start"
      aria-controls={openState ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={openState ? "true" : undefined}
      onClick={handleClick}
      sx={{
        ":hover": { backgroundColor: "rgba(255, 255, 255, 0.274)" },
      }}
    >
      {children}
    </IconButton>
  );
}

export function MenuItems({ children }) {
  const { anchorEl, openState, setAnchorEl } = useMenuContext();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={openState}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{
        marginTop: "0.5rem",
      }}
    >
      {children}
    </Menu>
  );
}

export function MenuItem({ onClick, children }) {
  const { setAnchorEl } = useMenuContext();

  function handleClick() {
    if (onClick) onClick();
    setAnchorEl(null);
  }
  return (
    <RMenuItem sx={{ height: "3rem" }} onClick={handleClick}>
      {children}
    </RMenuItem>
  );
}
