"use client";
import React from 'react';
import Link from "next/link";

 const Searchbtn = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (<button type='reset' onClick={reset}>
    <Link href="/" className="search-btn">
      X
    </Link>
    </button>
  );
};

export default Searchbtn;