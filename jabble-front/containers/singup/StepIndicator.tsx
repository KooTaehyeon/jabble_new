/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <Container>
      <Step active={currentStep === 1}>
        <Number active={currentStep === 1}>1</Number>
        <Label active={currentStep === 1}>약관 동의</Label>
      </Step>
      <Divider />
      <Step active={currentStep === 2}>
        <Number active={currentStep === 2}>2</Number>
        <Label active={currentStep === 2}>정보 입력</Label>
      </Step>
      <Divider />
      <Step active={currentStep === 3}>
        <Number active={currentStep === 3}>3</Number>
        <Label active={currentStep === 3}>가입 완료</Label>
      </Step>
    </Container>
  );
};

export default StepIndicator;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 50px 0 20px 0;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  padding: 10px 0;
`;

const Step = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  ${({ active }) =>
    active &&
    css`
      color: #000;
      font-weight: bold;
    `}
  ${({ active }) =>
    !active &&
    css`
      color: #ccc;
    `}
`;

const Number = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid;
  margin-right: 8px;
  ${({ active }) =>
    active &&
    css`
      border-color: #000;
      background-color: #fff;
    `}
  ${({ active }) =>
    !active &&
    css`
      border-color: #ccc;
      background-color: #f5f5f5;
    `}
`;

const Label = styled.div<{ active: boolean }>`
  font-size: 14px;
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background-color: #ccc;
  margin: 0 16px;
`;
