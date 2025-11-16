import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../../assets/themeColors";

const AboutGrowth: React.FC = () => (
  <Box sx={{ mb: 8 }}>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 4,
      }}
    >
      <Box sx={{ p: 4, borderRadius: 3, background: "rgba(255,255,255,0.03)" }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ mb: 2, color: COLORS.PURPLE_ACCENT }}
        >
          Our Growth
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
          Since opening our doors, we’ve grown to a welcoming community of
          thousands of members. We expand responsibly — adding trainers and
          equipment to prioritize your experience.
        </Typography>
      </Box>

      <Box sx={{ p: 4, borderRadius: 3, background: "rgba(255,255,255,0.03)" }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ mb: 2, color: COLORS.PURPLE_ACCENT }}
        >
          Timeline
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
          2015 — Founding, 2018 — First franchised location, 2021 — 24/7
          opening, 2023 — Launched online training platform.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default AboutGrowth;
