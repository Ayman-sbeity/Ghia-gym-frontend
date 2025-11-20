import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import { Box as MuiBox } from '@mui/material';
import { Star } from '@mui/icons-material';
import { COLORS } from "../../assets/themeColors";

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.9 }
  50% { transform: scale(1.06); opacity: 1 }
  100% { transform: scale(1); opacity: 0.9 }
`;

const sparklePop = keyframes`
  0% { transform: translateY(0) scale(0.1); opacity: 0; }
  40% { transform: translateY(-10px) scale(1.25); opacity: 1; }
  100% { transform: translateY(-18px) scale(0.9); opacity: 0; }
`;

const overlayFloat = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;


const NewArrivalsSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [animationsEnabled] = React.useState<boolean>(() => {
    try {
      const v = localStorage.getItem('footerAnimationsEnabled');
      return v === null ? true : v === 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(24 * 60 * 60);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        bgcolor: COLORS.GYM_BG,
        backgroundImage: COLORS.GYM_GRADIENT,
        backgroundSize: '200% 200%',
        color: COLORS.textPrimary,
        py: { xs: 2, md: 3 },
        margin: 0,
        padding: 0,
        borderRadius: 2,
      }}
    >
      {/* subtle animated overlay */}
      <Box
          aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `radial-gradient(circle at 10% 30%, rgba(255,204,112,0.08), transparent 20%), radial-gradient(circle at 70% 70%, rgba(168,81,192,0.07), transparent 18%)`,
          backgroundSize: '180% 180%',
          animation: animationsEnabled ? `${overlayFloat} 28s linear infinite` : 'none',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          opacity: 0.85,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "fit-content",
          animation: animationsEnabled ? `${scrollAnimation} 22s linear infinite` : 'none',
          "& > div": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        {[...Array(2)].map((_, outerIndex) => (
          <Box
            key={`group-${outerIndex}`}
            sx={{
              display: "flex",
              gap: 0,
            }}
          >
            {[...Array(4)].map((_, index) => (
              <Box
                key={`${outerIndex}-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, md: 4 },
                  mx: { xs: 2, md: 4 },
                }}
              >
                {/* wrapper to position sparkles */}
                <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: COLORS.textPrimary,
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  🔥 Limited Time Offer: Join Today & Save
                </Typography>
                {/* Cute animated sparkles - accessible and subtle */}
                <MuiBox
                  component="span"
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    width: 18,
                    height: 18,
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.GYM_ACCENT || COLORS.PURPLE_ACCENT,
                    right: -8,
                    top: -6,
                    transformOrigin: 'center bottom',
                    animation: animationsEnabled ? `${sparklePop} 2200ms ease-in-out infinite` : 'none',
                    animationDelay: `${index * 300}ms`,
                    '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
                  }}
                >
                  <Star sx={{ fontSize: 14, color: 'inherit' }} />
                </MuiBox>
                <MuiBox
                  component="span"
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    width: 12,
                    height: 12,
                    fontSize: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.textPrimary,
                    right: -20,
                    top: -2,
                    transformOrigin: 'center bottom',
                    animation: animationsEnabled ? `${sparklePop} 2600ms ease-in-out infinite` : 'none',
                    animationDelay: `${120 + index * 420}ms`,
                    '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
                  }}
                >
                  <Star sx={{ fontSize: 10, color: 'inherit' }} />
                </MuiBox>
              </Box>
                <Typography
                  sx={{
                    color: COLORS.textPrimary,
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    fontFamily: "monospace",
                    ml: { xs: 1, md: 2 },
                    bgcolor: 'rgba(0,0,0,0.06)',
                    px: 1,
                    borderRadius: 1,
                    fontWeight: 600,
                    }}
                  role="timer"
                  aria-live="polite"
                >
                  {formatTimeLeft(timeLeft)}
                </Typography>
                <Box
                  component="span"
                  onClick={resetTimer}
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: COLORS.GYM_ACCENT,
                    borderRadius: "50%",
                    mx: { xs: 1, md: 2 },
                    cursor: "pointer",
                    animation: animationsEnabled ? `${pulse} 3.4s ease-in-out infinite` : 'none',
                    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                    '&:hover': {
                      transform: "scale(1.2)",
                      transition: "transform 0.2s",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NewArrivalsSection;
