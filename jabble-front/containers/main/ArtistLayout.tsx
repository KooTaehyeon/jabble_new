'use client';
import React from 'react';
import styled from '@emotion/styled';
import MainArtistCard from '../artist/mainArtistCard';

const ArtistLayout = () => {
  return (
    <Container>
      <Title>Discover Creative Artists</Title>
      <SubTitle>
        카테고리별 크리에이티브 제작, 촬영 전문 아티스트들을 찾아보세요
      </SubTitle>

      <MainArtistCard artists={artists} />
    </Container>
  );
};

export default ArtistLayout;
const artists = [
  {
    id: 1,
    name: '김이박',
    profession: 'Photographer',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 2,
    name: '김이박',
    profession: 'Model',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 3,
    name: '김이박',
    profession: 'Videographer',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 4,
    name: '김이박',
    profession: 'Hair Stylist',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 5,
    name: '김이박',
    profession: 'Makeup Artist',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 6,
    name: '김이박',
    profession: 'Stylist',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 7,
    name: '김이박',
    profession: 'Model',
    imageUrl: '/images/telegramShare.png',
  },
  {
    id: 8,
    name: '김이박',
    profession: 'Photographer',
    imageUrl: '/images/telegramShare.png',
  },
];
const Container = styled.div`
  padding: 32px;
  width: 70%;
  height: 500px;
  margin: 0 auto;
  /* background-color: #f9f9f9; */
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  color: grey;
  margin-bottom: 32px;
`;
