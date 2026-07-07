import Link from 'next/link'

type Listing = {
  id: string
  title: string
  description: string
  price: number
  category: string
  listing_type: string
  image_url?: string
}

export default function ListingCard({
  listing,
}: {
  listing: Listing
}) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
      {listing.image_url && (
        <img
          src={listing.image_url}
          alt={listing.title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-cyan-400">
            {listing.title}
          </h2>

          <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm">
            {listing.listing_type}
          </span>
        </div>

        <p className="mt-3 text-gray-300">
          {listing.description}
        </p>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-yellow-400 font-bold text-lg">
            KSh {listing.price}
          </span>

          <span className="text-gray-400">
            {listing.category}
          </span>
        </div>

        <Link
          href={`/chat/${listing.id}`}
          className="block mt-6 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-bold text-center"
        >
          💬 Chat with Seller
        </Link>
      </div>
    </div>
  )
}
