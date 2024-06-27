// import React, { useState, useEffect} from 'react';
import styled from '@emotion/styled';
import RecentSearchKeyword from './recentSearchKeyword';

export default function SearchBarExpanding({
  searchHistory,
  deleteSearchHistory,
  clickSearchHistory,
}: any) {
  let recentSearchDatas;
  // 검색기록 없으면 로고 로드
  searchHistory.length === 0
    ? (recentSearchDatas = (
        <div className='noResult'>최근 검색한 내역이 없습니다.</div>
      ))
    : (recentSearchDatas = searchHistory.map(
        (recentSearchData: any, index: any) => {
          return (
            <RecentSearchKeyword
              key={recentSearchData.keyword + recentSearchData.time}
              keyword={recentSearchData.keyword}
              time={recentSearchData.time}
              index={index}
              deleteSearchHistory={deleteSearchHistory}
              clickSearchHistory={clickSearchHistory}
            />
          );
        }
      ));

  return <Div>{recentSearchDatas}</Div>;
}

const Div = styled.div`
  user-select: none;
  .noResult {
    text-align: left;
    margin-top: 14px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.02px;
    color: #bbb;
  }
`;
