export const getSearchHistoryInLocalStorage = () => {
  const storedKeyword = localStorage.getItem('keyword');
  if (storedKeyword) {
    const searchHistory = JSON.parse(storedKeyword) as string[];
    return searchHistory ? searchHistory : [];
  }
  return [];
};

export const setSearchHistoryInLocalStorage = (
  searchKeyword: any,
  searchHistory: any
) => {
  if (searchHistory.length >= 5) {
    // localStorage 5이상이면 제일 오래된것 삭제하기(index값 높을수록 오래된것)
    searchHistory.pop();
    searchHistory.unshift(searchKeyword);
    localStorage.setItem('keyword', JSON.stringify(searchHistory));
    return searchHistory;
  } else {
    // localStorage 5미만이면 찾아서 하나 맨 앞에 붙여넣기
    searchHistory.unshift(searchKeyword);
    localStorage.setItem('keyword', JSON.stringify(searchHistory));
    return searchHistory;
  }
};

export const deleteSearchHistoryInLocalStorage = (
  index: number,
  searchHistory: any
) => {
  let newSearchHistory = [...searchHistory];
  newSearchHistory.splice(index, 1);
  localStorage.setItem('keyword', JSON.stringify(newSearchHistory));
  return newSearchHistory;
};

export const deleteAllSearchHistoryInLocalStorage = () => {
  localStorage.removeItem('keyword');
};
