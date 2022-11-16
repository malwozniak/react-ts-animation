import React from 'react';
import styled from 'styled-components';

import { device } from '../device';
import AnimationTypes from './AnimationTypes';
import { Animation } from '../types/animation';

type AnimationProfileProps = {
  animation: Animation;
  description: string;
};

function AnimationProfile({ animation, description }: AnimationProfileProps) {
  return (
    <Profile>
      <img width="140" src={animation.sprites.front_default} />
      <Attrs>
        <div>Height: {animation.height / 10}m</div>
        <div>Weight: {animation.weight / 10}kg</div>
      </Attrs>
    </Profile>
  );
}

const Profile = styled.div`
  width: 40%;
`;

const Attrs = styled.div`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;

  @media ${device.laptop} { 
    text-align: left;
     margin-bottom: 0;
  }
`;

export default AnimationProfile;
