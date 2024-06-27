'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
  getSearchHistoryInLocalStorage,
  setSearchHistoryInLocalStorage,
  deleteSearchHistoryInLocalStorage,
  deleteAllSearchHistoryInLocalStorage,
} from '../../lib/localStorage';
import { useScrollLock } from '@/hook/useScrollLock';
import useSearchProvider from '@/hook/useSearchProvider';
import SearchResult from './searchResult';
import SearchList from './searchList';
import SearchBarExpanding from './searchBarExpanding';
import Search from './searchMain';

export default function SideModal({ modalRef, visible, close }: any) {
  const [isShow, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchHistory, changeSearchHistory] = useState<string[]>();
  const { lockScroll, unlockScroll } = useScrollLock();
  const { artists, archive, setSearch } = useSearchProvider();
  const [isSearchPage, setSearchPage] = useState(false);
  const router = useRouter();
  useEffect(() => {
    changeSearchHistory(getSearchHistoryInLocalStorage());
  }, []);
  useEffect(() => {
    let timeoutId: any = null;
    visible
      ? setShow(true)
      : (timeoutId = setTimeout(() => setShow(false), 100));
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [visible]);

  useEffect(() => {
    isShow ? lockScroll() : unlockScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  useEffect(() => {
    setSearchPage(false);
  }, [keyword]);

  useEffect(() => {
    setSearch(keyword);
    return () => unlockScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const setSearchHistory = () => {
    if (keyword === '') {
      return;
    }
    let searchKeyword = { keyword: `${keyword}`, time: Date.now() };
    const newSearchHistory = setSearchHistoryInLocalStorage(
      searchKeyword,
      searchHistory
    );
    changeSearchHistory(newSearchHistory);
  };

  const deleteSearchHistory = (
    e: { stopPropagation: () => void },
    index: any
  ) => {
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
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchHistory();
    setSearchPage(true);
  };

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
    setSearch(e.target.value);
  };

  if (!isShow) {
    return null;
  }

  return (
    <Div visible={true}>
      <div ref={modalRef} className='sideModalContent'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='SearchInput'>
              <Image
                width={20}
                height={20}
                className='search-icon'
                alt='search icon'
                src={'images/search.svg'}
              />
            </label>
            <input
              id='SearchInput'
              autoComplete='off'
              placeholder='Search'
              value={keyword}
              onChange={(e) => handleChange(e)}
            />
            {keyword && (
              <Image
                width={20}
                height={20}
                src={'images/deleteButton.svg'}
                alt='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  setKeyword('');
                }}
              />
            )}
          </form>
          <div
            className='cancel'
            onClick={() => {
              close();
            }}
          >
            취소
          </div>
        </div>

        {isSearchPage ? (
          <Search word={keyword} />
        ) : (
          <div>
            {keyword ? (
              <div className='searchResult'>
                <div>
                  <p>Artists</p>
                  <SearchResult
                    results={artists}
                    type='Artists'
                    callback={close}
                  />
                </div>
                <div className='underLine' />
                <div>
                  <p>Archive</p>
                  <SearchResult
                    results={archive}
                    type='Archive'
                    callback={close}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div
                    className='SearchHeader'
                    style={{ marginBottom: '14px' }}
                  >
                    카테고리
                  </div>
                  <SearchList
                    className={'searchModal'}
                    callback={close}
                  ></SearchList>
                </div>
                <div className='recentSearch'>
                  <div className='SearchTop'>
                    <div className='SearchHeader'>최근 검색어</div>
                    {Array.isArray(searchHistory) &&
                      searchHistory.length > 0 && (
                        <div
                          className='deleteAll'
                          onClick={(e) => deleteAll(e)}
                        >
                          전체삭제
                        </div>
                      )}
                  </div>
                  <SearchBarExpanding
                    searchHistory={searchHistory}
                    deleteSearchHistory={deleteSearchHistory}
                    clickSearchHistory={clickSearchHistory}
                  ></SearchBarExpanding>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Div>
  );
}

const Div = styled.div<{ visible: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);

  .sideModalContent {
    animation: ${(props) =>
        props.visible ? 'sidefadeIn 0.25s' : 'sidefadeOut 0.10s'}
      ease-out;
    width: 100%;
    max-width: 900px;
    height: 100%;
    position: absolute;
    right: 0;
    background-color: white;
    opacity: inherit;
    padding: 20px 18px 34px;
    box-sizing: border-box;
    overflow: auto;
    z-index: 0;
  }

  form {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: solid 1px #000;
    width: 100%;
    height: 44px;

    > label {
      width: 36px;
      .search-icon {
        margin-left: 16px;
        width: 20px;
        height: 20px;
      }
    }

    > input {
      border: 0px;
      width: 100%;
      font-size: 16px;
      font-family: Montserrat;
      font-weight: 500;
      padding-left: 17px;
      box-sizing: border-box;
    }
    > input::placeholder {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 500;
      color: #c4c4c4;
    }

    > img {
      margin-right: 16px;
      cursor: pointer;
    }
  }
  .cancel {
    margin-left: 18px;
    min-width: 28px;
  }

  .recentSearch {
    margin-top: 27px;
    border-top: solid 1px #ededed;
    padding-top: 32px;
    .SearchTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

  .searchResult > div {
    width: 100%;
    margin-bottom: 21px;
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
    .archiveProfile {
      .title {
        max-width: 183px;
      }
      .brand {
        max-width: 85px;
      }
    }
  }
  .underLine {
    width: 324px;
    height: 1px;
    background-color: #ededed;
  }

  @keyframes sidefadeIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes sidefadeOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
