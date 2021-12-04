import { useCallback, useEffect, useState } from 'react'

const useIsBottom = (ref) => {
  const [bottom, setBottom] = useState(false)

  const handleScroll = useCallback(() => {
    if (ref && ref?.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      if (scrollTop + clientHeight === scrollHeight) {
        setBottom(true)
      } else {
        setBottom(false)
      }
    } else {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight

      if (bottom) {
        setBottom(true)
      } else {
        setBottom(false)
      }
    }
  }, [ref])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return bottom
}

export default useIsBottom
