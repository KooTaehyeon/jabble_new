'use client';
/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const HeaderBanner = () => {
  return (
    <Banner>
      <ScrollContainer>
        <ScrollText>
          More Connection, More Creatives &nbsp; &nbsp; Creative Artist Agency
          Archive Inspiration &nbsp; &nbsp; More Connection, More Creatives
          &nbsp; &nbsp; Creative Artist Agency Archive Inspiration &nbsp; &nbsp;
          More Connection, More Creatives &nbsp; &nbsp; Creative Artist Agency
          Archive Inspiration &nbsp; &nbsp; More Connection, More Creatives
          &nbsp; &nbsp; Creative Artist Agency Archive Inspiration &nbsp; &nbsp;
          More Connection, More Creatives &nbsp; &nbsp; Creative Artist Agency
          Archive Inspiration &nbsp; &nbsp; More Connection, More Creatives
          &nbsp; &nbsp; Creative Artist Agency Archive Inspiration &nbsp; &nbsp;
        </ScrollText>
      </ScrollContainer>
    </Banner>
  );
};

export default HeaderBanner;

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100vw;
  height: 50px;
  overflow: hidden;
  background: #000;
  user-select: none;
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ScrollText = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scroll} 10s linear infinite;
  font-family: 'Geo-edit';
  font-weight: 500;
  font-style: italic;
  font-size: 16px;
  color: white;
  /* -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white; */
`;
