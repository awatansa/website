import {useEffect} from "react";

export function useTitle(title: string) {
  let oldTitle = document.title
  useEffect(() => {
    document.title = title
    return () => {
      document.title = oldTitle
    }
  })
}

