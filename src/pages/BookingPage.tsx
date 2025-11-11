import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { COLORS } from "../assets/themeColors";
import Alert from "@mui/material/Alert";

const DEFAULT_WHATSAPP_PHONE = "15551234567";

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const trainer = searchParams.get("trainer") || "";
  const onlineParam = searchParams.get("online");
  const online = onlineParam === "true";

  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", note: "" });
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function submitOnlineBooking(e: React.FormEvent) {
    e.preventDefault();
    console.log("Booking requested:", { trainer, ...form });
    setSuccess(true);
    setTimeout(() => navigate("/"), 2500);
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to book a session with ${trainer || "your team"}. Are there available slots?`
  );
  const whatsappURL = `https://wa.me/${DEFAULT_WHATSAPP_PHONE}?text=${whatsappMessage}`;

  return (
    <Box sx={{ width: "100%", px: { xs: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "white" }}>
          {trainer ? `Book a Session with ${trainer}` : "Book a Session"}
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
          {online
            ? "Complete the form below to schedule an online session. We'll email you a confirmation with details."
            : "This trainer does not offer online booking. You can contact us on WhatsApp to schedule in-person sessions."}
        </Typography>

        {online ? (
          <Box component="form" onSubmit={submitOnlineBooking} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              name="name"
              label="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.9)" }}}
              sx={{ input: { color: "white" } }}
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.9)" }}}
              sx={{ input: { color: "white" } }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                sx={{ input: { color: "white" } }}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                sx={{ input: { color: "white" } }}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
            <TextField
              name="note"
              label="Notes (optional)"
              value={form.note}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ input: { color: "white" }, textarea: { color: "white" } }}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button type="submit" variant="contained" sx={{ background: COLORS.GRADIENT_CTA }}>
                Confirm Booking
              </Button>
              <Button variant="outlined" sx={{ color: COLORS.PURPLE_PRIMARY }} onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Box>
            {success && <Alert severity="success">Booking confirmed! Redirecting...</Alert>}
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              href={whatsappURL}
              target="_blank"
              rel="noreferrer"
              sx={{ background: COLORS.GRADIENT_CTA, width: "fit-content" }}
            >
              Contact via WhatsApp
            </Button>
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
