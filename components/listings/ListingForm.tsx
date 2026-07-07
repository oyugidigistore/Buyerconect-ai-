'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  onCreated?: () => void
}

export default function ListingForm({ onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [listingType, setListingType] = useState('seller')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert('Please login first.')
      setLoading(false)
      return
    }

    let imageUrl = ''

    if (image) {
      const fileName = `${Date.now()}-${image.name}`

      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(fileName, image)

      if (uploadError) {
        alert(uploadError.message)
        setLoading(false)
        return
      }

      const { data } = supabase.storage
        .from('listing-images')
        .getPublicUrl(fileName)

      imageUrl = data.publicUrl
    }

    const { error } = await supabase.from('listings').insert({
      user_id: session.user.id,
      title,
      description,
      category,
      price: Number(price),
      listing_type: listingType,
      image_url: imageUrl,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    alert('Listing created successfully!')

    setTitle('')
    setDescription('')
    setCategory('')
    setPrice('')
    setListingType('seller')
    setImage(null)

    onCreated?.()

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-6 rounded-xl space-y-4"
    >
      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Listing title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="w-full p-3 rounded bg-slate-800"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        className="w-full p-3 rounded bg-slate-800"
        value={listingType}
        onChange={(e) => setListingType(e.target.value)}
      >
        <option value="seller">Seller</option>
        <option value="buyer">Buyer</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"
      >
        {loading ? 'Uploading...' : 'Create Listing'}
      </button>
    </form>
  )
}
