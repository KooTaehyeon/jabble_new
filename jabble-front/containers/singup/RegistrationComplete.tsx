'use client';
/** @jsxImportSource @emotion/react */
import StepIndicator from '@/containers/singup/StepIndicator';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const RegistrationComplete = () => {
  const router = useRouter();

  return (
    <CompleteContainer>
      <h2>회원가입이 완료되었습니다.</h2>
      <p>
        현재 김가이님은 일반회원입니다. 일반회원의 경우 일부 서비스 기능 이용에
        제한이 있습니다. 전문가 서비스 기능을 포함한 카이의 모든 서비스 이용을
        원하신다면, 마이페이지에서 전문가 계정으로 전환해 주세요.
      </p>
      <ButtonContainer>
        <Button
          color='#000'
          bg={'#fffff'}
          onClick={() => router.push('/login')}
        >
          로그인
        </Button>
        <Button color='#ffffff' bg={'#000'}>
          전문가 계정 알아보기
        </Button>
      </ButtonContainer>
    </CompleteContainer>
  );
};
export default RegistrationComplete;
const CompleteContainer = styled.div`
  background: white;
  padding: 20px 0px;
  width: 100%;
  border-radius: 8px;
  text-align: center;

  margin: 20px auto;
  h2 {
    color: #ae2e37;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 35px;
  }
  p {
    width: 100%;
    font-size: 16px;
    line-height: 1.75;
    color: #5a626a;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
`;

const Button = styled.button<{ bg: string; color: string }>`
  background: ${(props) => props.bg};
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  width: 45%;
  height: 46px;
  color: ${(props) => props.color};
  cursor: pointer;
`;
