'use client';
import RePassword from '@/containers/login/helpdesk/ResetPassword';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
type FormData = {
  email: string;
  // authentication: boolean;
};
const Helpdesk = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<any>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Container>
      <Card>
        <RePassword getValues={getValues} register={register} errors={errors} />

        <ButtonContainer>
          <Button bg={'#ffffff'} color={'#1b1d1f'} border={'1px solid #dee2e6'}>
            이전으로
          </Button>
          <Button bg={'#ffffff'} color={'#ae2e37'} border={'1px solid #ae2e37'}>
            로그인
          </Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
};

export default Helpdesk;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f5f7;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 518px;
  min-height: 618px;
  height: auto;
  max-width: 100%;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto;
`;
const Button = styled.button<{ bg: string; color: string; border: string }>`
  background: ${(props) => props.bg};
  border: ${(props) => props.border};
  padding: 10px 20px;
  border-radius: 4px;
  width: 45%;
  color: ${(props) => props.color};
  cursor: pointer;
`;
