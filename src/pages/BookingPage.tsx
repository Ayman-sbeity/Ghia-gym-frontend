import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { COLORS } from "../assets/themeColors";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: COLORS.FOOTER_LINK,
      borderWidth: 1.5,
    },
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.02)",
      "& fieldset": {
        borderColor: COLORS.PURPLE_PRIMARY,
      },
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `0 0 0 3px ${COLORS.PURPLE_PRIMARY}20`,
      "& fieldset": {
        borderColor: COLORS.PURPLE_PRIMARY,
        borderWidth: 2,
      },
    },
    "& input, & textarea": {
      color: "white",
      fontSize: "1rem",
    },
  },
  "& .MuiInputLabel-root": {
    color: COLORS.PURPLE_PRIMARY,
    fontWeight: 600,
    "&.Mui-focused": {
      color: COLORS.PURPLE_PRIMARY,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: "12px 36px",
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "uppercase",
  borderRadius: theme.spacing(1.5),
  background: `linear-gradient(135deg, ${COLORS.PURPLE_PRIMARY} 0%, ${COLORS.PURPLE_DEEP} 100%)`,
  color: "white",
  boxShadow: `0 8px 24px ${COLORS.PURPLE_PRIMARY}30`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(135deg, ${COLORS.PURPLE_DEEP} 0%, ${COLORS.PURPLE_PRIMARY} 100%)`,
    transform: "translateY(-2px)",
  },
}));

const DEFAULT_WHATSAPP_PHONE = "15551234567";

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const trainer = searchParams.get("trainer") || "";
  const onlineParam = searchParams.get("online");
  const online = onlineParam === "true";

  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function submitOnlineBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) return;
    setLoading(true);
    // simulate API call
    setTimeout(() => {
      console.log("Booking requested:", { trainer, ...form });
      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/"), 1200);
    }, 800);
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to book a session with ${trainer || "your team"}. Are there available slots?`
  );
  const whatsappURL = `https://wa.me/${DEFAULT_WHATSAPP_PHONE}?text=${whatsappMessage}`;

  return (
    <Box sx={{ width: "100%", px: { xs: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: COLORS.GRADIENT_TEXT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
          {trainer ? `Book a Session with ${trainer}` : "Book a Session"}
          </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
          {online
            ? "Complete the form below to schedule an online session. We'll email you a confirmation with details."
            : "This trainer does not offer online booking. You can contact us on WhatsApp to schedule in-person sessions."}
        </Typography>

        {online ? (
          <Paper elevation={0} sx={{ p: 4, background: "linear-gradient(135deg,#ffffff04 0%, #ffffff02 100%)", borderRadius: 3, border: `1px solid ${COLORS.PURPLE_PRIMARY}20` }}>
            <Box component="form" onSubmit={submitOnlineBooking} role="form" aria-label={`Booking form${trainer ? ` for ${trainer}` : ''}`} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <input type="hidden" name="trainer" value={trainer} />
            <StyledTextField
              name="name"
              label="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: COLORS.PURPLE_PRIMARY }}}
            />
            <StyledTextField
              name="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: COLORS.PURPLE_PRIMARY }}}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <StyledTextField
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                sx={{ input: { color: "white" } }}
                InputLabelProps={{ shrink: true }}
                required
              />
              <StyledTextField
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                sx={{ input: { color: "white" } }}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
              <InfoOutlinedIcon sx={{ color: COLORS.PURPLE_ACCENT, mt: 0.5 }} aria-hidden />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                The time you choose is a booking request. The trainer will confirm
                availability by email — you'll receive a confirmation once the time is
                approved by both you and the trainer. Please check your inbox for the follow-up.
              </Typography>
            </Box>
            <StyledTextField
              name="note"
              label="Notes (optional)"
              value={form.note}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ textarea: { color: "white" } }}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={18} sx={{ color: "white" }} /> : "Confirm Booking"}
              </SubmitButton>
              <Button variant="outlined" sx={{ color: COLORS.PURPLE_PRIMARY }} onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Box>
            {success && <Alert severity="success">Booking confirmed! Redirecting...</Alert>}
            <Typography variant="caption" sx={{ color: COLORS.FOOTER_LINK, display: 'block', mt: 2 }}>
              By confirming, you agree to our <a href="/terms" style={{ color: COLORS.PURPLE_ACCENT, textDecoration: 'underline' }}>booking terms</a> and cancellation policy.
            </Typography>
            </Box>
          </Paper>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <a href={whatsappURL} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <SubmitButton sx={{ width: "fit-content" }}>Contact via WhatsApp</SubmitButton>
            </a>
            <Button variant="outlined" onClick={() => navigate(-1)} sx={{ color: COLORS.PURPLE_PRIMARY, width: "fit-content" }}>
              Back
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BookingPage;
