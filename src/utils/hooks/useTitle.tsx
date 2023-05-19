import React, { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;
    if (!title && prevTitle) document.title = prevTitle;

    return () => {
      document.title = prevTitle;
    };
  }, []);
}
