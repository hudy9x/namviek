'use client'

import { favGet } from '@/services/favorite'
import { Favorites } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Favorites() {
  const [links, setLinks] = useState<Favorites[]>([])

  useEffect(() => {
    favGet()
      .then(res => {
        const { data } = res.data
        console.log(data)
        setLinks(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return <div></div>
}
