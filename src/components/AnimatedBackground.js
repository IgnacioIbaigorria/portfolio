import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const BackgroundWrapper = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(45deg, #0f172a, #1e293b, #334155);
  background-size: 400% 400%;
  overflow: hidden;
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