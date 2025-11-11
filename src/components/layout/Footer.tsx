import React, { useEffect, useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import { keyframes } from "@emotion/react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link as MuiLink,
  Stack,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { COLORS } from "../../assets/themeColors";

const fadeUp = keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const moveGradient = keyframes({
  "0%": { backgroundPosition: "0% 50%" },
  "50%": { backgroundPosition: "100% 50%" },
  "100%": { backgroundPosition: "0% 50%" },
});

const floatDots = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "50%": { backgroundPosition: "50% 100%" },
  "100%": { backgroundPosition: "0% 0%" },
});

const colorPulse = keyframes({
  "0%": { opacity: 0.06, filter: "hue-rotate(-6deg) saturate(0.95)" },
  "50%": { opacity: 0.12, filter: "hue-rotate(6deg) saturate(1.1)" },
  "100%": { opacity: 0.06, filter: "hue-rotate(-6deg) saturate(0.95)" },
});

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("footerAnimationsEnabled");
      return saved === null ? true : saved === "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "footerAnimationsEnabled",
        String(animationsEnabled)
      );
    } catch {}
  }, [animationsEnabled]);

  return (
    <Box
      component="footer"
      role="contentinfo"
      aria-labelledby="footer-heading"
      sx={{
        position: "relative",
        backgroundImage:
          COLORS.LOGO_GRADIENT ||
          COLORS.GRADIENT_FEATURE ||
          COLORS.FOOTER_BG_SOLID ||
          COLORS.BlackBackground,
        backgroundSize: "200% 200%",
        animation: animationsEnabled
          ? `${moveGradient} 28s linear infinite`
          : "none",
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
        },
        pt: 6,
        pb: 3,
        mt: "auto",
        color: COLORS.textPrimary,
      }}
    >
      {/* animated overlay for floating radial shapes */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.08,
          backgroundImage: `radial-gradient(8rem 6rem at 10% 20%, ${COLORS.PURPLE_DEEP}22, transparent 25%), radial-gradient(10rem 8rem at 70% 80%, ${COLORS.PURPLE_ACCENT}22, transparent 22%), radial-gradient(20rem 12rem at 50% 50%, ${COLORS.PURPLE_PRIMARY}18, transparent 30%)`,
          backgroundSize: "200% 200%",
          animation: animationsEnabled
            ? `${floatDots} 30s linear infinite, ${colorPulse} 12s ease-in-out infinite`
            : "none",
          mixBlendMode: "overlay",
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            opacity: 0.06,
          },
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            },
            gap: 3,
            py: 1,
          }}
        >
          <Box
            sx={{
              opacity: 0,
              animation: animationsEnabled
                ? `${fadeUp} 600ms ease-out forwards`
                : "none",
              animationDelay: "100ms",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                opacity: 1,
              },
            }}
          >
            <Box sx={{ mb: 1 }}>
              <img src="/logo.png" alt="Company Logo" style={{ height: 48 }} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.textPrimary,
                mt: 1,
                opacity: 0.95,
                maxWidth: 420,
              }}
            >
              Your trusted destination for luxury jewelry and accessories. We
              provide exceptional quality and outstanding customer service.
            </Typography>
          </Box>

          <Box
            sx={{
              opacity: 0,
              animation: animationsEnabled
                ? `${fadeUp} 600ms ease-out forwards`
                : "none",
              animationDelay: "200ms",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                opacity: 1,
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontWeight: 700 }}
              id="footer-heading"
            >
              Quick Links
            </Typography>
            <nav aria-label="quick links">
              <Stack spacing={0.6}>
                {["About", "Shop", "Categories", "Contact"].map((item) => (
                  <MuiLink
                    key={item}
                    component={RouterLink}
                    to={`/${item.toLowerCase()}`}
                    underline="hover"
                    sx={{
                      color: COLORS.FOOTER_LINK,
                      "&:hover": { color: COLORS.PURPLE_ACCENT },
                    }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Stack>
            </nav>
          </Box>

          <Box
            sx={{
              opacity: 0,
              animation: animationsEnabled
                ? `${fadeUp} 600ms ease-out forwards`
                : "none",
              animationDelay: "300ms",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                opacity: 1,
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
              Categories
            </Typography>
            <nav aria-label="categories">
              <Stack spacing={0.6}>
                {["Necklaces", "Rings", "Earrings", "Bracelets", "Watches"].map(
                  (item) => (
                    <MuiLink
                      key={item}
                      component={RouterLink}
                      to={`/category/${item.toLowerCase()}`}
                      underline="hover"
                      sx={{
                        color: COLORS.FOOTER_LINK,
                        "&:hover": { color: COLORS.PURPLE_ACCENT },
                      }}
                    >
                      {item}
                    </MuiLink>
                  )
                )}
              </Stack>
            </nav>
          </Box>

          <Box
            sx={{
              opacity: 0,
              animation: animationsEnabled
                ? `${fadeUp} 600ms ease-out forwards`
                : "none",
              animationDelay: "400ms",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                opacity: 1,
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn
                  sx={{ color: COLORS.textPrimary, fontSize: 20 }}
                  aria-hidden={true}
                />
                <Typography
                  variant="body2"
                  sx={{ color: COLORS.textPrimary, opacity: 0.9 }}
                >
                  123 Jewelry Street, New York, NY 10001
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone
                  sx={{ color: COLORS.textPrimary, fontSize: 20 }}
                  aria-hidden={true}
                />
                <MuiLink
                  href="tel:+15551234567"
                  sx={{
                    color: COLORS.FOOTER_LINK,
                    "&:hover": { color: COLORS.PURPLE_ACCENT },
                  }}
                  underline="hover"
                >
                  +1 (555) 123-4567
                </MuiLink>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email
                  sx={{ color: COLORS.textPrimary, fontSize: 20 }}
                  aria-hidden={true}
                />
                <MuiLink
                  href="mailto:info@yourjewelrystore.com"
                  sx={{
                    color: COLORS.FOOTER_LINK,
                    "&:hover": { color: COLORS.PURPLE_ACCENT },
                  }}
                  underline="hover"
                >
                  info@yourjewelrystore.com
                </MuiLink>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mt: 4, mb: 3 }}>
          <Divider sx={{ mb: 3, background: COLORS.FOOTER_DIVIDER }} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {[
              {
                icon: <Facebook />,
                url: "https://facebook.com",
                label: "Facebook",
              },
              {
                icon: <Twitter />,
                url: "https://twitter.com",
                label: "Twitter",
              },
              {
                icon: <Instagram />,
                url: "https://instagram.com",
                label: "Instagram",
              },
              {
                icon: <LinkedIn />,
                url: "https://linkedin.com",
                label: "LinkedIn",
              },
            ].map((social, index) => (
              <IconButton
                key={index}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: COLORS.textPrimary,
                  bgcolor: "transparent",
                  p: 1.1,
                  borderRadius: "50%",
                  transition: "transform 0.18s, box-shadow 0.18s",
                  opacity: 0,
                  animation: animationsEnabled
                    ? `${fadeUp} 420ms ease-out forwards`
                    : "none",
                  animationDelay: animationsEnabled
                    ? `${120 + index * 90}ms`
                    : "0ms",
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    opacity: 1,
                  },
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 6px 18px rgba(0,0,0,0.12)`,
                    color: COLORS.PURPLE_ACCENT,
                    bgcolor: "rgba(255,255,255,0.04)",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 2,
            flexWrap: "wrap",
            rowGap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: COLORS.FOOTER_LINK }}>
            © {currentYear} Your Jewelry Store. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1 }}>
            <MuiLink
              component={RouterLink}
              to="/privacy"
              sx={{
                color: COLORS.FOOTER_LINK,
                opacity: 0.95,
                "&:hover": { color: COLORS.PURPLE_ACCENT },
              }}
            >
              Privacy
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/terms"
              sx={{
                color: COLORS.FOOTER_LINK,
                opacity: 0.95,
                "&:hover": { color: COLORS.PURPLE_ACCENT },
              }}
            >
              Terms
            </MuiLink>
          </Stack>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                size="small"
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
              />
            }
            label="Animation"
            sx={{ ml: 1, color: COLORS.FOOTER_LINK }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
