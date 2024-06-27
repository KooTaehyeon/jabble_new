'use client';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import Image from 'next/image';
export default function SearchResult({
  results,
  className,
  type,
  callback,
}: any) {
  // type = Artists, Archive

  const router = useRouter();

  const getResult = (results: any) => {
    if (results?.length > 0) {
      if (type === 'Artists') {
        return results.map((artist: any) => {
          return (
            <div
              className='userProfile'
              key={artist.user_idx}
              onClick={() => {
                router.push(`/artist/${artist.user_idx}`);
                callback && callback();
              }}
            >
              <Image
                width={32}
                height={32}
                src={
                  artist.user_profile ||
                  artist.member_profile ||
                  'images/userImage.svg'
                }
                alt='artist_image'
              />
              <span className='name'>{artist.user_name}</span>
              <span className='occupation'>{artist.job_detail}</span>
            </div>
          );
        });
      } else if (type === 'Archive') {
        return results.map((archive: any) => {
          return (
            <div
              className='archiveProfile'
              key={archive.archive_idx}
              onClick={() => {
                router.push(`/archive/${archive.archive_idx}`);
                callback && callback();
              }}
            >
              <Image
                width={44}
                height={32}
                src={archive.img_url}
                alt='archiveProfile_image'
              />
              <span className='title'>{archive.archive_name}</span>
              <span className='brand'>{archive.archive_brand}</span>
            </div>
          );
        });
      }
    } else {
      return <div className='noResult'>검색결과가 없습니다</div>;
    }
  };

  return <Div className={className}>{getResult(results)}</Div>;
}

const Div = styled.div`
  .noResult {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.02px;
    color: #bbb;
    text-align: left;
    margin-top: 22px;
  }

  .archiveProfile {
    margin-top: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;

    > img {
      display: inline-block;
      width: 44px;
      min-width: 44px;
      height: 32px;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 12px;
    }

    .title {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: -0.04px;
      max-width: 241px;
      width: 100%;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .brand:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 10px;
      background-color: #b7b7b7;
    }

    .brand {
      font-family: Montserrat;
      font-size: 12px;
      font-weight: 500;
      color: #999;
      width: 101px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: left;
    }
  }

  .userProfile {
    margin-top: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;

    > img {
      display: inline-block;
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 12px;
    }

    .name {
      font-family: Pretendard;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: -0.04px;
    }

    .name:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 10px;
      background-color: #b7b7b7;
    }

    .occupation {
      font-family: Montserrat;
      font-size: 12px;
      font-weight: 500;
      color: #999;
    }
  }
`;
