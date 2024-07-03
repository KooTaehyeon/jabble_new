'use client';
import styled from '@emotion/styled';

import Image from 'next/image';
interface artistsData {
  name: string;
  id: number;
  imageUrl: string;
  profession: string;
}
const mainArtistCard = ({ artists }: any) => {
  return (
    <Grid>
      {artists.map((item: artistsData) => {
        return (
          <Card key={item.id}>
            <Image
              style={{ borderRadius: '50%' }}
              width={80}
              height={80}
              src={item.imageUrl}
              alt={item.name}
            />
            <TextBox>
              <Name>{item.name}</Name>
              <Profession>{item.profession}</Profession>
            </TextBox>
          </Card>
        );
      })}
    </Grid>
  );
};

export default mainArtistCard;
const Grid = styled.div`
  display: flex;
  flex-direction: row;
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  flex-flow: row wrap;
  justify-content: space-between;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 15px;
  width: 24%;
`;

// const Avatar = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   margin-bottom: 8px;
// `;
const TextBox = styled.div`
  flex-direction: column;
  margin-left: 15px;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Profession = styled.div`
  font-size: 14px;
  color: grey;
`;
