import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useWindowSize } from '@/hook/useWindowSize';
import { useScrollLock } from '@/hook/useScrollLock';

export default function SideModal({
  visible,
  close,
  modalRef,
}: {
  modalRef: any;
  visible: boolean;
  close: any;
}) {
  const user = false;

  const { lockScroll, unlockScroll } = useScrollLock();

  const [isShow, setShow] = useState(false);
  // setShow(false)로 바로 닫아버리면 rerendering돼서 fadeout animation 안먹힘.
  // close후 일정시간 후 setShow하면 그시간동안 fadeout animation 적용 가능.
  const [showArtistsList, setArtistList] = useState(false);
  const { innerWidth } = useWindowSize();
  useEffect(() => {
    let timeoutId: any;
    visible
      ? setShow(true)
      : (timeoutId = setTimeout(() => setShow(false), 100));
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [visible]);

  useEffect(() => {
    isShow ? lockScroll() : unlockScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  useEffect(() => {
    return () => unlockScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(visible, 'visible');

  if (!isShow) {
    return null;
  }

  return (
    <Div visible={visible}>
      <div className='sideModalContent' ref={modalRef}>
        <div className='top'>
          <Image
            className='logo'
            height={20}
            width={20}
            alt='logo'
            src={'images/logo.svg'}
          />
          <Image
            height={20}
            width={20}
            className='close-icon'
            alt='close icon'
            src={'images/closeButton.svg'}
            onClick={() => {
              console.log('dd');

              close();
            }}
          />
        </div>
        <div className='profileContainer'>
          {!user ? (
            <Link
              href='/login'
              onClick={() => {
                close();
              }}
              className='blackButton'
            >
              Start
            </Link>
          ) : (
            <div className='profile'>
              <div
                className='userProfile'
                onClick={() => {
                  // navigate(innerWidth > 900 ? '/mypage/home' : '/mypage');
                  close();
                }}
              >
                <div
                  className='logoCircle'
                  style={user ? {} : { border: 'solid 1px #e8e8e8' }}
                >
                  <Image
                    style={
                      user === 1
                        ? { objectFit: 'cover' }
                        : { objectFit: 'contain' }
                    }
                    src={''}
                    height={20}
                    width={20}
                    alt='user_image'
                  />
                </div>
                <div className='name'>{'유저'}</div>
              </div>
              <div
                className='matching'
                onClick={() => {
                  // navigate('/mypage/matching');
                  close();
                }}
              >
                {user ? '광고주' : '아티스트'}
                <span> 매칭</span>
              </div>
            </div>
          )}
        </div>
        <div className='nav'>
          <div
            className='navLink'
            onClick={() => {
              // setArtistList(!showArtistsList);
            }}
            // style={showArtistsList ? { height: '25px' } : { height: '368px' }}
          >
            <div className='artists'>
              <div>Artists</div>
              <Image
                src={'/images/arrow-icon-black.png'}
                alt='arrow-icon'
                height={20}
                width={20}
                // style={
                //   showArtistsList
                //     ? { transform: 'rotate(0)' }
                //     : { transform: 'rotate(180deg)' }
                // }
              />
            </div>
            <div
              className='artistList'
              // style={
              //   showArtistsList
              //     ? { transform: 'scaleY(0)' }
              //     : { transform: 'scaleY(1)' }
              // }
            >
              <div
                className='artist'
                style={{ marginTop: '22px' }}
                onClick={() => {
                  // navigate('/artist');
                  close();
                }}
              >
                All Artists
              </div>
            </div>
          </div>
          <div className='navLink'>
            <Link
              href='/archive'
              onClick={() => {
                close();
              }}
            >
              Archive
            </Link>
          </div>
          <div className='navLink'>
            <Link
              href='/inspiration'
              onClick={() => {
                close();
              }}
            >
              Inspiration
            </Link>
          </div>
        </div>
        <div className='bottom'>
          {/* <div>FNQ</div> */}
          {user && (
            <div
            // onClick={() => {
            //   logout();
            // }}
            >
              Log Out
            </div>
          )}
        </div>
      </div>
    </Div>
  );
}

const Div: any = styled.div<{ visible: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);

  .sideModalContent {
    animation: ${(props) =>
        props.visible ? 'sidefadeIn 0.25s' : 'sidefadeOut 0.10s'}
      ease-out;
    width: 100%;
    max-width: 900px;
    height: 100%;
    position: absolute;
    right: 0;
    background-color: white;
    opacity: inherit;
    padding: 0px 18px 34px;
    box-sizing: border-box;
    overflow: auto;
    .top {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      .logo {
        width: 98px;
        height: 22px;
        display: block;
      }

      .close-icon {
        display: block;
        width: 18px;
        height: 18px;
      }
    }
    .profileContainer {
      height: 100px;
      display: flex;
      align-items: center;
      .profile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .userProfile {
          display: flex;
          align-items: center;
          color: #7f7f7f;

          .logoCircle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            background-color: white;
            margin-right: 10px;

            > img {
              display: block;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
          .name {
            font-family: Pretendard;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: -0.04px;
            color: #333;
          }
        }
        .matching {
          font-family: Pretendard;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: normal;
          color: #292929;
          border-bottom: 1px solid black;
          cursor: pointer;
        }
        .matching > span {
          font-family: Pretendard;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: normal;
          color: #0053ff;
        }
      }
      .blackButton {
        width: 100%;
        height: 46px;

        font-family: Montserrat;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: normal;
      }
    }

    .searchWrapper {
      margin: 20px auto;
      width: 90%;
    }
    .nav {
      border-top: solid 1px #f2f2f2;
      border-bottom: solid 1px #f2f2f2;
      .navLink {
        width: 100%;
        margin: 34px 0;
        text-align: left;
        transition: 0.2s;
        overflow: hidden;

        * {
          width: 100%;
          display: inline-block;
          font-family: Montserrat;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: normal;
        }

        .artists {
          display: flex;
          align-items: center;
          cursor: pointer;
          > img {
            width: 14px;
            height: 10px;
            transition: 0.2s;
          }
        }

        .artistList {
          display: block;
          transition: 0.2s;
          transform-origin: top center;

          .artist {
            font-family: Montserrat;
            font-size: 16px;
            font-weight: 500;
            color: #999;
            margin: 11px 0;
            cursor: pointer;
          }
        }
      }
    }
    .bottom {
      margin-top: 34px;
      > div {
        cursor: pointer;
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: normal;
        color: #999;
        text-align: left;
      }
    }
  }

  @keyframes sidefadeIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes sidefadeOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
