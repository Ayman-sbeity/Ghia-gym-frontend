import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { COLORS } from "../../assets/themeColors";

const AboutHero: React.FC = () => (
  <Box
    sx={{
      py: { xs: 10, md: 16 },
      px: { xs: 3, md: 0 },
      background: COLORS.GYM_GRADIENT,
      color: "white",
    }}
  >
    <Container maxWidth="lg" sx={{ textAlign: "center" }}>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: "2.25rem", md: "4rem" },
          fontWeight: 900,
          lineHeight: 1.05,
          mb: 2,
          background: COLORS.GRADIENT_TEXT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Built for Performance & Community
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 900, mx: "auto" }}
      >
        Ghia Gym combines world-class trainers, industry-leading equipment, and
        an inclusive culture to help you unlock long-term health and
        performance.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: COLORS.GRADIENT_CTA,
            px: 6,
            py: 2,
            fontWeight: 800,
            color: "white",
          }}
          onClick={() => (window.location.href = "/signup")}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  </Box>
);

export default AboutHero;
