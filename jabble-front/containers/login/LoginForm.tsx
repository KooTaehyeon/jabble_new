'use client';
import React from 'react';
import styled from '@emotion/styled';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import { REG_EXP } from '@/lib/regex';
import { ErrorMessage } from '@hookform/error-message';
type FormData = {
  id: string;
  pw: string;
  remember: boolean;
};
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Div>
      <div className='formBox'>
        <div className='logo'>
          <span>ca</span>aai
        </div>
        <div className='sub'>
          <p>
            패션,뷰티,라이프스타일 광고 크리에이티브를 위한 크리에이티브
            스페이스
          </p>
          <p>
            크리에이티브 아티스트,에이전시,아카이브,영감을 찾는 단 하나의 플랫폼
          </p>
        </div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className='labelBox'>
            <label>이메일계정 </label>{' '}
            <Input
              error={errors}
              placeholder='이메일 계정을 입력해주세요.'
              {...register('id', {
                pattern: {
                  value: REG_EXP.email,
                  message: '이메일형식이 올바르지 않습니다.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name='id'
              render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
            />
          </div>
          <div className='labelBox'>
            <div className='onlyPw'>
              <label>비밀번호 </label>

              <Link href={'/login/helpdesk'}>비밀번호찾기</Link>
            </div>
            <Input
              error={errors}
              placeholder='영어 대문자, 소문자, 숫자, 특수문자 조합으로 8-20자 이내로 비밀번호를 입력해주세요.'
              type='password'
              {...register('pw', {
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
                  message: '비밀번호 형식이 맞지않습니다.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name='pw'
              render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
            />
          </div>
          <div className='labelCkBox'>
            <input type='checkbox' {...register('remember')} />
            <label> 로그인 유지</label>{' '}
          </div>
          <button type='submit'>로그인</button>
        </form>
        <FirstInfo>
          처음이신가요? 회원가입하고 크리에티브 스페이스를 이용해보세요
        </FirstInfo>
        <Link href={'/signup'}>회원가입하기</Link>
      </div>
    </Div>
  );
};

const Div = styled.div`
  z-index: 2;
  width: 48%;
  a {
    margin: 0 auto;
    text-decoration: underline;
    font-size: 18px;
    font-weight: 500;
  }
  .formBox {
    background-color: #ffffff;
    width: 520px;
    height: 550px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    border-radius: 5px;
    .logo {
      font-size: 30px;
      font-weight: 600;
      text-align: center;
      span {
        font-size: 30px;
        font-weight: 600;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
      }
    }
    .sub {
      margin-top: 20px;
      p {
        margin-bottom: 5px;
        font-size: 14px;
        text-align: center;
      }
    }
    form {
      padding: 0px 15px;
      display: flex;
      flex-direction: column;
      button {
        color: #ffffff;
        background-color: #000000;
        border-radius: 5px;
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
      }
      .labelBox {
        display: flex;
        flex-direction: column;
        margin: 10px 0;

        label {
          font-size: 14px;
          font-weight: 600;
          margin: 10px 0;
        }
        input {
          width: 100%;
          height: 40px;
          padding: 10px 10px;
          border: 1px solid #dcdcdc;
          border-radius: 8px;
          :focus {
            border: 1px solid #3bd569;
          }
        }
      }
      .onlyPw {
        display: flex;
        justify-content: space-between;
        a {
          font-size: 14px;
          font-weight: 500;
          margin: 10px 0;
          color: #dcdcdc;
          /* text-decoration: underline; */
          /* cursor: pointer; */
        }
      }
      .labelCkBox {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        label {
          margin-left: 5px;
          /* line-height: 13px; */
          font-size: 14px;
          font-weight: 600;
        }
        input {
          width: 15px;
          height: 15px;
        }
      }
      button {
        background: 1px #dcdcdc solid;
      }
    }
  }
`;
const FirstInfo = styled.p`
  text-align: center;
  font-size: 14px;
  color: #dcdcdc;
  margin: 10px 0 20px 0;
`;
const Input = styled.input<{ error: FieldErrors<FieldValues> }>`
  outline-color: ${(props) =>
    Object.keys(props.error).length === 0 ? '#3bd569' : 'red'};
`;
const ErrorMsg = styled.p`
  color: red;
`;

export default LoginForm;
