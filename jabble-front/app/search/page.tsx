'use client';
import Search from '@/containers/search/searchMain';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  return (
    <>
      <Search word={keyword} />
    </>
  );
};

export default Page;
