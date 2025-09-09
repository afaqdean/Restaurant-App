import RestaurantHero from "@/components/customer/RestaurantHero";
import RestaurantFeatures from "@/components/customer/RestaurantFeatures";
import AboutUsSection from "@/components/customer/AboutUsSection";
import CustomerReviews from "@/components/customer/CustomerReviews";
import RestaurantCTA from "@/components/customer/RestaurantCTA";
import RestaurantFooter from "@/components/ui/RestaurantFooter";
import { HomePageContent } from "@/components/customer/HomePageContent";
import Navigation from "@/components/ui/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="grow">
        <RestaurantHero />
        <RestaurantFeatures />
        <HomePageContent />
        <AboutUsSection />
        <CustomerReviews />
        <RestaurantCTA />
      </main>
      <RestaurantFooter />
    </>
  );
}
