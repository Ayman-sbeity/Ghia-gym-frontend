import React from "react";
import { COLORS } from "../../assets/themeColors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../productsPageSections/ProductCard";
import { useCachedData } from "../../hooks/useCachedData";
import { fetchItems, type Item } from "../../services/api";
import { Skeleton, Alert } from "@mui/material";

const FeaturedProductsSection: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: products,
    loading,
    error,
  } = useCachedData<Item[]>(
    "featured-classes",
    (signal) => fetchItems({ showAll: false }, { signal }),
    5 * 60 * 1000
  );

  const handleViewAllProducts = () => {
    navigate("/products");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
    hover: {
      y: -6,
      scale: 1.02,
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
  } as const;

  if (error) {
    return (
      <Box
        component="section"
        sx={{
          width: "100%",
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          margin: 0,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto" }}>
          Unable to load featured classes. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        margin: 0,
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 65%), linear-gradient(90deg, ${COLORS.PURPLE_DEEP} 0%, ${COLORS.PURPLE_ACCENT} 100%)`,
        background: `transparent`,
        color: COLORS.textPrimary,
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              color: COLORS.textPrimary,
            }}
          >
            Featured Classes & Programs
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: "rgba(255,255,255,0.85)",
              maxWidth: "600px",
              mx: "auto",
              mb: 3,
            }}
          >
            Discover our most popular fitness programs and training packages
            designed to help you achieve your goals
          </Typography>
        </Box>
      </motion.div>

      {loading ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, md: 3 },
              maxWidth: "1200px",
              mx: "auto",
              mb: 4,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Box key={index}>
                <Skeleton
                  variant="rectangular"
                  height={250}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(192,132,252,0.5)",
                  }}
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="80%"
                  sx={{ mb: 1, backgroundColor: "rgba(192,132,252,0.5)" }}
                />
                <Skeleton
                  variant="text"
                  height={20}
                  width="60%"
                  sx={{ mb: 1, backgroundColor: "rgba(192,132,252,0.5)" }}
                />
                <Skeleton
                  variant="text"
                  height={32}
                  width="40%"
                  sx={{ backgroundColor: "rgba(192,132,252,0.5)" }}
                />
              </Box>
            ))}
          </Box>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, md: 3 },
              maxWidth: "1200px",
              mx: "auto",
              mb: 4,
            }}
          >
            {products?.slice(0, 3).map((product) => (
              <motion.div
                key={product._id || product.id}
                variants={itemVariants}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </Box>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            variants={itemVariants}
            whileHover={itemVariants.hover}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handleViewAllProducts}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1.1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundImage: `linear-gradient(90deg, ${COLORS.PURPLE_DEEP} 0%, ${COLORS.PURPLE_ACCENT} 100%)`,
                color: COLORS.textPrimary,
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  transform: "translateY(-2px)",
                  backgroundImage: `linear-gradient(90deg, ${COLORS.PURPLE_DEEP} 0%, ${COLORS.PURPLE_PRIMARY} 100%)`,
                },
              }}
            >
              View All Classes
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FeaturedProductsSection;
