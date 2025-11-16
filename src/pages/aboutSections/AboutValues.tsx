import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { COLORS } from "../../assets/themeColors";

const AboutValues: React.FC = () => (
  <Box sx={{ mb: 8 }} role="region" aria-labelledby="mission-vision-heading">
    <Typography
      id="mission-vision-heading"
      variant="overline"
      sx={{
        color: COLORS.PURPLE_ACCENT,
        fontWeight: 800,
        mb: 2,
        letterSpacing: "0.12em",
      }}
    >
      OUR MISSION & VISION
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 4,
      }}
    >
      <Box>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <FlagIcon
            sx={{ color: COLORS.PURPLE_PRIMARY, fontSize: 28 }}
            aria-hidden
          />
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: COLORS.PURPLE_ACCENT }}
          >
            Mission
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.85)", mb: 2 }}
        >
          We empower members to reach lasting health and performance through
          expert coaching, an inclusive community, and training grounded in
            evidence — and by partnering with experienced personal trainers so
            fitness becomes a sustainable, rewarding part of life.
        </Typography>
      </Box>

      <Box>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <VisibilityIcon
            sx={{ color: COLORS.PURPLE_PRIMARY, fontSize: 28 }}
            aria-hidden
          />
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: COLORS.PURPLE_ACCENT }}
          >
            Vision
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.85)", mb: 2 }}
        >
          To be the most trusted fitness community — known for personalized
          coaching, progressive programming, and a welcoming space that helps
          people of all levels build better lives.
        </Typography>
      </Box>
    </Box>

    <Box sx={{ mt: 4 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: COLORS.PURPLE_ACCENT, fontWeight: 800, mb: 1 }}
      >
        Core Values
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {[
          "Community",
          "Evidence-Based",
          "Inclusivity",
          "Sustainability",
          "Expert Coaching",
        ].map((v) => (
          <Chip
            key={v}
            label={v}
            size="small"
            sx={{
              color: "white",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${COLORS.PURPLE_PRIMARY}22`,
              mr: 1,
              mb: 1,
            }}
          />
        ))}
      </Stack>
    </Box>
  </Box>
);

export default AboutValues;
