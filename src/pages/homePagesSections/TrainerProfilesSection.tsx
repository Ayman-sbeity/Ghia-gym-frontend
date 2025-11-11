import React from "react";
import { COLORS } from "../../assets/themeColors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

const trainers = [
  {
    name: "Lina Martin",
    title: "Head Trainer",
    bio: "Specialist in strength & conditioning, scaling programs for beginners to athletes.",
    initials: "LM",
  },
  {
    name: "Carlos Reyes",
    title: "Functional Coach",
    bio: "Focused on mobility and functional fitness programs to keep you moving well long-term.",
    initials: "CR",
  },
  {
    name: "Aisha Khan",
    title: "Nutrition Coach",
    bio: "Guides meal planning and healthy lifestyle choices to support gym results.",
    initials: "AK",
  },
];

const TrainerProfilesSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 6, md: 12 },
        background: "transparent",
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 3, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: 800, mb: 2 }}
          >
            Meet Our Trainers
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
            Our certified team will create a program that fits your needs and helps
            you progress safely.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {trainers.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: COLORS.GYM_ACCENT,
                    color: "black",
                    width: 80,
                    height: 80,
                    fontWeight: 700,
                    mb: 2,
                    boxShadow: `0 10px 30px ${COLORS.PURPLE_PRIMARY}20`,
                  }}
                >
                  {t.initials}
                </Avatar>
                <Typography sx={{ color: "white", fontWeight: 700 }}>
                  {t.name}
                </Typography>
                <Typography sx={{ color: COLORS.PURPLE_ACCENT, mb: 1 }}>
                  {t.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
                  {t.bio}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      color: COLORS.PURPLE_PRIMARY,
                      borderColor: COLORS.PURPLE_PRIMARY + "22",
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      background: COLORS.GRADIENT_CTA,
                      color: "white",
                    }}
                    onClick={() => navigate(`/book?trainer=${encodeURIComponent(t.name)}&online=true`)}
                  >
                    Book Session
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TrainerProfilesSection;
