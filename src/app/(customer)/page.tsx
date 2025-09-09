import { getCurrentUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import RestaurantHero from "@/components/customer/RestaurantHero";
import RestaurantFeatures from "@/components/customer/RestaurantFeatures";
import RestaurantCTA from "@/components/customer/RestaurantCTA";

export default async function CustomerHomePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <>
      <RestaurantHero />
      <RestaurantFeatures />
      <RestaurantCTA />
    </>
  );
}
