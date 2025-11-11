import React, { useState } from "react";
import { API_BASE_URL } from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Fade,
  Zoom,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { COLORS } from "../assets/themeColors";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  maxWidth: "1400px",
  position: "relative",
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
  animation: `${fadeIn} 0.8s ease-out`,
  "& .hero-title": {
    fontSize: "3.5rem",
    fontWeight: 800,
    background: `linear-gradient(135deg, ${COLORS.PURPLE_PRIMARY} 0%, ${COLORS.PURPLE_DEEP} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: theme.spacing(2),
    letterSpacing: "0.02em",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5rem",
    },
  },
  "& .hero-subtitle": {
    fontSize: "1.2rem",
    color: "#EAEAEA",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.8,
    opacity: 0.9,
  },
}));

const ContactInfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: "100%",
  background: `linear-gradient(135deg, ${COLORS.PURPLE_PRIMARY}15 0%, ${COLORS.PURPLE_DEEP}10 100%)`,
  backdropFilter: "blur(10px)",
  borderRadius: theme.spacing(2),
  border: `1px solid ${COLORS.PURPLE_PRIMARY}90`,
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 12px 40px ${COLORS.PURPLE_PRIMARY}25`,
    borderColor: COLORS.PURPLE_PRIMARY,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${COLORS.PURPLE_PRIMARY} 0%, ${COLORS.PURPLE_DEEP} 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  boxShadow: `0 8px 24px ${COLORS.PURPLE_PRIMARY}40`,
  "& svg": {
    fontSize: 32,
    color: "white",
  },
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: theme.spacing(3),
  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.1)`,
  border: `1px solid ${COLORS.PURPLE_PRIMARY}20`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 25px 70px ${COLORS.PURPLE_PRIMARY}20`,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    backgroundColor: "white",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: COLORS.FOOTER_LINK,
      borderWidth: 2,
    },
    "&:hover": {
      backgroundColor: "#fafbfc",
      "& fieldset": {
        borderColor: COLORS.PURPLE_PRIMARY,
      },
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      boxShadow: `0 0 0 3px ${COLORS.PURPLE_PRIMARY}20`,
      "& fieldset": {
        borderColor: COLORS.PURPLE_PRIMARY,
        borderWidth: 2,
      },
    },
    "& input, & textarea": {
      color: "#8b3a8b",
      fontSize: "1rem",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#8b3a8b",
    fontWeight: 600,
    "&.Mui-focused": {
      color: COLORS.PURPLE_PRIMARY,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: "14px 48px",
  fontSize: "1.1rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  borderRadius: theme.spacing(1.5),
  background: `linear-gradient(135deg, ${COLORS.PURPLE_PRIMARY} 0%, ${COLORS.PURPLE_DEEP} 100%)`,
  color: "white",
  boxShadow: `0 8px 24px ${COLORS.PURPLE_PRIMARY}40`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${COLORS.PURPLE_DEEP} 0%, ${COLORS.PURPLE_PRIMARY} 100%)`,
    transform: "translateY(-2px)",
    boxShadow: `0 12px 32px ${COLORS.PURPLE_PRIMARY}50`,
  },
  "&:disabled": {
    background: "#e0e0e0",
    color: "#999",
    boxShadow: "none",
  },
}));

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data: typeof formData) => {
    if (!data.name || data.name.trim().length < 2)
      return "Please enter your full name.";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
      return "Please enter a valid email address.";
    if (!data.message || data.message.trim().length < 10)
      return "Message should be at least 10 characters long.";
    return null;
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon />,
      title: "Visit Us",
      details: ["Ghia Gym Headquarters", "PO Box 13124", "Austin, TX 78711"],
    },
    {
      icon: <EmailIcon />,
      title: "Email Us",
      details: ["support@ghiagym.com", "info@ghiagym.com"],
    },
    {
      icon: <PhoneIcon />,
      title: "Call Us",
      details: ["Hours: 9am - 5pm (CST)", "Monday - Friday", "844-662-3273"],
    },
  ];

  return (
    <Box sx={{ background: "transperant" }}>
      <StyledContainer>
        {/* Hero Section */}
        <HeroSection>
          <Typography className="hero-title" variant="h1" component="h1">
            Get In Touch
          </Typography>
          <Typography className="hero-subtitle" variant="h6">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </Typography>
        </HeroSection>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            mb: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {contactInfo.map((info, index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 32px)" },
                minWidth: { xs: "100%", sm: "280px", md: "0" },
              }}
            >
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <ContactInfoCard elevation={0}>
                  <IconWrapper>{info.icon}</IconWrapper>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                    sx={{ color: "#EAEAEA" }}
                  >
                    {info.title}
                  </Typography>
                  {info.details.map((detail, idx) => (
                    <Typography
                      key={idx}
                      variant="body1"
                      sx={{
                        color: "#EAEAEA",
                        mb: 0.5,
                        lineHeight: 1.8,
                      }}
                    >
                      {detail}
                    </Typography>
                  ))}
                </ContactInfoCard>
              </Zoom>
            </Box>
          ))}
        </Box>

        {/* Contact Form */}
        <Fade in={true} timeout={1000}>
          <FormPaper elevation={0}>
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={1}
                sx={{ color: "#8b3a8b" }}
              >
                Send Us a Message
              </Typography>
              <Typography variant="body1" sx={{ color: "#8b3a8b" }}>
                Fill out the form below and we'll get back to you within 24
                hours
              </Typography>
            </Box>

            {success && (
              <Fade in={success}>
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      fontSize: 28,
                    },
                  }}
                >
                  <Typography variant="body1" fontWeight="600">
                    Thank you for contacting us!
                  </Typography>
                  <Typography variant="body2">
                    We'll get back to you soon.
                  </Typography>
                </Alert>
              </Fade>
            )}

            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      fontSize: 28,
                    },
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <StyledTextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />

                  <StyledTextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </Box>

                <StyledTextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  inputProps={{ pattern: "[0-9\\-\\s+()]*" }}
                  placeholder="+1 (555) 123-4567"
                />

                <StyledTextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={6}
                  placeholder="Tell us how we can help you..."
                />

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </SubmitButton>
                </Box>
              </Box>
            </form>
          </FormPaper>
        </Fade>

        {/* Additional Info Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            sx={{ color: "#EAEAEA" }}
          >
            Prefer to talk in person?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#EAEAEA", maxWidth: "600px", mx: "auto" }}
          >
            Visit our gym during business hours or schedule a tour. We're here
            to help you achieve your fitness goals!
          </Typography>
        </Box>
      </StyledContainer>
    </Box>
  );
};

export default ContactPage;
