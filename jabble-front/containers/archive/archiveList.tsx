import styled from '@emotion/styled';
import CreativeItem from './creativeItem';
import { Key } from 'react';

export default function ArchiveList({ archiveDatas }: any) {
  const archiveItem = archiveDatas?.map(
    (archiveData: { archive_idx: Key | null | undefined }): any => {
      return (
        <CreativeItem
          key={archiveData.archive_idx}
          creativeData={archiveData}
          hoverImage={true}
          redirect={undefined}
        ></CreativeItem>
      );
    }
  );

  return <Div>{archiveItem}</Div>;
}

const Div = styled.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 56px 26px;
  @media (max-width: 1100px) {
    grid-gap: 24px 14px;
  }
  @media (max-width: 840px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 56px 26px;
  }
  @media (max-width: 560px) {
    grid-gap: 24px 14px;
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;
