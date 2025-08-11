'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ShortFile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort');
  const [sort, setSort] = useState('')

  const toggleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort)
    const query = new URLSearchParams(searchParams.toString());
    query.set('sort', newSort);
    router.push(`?${query.toString()}`);
  };

  return (
    <>
    <div className='flex gap-1'>
      <form className="mx-auto max-w-sm">
          <span>Sort:</span>
          <select
            value={sort}
            onChange={(e)=>toggleSort(e)}
            className="bg-zinc-600 p-2.5 rounded-lg text-sm"
          >
            <option value="">Recent</option>
            <option value="Date-desc">Date ↑</option>
            <option value="A-Zdesc">A-Z ↑</option>
            <option value="A-Zasc">A-Z ↓</option>
          </select>
      </form>
    </div>
    </>
  );
}
