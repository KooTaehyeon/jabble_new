import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

export default function ArtistCard({
  className,
  artistData,
}: {
  className: string;
  artistData: any;
}) {
  const [isLike, setLike] = useState(artistData.like_check);
  const user = {
    artistData: { user_profile: '' },
  };
  let user_profile = artistData.user_profile
    ? artistData.user_profile
    : 'images/userImage.svg';

  const router = useRouter();

  const likeButton = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: any,
    user: { artistData: { user_profile: string } }
  ) => {
    e.stopPropagation();
    // Your like button logic here
  };

  const routeChange = (artistData: any) => {
    if (className === 'inMypageHome') {
      return;
    }
    let url = `/artist/${artistData.user_idx}`;
    if (router.pathname === url) {
      return;
    }
    router.push(url);
  };

  return (
    <Div className={className} onClick={() => routeChange(artistData)}>
      <div
        className='thumbnailWrapper'
        style={{
          backgroundColor: `${
            artistData.thumbnail ? 'rgba(0, 0, 0, 0.16)' : '#ededed'
          }`,
        }}
      >
        <div
          className='thumbnail'
          style={
            artistData.thumbnail
              ? { backgroundImage: `url(${artistData.thumbnail})` }
              : {}
          }
        ></div>
      </div>
      <div className='artistInfo'>
        <img src={user_profile} alt='artist_image' />
        <div className='name'>{artistData.user_name}</div>
        <div className='occupation'>{artistData.job_detail}</div>
        <div className='location'>{artistData.address_siNm?.split(',')[0]}</div>
        <div
          className='linkButton'
          onClick={(e) => likeButton(e, artistData.user_idx, user)}
        >
          <img
            src={isLike ? 'images/heartFilled.svg' : 'images/heartGray.svg'}
            alt='heart icon'
          />
          좋아요
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  cursor: pointer;

  &:hover {
    .thumbnail {
      transform: scale(1.1);
    }
    .name {
      text-decoration: underline;
    }
  }

  .thumbnailWrapper {
    border-radius: 4px 4px 0 0;
    aspect-ratio: 328 / 186;
    width: 100%;
    overflow: hidden;
  }
  .thumbnail {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    transition: 0.2s;
    overflow: hidden;
    position: relative;
    z-index: -1;
  }

  .artistInfo {
    border: solid 1px #e5e5e5;
    border-top: 0px;
    padding: 0 32px;
    position: relative;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;

    > img {
      position: absolute;
      top: -36px;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
      box-sizing: border-box;
    }
    .name {
      padding: 53px 0 4px;
      font-family: Pretendard;
      font-size: 18px;
      font-weight: bold;
    }
    .occupation {
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 500;
      color: #606063;
    }
    .location {
      padding: 10px 0 18px;
      font-family: Pretendard;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.02px;
      color: #989898;
    }
    .linkButton {
      width: 88px;
      height: 34px;
      border-radius: 17px;
      border: solid 1px #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 13px;
      margin-bottom: 18px;
      box-sizing: border-box;

      font-family: Pretendard;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.02px;
      text-align: center;
      color: #5d5d5d;
      img {
        width: 20px;
        height: 18px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
  }

  @media (max-width: 1200px) {
    .artistInfo {
      padding: 0 18px;
    }
  }

  @media (max-width: 1100px) {
    .artistInfo {
      > img {
        width: 46px;
        height: 46px;
        top: -23px;
      }
      .name {
        padding-top: 37px;
        font-size: 16px;
      }
      .occupation,
      .location {
        font-size: 12px;
      }
      .location {
        padding: 8px 0 12px;
      }
      .linkButton {
        width: 74px;
        height: 30px;
        font-size: 12px;
        padding-left: 10px;
        img {
          width: 15px;
          height: 14px;
          margin-right: 6px;
        }
      }
    }
  }

  @media (max-width: 720px) {
    .thumbnailWrapper {
      aspect-ratio: 156 / 92;
      height: initial;
    }

    .artistInfo {
      padding: 0 32px;
      > img {
        width: 72px;
        height: 72px;
        top: -36px;
      }
      .name {
        padding: 53px 0 4px;
        font-size: 18px;
      }
      .occupation {
        font-size: 14px;
      }

      .location {
        padding: 10px 0 18px;
        font-size: 13px;
      }

      .linkButton {
        width: 88px;
        height: 34px;
        font-size: 13px;
        padding-left: 13px;
        img {
          width: 20px;
          height: 18px;
          margin-right: 8px;
        }
      }
    }
  }
  @media (max-width: 520px) {
    .artistInfo {
      padding: 0 18px;
    }
  }

  @media (max-width: 440px) {
    .artistInfo {
      > img {
        width: 46px;
        height: 46px;
        top: -23px;
      }
      .name {
        padding-top: 37px;
        font-size: 16px;
      }
      .occupation,
      .location {
        font-size: 12px;
      }
      .location {
        padding: 8px 0 12px;
      }
      .linkButton {
        width: 74px;
        height: 30px;
        font-size: 12px;
        padding-left: 10px;
        img {
          width: 15px;
          height: 14px;
          margin-right: 6px;
        }
      }
    }
  }
`;
