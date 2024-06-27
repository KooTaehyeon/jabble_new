'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import styled from '@emotion/styled';

const Footer = () => {
  const path = usePathname();

  const shouldDisappear =
    path === '/mypage/project/update' ||
    path === '/mypage/project/add' ||
    path.includes('/login') ||
    path.includes('/signup');

  return (
    <>
      {shouldDisappear ? (
        <></>
      ) : (
        <FooterLayout>
          <div className='announcement'>
            <div>
              <p>공지사항 : {'[2024.04.29] 제목제목제목제목제목제목~'}</p>
            </div>
          </div>
          <div className='footerInfo'>
            <ul>
              <li>서비스소개</li>
              <li>이용약관</li>
              <li>개인정보처리방침</li>
              <li>Q&A</li>
            </ul>
          </div>
          <div className='companyInfo'>
            <div>
              <p>
                패션,뷰티,라이프 스타일 분야의 다양하고 참신한 광고
                크리에이티브를 위한 크리에이티브 스페이스
              </p>
              <p>
                크리에이티브 아티스트,에이전시,아카이브,영감을 찾는 가장
                스마트한 도구
              </p>
            </div>
            <div>
              <p>서비스명 : 카이(CAAAI)</p>
              <p>사업장 소재지:서울, 대한민국</p>
              <p>고객센터:caaai.offcial@gmail.com</p>
            </div>
            <div>
              <p>COPYRIGHTS @ CAAAI ALL RIGHTS RESERVED</p>
            </div>
          </div>
          <div className='lastInfo'>
            <div>
              <p>BUILT BY CAAAI IN SEOUL, REPUBLIC OF KOREA</p>
              <p>PUBLISHED IN NOVEMBER 12, 2024</p>
            </div>
          </div>
        </FooterLayout>
      )}
    </>
  );
};

export default Footer;

const FooterLayout = styled.div`
  width: 100%;
  min-height: 525px;
  margin: 0 auto;
  background-color: #000;
  display: flex;
  flex-direction: column;
  div {
    width: 70%;
    margin: 0 auto;
  }
  .announcement {
    width: 100%;
    color: #ffffff;
    border-bottom: 1px solid #a6a2a2;
    div {
      /* width: 70%;
      margin: 0 auto; */
      height: 100px;
      padding: 50px 0;
      line-height: 5px;
    }
    p {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .footerInfo {
    border-bottom: 1px solid #a6a2a2;
    width: 100%;
    margin: 0 auto;
    color: #ffffff;
    ul {
      margin: 0 auto;
      width: 70%;
      display: flex;
      flex-direction: row;
      height: 50px;
      padding: 25px 0;
      line-height: 5px;
    }
    ul > li {
      font-size: 16px;
      font-weight: 600;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .companyInfo {
    border-bottom: 1px solid #a6a2a2;
    width: 100%;
    margin: 0 auto;
    height: 260px;
    div:first-child {
      padding-top: 40px;
      padding-bottom: 20px;
    }
    div:last-child {
      padding-top: 20px;
    }
    p {
      font-size: 14px;
      margin-bottom: 10px;
      color: #dcdcdc;
    }
  }
  .lastInfo {
    width: 100%;
    margin: 0 auto;
    height: 100px;
    div {
      padding: 30px 0;
      line-height: 5px;
    }
    p {
      font-size: 14px;
      margin-bottom: 20px;
      color: #dcdcdc;
    }
  }
`;
