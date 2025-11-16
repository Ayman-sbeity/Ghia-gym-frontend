import Box from "@mui/material/Box";
import ProductCard from "./productsPageSections/ProductCard";
import ProductFilters from "./productsPageSections/ProductFilters";
import { useState, useMemo, useEffect } from "react";
import CustomLabel from "../components/common/CustomLabel";
import { COLORS } from "../assets/themeColors";
import {
  Drawer,
  IconButton,
  Alert,
  Button,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchItems } from "../services/api";
import type { Item } from "../services/api";
import { useCachedData } from "../hooks/useCachedData";

export default function ProductsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    sort: "",
    category: "",
  });
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchOptions = {
    showAll: true,
    minPrice: priceRange.min > 0 ? priceRange.min : undefined,
    maxPrice: priceRange.max < 1000 ? priceRange.max : undefined,
    sort: selectedFilters.sort || undefined,
    category: selectedFilters.category || undefined,
  };

  const cacheKey = `products-${priceRange.min}-${priceRange.max}-${selectedFilters.sort}-${selectedFilters.category}`;

  const {
    data: fetchedProducts,
    loading,
    error,
    refresh: refreshProducts,
  } = useCachedData<Item[]>(
    cacheKey,
    (signal) => fetchItems(fetchOptions, { signal }),
    5 * 60 * 1000
  );
  const { data: allProducts, loading: allProductsLoading } = useCachedData<
    Item[]
  >("all-items", (signal) => fetchItems({}, { signal }), 5 * 60 * 1000);

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const filteredProducts = useMemo(() => {
    const source = fetchedProducts ?? allProducts;
    if (!source) return [];

    let filtered = source.filter((product: Item) => {
      const price = product.price;
      const matchesCategory = selectedFilters.category
        ? product.category === selectedFilters.category
        : true;
      return (
        price >= priceRange.min &&
        price <= priceRange.max &&
        product.isActive !== false &&
        matchesCategory
      );
    });

    if (selectedFilters.sort === "price_asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (selectedFilters.sort === "price_desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [fetchedProducts, allProducts, selectedFilters, priceRange]);

  const showFullPageSkeleton =
    (loading || allProductsLoading) &&
    fetchedProducts == null &&
    allProducts == null;

  const [skipSkeletonAfterDelay, setSkipSkeletonAfterDelay] = useState(false);

  useEffect(() => {
    if (!showFullPageSkeleton) {
      setSkipSkeletonAfterDelay(false);
      return;
    }

    const timeout = setTimeout(() => {
      setSkipSkeletonAfterDelay(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [showFullPageSkeleton]);

  const shouldRenderSkeleton = showFullPageSkeleton && !skipSkeletonAfterDelay;

  if (shouldRenderSkeleton) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 4 },
          p: { xs: 0, sm: 3 },
          m: 0,
          width: "100%",
          boxSizing: "border-box",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          overflowX: "hidden",
          overflowY: { xs: "auto", md: "visible" },
          height: { xs: "calc(100vh - 60px)", md: "auto" },
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 280,
            flexShrink: 0,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Skeleton
              variant="text"
              height={32}
              width="80%"
              sx={{ mb: 2, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
            />
            <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ mb: 3, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
            />
            <Skeleton variant="text" height={20} width="70%" sx={{ mb: 1 }} />
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ mb: 3, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
            />
            <Skeleton variant="text" height={20} width="65%" sx={{ mb: 1 }} />
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ mb: 3 }}>
            <Skeleton
              variant="text"
              height={40}
              width="30%"
              sx={{ mb: 2, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
            />
            <Skeleton
              variant="text"
              height={24}
              width="20%"
              sx={{ backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: { xs: 2, sm: 3 },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    backgroundColor: COLORS.PURPLE_ACCENT + "80",
                  }}
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="70%"
                  sx={{ mb: 0.5, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
                />
                <Skeleton
                  variant="text"
                  height={18}
                  width="40%"
                  sx={{ mb: 0.5, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="30%"
                  sx={{ backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert
          severity="error"
          sx={{ mb: 2, maxWidth: 500, mx: "auto" }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={refreshProducts}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 4 },
        p: { xs: 4, sm: 3 },
        overflowY: "auto",
        overflowX: "hidden",
        width: { xs: "100%", sm: "100%" },
        mx: { xs: 0, sm: "0px" },
        flexShrink: 0,
        height: { xs: "calc(100% - 60px)", sm: "auto" },
        pb: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: 280,
          flexShrink: 0,
        }}
      >
        <ProductFilters
          onFilterChange={handleFilterChange}
          onPriceRangeChange={handlePriceRangeChange}
          selectedFilters={selectedFilters}
          priceRange={priceRange}
        />
      </Box>

      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={toggleMobileFilters}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: { xs: "100%", sm: 380 },
            height: "100%",
            boxSizing: "border-box",
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: "0", sm: "0 16px 16px 0" },
            boxShadow: 3,
          },
          "& .MuiBackdrop-root": {
            backgroundColor: COLORS.FOOTER_BG_SOLID + "33",
          },
        }}
        PaperProps={{
          elevation: 0,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            borderBottom: "1px solid",
            borderColor: COLORS.FOOTER_DIVIDER,
            pb: 2,
          }}
        >
          <CustomLabel text="FILTERS" variant="h6" fontWeight={600} />
          <IconButton
            onClick={toggleMobileFilters}
            size="small"
            sx={{
              bgcolor: COLORS.WhiteBackground,
              "&:hover": {
                bgcolor: COLORS.WhiteBackground,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            display: "block",
            width: { xs: "100%", sm: "100%" },
            // maxWidth: 380,
            mx: { xs: 0, sm: "0px" },
            flexShrink: 0,
            height: { xs: "calc(100% - 60px)", sm: "auto" },
            pb: 2,
            boxSizing: "border-box",
          }}
        >
          <ProductFilters
            onFilterChange={handleFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
            selectedFilters={selectedFilters}
            priceRange={priceRange}
          />
        </Box>
      </Drawer>
      {/* Content area: header, tools, product list */}
      <Box sx={{ flex: 1, minWidth: 0, px: { xs: 0, md: 0 } }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            // alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <CustomLabel
              text="PRODUCTS"
              variant="h4"
              fontWeight={600}
              sx={{
                letterSpacing: "0.5px",
                fontSize: { xs: "1.5rem", sm: "2rem" },
                background: COLORS.GRADIENT_TEXT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            />
            {loading && allProducts ? (
              <CircularProgress size={18} sx={{ ml: 1 }} />
            ) : null}
            <IconButton
              onClick={toggleMobileFilters}
              sx={{ display: { xs: "flex", md: "none" } }}
              aria-label="open filters"
            >
              <FilterListIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <CustomLabel
              text={`${filteredProducts.length} PRODUCTS`}
              variant="body2"
              color={COLORS.FOOTER_LINK}
              fontSize="0.875rem"
            />
            <IconButton
              size="small"
              onClick={refreshProducts}
              sx={{ ml: 1, color: COLORS.PURPLE_PRIMARY, '&:hover': { color: COLORS.PURPLE_DEEP } }}
              aria-label="refresh products"
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Error message for products only */}
        {error && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Alert
              severity="error"
              sx={{ mb: 2, maxWidth: 500, mx: "auto" }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={refreshProducts}
                  startIcon={<RefreshIcon />}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        )}

        {showFullPageSkeleton ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: { xs: 2, sm: 3 },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    backgroundColor: COLORS.PURPLE_ACCENT + "80",
                  }}
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="70%"
                  sx={{ mb: 0.5, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
                />
                <Skeleton
                  variant="text"
                  height={18}
                  width="40%"
                  sx={{ mb: 0.5, backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="30%"
                  sx={{ backgroundColor: COLORS.PURPLE_ACCENT + "80" }}
                />
              </Box>
            ))}
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Box>
            <CustomLabel
              text="No products found"
              variant="h6"
              color={COLORS.FOOTER_LINK}
              gutterBottom
            />
            <CustomLabel
              text="Try adjusting your filters or check back later"
              variant="body1"
              color={COLORS.FOOTER_LINK}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={refreshProducts}
              size="small"
              sx={{
                background: COLORS.GRADIENT_CTA,
                color: COLORS.textPrimary,
                borderRadius: 1,
                '&:hover': { background: COLORS.GRADIENT_CTA_HOVER },
                textTransform: 'none',
              }}
            >
              Refresh Products
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 4, sm: 3 },
            }}
          >
            {filteredProducts.map((product: Item) => (
              <Box
                key={product._id || product.id}
                sx={{ width: "100%", px: { xs: 0, sm: 0 } }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
