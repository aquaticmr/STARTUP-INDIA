import React from 'react';
import { formatDate } from '../lib/utils';
import { EyeIcon } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { Startup, Author } from "../sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    views,
    title,
    _createdAt,
    _id,
    category,
    description,
    image,
    author,
  } = post;

  const authorId = author?._id;
  const authorName = author?.name || "Unknown";

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-20-medium line-clamp-1">{authorName}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-30-bold  ">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699"
            alt="author"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc color">{description}</p>
        <img src={image} alt="startup" className="startup-card_img" />
      </Link>

      <div className="flex-between mt-5 gap-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <button className="startup-card_btn">
          <Link href={`/startup/${_id}`}>details</Link>
        </button>
      </div>
    </li>
  );
};
