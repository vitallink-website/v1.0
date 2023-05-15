import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Particle() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: "#fff",
            },
            opacity: {
              value: 0.5,
              anim: {
                enable: true,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "right",
              random: false,
              straight: false,
              out_mode: "out",
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: ["bubble"],
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
    </div>
  );
}
