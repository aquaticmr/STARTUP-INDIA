import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { format } from 'path';
import { formatDate } from '@/app/lib/utils';
import Image from 'next/image';
import Link from "next/link";

//export const experimental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    

  if (!post) return notFound();


  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img src={post.image} alt={post.title} className="w-full h-auto rounded-xl" />
      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
            <Link href={`/user/${post.author._id}`} className='flex gap-2 items_center mb-3'>
            <Image src={post.author.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-amber-50'></Image>
        <div>
             <p className='text-20-medium'>{post.author.name}</p>
             <p className='text-16-medium'>@{post.author.username}</p>
             </div>
             </Link>
             <p className='category-tag'>{post.category}</p>
        </div>
        <h3 className='text-30-bold'>Pitch details</h3>
        <p className='text-20-medium'>{post.pitch}</p>
      </div>
      <hr className='divider' />

      
     
      </section>
    </>
  );
};

export default page;
