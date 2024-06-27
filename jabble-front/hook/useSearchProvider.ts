import { useState } from 'react';

export default function useSearchProvider() {
  const [artists, setArtists] = useState([]);
  const [artists_cnt, setArtists_cnt] = useState(0);
  const [archive, setArchive] = useState([]);
  const [archive_cnt, setArchive_cnt] = useState(0);

  const setSearch = async (keyword: string | string[] | null) => {
    if (!keyword) {
      // setInsperation([])
      setArtists([]);
      setArchive([]);
      return;
      // 검색어 지웠을때 artist, archive 초기화 시켜줌. 없으면 test -> 지우기 -> summer 시 처음에 test 로 검색한 데이터 남아있음
    }
    let url = `/user/main?search=${keyword}`;
    // let { data } = await getAPI(url);
    // let { artists, artists_cnt, archive, archive_cnt } = data;

    setArtists(artists);
    setArtists_cnt(artists_cnt);
    setArchive(archive);
    setArchive_cnt(archive_cnt);
  };

  return { artists, artists_cnt, archive, archive_cnt, setSearch };
}
