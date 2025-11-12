import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          AllCut – Sistema de Agendamento para Cortadoras Laser
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sua plataforma para agendar e gerenciar cortadoras laser.
        </p>
        <Button variant="hero" size="xl" asChild>
          <Link to="/cadastro">Cadastrar-se</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
