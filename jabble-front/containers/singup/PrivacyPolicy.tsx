import React from 'react';
import styled from '@emotion/styled';
import {
  Controller,
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Control,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import StepIndicator from './StepIndicator';

interface PolicyProps {
  register: UseFormRegister<FieldValues>;
  errorsMsg: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
  allAgree: boolean;
  onAllAgreeChange: (value: boolean) => void;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export const PrivacyPolicy = ({
  register,
  errorsMsg,
  control,
  allAgree,
  onAllAgreeChange,
  setValue,
  getValues,
}: PolicyProps) => {
  const handleAllAgreeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onAllAgreeChange(checked); // 전체 동의 상태 변경
    setValue('age', checked);
    setValue('terms', checked);
    setValue('privacy', checked);
    setValue('marketing', checked);
  };

  const handleCheckboxToggle = (name: string, checked: boolean) => {
    setValue(name, checked);
  };

  return (
    <>
      <Description>
        {/* 서비스 이용 및 건강한 caaai 문화를 위하여 <br /> 동의가 필요합니다
         */}
      </Description>
      <CheckBoxList>
        <CheckBoxItem>
          <Controller
            control={control}
            name='allAgree'
            render={({ field }) => (
              <input
                type='checkbox'
                id='all-agree'
                {...field}
                checked={allAgree ?? false}
                onChange={handleAllAgreeToggle}
              />
            )}
          />
          <CheckBoxLabel htmlFor='all-agree'>
            전체동의 (선택정보포함)
          </CheckBoxLabel>
        </CheckBoxItem>
        <Line />
        <CheckBoxItem>
          <input
            type='checkbox'
            id='age-agree'
            {...register('age')}
            checked={getValues('age') ?? false}
            onChange={(e) => handleCheckboxToggle('age', e.target.checked)}
          />
          <CheckBoxLabel htmlFor='age-agree'>
            [필수] 만 14세 이상입니다
          </CheckBoxLabel>
        </CheckBoxItem>
        <CheckBoxItem>
          <input
            type='checkbox'
            id='terms-agree'
            {...register('terms')}
            checked={getValues('terms') ?? false}
            onChange={(e) => handleCheckboxToggle('terms', e.target.checked)}
          />
          <CheckBoxLabel htmlFor='terms-agree'>
            [필수] 이용약관(보기) 동의
          </CheckBoxLabel>
        </CheckBoxItem>
        <CheckBoxItem>
          <input
            type='checkbox'
            id='privacy-agree'
            {...register('privacy')}
            checked={getValues('privacy') ?? false}
            onChange={(e) => handleCheckboxToggle('privacy', e.target.checked)}
          />
          <CheckBoxLabel htmlFor='privacy-agree'>
            [필수] 개인정보수집 및 이용(보기) 동의
          </CheckBoxLabel>
        </CheckBoxItem>
        <CheckBoxItem>
          <input
            type='checkbox'
            id='marketing-agree'
            {...register('marketing')}
            checked={getValues('marketing') ?? false}
            onChange={(e) =>
              handleCheckboxToggle('marketing', e.target.checked)
            }
          />
          <CheckBoxLabel htmlFor='marketing-agree'>
            [선택] 마케팅 활용(보기) 동의
          </CheckBoxLabel>
        </CheckBoxItem>
      </CheckBoxList>
    </>
  );
};

const Description = styled.p`
  font-size: 24px;
  color: #6a6a6a;
  margin-bottom: 40px;
  text-align: center;
  margin-top: 40px;
`;

const CheckBoxList = styled.div`
  margin-bottom: 40px;
`;

const CheckBoxItem = styled.div`
  display: flex;
  align-items: center;
  margin: 30px auto;
`;

const CheckBoxLabel = styled.label`
  margin-left: 10px;
  font-size: 16px;
`;

const Line = styled.div`
  width: 500px;
  height: 1px;
  flex-grow: 0;
  margin: 40px 0;
  background-color: #9a9a98;
`;
