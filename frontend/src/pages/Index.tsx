import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Description from "@/components/Description";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Description />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
