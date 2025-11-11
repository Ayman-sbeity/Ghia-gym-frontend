import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { COLORS } from "../assets/themeColors";

const ArtisticCarousel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",

        height: { xs: "500px", sm: "600px", md: "700px" },
        overflow: "hidden",
      }}
    >
      <Box
  component="img"
  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=80"
  alt="Athlete preparing a barbell in the gym"
          sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          filter: "saturate(1.05) brightness(0.92)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(45,27,61,0.62) 0%, rgba(168,85,247,0.22) 100%)`,
          backdropFilter: "blur(4px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: "5%", sm: "10%", md: "15%" },
          transform: "translateY(-50%)",
          color: "white",
          textAlign: "left",
          maxWidth: { xs: "280px", sm: "400px", md: "500px" },
          zIndex: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            mb: 2,
            opacity: 0.95,
            color: COLORS.PURPLE_ACCENT,
          }}
        >
          TRANSFORM YOUR BODY & MIND
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            fontWeight: "bold",
            lineHeight: 1.1,
            mb: 3,
            fontFamily: "'Arial', sans-serif",
          }}
        >
          UNLEASH YOUR
          <br />
          POTENTIAL
        </Typography>

        <Button
          variant="contained"
          sx={{
            background: COLORS.GRADIENT_CTA,
            color: "white",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "uppercase",
            borderRadius: 1,
            boxShadow: "0 4px 12px rgba(147,51,234,0.4)",
            "&:hover": {
              background: COLORS.GRADIENT_CTA_HOVER,
              boxShadow: "0 6px 16px rgba(147,51,234,0.6)",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease",
            },
          }}
        >
          Start Your Journey
        </Button>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: { xs: "20px", sm: "40px" },
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 2,
        }}
      >
        {["f", "ig", "p"].map((icon, index) => (
          <Box
            key={index}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: `1px solid rgba(168,85,247,0.25)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transform: "scale(1.1)",
              },
            }}
          >
            {icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ArtisticCarousel;
