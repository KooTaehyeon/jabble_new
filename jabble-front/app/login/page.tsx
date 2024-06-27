'use client';
import LoginForm from '@/containers/login/LoginForm';
import React from 'react';
import styled from '@emotion/styled';
const Login = () => {
  return (
    <Div>
      <Overlay />
      <Logo>
        <Tagline>
          <p>
            <div className='big'>C</div>
            <span>eativer</span>
            <div className='texts'>크리에이티브한</div>
          </p>
          <p>
            <div className='big'>A</div>
            <span>rtist </span>
            <div className='texts'>패션, 뷰티, 광고 크리에이터들과</div>
          </p>
          <p>
            <div className='big'>A</div>
            <span>gencies</span>{' '}
            <div className='texts'> 에이전시를 발견하고</div>
          </p>
          <p>
            <div className='big'>A</div>
            <span>rchives </span>{' '}
            <div className='texts'>그들의 포트폴리오를 통해</div>
          </p>
          <p>
            <div className='big'>I</div>
            <span>nspiration </span>{' '}
            <div className='texts'>예술적 영감을 얻는</div>
          </p>
        </Tagline>
      </Logo>
      <LoginForm />
    </Div>
  );
};

export default Login;
const Div = styled.div`
  position: relative;
  width: 100%;
  min-height: 800px;
  height: auto;
  background-image: url('/images/loginLogo.png');
  background-size: cover; /* 배경 이미지 크기 조정 */
  display: flex;
  margin: auto;
  padding-top: 80px;
`;

const Overlay = styled.div`
  z-index: 1;
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 오버레이 설정 */
`;
const Logo = styled.div`
  margin: 0 auto;
  padding-left: 15%;
  width: 50%;
  z-index: 2;
  color: #ffffff;
  @media (max-width: 900px) {
    display: none;
  }
  @media (max-width: 1400px) {
    padding-left: 10%;
  }
`;
const Tagline = styled.div`
  font-size: 20px;
  line-height: 1.5;
  text-align: left;

  p {
    margin: 15px 0 20px 0;
    display: flex;
    .texts {
      flex-grow: 0;
      font-size: 24px;
      line-height: 0.92;
      letter-spacing: -0.12px;
      height: 64px;
      flex-grow: 0;
      margin-left: 10px;
      padding-top: 25px;
      font-weight: bold;
      line-height: 1.5;
      letter-spacing: normal;
    }
    color: var(--white);
    .big {
      text-align: center;
      border: 1px solid;
      font-size: 24px;
      background-color: rgba(217, 217, 217, 0);
      width: 54px;
      height: 54px;
      flex-grow: 0;
      font-size: 40px;
      font-weight: bold;
      line-height: 1.5;

      letter-spacing: normal;
    }
    span {
      height: 54px;
      flex-grow: 0;
      margin: 1px 0px 17px 10px;
      opacity: 0.3;
      font-family: Poppins;
      font-size: 50px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: left;
      color: var(--gray-2);
    }
  }
`;
