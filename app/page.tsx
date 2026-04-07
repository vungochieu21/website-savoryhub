import Navbar from "@/components/Navbar"; 
import Banner from "@/components/Banner"; 
import DealCardMini from "@/components/DealCardMini"; 
import RestaurantList from "@/components/RestaurantList"; 
import Footer from "@/components/Footer"; 
export default function Home() { 
  return ( 
  <> 
    <Navbar /> 
    <Banner /> 
    <DealCardMini /> 
    <RestaurantList /> 
    <Footer /> 
  </> 
  ); 
}