import Image from "next/image";
import Banner from "@/components/Banner"
import TopRatedDoctors from "@/components/TopRatedDoctors";
import Stats from "@/components/Stats";
import Specializations from "@/components/Specializations"; 

export default function Home() {
  return (
    <div>
        < Banner />
        < TopRatedDoctors />
        < Stats />
        < Specializations />
      
    </div>
  );
}
