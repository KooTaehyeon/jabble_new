'use client';
import React, { useState, useEffect, useRef } from 'react';
import SearchList from './searchList';
import SearchBarExpanding from './searchBarExpanding';
import {
  getSearchHistoryInLocalStorage,
  setSearchHistoryInLocalStorage,
  deleteSearchHistoryInLocalStorage,
  deleteAllSearchHistoryInLocalStorage,
} from '../../lib/localStorage';
import SearchResult from './searchResult';
import styled from '@emotion/styled';
import useSearchProvider from '@/hook/useSearchProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
export default function SearchBar() {
  const [showSearchRecommendations, setSearchRecommendations] = useState(false);
  const [keyword, setKeyword] = useState<string | string[]>('');
  const [searchHistory, changeSearchHistory] = useState<any>([]);
  const { artists, archive, setSearch } = useSearchProvider();
  const router = useRouter();
  const query = useSearchParams();
  const keywordQuery = query.get('keyword');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(event: any) {
      if (!modalRef.current?.contains(event.target)) {
        setSearchRecommendations(false);
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    changeSearchHistory(getSearchHistoryInLocalStorage());
  }, [showSearchRecommendations]);

  useEffect(() => {
    const keywordFromQuery = keywordQuery || '';
    setKeyword(keywordFromQuery);
  }, [keywordQuery]);

  const setSearchHistory = () => {
    if (keyword === '') return;
    const searchKeyword = { keyword: keyword, time: Date.now() };
    const newSearchHistory = setSearchHistoryInLocalStorage(
      searchKeyword,
      searchHistory
    );
    changeSearchHistory(newSearchHistory);
  };

  const deleteSearchHistory = (e: any, index: number) => {
    e.stopPropagation();
    const newSearchHistory = deleteSearchHistoryInLocalStorage(
      index,
      searchHistory
    );
    changeSearchHistory(newSearchHistory);
  };

  const deleteAll = (e: any) => {
    e.stopPropagation();
    deleteAllSearchHistoryInLocalStorage();
    changeSearchHistory([]);
  };

  const clickSearchHistory = (e: any, keyword: string) => {
    e.stopPropagation();
    router.push(`/search?keyword=${keyword}`);
    setSearchRecommendations(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchHistory();
    router.push(`/search?keyword=${keyword}`);
    setSearchRecommendations(false);
  };

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
    setSearch(e.target.value);
    setSearchRecommendations(true);
  };

  return (
    <Div ref={modalRef}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='SearchInput'>
          <Image
            width={24}
            height={24}
            className='search-icon'
            alt='search icon'
            src={'images/search.svg'}
          />
          <Image
            width={1}
            height={24}
            className='bar-icon'
            alt='bar icon'
            src={'/images/bar.png'}
          />
        </label>
        <input
          id='SearchInput'
          autoComplete='off'
          onClick={() => setSearchRecommendations(!showSearchRecommendations)}
          placeholder='아티스트 또는 콘텐츠를 검색해보세요'
          value={keyword}
          onChange={(e) => handleChange(e)}
        />
      </form>
      {showSearchRecommendations && (
        <div className='SearchRecommendations'>
          {keyword ? (
            <div className='searchResult'>
              <div>
                <p>Artists</p>
                <SearchResult results={artists} type='Artists' />
              </div>
              <div>
                <p>Archive</p>
                <SearchResult results={archive} type='Archive' />
              </div>
            </div>
          ) : (
            <div className='SearchRecommendationsInner'>
              <div>
                <div className='SearchHeader' style={{ marginBottom: '14px' }}>
                  카테고리
                </div>
                <SearchList className={'searchBar'} />
              </div>
              <div className='recentSearch'>
                <div className='SearchTop'>
                  <div className='SearchHeader'>최근 검색어</div>
                  {Array.isArray(searchHistory) && searchHistory.length > 0 && (
                    <div className='deleteAll' onClick={(e) => deleteAll(e)}>
                      전체삭제
                    </div>
                  )}
                </div>
                <SearchBarExpanding
                  searchHistory={searchHistory}
                  deleteSearchHistory={deleteSearchHistory}
                  clickSearchHistory={clickSearchHistory}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  margin: 32px auto 0;
  max-width: 860px;
  height: 66px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
  position: relative;

  form {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 4px;
    overflow: hidden;

    > label {
      width: 87px;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 32px;

      .bar-icon {
        padding-left: 30px;
      }
    }

    > input {
      border: 0px;
      width: 100%;
      font-size: 18px;
      font-family: Montserrat;
      font-weight: 500;
      padding-left: 32px;
      box-sizing: border-box;
    }
    > input::placeholder {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 500;
      color: #767676;
    }
  }

  .SearchRecommendations {
    width: 100%;
    min-height: 320px;
    position: absolute;
    top: 80px;
    background-color: #fff;
    box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    z-index: 1;
    padding-bottom: 20px;
    padding: 28px 32px;
    box-sizing: border-box;

    .SearchRecommendationsInner {
      width: 100%;

      .recentSearch {
        .SearchTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 40px 0px -2px;
        }
      }
      .SearchHeader {
        font-family: Pretendard;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: -0.03px;
        color: #292929;
        text-align: left;
      }
      .deleteAll {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.02em;
        color: #999;
      }
    }
    .searchResult {
      width: 100%;
      display: flex;
      justify-content: space-between;
      text-align: center;
    }
    .searchResult > div {
      width: 100%;
      overflow-y: auto;
      p {
        margin: 0;
        text-align: left;
        font-family: Montserrat;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: -0.03px;
        color: #292929;
      }
    }
  }
`;
