'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import dynamic from 'next/dynamic'

const ARExperience = dynamic(() => import('@/components/ARExperience'), { ssr: false })

export default function ARTryOnPage() {
  const { id } = useParams()
  const [modelUrl, setModelUrl] = useState<string>('')

  useEffect(() => {
    const fetchModel = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('model_url')
        .eq('id', id)
        .single()

      if (error || !data?.model_url) {
        console.warn('⚠️ Fallback to demo model')
        setModelUrl('https://zvuvsxcxmfuvrhlvrunz.supabase.co/storage/v1/object/public/models/golden_retriever_sitting.glb')
      } else {
        setModelUrl(data.model_url)
      }
    }

    fetchModel()
  }, [id])

  return <ARExperience modelUrl={modelUrl} />
}
