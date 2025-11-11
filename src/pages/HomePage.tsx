import ArtisticCarousel from "../components/ArtisticCarousel";
import AboutUsSection from "./homePagesSections/AboutUsSection";
import NewArrivalsSection from "./homePagesSections/NewArrivalsSection";
import FeaturedProductsSection from "./homePagesSections/FeaturedProductsSection";
import TrainerProfilesSection from "./homePagesSections/TrainerProfilesSection";

export default function HomePage() {
  return (
    <>
      <ArtisticCarousel />
      <AboutUsSection />
      <NewArrivalsSection />
      <FeaturedProductsSection />
      <TrainerProfilesSection />


    </>
  );
}
