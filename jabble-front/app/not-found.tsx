'use client';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const PageNotFound = () => {
  const router = useRouter();

  return (
    <Div>
      <div className='notFound'>4😵4</div>
      <div className='title'>찾으시는 페이지가 없습니다.</div>
      <div className='description'>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </div>
      <div
        className='blackButton'
        onClick={() => {
          router.push('/');
        }}
      >
        홈으로
      </div>
    </Div>
  );
};

export default PageNotFound;

const Div = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 100px auto 100px auto;
  text-align: center;

  .notFound {
    width: 240px;
    height: 131px;
    margin: 0 auto 38px;
    font-size: 100px;
    font-weight: 800;
  }
  .title {
    width: 100%;
    height: 26px;
    margin: 38px auto 18px;
    font-size: 22px;
    font-weight: bold;
  }
  .description {
    width: 332px;
    height: 42px;
    margin: 18px auto 34px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.02px;
    color: #8d8d8d;
  }

  .blackButton {
    width: 172px;
    height: 48px;
    margin: 34px auto 0;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: 1500px) {
    width: 90%;
  }

  @media (max-width: 720px) {
    margin: 122px auto 222px;
  }
`;
