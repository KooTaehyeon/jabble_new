import styled from '@emotion/styled';
import { useState } from 'react';
import Image from 'next/image';
import {
  getSearchHistoryInLocalStorage,
  setSearchHistoryInLocalStorage,
} from '@/lib/localStorage';
import { useRouter } from 'next/navigation';
export default function SmallSearchInputForNav() {
  const [keyword, setKeyword] = useState('');
  const navigate = useRouter();

  const setSearchHistory = () => {
    if (keyword === '') {
      return;
    }
    let searchKeyword = { keyword: `${keyword}`, time: Date.now() };
    setSearchHistoryInLocalStorage(
      searchKeyword,
      getSearchHistoryInLocalStorage()
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchHistory();
    setKeyword('');
    close && close();
    // hamburger side modal 에서 검색 시 검색 후 side modal 닫기게.
    navigate.push(`/search?keyword=${keyword}`);
  };
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='searchInput'>
        <Image
          width={20}
          height={20}
          src={'/images/search.png'}
          alt='search icon'
        />
      </label>
      <input
        id='searchInput'
        placeholder='Search'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  width: 320px;
  margin-right: 24px;

  input {
    width: 100%;
    height: 44px;
    padding-left: 53px;
    box-sizing: border-box;
    border-radius: 4px;
    border: solid 1px #dadada;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
  }

  input::placeholder {
    text-align: left;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    color: #c4c4c4;
  }
  > input:focus {
    border: solid 1px #000;
  }

  > label > img {
    position: absolute;
    left: 16px;
    top: calc(50% - 20px / 2);
    opacity: 0.8;
  }

  /* @media (max-width: 1400px) {
    margin-right:44px;
  }
  @media (max-width: 1200px) {
    width:240px;
  }
  @media (max-width: 1050px) {
    margin-right:22px;
  } */
`;
