'use client';
import { REG_EXP } from '@/lib/regex';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormGetValues,
} from 'react-hook-form';
interface PolicyProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}
const ResetPassword = ({ errors, register, getValues }: PolicyProps) => {
  const nice = () => {
    setHelpState(2);
  };
  const [helpState, setHelpState] = useState(1);
  return (
    <>
      <form
        name='niceForm'
        id='niceForm'
        action='https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
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

      <Title>비밀번호 재설정</Title>
      {helpState === 1 && (
        <>
          <Description>
            비밀번호를 잊어버리셨나요?
            <br />{' '}
            <span>본인인증을 통해 비밀번호 재설정을 할 수 있습니다.</span>{' '}
            <br />
            회원 가입 시 사용한 이메일 계정을 입력하고 본인인증을 해주세요.
          </Description>
          <Label htmlFor='email'>
            이메일 계정 <RequiredSpan>*</RequiredSpan>
          </Label>
          <Input
            error={errors.email}
            id='email'
            placeholder='이메일 계정을 입력해주세요.'
            {...register('email', {
              required: '이메일 계정을 입력해주세요.',
              pattern: {
                value: REG_EXP.email,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name='email'
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
          <Button onClick={nice}>본인인증</Button>
          <Line />
          <Description>
            카이(Caaai)는 보안상의 이유로 회원님의 이전에 비밀번호를 저장하지
            않으며, 휴대폰이나 이메일을 통해 비밀번호를 전달하지 않습니다.
          </Description>
        </>
      )}
      {helpState === 2 && (
        <>
          <Description>
            <span>비밀번호 인증이 완료되었습니다</span>
            <br />
            새로운 비밀번호를 입력해주세요.
          </Description>
          <Label htmlFor='email'>
            비밀번호 <RequiredSpan>*</RequiredSpan>
          </Label>
          <Input
            error={errors.password}
            id='password'
            placeholder='비밀번호을 입력해주세요.'
            {...register('password', {
              required: '비밀번호을 입력해주세요.',
              pattern: {
                value: REG_EXP.password,
                message:
                  '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name='password'
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
          <Input
            error={errors.password}
            id='passwordConfirm'
            placeholder='비밀번호을 한번 더 입력해주세요.'
            {...register('passwordConfirm', {
              required: '비밀번호 확인을 입력해 주세요.',
              validate: (value) =>
                value === getValues('password') ||
                '비밀번호가 일치하지 않습니다.',
            })}
          />
          <ErrorMessage
            errors={errors}
            name='passwordConfirm'
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
          <PasswordBtn>비밀번호 재설정</PasswordBtn>
        </>
      )}
    </>
  );
};

export default ResetPassword;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 30px 0px 50px 0px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 40px;
  color: #6b7280;
  line-height: 1.5;
  span {
    font-size: 14px;
    line-height: 1.5;
    color: red;
  }
`;

const Input = styled.input<{
  error?: any;
}>`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#dcdcdc')};
  /* border-radius: 8px; */
  outline: none;
  :focus {
    border: 1px solid #3bd569;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #b91c1c;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0;
`;
const RequiredSpan = styled.span`
  color: red;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  flex-grow: 0;
  margin: 35px 1px 30px 0;
  background-color: #dee2e6;
`;
const PasswordBtn = styled.button`
  width: 100%;
  background-color: #dee2e6;
  text-align: center;
  color: #ffffff;
  height: 40px;
  margin-top: 20px;
  :hover {
    background-color: #1b1d1f;
  }
`;
