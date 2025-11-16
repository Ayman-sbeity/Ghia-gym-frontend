import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Badge,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useIsAdmin } from "../../hooks/useRole";
import { COLORS as THEME_COLORS } from "../../assets/themeColors";
import { alpha } from "@mui/material/styles";

// Types
interface NavLink {
  label: string;
  path: string;
}

// Constants
const NAVBAR_HEIGHT = { xs: "70px", sm: "80px" };

const NAV_COLORS = {
  background: THEME_COLORS.LOGO_GRADIENT,
  backgroundSolid: THEME_COLORS.LOGO_DEEP,
  text: THEME_COLORS.textPrimary || "#ffffff",
  textHover: THEME_COLORS.LOGO_MAGENTA,
  hoverBackground: alpha(THEME_COLORS.LOGO_MAGENTA, 0.12),
  border: alpha(THEME_COLORS.LOGO_MAGENTA, 0.28),
  cartBadge: THEME_COLORS.LOGO_MAGENTA,
  glow: alpha(THEME_COLORS.LOGO_MAGENTA, 0.44),
  purple: "#8b3a8b",
  magenta: THEME_COLORS.LOGO_MAGENTA,
};

interface LogoProps {
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      display: "flex",
      alignItems: "center",
      transition: "all 0.4s ease",
      position: "relative",
      "&:focus": {
        outline: "none",
      },
      "&:hover": {
        transform: "scale(1.08) rotate(2deg)",
        filter: `drop-shadow(0 0 12px ${alpha(
          THEME_COLORS.LOGO_MAGENTA,
          0.6
        )})`,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${alpha(
          THEME_COLORS.LOGO_MAGENTA,
          0.2
        )} 0%, transparent 70%)`,
        opacity: 0,
        transition: "opacity 0.4s ease",
        zIndex: -1,
      },
      "&:hover::before": {
        opacity: 1,
        animation: "pulse 2s ease-in-out infinite",
      },
      "@keyframes pulse": {
        "0%, 100%": {
          transform: "scale(1)",
          opacity: 0.7,
        },
        "50%": {
          transform: "scale(1.2)",
          opacity: 0.3,
        },
      },
    }}
    aria-label="Go to homepage"
  >
    <Box
      sx={{
        height: { xs: "50px", sm: "60px" },
        width: { xs: "60px", sm: "75px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 1,
        overflow: "visible",
      }}
    >
      <Box
        component="img"
        src="/GhiaLogo.jpg"
        alt="Brand logo"
        sx={{
          height: { xs: "48px", sm: "56px" },
          width: { xs: "48px", sm: "56px" },
          objectFit: "contain",
          transition: "transform 0.45s ease, filter 0.45s ease",
          transformOrigin: "center",
          "&:hover": {
            transform: "scale(1.06) rotate(2deg)",
          },
          filter: `drop-shadow(0 4px 18px ${alpha(
            THEME_COLORS.LOGO_MAGENTA,
            0.35
          )})`,
        }}
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement;
          if (t.src && !t.src.endsWith("/GhiaLogo.jpg")) {
            t.src = "/GhiaLogo.jpg";
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          boxShadow: `0 0 24px ${THEME_COLORS.LOGO_MAGENTA}`,
          opacity: 0.02,
          transition: "opacity 0.35s ease",
          "&:hover": {
            opacity: 0.18,
          },
        }}
      />
    </Box>
  </Box>
);

interface NavButtonProps {
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, onClick }) => (
  <Button
    onClick={onClick}
    disableRipple
    disableFocusRipple
    sx={{
      px: { xs: 2, sm: 2.5, md: 3 },
      py: 1,
      color: NAV_COLORS.text,
      fontSize: { xs: "0.95rem", sm: "1rem" },
      fontWeight: 600,
      textTransform: "none",
      borderRadius: 1,
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: `linear-gradient(90deg, transparent, ${alpha(
          THEME_COLORS.LOGO_MAGENTA,
          0.3
        )}, transparent)`,
        transition: "left 0.5s ease",
      },
      "&:hover::before": {
        left: "100%",
      },
      "&:hover": {
        backgroundColor: NAV_COLORS.hoverBackground,
        color: NAV_COLORS.textHover,
        transform: "translateY(-2px)",
        boxShadow: `0 4px 12px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.3)}`,
      },
      // remove default browser/MUI focus outline while still keeping focus for accessibility
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: "none",
      },
      "&.Mui-focusVisible": {
        outline: "none",
        boxShadow: "none",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: "2px",
        background: "linear-gradient(90deg, #8b3a8b, #c850c0, #ffcc70)",
        transition: "width 0.3s ease",
        boxShadow: `0 0 8px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.6)}`,
      },
      "&:hover::after": {
        width: "80%",
      },
    }}
  >
    {label}
  </Button>
);

interface CartBadgeProps {
  itemCount: number;
  onClick: () => void;
}

const CartBadge: React.FC<CartBadgeProps> = ({ itemCount, onClick }) => (
  <IconButton
    onClick={onClick}
    disableRipple
    disableFocusRipple
    aria-label={`Shopping cart with ${itemCount} items`}
    sx={{
      color: NAV_COLORS.text,
      transition: "all 0.3s ease",
      position: "relative",
      "&:hover": {
        backgroundColor: NAV_COLORS.hoverBackground,
        color: NAV_COLORS.textHover,
        transform: "scale(1.15) rotate(5deg)",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: "none",
      },
      "&.Mui-focusVisible": {
        outline: "none",
        boxShadow: "none",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(200, 80, 192, 0.3) 0%, transparent 70%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
      "&:hover::before": {
        opacity: 1,
      },
      animation: itemCount > 0 ? "cartBounce 0.5s ease" : "none",
      "@keyframes cartBounce": {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.2)" },
      },
    }}
  >
    <Badge
      badgeContent={itemCount}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: NAV_COLORS.cartBadge,
          color: "white",
          fontWeight: 600,
          boxShadow: `0 0 10px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.6)}`,
          animation:
            itemCount > 0 ? "badgePulse 2s ease-in-out infinite" : "none",
          "@keyframes badgePulse": {
            "0%, 100%": {
              transform: "scale(1)",
              boxShadow: `0 0 10px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.6)}`,
            },
            "50%": {
              transform: "scale(1.1)",
              boxShadow: `0 0 15px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.9)}`,
            },
          },
        },
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
    </Badge>
  </IconButton>
);

interface UserMenuProps {
  userName: string;
  anchorEl: HTMLElement | null;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  userName,
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onLogout,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
    <Typography
      variant="body2"
      sx={{
        color: NAV_COLORS.text,
        fontWeight: 600,
        display: { xs: "none", sm: "block" },
        transition: "all 0.3s ease",
        "&:hover": {
          color: NAV_COLORS.textHover,
        },
      }}
    >
      {userName}
    </Typography>
    <IconButton
      onClick={onMenuOpen}
      disableRipple
      disableFocusRipple
      aria-label="User menu"
      sx={{
        color: NAV_COLORS.text,
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          backgroundColor: NAV_COLORS.hoverBackground,
          color: NAV_COLORS.textHover,
          transform: "scale(1.1)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            THEME_COLORS.LOGO_MAGENTA,
            0.3
          )} 0%, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover::before": {
          opacity: 1,
        },
        "&:focus": {
          outline: "none",
          boxShadow: "none",
        },
        "&:focus-visible": {
          outline: "none",
          boxShadow: "none",
        },
        "&.Mui-focusVisible": {
          outline: "none",
          boxShadow: "none",
        },
      }}
    >
      <AccountCircle sx={{ fontSize: "1.8rem" }} />
    </IconButton>
    {/* Remove focus ring for account icon for consistent look */}
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          bgcolor: NAV_COLORS.backgroundSolid,
          color: NAV_COLORS.text,
          boxShadow: `0 4px 20px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.3)}`,
          borderRadius: 2,
          border: `1px solid ${NAV_COLORS.border}`,
          mt: 1.5,
          minWidth: 150,
        },
      }}
    >
      <MenuItem
        onClick={onLogout}
        disableRipple
        sx={{
          px: 3,
          py: 1.5,
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: NAV_COLORS.hoverBackground,
            color: NAV_COLORS.textHover,
            transform: "translateX(4px)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  </Box>
);

interface MobileMenuProps {
  anchorEl: HTMLElement | null;
  navLinks: NavLink[];
  authLinks: NavLink[];
  isAuthenticated: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  anchorEl,
  navLinks,
  authLinks,
  isAuthenticated,
  onClose,
  onLogout,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    sx={{
      "& .MuiPaper-root": {
        bgcolor: NAV_COLORS.backgroundSolid,
        color: NAV_COLORS.text,
        boxShadow: `0 4px 20px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.3)}`,
        border: `1px solid ${NAV_COLORS.border}`,
        borderRadius: 2,
        mt: 1,
        minWidth: 200,
        px: 1,
      },
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1 }}>
      <IconButton
        aria-label="Close menu"
        onClick={onClose}
        size="large"
        disableRipple
        disableFocusRipple
        sx={{
          color: NAV_COLORS.text,
          transition: "all 0.3s ease",
          "&:hover": {
            color: NAV_COLORS.textHover,
            transform: "rotate(90deg)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    {navLinks.map((link) => (
      <MenuItem
        key={link.label}
        component={Link}
        to={link.path}
        onClick={onClose}
        disableRipple
        sx={{
          py: 2,
          px: 3,
          fontSize: "1.1rem",
          fontWeight: 500,
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            backgroundColor: NAV_COLORS.hoverBackground,
            color: NAV_COLORS.textHover,
            transform: "translateX(8px)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: 0,
            background: "linear-gradient(180deg, #8b3a8b, #c850c0)",
            transition: "height 0.3s ease",
          },
          "&:hover::before": {
            height: "70%",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        {link.label}
      </MenuItem>
    ))}
    {authLinks.map((link) => (
      <MenuItem
        key={link.label}
        component={Link}
        to={link.path}
        onClick={onClose}
        disableRipple
        sx={{
          py: 2,
          px: 3,
          fontSize: "1.1rem",
          fontWeight: 500,
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            backgroundColor: NAV_COLORS.hoverBackground,
            color: NAV_COLORS.textHover,
            transform: "translateX(8px)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: 0,
            background: "linear-gradient(180deg, #8b3a8b, #c850c0)",
            transition: "height 0.3s ease",
          },
          "&:hover::before": {
            height: "70%",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        {link.label}
      </MenuItem>
    ))}
    {isAuthenticated && (
      <MenuItem
        onClick={() => {
          onLogout();
          onClose();
        }}
        disableRipple
        sx={{
          py: 2,
          px: 3,
          fontSize: "1.1rem",
          fontWeight: 500,
          transition: "all 0.3s ease",
          position: "relative",
          "&:hover": {
            backgroundColor: NAV_COLORS.hoverBackground,
            color: NAV_COLORS.textHover,
            transform: "translateX(8px)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: 0,
            background: "linear-gradient(180deg, #8b3a8b, #c850c0)",
            transition: "height 0.3s ease",
          },
          "&:hover::before": {
            height: "70%",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
            boxShadow: "none",
          },
        }}
      >
        Logout
      </MenuItem>
    )}
  </Menu>
);

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const isAdmin = useIsAdmin();

  // Navigation configuration
  const mainNavLinks: NavLink[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
  ];

  const authLinks: NavLink[] = isAuthenticated
    ? isAdmin
      ? [{ label: "Dashboard", path: "/dash" }]
      : []
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

  // Event handlers
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: NAVBAR_HEIGHT,
        background: NAV_COLORS.background,
        borderBottom: `1px solid ${NAV_COLORS.border}`,
        boxShadow: `0 4px 20px ${alpha(THEME_COLORS.LOGO_MAGENTA, 0.2)}`,
        zIndex: theme.zIndex.appBar,
        backdropFilter: "blur(10px)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${alpha(
            THEME_COLORS.LOGO_MAGENTA,
            0.1
          )}, transparent)`,
          animation: "shimmer 3s ease-in-out infinite",
        },
        "@keyframes shimmer": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 6 },
          height: "100%",
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
        }}
      >
        {/* Logo */}
        <Logo onClick={() => handleNavigation("/")} />

        {/* Mobile Navigation */}
        {isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CartBadge
              itemCount={cartItemsCount}
              onClick={() => handleNavigation("/cart")}
            />
            <IconButton
              onClick={handleMobileMenuOpen}
              aria-label="Open navigation menu"
              sx={{
                color: NAV_COLORS.text,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: NAV_COLORS.hoverBackground,
                  color: NAV_COLORS.textHover,
                  transform: "rotate(90deg)",
                },
              }}
              size="large"
              disableRipple
              disableFocusRipple
            >
              <MenuIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
            <MobileMenu
              anchorEl={mobileMenuAnchorEl}
              navLinks={mainNavLinks}
              authLinks={authLinks}
              isAuthenticated={isAuthenticated}
              onClose={handleMobileMenuClose}
              onLogout={handleLogout}
            />
          </Box>
        ) : (
          /* Desktop Navigation */
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Main Navigation Links */}
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {mainNavLinks.map((link) => (
                <NavButton
                  key={link.label}
                  label={link.label}
                  onClick={() => handleNavigation(link.path)}
                />
              ))}
            </Box>

            {/* Auth Links */}
            {authLinks.map((link) => (
              <NavButton
                key={link.label}
                label={link.label}
                onClick={() => handleNavigation(link.path)}
              />
            ))}

            {/* Cart & User Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
              <CartBadge
                itemCount={cartItemsCount}
                onClick={() => handleNavigation("/cart")}
              />
              {isAuthenticated ? (
                <UserMenu
                  userName={user?.name || "User"}
                  anchorEl={userMenuAnchorEl}
                  onMenuOpen={handleUserMenuOpen}
                  onMenuClose={handleUserMenuClose}
                  onLogout={handleLogout}
                />
              ) : null}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
