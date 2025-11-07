import Link from 'next/link';
import Image from 'next/image';
import { Pizza } from '@/lib/supabase';
import { ChefHat } from 'lucide-react';

interface PizzaCardProps {
  pizza: Pizza;
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  return (
    <Link href={`/customize/${pizza.id}`} className="card-custom group">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={pizza.image_url}
          alt={pizza.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!pizza.is_available && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <span className="text-white text-lg font-bold bg-stone-800 px-6 py-2 rounded-md">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-amber-500 text-white p-2 rounded-full shadow-lg">
          <ChefHat className="h-5 w-5" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-amber-600 transition-colors">
          {pizza.name}
        </h3>
        <p className="text-stone-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {pizza.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-stone-500 mb-1">From</p>
            <span className="text-3xl font-bold text-amber-600">${pizza.base_price.toFixed(2)}</span>
          </div>
          <button
            className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
              pizza.is_available
                ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'
            }`}
            disabled={!pizza.is_available}
          >
            {pizza.is_available ? 'Order Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </Link>
  );
}
