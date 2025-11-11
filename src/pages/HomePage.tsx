import Box from "@mui/material/Box";
import ArtisticCarousel from "../components/ArtisticCarousel";
import AboutUsSection from "./homePagesSections/AboutUsSection";
import NewArrivalsSection from "./homePagesSections/NewArrivalsSection";
import FeaturedProductsSection from "./homePagesSections/FeaturedProductsSection";
import SpecialOffersSection from "./homePagesSections/SpecialOffersSection";

export default function HomePage() {
  return (
    <>
      <ArtisticCarousel />
      <AboutUsSection />
      <NewArrivalsSection />
      <FeaturedProductsSection />
      {/* 
      <SpecialOffersSection /> */}
    </>
  );
}
