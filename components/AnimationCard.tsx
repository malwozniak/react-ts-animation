import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import AnimationProfile from './AnimationProfile';
import AnimationTypes from './AnimationTypes';
import { device } from '../device';
import { Animation } from '../types/animation';

type AnimationCardProps = {
  Animation: Animation;
};

function AnimationCard({ Animation }: AnimationCardProps) {
  const [AnimationDescription, setAnimationDescription] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnimationSpecies = async () => {
      const result = await fetch(Animation.species.url);
      return await result.json();
    };

    fetchAnimationSpecies().then((data) => {
      const description = data.flavor_text_entries
        .filter((item) => {
          return item.language.name === 'en';
        })[0]
        .flavor_text.replace(/[^a-zA-Z é . , ']/g, ' ');
      setAnimationDescription(description);
      setIsReady(true);
    });
  }, []);

  return (
    <AnimationCardContainer>
      {isReady && (
        <div>
          <AnimationCardTitle>{Animation.name}</AnimationCardTitle>
          <AnimationTypes types={Animation.types} />
          <DoubleColumnCard>
            <AnimationProfile
              Animation={Animation}
              description={AnimationDescription}
            />
            <StatsWrapper></StatsWrapper>
          </DoubleColumnCard>
        </div>
      )}
      {!isReady && (
        <div className="d-flex justify-content-center mb-4">
          <Loader
            type="Puff"
            color="#CCC"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}
    </AnimationCardContainer>
  );
}

const AnimationCardContainer = styled.div`
  font-size: 1.5em;
  border-radius: 4px;
`;

const AnimationCardTitle = styled.h3`
  text-transform: capitalize;
  text-align: center;
`;

const DoubleColumnCard = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} { 
   flex-direction: row; 
  }
`;

const StatsWrapper = styled.div`
  @media ${device.laptop} { 
    width: 60%;
  }
`;

const AnimationDescription = styled.div`
  font-size: 16px;
  text-align: left;
  margin-top: 20px;
`;

export default AnimationCard;
