import React from "react";
import { COLORS } from "../../assets/themeColors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  FitnessCenter,
  Group,
  EmojiEvents,
  TrendingUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const AboutUsSection: React.FC = () => {
  const stats = [
    { icon: <Group />, number: "5,000+", label: "Active Members" },
    { icon: <FitnessCenter />, number: "100+", label: "Training Programs" },
    { icon: <EmojiEvents />, number: "50+", label: "Expert Trainers" },
    { icon: <TrendingUp />, number: "98%", label: "Success Rate" },
  ];

  const features = [
    {
      title: "State-of-the-Art Equipment",
      description:
        "Train with the latest cardio machines, strength equipment, and functional training tools.",
      icon: <FitnessCenter sx={{ fontSize: 40 }} />,
    },
    {
      title: "Expert Personal Training",
      description:
        "Work one-on-one with certified trainers who create customized programs for your goals.",
      icon: <Group sx={{ fontSize: 40 }} />,
    },
    {
      title: "Proven Results",
      description:
        "Join thousands who've achieved their fitness goals with our comprehensive approach.",
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        margin: 0,
        padding: 0,
        mb: 10,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          background:
            "radial-gradient(circle, rgba(147,51,234,0.2), transparent 70%)",
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-30px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          background:
            "radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: COLORS.PURPLE_ACCENT,
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: 700,
                letterSpacing: "0.15em",
                mb: 2,
                display: "block",
              }}
            >
              GHIA
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 800,
                color: "white",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Where Strength Meets
              <br />
              <Box
                component="span"
                sx={{
                  background: COLORS.GRADIENT_TEXT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Community
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: { xs: "1rem", md: "1.25rem" },
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              At Ghia Gym, we believe fitness is more than just physical
              transformation – it's a lifestyle. We're dedicated to creating an
              inclusive environment where everyone can pursue their fitness
              goals with confidence.
            </Typography>
          </motion.div>
        </Box>

        {/* Stats Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
            mb: { xs: 8, md: 12 },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(168,85,247,0.4)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: COLORS.PURPLE_PRIMARY,
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                    "& svg": { fontSize: { xs: 35, md: 45 } },
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 800,
                    color: "white",
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "0.85rem", md: "0.95rem" },
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            mb: { xs: 6, md: 8 },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  height: "100%",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(168,85,247,0.4)",
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: COLORS.GRADIENT_FEATURE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    color: "white",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: "white",
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 700,
                color: "white",
                mb: 3,
              }}
            >
              Ready to Transform Your Life?
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 700,
                textTransform: "uppercase",
                borderRadius: 3,
                background: COLORS.GRADIENT_CTA,
                color: "white",
                boxShadow: "0 8px 25px rgba(147,51,234,0.5)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: COLORS.GRADIENT_CTA_HOVER,
                  boxShadow: "0 12px 35px rgba(147,51,234,0.7)",
                  transform: "translateY(-3px)",
                },
              }}
              onClick={() => (window.location.href = "/signup")}
            >
              Join Us Today
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsSection;
