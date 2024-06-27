'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import SideModal from './sideModal';
import SideSearchModal from '../search/sideSearchModal';
import Image from 'next/image';
export default function AsideNav() {
  const user = {
    data: { user_privilege: 0 },
    user_profile: '',
  };
  const [showSideModal, setSideModal] = useState(false);
  const [showSideSearchModal, setSideSearchModal] = useState(false);
  let user_image =
    user?.user_profile ||
    (user?.data.user_privilege === 1
      ? 'images/userImage.svg'
      : 'images/opacityLogo.png');
  let isArtist = user?.data.user_privilege === 1;
  const modalRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  // useEffect(() => {
  //   // 해당 component mount시 실행
  //   function handler(event: any) {
  //     if (
  //       !modalRef.current?.contains(event.target) &&
  //       !buttonRef.current?.contains(event.target)
  //     ) {
  //       close();
  //     }
  //   }
  //   window.addEventListener('click', handler);
  //   return () => window.removeEventListener('click', handler);
  // }, []);

  const close = () => {
    setSideModal(false);
    setSideSearchModal(false);
  };
  console.log(showSideModal, 'showSideModal');

  return (
    <Div>
      <div className='forWeb'>
        {!user ? (
          <>
            <Link href='/mypage/matching' className='matchingLink'>
              <span>매칭 </span>스페이스
            </Link>
            <div className='verticalBar' />
            <div className='logout'>Logout</div>
            <Link href='/mypage/home'>
              <div
                className='logoCircle'
                style={isArtist ? {} : { border: 'solid 1px #e8e8e8' }}
              >
                <Image
                  style={
                    isArtist ? { objectFit: 'cover' } : { objectFit: 'contain' }
                  }
                  src={'images/userImage.svg'}
                  alt='user_image'
                />
              </div>
            </Link>
          </>
        ) : (
          <Link href='/login' className='start'>
            Start
          </Link>
        )}
      </div>
      <div className='forMobile'>
        <div ref={buttonRef}>
          <Image
            width={30}
            height={30}
            className='find-icon'
            alt='find icon'
            src={'images/search.svg'}
            onClick={() => setSideSearchModal(true)}
          />
          <Image
            width={30}
            height={30}
            className='hamburger-icon'
            alt='hamburger icon'
            src={'/images/hamburger.png'}
            onClick={() => setSideModal(true)}
          />
        </div>
      </div>
      <SideSearchModal
        modalRef={modalRef}
        visible={showSideSearchModal}
        close={close}
        user_image={user_image}
      />
      <SideModal modalRef={modalRef} visible={showSideModal} close={close} />
    </Div>
  );
}

const Div = styled.div`
  cursor: pointer;

  .forWeb {
    display: flex;
    align-items: center;
    .matchingLink {
      font-family: Pretendard;
      font-size: 15px;
      font-weight: 500;
      margin-left: 22px;
      color: #292929;
      margin-left: 22px;
      > span {
        font-family: Pretendard;
        font-size: 15px;
        font-weight: 500;
        color: #0053ff;
        padding-left: 4px;
      }
    }
    .matchingLink:after {
      content: '';
      display: block;
      border-bottom: solid 1px #292929;
      opacity: 0;
      transition: 0.2s;
    }
    .matchingLink:hover:after {
      opacity: 1;
    }
    .verticalBar {
      width: 1px;
      height: 11px;
      background-color: #979797;
      margin: 0 15px;
    }
    .logout {
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
      color: #999;
    }
    .logoCircle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      background-color: white;
      margin-left: 14px;

      > img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .start {
      width: 112px;
      height: 44px;
      line-height: 44px;
      border-radius: 4px;
      background-color: #000;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }
  .forMobile {
    display: none;
    img {
      margin-left: 30px;
      object-fit: contain;
      vertical-align: center;
    }
  }

  @media (max-width: 1250px) {
    display: flex;
    .forWeb {
      display: none;
    }
    .forMobile {
      display: block;
    }
  }

  @media (max-width: 480px) {
    .forMobile {
      img {
        width: 24px;
        margin-left: 24px;
      }
    }
  }
`;
