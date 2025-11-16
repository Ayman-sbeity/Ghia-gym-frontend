import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Rating,
} from "@mui/material";
import { COLORS } from "../../assets/themeColors";

const TESTIMONIALS = [
  {
    quote:
      "Ghia Gym changed how I think about fitness — the coaches are top-tier and I finally reached a level of consistency.",
    name: "Sofia",
    title: "Member since 2022",
    rating: 5,
  },
  {
    quote:
      "Personalized training and a supportive environment — couldn’t recommend more.",
    name: "Marcus",
    title: "Member since 2019",
    rating: 5,
  },
  {
    quote:
      "The facilities are world class and the community keeps me accountable.",
    name: "Aisha",
    title: "Member since 2021",
    rating: 4.8,
  },
];

const AboutTestimonials: React.FC = () => (
  <Box sx={{ mb: 10 }} role="region" aria-labelledby="testimonials-heading">
    <Typography
      id="testimonials-heading"
      variant="h4"
      fontWeight={900}
      sx={{ mb: 3, color: COLORS.PURPLE_ACCENT }}
    >
      What Our Members Say
    </Typography>

    <Box
      role="list"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 3,
      }}
    >
      {TESTIMONIALS.map((t) => (
        <Card
          key={t.name}
          role="listitem"
          aria-label={`Testimonial by ${t.name}`}
          sx={{
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${COLORS.PURPLE_DEEP}20`,
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.9)", mb: 2 }}
            >
              “{t.quote}”
            </Typography>
            <Rating
              name={`rating-${t.name}`}
              value={t.rating}
              precision={0.1}
              readOnly
              sx={{ color: COLORS.PURPLE_ACCENT, mb: 1 }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: COLORS.PURPLE_PRIMARY }}>
                {t.name[0]}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "white", fontWeight: 800 }}
                >
                  {t.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: COLORS.FOOTER_LINK }}
                >
                  {t.title}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

export default AboutTestimonials;
