import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const BackgroundWrapper = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh; /* Cambiamos a vh */
  min-height: 100vh; /* Aseguramos altura mínima */
  min-height: calc(var(--vh, 1vh) * 100); /* Usamos la variable personalizada */
  z-index: 0;
  background: linear-gradient(45deg, #0f172a, #1e293b, #334155);
  background-size: 400% 400%;
  background-attachment: fixed; /* Fijamos el fondo */
  -webkit-overflow-scrolling: touch; /* Mejor scroll en iOS */
`;

const AnimatedBackground = () => {
  const springs = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000 },
    loop: true,
  });

  return <BackgroundWrapper style={springs} />;
};

export default AnimatedBackground;