import { useEffect, RefObject } from 'react';

export const useChatScroll = (
  ref: RefObject<HTMLDivElement>,
  deps: any[]
) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, deps);
};