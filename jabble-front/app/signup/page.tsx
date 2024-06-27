'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { PrivacyPolicy } from '@/containers/singup/PrivacyPolicy';
import { FieldValues, useForm } from 'react-hook-form';
import { Info } from '@/containers/singup/Info';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/containers/singup/StepIndicator';
import RegistrationComplete from '@/containers/singup/RegistrationComplete';

const Page = () => {
  const router = useRouter();
  // const [progress, setProgress] = useState<number>(33); // ProgressBar
  // const handleNextClick = () => {
  //   const value = getValues();
  //   if (!value.privacy || !value.terms || !value.age) {
  //     return alert('필수값 누락');
  //   }
  //   if (progress < 99) {
  //     setProgress((prevProgress: number) => prevProgress + 33);
  //   }
  // };

  // const handlePrevClick = () => {
  //   if (progress <= 33) return;
  //   setProgress((prevProgress: number) => prevProgress - 33);
  // };
  const [step, setStep] = useState(1);
  const handleNextClick = () => {
    const value = getValues();
    if (!value.privacy || !value.terms || !value.age) {
      return alert('필수값 누락');
    }

    if (step === 3) {
      return;
    } else {
      setStep((prev) => prev + 1);
    }
  };
  const handlePrevClick = () => {
    if (step === 1) return;
    setStep((prev) => prev - 1);
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const allAgree = watch('allAgree');
  const age = watch('age');
  const terms = watch('terms');
  const privacy = watch('privacy');
  const marketing = watch('marketing');

  useEffect(() => {
    // 개별 체크박스의 상태를 감시하여 전체동의 체크박스 업데이트
    if (age && terms && privacy && marketing) {
      setValue('allAgree', true);
    } else if (!age || !terms || !privacy || !marketing) {
      setValue('allAgree', false);
    }
  }, [age, terms, privacy, marketing, setValue]);

  const handleAllAgreeChange = (value: boolean) => {
    setValue('allAgree', value);
    setValue('age', value);
    setValue('terms', value);
    setValue('privacy', value);
    setValue('marketing', value);
  };

  const onSubmit = (data: FieldValues) => {
    handleNextClick();
    console.log(data);
    setTimeout(() => {
      router.push('/signup/completed');
    }, 5000);
  };
  const niceFormRef = useRef<HTMLFormElement | null>(null);
  // const onClickCertify = async (e: any) => {
  //   // nice
  //   e.preventDefault();
  //   const domain_name = window.location.protocol + '//' + window.location.host;
  //   let url = `/user/nice?domain_name=${domain_name}`;
  //   // const { data } = await getAPI(url); // getAPI는 실제 API 호출 함수로 대체해야 합니다.
  //   const { token_version_id, enc_data, integrity_value } = data;

  //   window.open('', 'popup', 'width=600,height=400,left=200,top=200');
  //   if (niceFormRef.current) {
  //     niceFormRef.current.target = 'popup';
  //     niceFormRef.current.action =
  //       'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb';
  //     niceFormRef.current.token_version_id.value = token_version_id;
  //     niceFormRef.current.enc_data.value = enc_data;
  //     niceFormRef.current.integrity_value.value = integrity_value;
  //     niceFormRef.current.submit();
  //   }
  // };
  return (
    <>
      <form
        name='niceForm'
        id='niceForm'
        action='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
        ref={niceFormRef}
      >
        <input type='hidden' id='m' name='m' value='service' />
        <input
          type='hidden'
          id='token_version_id'
          name='token_version_id'
          value=''
        />
        <input type='hidden' id='enc_data' name='enc_data' />
        <input type='hidden' id='integrity_value' name='integrity_value' />
      </form>
      <Div step={step}>
        <Container>
          <FormWrapper>
            <ImgBox onClick={handlePrevClick}>
              <Image
                width={40}
                height={40}
                src={'/images/Chevron_Circle_Left.webp'}
                alt='뒤로가기'
              />
            </ImgBox>
            <TitleBox>
              <Title>
                카이 회원가입
                {/* <Underline /> */}
              </Title>
            </TitleBox>
            <SubTitle>
              카이(Caaai)는 패션, 뷰티, 라이프 스타일 분야의 다양하고 참신한
              광고 크리에이티브를 위한 공간이자, 크리에이티브 아티스트,
              에이전시, 아카이브, 영감을 찾는 가장 스마트한 도구입니다.
            </SubTitle>

            {/* <ProgressBarContainer>
              <ProgressBar width={progress} />
            </ProgressBarContainer> */}
            <StepIndicator currentStep={step} />
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <PrivacyPolicy
                  register={register}
                  setValue={setValue} // 수정된 부분
                  getValues={getValues} // 수정된 부분
                  errorsMsg={errors}
                  control={control}
                  allAgree={allAgree}
                  onAllAgreeChange={handleAllAgreeChange}
                />
              )}
              {step === 2 && (
                <Info
                  getValues={getValues}
                  register={register}
                  errorsMsg={errors}
                />
              )}
              {step === 3 && <RegistrationComplete />}
              {step < 3 && (
                <Button
                  type={step === 1 ? 'button' : 'submit'}
                  onClick={handleNextClick}
                >
                  {step === 1 ? '다음' : '회원가입'}
                </Button>
              )}
            </form>
          </FormWrapper>
        </Container>
      </Div>
    </>
  );
};

export default Page;

const Div = styled.div<{ step: number }>`
  /* position: relative;
  top: 150px; */
  width: 100%;
  min-height: 900px;
  height: auto;
  display: flex;

  background-image: ${(props) =>
    props.step === 3
      ? 'url("/images/loginLogo.png")'
      : ''}; /* 배경 이미지 경로 수정 */
  background-size: cover;
  background-position: center;
  /* padding-top: 80px; */
`;

const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  top: 130px;
`;

const ImgBox = styled.div`
  position: relative;
  right: 60px;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  width: 700px;
  min-height: 500px;
  height: auto;
  padding: 30px 100px 50px 100px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  text-align: start;
  margin: 20px auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: start;
`;
const SubTitle = styled.p`
  color: #5a626a;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.08px;
  text-align: left;
`;

const Underline = styled.div`
  width: 25px;
  height: 1.5px;
  background-color: black;
  margin-top: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  border: none;
  border-radius: 5px;
  background-color: #adb5bd;
  color: white;
  margin-top: 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;

// const ProgressBarContainer = styled.div`
//   width: 100%;
//   height: 5px;
//   background-color: #e0e0e0;
//   border-radius: 10px;
//   margin-top: 20px;
// `;

// const ProgressBar = styled.div<{ width: number }>`
//   width: ${(props) => props.width}%;
//   height: 100%;
//   background-color: black;
//   border-radius: 10px;
//   transition: width 0.3s ease-in-out;
// `;
