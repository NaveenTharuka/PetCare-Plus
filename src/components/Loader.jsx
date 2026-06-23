import React from 'react';
import styled from 'styled-components';

const Loader = ({ fullPage = true }) => {
  return (
    <StyledWrapper className={fullPage ? 'full-page' : 'inline'}>
      <div className="loader-container">
        <div className="jelly-triangle">
          <div className="jelly-triangle__dot" />
          <div className="jelly-triangle__traveler" />
        </div>
        <svg width={0} height={0} className="jelly-maker">
          <defs>
            <filter id="uib-jelly-triangle-ooze">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7.3" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="ooze" />
              <feBlend in="SourceGraphic" in2="ooze" />
            </filter>
          </defs>
        </svg>
        <p className="loader-text">Loading...</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  &.full-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(251, 249, 247, 0.9);
    backdrop-filter: blur(4px);
  }

  &.inline {
    display: inline-block;
    padding: 2rem;
  }

  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 2rem;
  }

  .jelly-triangle {
    --uib-size: 4rem;
    --uib-speed: 1.75s;
    --uib-color: #7b5749;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
    filter: url('#uib-jelly-triangle-ooze');
  }

  .jelly-triangle__dot,
  .jelly-triangle::before,
  .jelly-triangle::after {
    content: '';
    position: absolute;
    width: 33%;
    height: 33%;
    background: var(--uib-color);
    border-radius: 100%;
    box-shadow: 0 0 30px rgba(123, 87, 73, 0.4);
  }

  .jelly-triangle__dot {
    top: 6%;
    left: 30%;
    animation: grow7132 var(--uib-speed) ease infinite;
  }

  .jelly-triangle::before {
    bottom: 6%;
    right: 0;
    animation: grow7132 var(--uib-speed) ease calc(var(--uib-speed) * -0.666)
      infinite;
  }

  .jelly-triangle::after {
    bottom: 6%;
    left: 0;
    animation: grow7132 var(--uib-speed) ease calc(var(--uib-speed) * -0.333)
      infinite;
  }

  .jelly-triangle__traveler {
    position: absolute;
    top: 6%;
    left: 30%;
    width: 33%;
    height: 33%;
    background: var(--uib-color);
    border-radius: 100%;
    animation: triangulate6214 var(--uib-speed) ease infinite;
  }

  .jelly-maker {
    width: 0;
    height: 0;
    position: absolute;
  }

  .loader-text {
    font-family: 'Be Vietnam Pro', sans-serif;
    font-size: 1rem;
    color: #5e5f5d;
    letter-spacing: 0.05em;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes triangulate6214 {
    0%,
    100% {
      transform: none;
    }

    33.333% {
      transform: translate(120%, 175%);
    }

    66.666% {
      transform: translate(-95%, 175%);
    }
  }

  @keyframes grow7132 {
    0%,
    100% {
      transform: scale(1.5);
    }

    20%,
    70% {
      transform: none;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .jelly-triangle {
      --uib-size: 3rem;
    }
    
    .loader-text {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    .jelly-triangle {
      --uib-size: 2.5rem;
    }
    
    .loader-text {
      font-size: 0.75rem;
    }
  }
`;

export default Loader;