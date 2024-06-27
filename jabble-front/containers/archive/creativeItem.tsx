import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { GMTtoKSTconverter, getKeyByValue } from '@/lib/converter';

const archiveCategory = {
  LookBook: 1,
  Campaign: 2,
  Editorial: 3,
  Magazine: 4,
  Commercial: 5,
};
interface CreativeItemProps {
  creativeData: any;
  hoverImage: boolean;
  redirect?: string;
}

export default function CreativeItem({
  creativeData,
  hoverImage,
  redirect,
}: CreativeItemProps) {
  const router = useRouter();

  let date = GMTtoKSTconverter(
    creativeData.archive_start || creativeData.portpolio_start + `.000Z`
  );

  const routeChange = (creativeData: any) => {
    let url = redirect ? redirect : `/archive/${creativeData.archive_idx}`;
    if (location.pathname === url) {
      return;
    }
    router.push(url);
  };

  return (
    <Div hoverImage={hoverImage}>
      <div
        className='archiveImage'
        onClick={() => {
          routeChange(creativeData);
        }}
      >
        <img
          src={creativeData.img_url || creativeData.main_img}
          alt='archive_image'
        />
        {hoverImage && (
          <div className='hoverImage'>
            <div className='logoCircle'>
              <img src={creativeData.user_profile} alt='brand logo' />
            </div>
            <div className='likeAndView'>
              <img
                className='likeIcon'
                src={'heartIcon_white'}
                alt='like icon'
              />{' '}
              {creativeData.like_cnt}
              <img className='viewIcon' src={'ViewIcon'} alt='view icon' />{' '}
              {creativeData.view_cnt}
              <img
                className='moodboardIcon'
                src={'images/moodboardIcon_white.png'}
                alt='moodboard icon'
              />{' '}
              {creativeData.moodboard_cnt}
            </div>
          </div>
        )}
      </div>
      <div className='brand'>
        {creativeData?.archive_brand || creativeData?.portpolio_brand}
      </div>
      <div className='title'>
        {creativeData.archive_name || creativeData.portpolio_name}
      </div>
      {creativeData.archive_category ? (
        <>
          <span className='category'>
            {getKeyByValue(archiveCategory, creativeData.archive_category)}
          </span>
          <span className='date'>{`${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()}`}</span>
        </>
      ) : (
        <>
          <span className='date'>{`${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()}`}</span>
        </>
      )}
    </Div>
  );
}

const Div = styled.div<{ hoverImage: boolean }>`
  margin: 0 auto;

  .archiveImage {
    overflow: hidden;
    border-radius: 4px;
    position: relative; // .hoverImage의 기준
    cursor: pointer;

    > img {
      width: 100%;
      display: block;
      aspect-ratio: 338 / 255; // width, height 동일하게
      object-fit: cover; // 사진이 잘리더라도 비율 꺠지지 않게
    }

    .hoverImage {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 100%;
      width: 100%;
      aspect-ratio: 338 / 128;
      border-radius: 4px;
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(0, 0, 0, 0.61)
      );

      display: flex;
      justify-content: space-between;
      align-items: end;

      .logoCircle {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        overflow: hidden;
        background-color: white;
        margin-left: 16px;
        margin-bottom: 18px;
        > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .likeAndView {
        display: flex;
        margin-right: 16px;
        margin-bottom: 18px;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        align-items: center;

        .likeIcon {
          width: 14px;
          height: 12px;
          margin-right: 6px;
        }
        .viewIcon {
          width: 16px;
          height: 12px;
          margin: 0 6px 0 14px;
        }
        .moodboardIcon {
          width: 14px;
          height: 12px;
          margin: 0 6px 0 14px;
        }
      }
    }
  }
  .archiveImage:hover {
    img {
      transform: ${(props) => (props.hoverImage ? 'scale(1)' : 'scale(1.1)')};
      transition: 0.2s;
    }
    .hoverImage {
      top: 50%;
      transition: 0.2s;
    }
  }

  .brand {
    line-height: 15px;
    height: 15px;
    text-transform: uppercase;
    text-decoration: underline;
    margin: 12px 0 8px;
    font-weight: 600;
    font-size: 14px;
  }

  .title {
    max-height: 44px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;

    display: -webkit-box;
    max-width: 315px; // 330 - 15 (main의 inspiration 영역에서 2줄일때 15차이남)
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .category {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    color: #5d5d5d;
    display: inline-block;
  }
  .category:after {
    content: '';
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #bebebe;
    display: inline-block;
    margin: 0px 7px;
    position: relative;
    top: -3px;
  }
  .date {
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    color: #aaa;
    display: inline;
  }

  @media (max-width: 1100px) {
    .brand {
      font-size: 13px;
    }
    .title {
      font-size: 16px;
    }
    .category,
    .date {
      font-size: 13px;
    }
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr !important;
  }
  @media (max-width: 440px) {
  }
`;
