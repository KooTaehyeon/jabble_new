'use client';
import React from 'react';
import styled from '@emotion/styled';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormGetValues,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { REG_EXP } from '@/lib/regex';

interface PolicyProps {
  register: UseFormRegister<FieldValues>;
  errorsMsg: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export const Info = ({ register, errorsMsg, getValues }: PolicyProps) => {
  console.log(errorsMsg, 'errorsMsg');

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

      {/* <Label>
        본인인증하기 <RequiredSpan>*</RequiredSpan>
      </Label> */}
      <VerifyButton>본인인증 (필수)</VerifyButton>
      <InputContainers>
        <Label htmlFor='email'>
          이메일 계정 <RequiredSpan>*</RequiredSpan>
        </Label>
        <Input
          error={errorsMsg.email}
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
          errors={errorsMsg}
          name='email'
          render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
        />
      </InputContainers>
      <InputContainers>
        <Label htmlFor='password'>
          비밀번호 <RequiredSpan>*</RequiredSpan>
        </Label>
        <Input
          error={errorsMsg.password}
          id='password'
          type='password'
          placeholder='영어 대문자, 소문자, 숫자, 특수문자 조합으로 8-20자 이내로 비밀번호를 입력해주세요.'
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
              message: '비밀번호 형식이 맞지 않습니다.',
            },
          })}
        />
        <ErrorMessage
          errors={errorsMsg}
          name='password'
          render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
        />
      </InputContainers>
      <InputContainers>
        <Label htmlFor='confirmPassword'>
          비밀번호 확인 <RequiredSpan>*</RequiredSpan>
        </Label>
        <Input
          error={errorsMsg.confirmPassword}
          id='confirmPassword'
          type='password'
          placeholder='영어 대문자, 소문자, 숫자, 특수문자 조합으로 8-20자 이내로 비밀번호를 입력해주세요.'
          {...register('confirmPassword', {
            required: '비밀번호 확인을 입력해주세요.',
            validate: (value) =>
              value === getValues('password') ||
              '비밀번호가 일치하지 않습니다.',
          })}
        />
        <ErrorMessage
          errors={errorsMsg}
          name='confirmPassword'
          render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
        />
      </InputContainers>
      <InputContainers>
        <Label htmlFor='profession'>전문 분야 선택</Label>
        <Select
          error={errorsMsg.profession}
          id='profession'
          {...register('profession', { required: '전문 분야를 선택해주세요.' })}
        >
          <option value=''>전문 분야를 선택해주세요.</option>
          <option value='fashion'>패션</option>
          <option value='beauty'>뷰티</option>
          <option value='lifestyle'>라이프스타일</option>
        </Select>
        <ErrorMessage
          errors={errorsMsg}
          name='profession'
          render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
        />
      </InputContainers>
    </>
  );
};

const InputContainers = styled.div`
  margin: 20px 0 20px 0;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0;
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

const Select = styled.select<{
  error?: any;
}>`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#dcdcdc')};
  /* border-radius: 8px; */
  :focus {
    border: 1px solid #3bd569;
  }
`;

const VerifyButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  color: #ae2e37;
  border: #ae2e37 solid 1px;
  /* border-radius: 8px; */
  margin-bottom: 20px;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
`;
const RequiredSpan = styled.span`
  color: red;
`;
