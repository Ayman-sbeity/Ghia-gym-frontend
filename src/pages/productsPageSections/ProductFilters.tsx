const categoryOptions = [
  { name: "Necklaces", value: "Necklaces" },
  { name: "Rings", value: "Rings" },
  { name: "Bracelets", value: "Bracelets" },
  { name: "Earrings", value: "Earrings" },
  { name: "Accessories", value: "Accessories" },
];
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Divider,
  Slider,
  TextField,
  Button,
  Stack,
  RadioGroup,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomLabel from "../../components/common/CustomLabel";
import { COLORS } from "../../assets/themeColors";
import { useState, useEffect } from "react";

interface ProductFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
  selectedFilters: Record<string, string>;
  priceRange: { min: number; max: number };
}

const sortOptions = [
  { name: "Price: Low to High", value: "price_asc" },
  { name: "Price: High to Low", value: "price_desc" },
];

const ProductFilters = ({
  onFilterChange,
  onPriceRangeChange,
  selectedFilters,
  priceRange,
}: ProductFiltersProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<{
    min: number;
    max: number;
  }>(priceRange);
  const [sliderValue, setSliderValue] = useState<number[]>([
    priceRange.min,
    priceRange.max,
  ]);

  // Multi-select categories
  const selectedCategories: string[] = selectedFilters.category
    ? selectedFilters.category.split(",")
    : [];

  const allCategoryValues = categoryOptions.map((option) => option.value);
  const isAllSelected = selectedCategories.length === allCategoryValues.length;

  const handleCategoryChange = (category: string) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    onFilterChange("category", updatedCategories.join(","));
  };

  const handleSelectAllCategories = () => {
    if (isAllSelected) {
      onFilterChange("category", "");
    } else {
      onFilterChange("category", allCategoryValues.join(","));
    }
  };

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValue(newValue);
      setLocalPriceRange((prev) => ({
        ...prev,
        min: newValue[0],
        max: newValue[1],
      }));
    }
  };

  const handleSliderChangeCommitted = (
    _: unknown,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      onPriceRangeChange(newValue[0], newValue[1]);
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLocalPriceRange((prev) => ({ ...prev, min: value }));
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLocalPriceRange((prev) => ({ ...prev, max: value }));
    }
  };

  const applyPriceRange = () => {
    onPriceRangeChange(localPriceRange.min, localPriceRange.max);
    setSliderValue([localPriceRange.min, localPriceRange.max]);
  };

  // disable the apply button when the range hasn't changed
  const isApplyDisabled =
    localPriceRange.min === priceRange.min &&
    localPriceRange.max === priceRange.max;

  // sync if parent changes priceRange externally
  // keep the slider and inputs in sync when the selected price range changes from outside
  useEffect(() => {
    setLocalPriceRange(priceRange);
    setSliderValue([priceRange.min, priceRange.max]);
  }, [priceRange.min, priceRange.max]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 280 },
        maxWidth: 380,
        boxSizing: "border-box",
        background: COLORS.WhiteBackground,
        border: `1px solid ${COLORS.PURPLE_PRIMARY}20`,
        borderRadius: 2,
        padding: 2,
        boxShadow: `0 12px 40px ${COLORS.PURPLE_PRIMARY}14`,
      }}
    >
      <CustomLabel
        text="SHOPPING OPTIONS"
        variant="h6"
        fontWeight={600}
        sx={{
          mb: 2,
          background: COLORS.GRADIENT_TEXT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      />

      <Accordion
        defaultExpanded
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "transparent",
            "& .MuiAccordionSummary-content": { margin: "12px 0" },
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: COLORS.PURPLE_PRIMARY,
            },
          }}
        >
          <CustomLabel
            text="CATEGORY"
            fontWeight={500}
            color={COLORS.PURPLE_PRIMARY}
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: COLORS.activeBackground, borderRadius: 1 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllSelected}
                indeterminate={selectedCategories.length > 0 && !isAllSelected}
                onChange={handleSelectAllCategories}
                size="small"
                sx={{
                  color: COLORS.PURPLE_PRIMARY,
                  "&.Mui-checked": { color: COLORS.PURPLE_PRIMARY },
                }}
              />
            }
            label={
              <CustomLabel
                text="Select All"
                variant="body2"
                color={COLORS.FOOTER_LINK}
              />
            }
            sx={{
              "&:hover .MuiTypography-root": { color: COLORS.PURPLE_PRIMARY },
            }}
          />
          {categoryOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={selectedCategories.includes(option.value)}
                  onChange={() => handleCategoryChange(option.value)}
                  size="small"
                  sx={{
                    color: COLORS.PURPLE_PRIMARY,
                    "&.Mui-checked": { color: COLORS.PURPLE_PRIMARY },
                  }}
                />
              }
              label={
                <CustomLabel
                  text={option.name}
                  variant="body2"
                  color={COLORS.typographyColor}
                />
              }
              sx={{
                "&:hover .MuiTypography-root": { color: COLORS.PURPLE_PRIMARY },
              }}
            />
          ))}
        </AccordionDetails>
        <Divider />
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "transparent",
            "& .MuiAccordionSummary-content": { margin: "12px 0" },
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: COLORS.PURPLE_PRIMARY,
            },
          }}
        >
          <CustomLabel
            text="SORT BY PRICE"
            fontWeight={500}
            color={COLORS.PURPLE_PRIMARY}
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: COLORS.activeBackground, borderRadius: 1 }}
        >
          <RadioGroup
            value={selectedFilters.sort || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFilterChange("sort", e.target.value)
            }
          >
            <FormControlLabel
              value=""
              control={<Radio size="small" />}
              label={<CustomLabel text="Fetch All" variant="body2" />}
              sx={{
                color: COLORS.PURPLE_PRIMARY,
                "&.Mui-checked": { color: COLORS.PURPLE_PRIMARY },
                "&:hover .MuiTypography-root": { color: COLORS.PURPLE_PRIMARY },
              }}
            />
            {sortOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" />}
                label={
                  <CustomLabel
                    text={option.name}
                    variant="body2"
                    color={COLORS.typographyColor}
                  />
                }
                sx={{
                  color: COLORS.PURPLE_PRIMARY,
                  "&.Mui-checked": { color: COLORS.PURPLE_PRIMARY },
                  "&:hover .MuiTypography-root": {
                    color: COLORS.PURPLE_PRIMARY,
                  },
                }}
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
        <Divider />
      </Accordion>

      <Accordion
        defaultExpanded
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "transparent",
            "& .MuiAccordionSummary-content": { margin: "12px 0" },
            "& .MuiAccordionSummary-expandIconWrapper": {
              color: COLORS.PURPLE_PRIMARY,
            },
          }}
        >
          <CustomLabel
            text="PRICE RANGE"
            fontWeight={500}
            color={COLORS.PURPLE_PRIMARY}
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: COLORS.activeBackground, borderRadius: 1 }}
        >
          <Box sx={{ px: 1 }}>
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              sx={{
                mt: 3,
                mb: 2,
                "& .MuiSlider-track": {
                  backgroundColor: COLORS.PURPLE_PRIMARY,
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: COLORS.PURPLE_PRIMARY,
                },
                "& .MuiSlider-rail": { opacity: 0.28 },
              }}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              sx={{ mb: 2 }}
            >
              <TextField
                label="Min"
                type="number"
                size="small"
                value={localPriceRange.min}
                onChange={handleMinPriceChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: COLORS.FOOTER_LINK },
                  },
                  "& .MuiInputLabel-root": { color: COLORS.FOOTER_LINK },
                }}
              />
              <TextField
                label="Max"
                type="number"
                size="small"
                value={localPriceRange.max}
                onChange={handleMaxPriceChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: COLORS.FOOTER_LINK },
                  },
                  "& .MuiInputLabel-root": { color: COLORS.FOOTER_LINK },
                }}
              />
            </Stack>

            <Button
              variant="contained"
              fullWidth
              onClick={applyPriceRange}
              size="small"
              disabled={isApplyDisabled}
              sx={{
                background: COLORS.GRADIENT_CTA,
                borderRadius: 2,
                boxShadow: `0 8px 30px ${COLORS.PURPLE_PRIMARY}22`,
                "&:hover": { background: COLORS.GRADIENT_CTA_HOVER },
                "&.Mui-disabled": { opacity: 0.6 },
              }}
            >
              Apply
            </Button>
          </Box>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </Box>
  );
};
export default ProductFilters;
