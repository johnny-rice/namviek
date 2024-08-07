'use client'

import { favGet } from '@/services/favorite'
import { useFavStore } from '@/store/favorite'
import { useEffect, useState } from 'react'
import FavoriteItem from './FavoriteItem'
import { useGetParams } from '@/hooks/useGetParams'

export default function FavoritesList() {
  const { orgId } = useGetParams()
  const { favorites, addAllFavorites } = useFavStore()
  const [activeId, setActive] = useState('')

  useEffect(() => {
    if (!orgId) return

    favGet(orgId)
      .then(res => {
        const { data } = res.data
        addAllFavorites(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const fullPath = (location.pathname + location.search).replace(/^\/*/, '')
    if (favorites.length) {
      const maxLen = 0
      let activeId = ''
      favorites.forEach(fav => {
        const link = fav.link.replace(/^\/*/, '')
        const len = link.length
        if (link === fullPath && len > maxLen) {
          activeId = fav.id
        }
      })
      setActive(activeId)
    }
  })

  return (
    <div className="nav">
      {favorites.map(fav => {
        const active = fav.id === activeId
        return <FavoriteItem key={fav.id} active={active} data={fav} />
      })}
    </div>
  )
}
