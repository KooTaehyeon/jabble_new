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
      <StepIndicator currentStep={3} />
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
  color: ${(props) => props.color};
  cursor: pointer;
`;

const Page = () => {
  return (
    <Background>
      <Container>
        <Title>카이 회원가입</Title>
        <SubTitle>
          카이(Caaai)는 패션, 뷰티, 라이프 스타일 분야의 다양하고 참신한 광고
          크리에이티브를 위한 공간이자, 크리에이티브 아티스트, 에이전시,
          아카이브, 영감을 찾는 가장 스마트한 도구입니다.
        </SubTitle>
        <StepIndicator currentStep={3} />
        <RegistrationComplete />
      </Container>
    </Background>
  );
};

export default Page;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  background-image: url('/images/loginLogo.png'); /* 배경 이미지 경로 수정 */
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  width: 618px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: start;
  font-size: 32px;
  margin-bottom: 16px;
`;

const SubTitle = styled.p`
  color: #5a626a;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.08px;
  text-align: left;
`;
