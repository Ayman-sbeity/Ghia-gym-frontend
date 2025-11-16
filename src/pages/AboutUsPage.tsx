import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import AboutValues from "./aboutSections/AboutValues";
import AboutTestimonials from "./aboutSections/AboutTestimonials";
import AboutGrowth from "./aboutSections/AboutGrowth";
import AboutUsSection from "./homePagesSections/AboutUsSection";
import TrainerProfilesSection from "./homePagesSections/TrainerProfilesSection";
import { COLORS } from "../assets/themeColors";

const AboutUsPage: React.FC = () => {
  return (
    <Box sx={{ background: "transparent", width: "100%" }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 12 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.6rem", md: "3.8rem" },
              fontWeight: 900,
              lineHeight: 1.05,
              color: COLORS.PURPLE_ACCENT,
              mb: 2,
            }}
          >
            About Ghia Gym
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.85)" }}>
            We’re a community-first gym built to help everyone move better, feel
            stronger, and achieve long-term results.
          </Typography>
        </Box>

        <AboutValues />

        <AboutUsSection />

        {/* Team */}
        <Box sx={{ mt: 10, mb: 10 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              mb: 3,
              background: COLORS.GRADIENT_TEXT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Meet Our Team
          </Typography>
          <TrainerProfilesSection showTitle={false} />
        </Box>

        <AboutTestimonials />

        <AboutGrowth />

        {/* CTA */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontWeight: 700,
              borderRadius: 3,
              background: COLORS.GRADIENT_CTA,
              color: "white",
              boxShadow: "0 12px 35px rgba(147,51,234,0.5)",
              "&:hover": { background: COLORS.GRADIENT_CTA_HOVER },
            }}
            onClick={() => (window.location.href = "/signup")}
          >
            Join the Community
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUsPage;
