import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import RestaurantList from "@/components/RestaurantList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <RestaurantList />
      <Footer />
    </>
  );
}