import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function Card({ children, ...props }: any) {
  return (
    <Link href={props.href}>
      <a
        className={`shadow p-5 rounded-lg group flex flex-col gap-5 justify-between hover:bg-opacity-15 text-black hover:text-white ${
          props.background && props.background
        } ${props.hover && props.hover}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg">{props.title}</h2>
            <ChevronRightIcon width={18} height={18} />
          </div>
          <p className="text-sm">{props.description}</p>
        </div>
        {props.assets && (
          <img
            src={props.assets}
            alt={props.assets_alt}
            width={150}
            height={150}
            className="invert pt-[3em] group-hover:invert-0"
          />
        )}
      </a>
    </Link>
  );
}

export default Card;
