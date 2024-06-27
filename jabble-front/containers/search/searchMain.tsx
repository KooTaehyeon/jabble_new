'use client';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SearchBar from './searchBar';
import useSearchProvider from '@/hook/useSearchProvider';
import ArchiveList from '@/containers/archive/archiveList';
import ArtistCard from '@/containers/artist/artistCard';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search({
  word,
}: {
  word: string | string[] | undefined | null;
}) {
  const router = useRouter();
  const query = useSearchParams();
  const keywordQuery = query.get('keyword');
  const user = {
    data: { user_idx: 1 },
  };
  const { artists_cnt, archive_cnt, setSearch } = useSearchProvider();

  const [selected, setSelected] = useState(0); // 1 -> artist, 2 -> archive, 0 -> null
  const [cursor, setCursor] = useState(0);

  let keyword = word || keywordQuery;
  let user_idx = user ? user.data.user_idx : 0;
  let url =
    selected === 1
      ? `/user/artists?user_idx=${user_idx}&sort=1&filter=1&search=${keyword}`
      : selected === 2
      ? `/user/archive?user_idx=${user_idx}&sort=1&filter=1&search=${keyword}`
      : '';

  useEffect(() => {
    artists_cnt !== 0
      ? setSelected(1)
      : archive_cnt !== 0
      ? setSelected(2)
      : setSelected(0);
  }, [artists_cnt, archive_cnt]);

  useEffect(() => {
    setSearch(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (!selected) return;
    setCursor(0);
    // setApiData(url);
  }, [selected, keyword]);

  useEffect(() => {
    if (!cursor) return;
    let newUrl = url + `&cursor=${cursor}`;
    // setApiDataWidthPreviousData(newUrl);
  }, [cursor, url]);

  const viewMore = (lastArtist: any) => {
    setCursor(lastArtist.admin_datetime || lastArtist.archive_start);
  };

  const getSearchResult = () => {
    if (selected === 1) {
      if (artists_cnt !== 0) {
        return (
          <>
            <div className='title'>
              Artists<span>{artists_cnt}</span>
            </div>
            {/* {apiData && searchResult(apiData)} */}
          </>
        );
      } else {
        return (
          <div className='noResult'>해당 검색어의 검색 결과가 없습니다.</div>
        );
      }
    } else {
      if (archive_cnt !== 0) {
        return (
          <>
            <div className='title'>
              Archive<span>{archive_cnt}</span>
            </div>
            {/* {apiData && searchResult(apiData)} */}
          </>
        );
      } else {
        return (
          <div className='noResult'>해당 검색어의 검색 결과가 없습니다.</div>
        );
      }
    }
  };

  const getViewMoreButton = (
    apiData: any,
    artists_cnt: any,
    archive_cnt: any
  ) => {
    if (apiData.length === 0) return;
    if (selected === 1 && artists_cnt === 0) return;
    if (selected === 2 && archive_cnt === 0) return;

    if (selected === 1 && artists_cnt !== apiData.length) {
      // artist
      return (
        <div
          className='viewMore'
          style={{ marginTop: '30px' }}
          onClick={() => {
            user
              ? viewMore(apiData[apiData.length - 1])
              : router.push('/start');
          }}
        >
          더보기
        </div>
      );
    }
    if (selected === 2 && archive_cnt !== apiData.length) {
      // archive
      return (
        <div
          className='viewMore'
          style={{ marginTop: '30px' }}
          onClick={() => {
            user
              ? viewMore(apiData[apiData.length - 1])
              : router.push('/start');
          }}
        >
          더보기
        </div>
      );
    }
  };

  const searchResult = (apiData: any) => {
    if (selected === 1 && !apiData[0]?.archive_idx) {
      // artist + 현재 apiData가 archive가 아닐때.
      return (
        <div className='artistSearchResult'>
          <ArtistList>
            {apiData?.map((artistData: any) => {
              if (!artistData.user_idx) return <div key={Math.random()}></div>; // apiData에 artist외 다른것이 들어가있을때
              return (
                <ArtistCard
                  key={artistData.user_idx}
                  artistData={artistData}
                  className={''}
                />
              );
            })}
          </ArtistList>
        </div>
      );
    }
    if (selected === 2 && apiData[0]?.archive_idx) {
      // archive가 + 현재 apiData가 artist가 아닐때.
      return (
        <div className='archiveSearchResult'>
          <ArchiveList archiveDatas={apiData}></ArchiveList>
        </div>
      );
    }
  };

  return (
    <Div isSideModal={true}>
      {!word && <div className='banner' />}
      <div className='content' style={word ? { width: '100%' } : {}}>
        {!word && <SearchBar />}
        <div className='searchTop'>
          <span>“{keyword}”</span>에 대한 검색결과
          {selected === 1 && artists_cnt === 0 && '가 없습니다.'}
          {selected === 2 && archive_cnt === 0 && '가 없습니다.'}
        </div>
        <div className='selector'>
          <div
            style={
              selected === 1 ? { color: '#fff', backgroundColor: '#000' } : {}
            }
            onClick={() => {
              setSelected(1);
            }}
          >
            Artists
          </div>
          <div
            style={
              selected === 2 ? { color: '#fff', backgroundColor: '#000' } : {}
            }
            onClick={() => {
              setSelected(2);
            }}
          >
            Archive
          </div>
        </div>
        <div className='searchResult'>{getSearchResult()}</div>
        {/* {apiData && getViewMoreButton(apiData, artists_cnt, archive_cnt)} */}
      </div>
    </Div>
  );
}
const Div = styled.div<{ isSideModal: boolean }>`
  /* margin-top: 200px; */
  margin-top: auto;
  margin-bottom: 140px;
  .banner {
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to top, #fafafa, #f3f3f4);
  }
  > .content {
    margin: auto 0; // 62px - 66/2 px
    max-width: 1400px;
    width: 100%;
    font-size: 1.5rem;
    .searchTop {
      margin: 58px 0 48px;
      font-family: Montserrat;
      font-size: 36px;
      font-weight: 500;
      color: #999;
      text-align: center;
      span {
        font-family: Montserrat;
        font-size: 36px;
        font-weight: 700;
        color: #000;
        margin-right: 10px;
      }
    }

    .selector {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 41px;
      margin-bottom: 64px;
      border-bottom: solid 1px #f2f2f2;

      > div {
        cursor: pointer;
        width: 94px;
        height: 44px;
        margin: 0 6px;
        border-radius: 22px;
        border: solid 1px #dedede;
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.02px;
        color: #5d5d5d;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .searchResult {
      text-align: left;
      > .title {
        font-family: Montserrat;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: normal;
        color: #000;
        margin-bottom: 18px;
      }
      > .title > span {
        font-family: Montserrat;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: normal;
        color: #0053ff;
        margin-left: 10px;
      }
      > .noResult {
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.02px;
        color: #b8b8b8;
        text-align: center;
        min-height: 266px;
      }
    }
  }

  @media (max-width: 1500px) {
    > .content {
      width: 90%;
    }
  }

  @media (max-width: 1250px) {
    > .content {
      margin: 0 auto;
      .searchTop {
        font-size: 20px;
        margin: 32px 0 24px;
        span {
          font-size: 20px;
        }
      }
      .selector {
        padding-bottom: 24px;
        margin-bottom: 23px;
      }
      .artistSearchResult {
        > div {
          grid-template-columns: ${(props) =>
            props.isSideModal && '1fr 1fr'}; // side modal일때만 적용
        }
      }
      .archiveSearchResult {
        > div {
          grid-template-columns: ${(props) =>
            props.isSideModal && '1fr'}; // side modal일때만 적용
        }
      }
    }
  }
`;

const ArtistList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 20px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`;
