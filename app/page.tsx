'use client';

import { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChevronLeft, ChevronRight, Quote, MapPin, Phone, Mail } from 'lucide-react';
import { Pizza, Category } from '@/lib/supabase';


export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('traditional');

  useEffect(() => {
    async function fetchData() {
      try {
        const [menuRes, catRes] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/categories')
        ]);
        const menuData = await menuRes.json();
        const catData = await catRes.json();

        setPizzas(menuData.pizzas || []);
        setCategories(catData.categories || []);

        const traditionalCat = (catData.categories || []).find((c: Category) => c.slug === 'traditional');
        if (traditionalCat) {
          setActiveTab(traditionalCat.id);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  const galleryImages = [
    'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  const testimonials = [
    { name: 'Janet Jackson', text: 'I tried Europa Pizza on a friends recommendation and I\'m so glad I did. The flavors are fresh and balanced, and the crust has that perfect crunch. It\'s easily become my weekend treat.' },
    { name: 'Janet Jackson', text: 'I tried Europa Pizza on a friends recommendation and I\'m so glad I did. The flavors are fresh and balanced, and the crust has that perfect crunch. It\'s easily become my weekend treat.' },
    { name: 'Janet Jackson', text: 'I tried Europa Pizza on a friends recommendation and I\'m so glad I did. The flavors are fresh and balanced, and the crust has that perfect crunch. It\'s easily become my weekend treat.' },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const homeCategories = categories.filter(c => ['traditional', 'signature'].includes(c.slug));
  const displayPizzas = pizzas.filter(p => p.category_id === activeTab).slice(0, 8);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
<section className="relative w-full h-[95vh] overflow-hidden" aria-label="Promo banner">
  <Image
    src="/assets/BE1.jpg"
    alt="Europa Pizza Promo Banner"
    fill
    priority
    className="object-cover object-center"  // no translate here
  />

  {/* overlay should cover the whole hero */}
  <div className="absolute bg-black/40" />
</section>


{/* ✅ Text below the image */}
<div className="text-center text-black px-4 py-16 bg-white">
  <h1 className="text-5xl md:text-7xl mb-6 ">
    Fresh. <span className='accent-text'>Flavorful.</span> Unforgettable.
  </h1>
  <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
    Crafted with passion, enjoyed in every bite. Taste the difference!
  </p>
 <Link
  href="/menu"
  className="inline-flex items-center gap-2 bg-[rgb(184,52,57)] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[rgb(184,52,57)] transition-colors"
>
  Order Now
  <span className="icon" aria-hidden="true">
    <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.51953 1.56152L9.51953 4.56152L6.51953 7.56152M2.01953 1.56152L5.01953 4.56152L2.01953 7.56152"
        stroke="#FFFEFC"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  </span>
</Link>

</div>


      {/* Menu Section */}
      <section className="py-20 bg-white">
  <div className="container mx-auto px-4 max-w-7xl">
    {/* Heading + subtitle */}
    <div className="mb-6">
      <h2 className="text-[64px] leading-none  font-['Instrument_Sans'] ">
        Our <span className="text-[#B83439]">Menu</span>
      </h2>
      <p className="mt-4 text-[#121214] text-[15px] leading-relaxed max-w-md">
        Crafted with passion, enjoyed in every <br className="hidden sm:block" />
        bite. Taste the difference!
      </p>
    </div>

    {/* Tabs + top-right View All */}
    <div className="mb-8 flex items-end justify-between">
      {/* Tabs */}
      <div className="border-b border-gray-300">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('traditional')}
            className={`relative -mb-px pb-3 text-[16px] font-medium transition-colors ${
              activeTab === 'traditional'
                ? 'text-[#121214]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Traditional Selection
            {activeTab === 'traditional' && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#B83439]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('signature')}
            className={`relative -mb-px pb-3 text-[14px] font-medium transition-colors ${
              activeTab === 'signature'
                ? 'text-[#121214]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Signature Selection
            {activeTab === 'signature' && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#B83439]" />
            )}
          </button>
        </div>
      </div>

      {/* Top-right View All */}
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 bg-[#B83439] text-white px-5 py-2 rounded-[6px] text-[16px] font-medium hover:bg-[#6D1E29] transition-colors"
      >
        View All <span aria-hidden>»</span>
      </Link>
    </div>

    {/* Grid */}
    {displayPizzas.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {displayPizzas.map((pizza) => (
          <div key={pizza.id} className="bg-white rounded-lg overflow-hidden">
            <div className="relative h-48 sm:h-56 lg:h-52 overflow-hidden">
              <Image
                src={pizza.image_url}
                alt={pizza.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="pt-4 px-2">
              {/* Title */}
              <h3 className="font-['Instrument_Serif'] text-[26px] text-[#121214] leading-snug mb-1">
                {pizza.name}
              </h3>

              {/* Description */}
              <p className="text-[#6b6b6b] text-[14px] leading-relaxed mb-2 line-clamp-3 pr-2">
                {pizza.description}
              </p>

              {/* Price */}
              <p className="text-[#B83439] font-bold text-[19px] mb-3">
                ${pizza.base_price.toFixed(2)}
              </p>

              {/* Link */}
              <Link
                href={`/customize/${pizza.id}`}
                className="text-[#B83439] text-[19px] font-medium hover:underline inline-flex items-center gap-1 mb-5"
              >
                Customize Pizza <span aria-hidden>»</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="py-12">
        <p className="text-gray-500">Loading menu...</p>
      </div>
    )}

    {/* Bottom-left View All (matches screenshot) */}
    <div className="mt-2">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 bg-[#B83439] text-white px-5 py-2 rounded-[6px] text-[16px] font-medium hover:bg-[#6D1E29] transition-colors"
      >
        View All <span aria-hidden>»</span>
      </Link>
    </div>
  </div>
</section>



      {/* Why We're the Best Section */}
      <section className="py-20 bg-white">
  <div className="container mx-auto px-4 max-w-7xl">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-[64px] leading-none font-normal font-['Instrument_Serif'] text-[#121214] mb-6">
        Why we’re <span className="text-[#B83439] italic">the best</span>
      </h2>
      <p className="text-[#2b2b2b] text-lg max-w-3xl mx-auto leading-relaxed">
        At Europa Pizza, we draw inspiration from the Mediterranean’s rich history and flavors.
        Our name comes from the legend of Europa, the Tyrian princess.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="border border-[#e9c6c6] p-10 text-left hover:shadow-sm transition-shadow">
        <h3 className="text-[26px] font-bold text-[#121214] mb-1">
          Legendary
        </h3>
        <p className="text-[22px] text-[#B83439] italic font-['Instrument_Serif'] mb-5">
          Mediterranean Flavor
        </p>
        <p className="text-[#444] leading-relaxed mb-8 text-[15px]">
          We blend the bold, sun-kissed flavors of the Mediterranean with recipes inspired by the
          ancient tale of Europa. Every pizza is a harmony of tradition, legend, and the finest
          ingredients.
        </p>
        {/* SVG Decorative Border */}
        <div className="pt-4">
          <svg width="329" height="16" viewBox="0 0 329 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_27_5221)">
                <path d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip1_27_5221)">
                <path d="M52.9686 15.8771V2.49968H39.0831V13.9858H47.7229V7.58823H44.3303V10.7014H42.4762V5.69648H49.5775V15.8771H37.229V0.607935H54.8232V13.9858H68.7077V2.49818H60.0699V8.89828H63.4615V5.78358H65.3161V10.7885H58.2158V0.606934H70.5618V15.8771H52.9686Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip2_27_5221)">
                <path d="M89.8019 15.8771V2.49968H75.9163V13.9858H84.5561V7.58823H81.1635V10.7014H79.3094V5.69648H86.4107V15.8771H74.0623V0.607935H91.6564V13.9858H105.541V2.49818H96.9031V8.89828H100.295V5.78358H102.149V10.7885H95.049V0.606934H107.395V15.8771H89.8019Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip3_27_5221)">
                <path d="M126.635 15.8771V2.49968H112.75V13.9858H121.39V7.58823H117.997V10.7014H116.143V5.69648H123.244V15.8771H110.896V0.607935H128.49V13.9858H142.374V2.49818H133.737V8.89828H137.128V5.78358H138.983V10.7885H131.883V0.606934H144.229V15.8771H126.635Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip4_27_5221)">
                <path d="M163.469 15.8771V2.49968H149.583V13.9858H158.223V7.58823H154.83V10.7014H152.976V5.69648H160.077V15.8771H147.729V0.607935H165.323V13.9858H179.208V2.49818H170.57V8.89828H173.962V5.78358H175.816V10.7885H168.716V0.606934H181.062V15.8771H163.469Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip5_27_5221)">
                <path d="M200.302 15.8771V2.49968H186.417V13.9858H195.056V7.58823H191.664V10.7014H189.81V5.69648H196.911V15.8771H184.562V0.607935H202.157V13.9858H216.041V2.49818H207.403V8.89828H210.795V5.78358H212.65V10.7885H205.549V0.606934H217.895V15.8771H200.302Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip6_27_5221)">
                <path d="M237.136 15.8771V2.49968H223.25V13.9858H231.89V7.58823H228.497V10.7014H226.643V5.69648H233.744V15.8771H221.396V0.607935H238.99V13.9858H252.875V2.49818H244.237V8.89828H247.628V5.78358H249.483V10.7885H242.383V0.606934H254.729V15.8771H237.136Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip7_27_5221)">
                <path d="M273.969 15.8771V2.49968H260.083V13.9858H268.723V7.58823H265.331V10.7014H263.476V5.69648H270.578V15.8771H258.229V0.607935H275.823V13.9858H289.708V2.49818H281.07V8.89828H284.462V5.78358H286.316V10.7885H279.216V0.606934H291.562V15.8771H273.969Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip8_27_5221)">
                <path d="M310.802 15.8771V2.49968H296.917V13.9858H305.557V7.58823H302.164V10.7014H300.31V5.69648H307.411V15.8771H295.063V0.607935H312.657V13.9858H326.541V2.49818H317.904V8.89828H321.295V5.78358H323.15V10.7885H316.05V0.606934H328.396V15.8771H310.802Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <defs>
                <clipPath id="clip0_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(0.395508 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip1_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(37.229 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip2_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(74.0623 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip3_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(110.896 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip4_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(147.729 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip5_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(184.562 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip6_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(221.396 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip7_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(258.229 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip8_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(295.063 0.606934)"></rect>
                </clipPath>
              </defs>
            </svg>
          
        </div>
      </div>

      {/* Card 2 */}
      <div className="border border-[#e9c6c6] p-10 text-left hover:shadow-sm transition-shadow">
        <h3 className="text-[26px] font-bold text-[#121214] mb-1">
          Crafted for
        </h3>
        <p className="text-[22px] text-[#B83439] italic font-['Instrument_Serif'] mb-5">
          Pure Taste
        </p>
        <p className="text-[#444] leading-relaxed mb-8 text-[15px]">
          We blend the bold, sun-kissed flavors of the Mediterranean with recipes inspired by the
          ancient tale of Europa. Every pizza is a harmony of tradition, legend, and the finest
          ingredients.
        </p>
        <div className="pt-4">
          <svg width="329" height="16" viewBox="0 0 329 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_27_5221)">
                <path d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip1_27_5221)">
                <path d="M52.9686 15.8771V2.49968H39.0831V13.9858H47.7229V7.58823H44.3303V10.7014H42.4762V5.69648H49.5775V15.8771H37.229V0.607935H54.8232V13.9858H68.7077V2.49818H60.0699V8.89828H63.4615V5.78358H65.3161V10.7885H58.2158V0.606934H70.5618V15.8771H52.9686Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip2_27_5221)">
                <path d="M89.8019 15.8771V2.49968H75.9163V13.9858H84.5561V7.58823H81.1635V10.7014H79.3094V5.69648H86.4107V15.8771H74.0623V0.607935H91.6564V13.9858H105.541V2.49818H96.9031V8.89828H100.295V5.78358H102.149V10.7885H95.049V0.606934H107.395V15.8771H89.8019Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip3_27_5221)">
                <path d="M126.635 15.8771V2.49968H112.75V13.9858H121.39V7.58823H117.997V10.7014H116.143V5.69648H123.244V15.8771H110.896V0.607935H128.49V13.9858H142.374V2.49818H133.737V8.89828H137.128V5.78358H138.983V10.7885H131.883V0.606934H144.229V15.8771H126.635Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip4_27_5221)">
                <path d="M163.469 15.8771V2.49968H149.583V13.9858H158.223V7.58823H154.83V10.7014H152.976V5.69648H160.077V15.8771H147.729V0.607935H165.323V13.9858H179.208V2.49818H170.57V8.89828H173.962V5.78358H175.816V10.7885H168.716V0.606934H181.062V15.8771H163.469Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip5_27_5221)">
                <path d="M200.302 15.8771V2.49968H186.417V13.9858H195.056V7.58823H191.664V10.7014H189.81V5.69648H196.911V15.8771H184.562V0.607935H202.157V13.9858H216.041V2.49818H207.403V8.89828H210.795V5.78358H212.65V10.7885H205.549V0.606934H217.895V15.8771H200.302Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip6_27_5221)">
                <path d="M237.136 15.8771V2.49968H223.25V13.9858H231.89V7.58823H228.497V10.7014H226.643V5.69648H233.744V15.8771H221.396V0.607935H238.99V13.9858H252.875V2.49818H244.237V8.89828H247.628V5.78358H249.483V10.7885H242.383V0.606934H254.729V15.8771H237.136Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip7_27_5221)">
                <path d="M273.969 15.8771V2.49968H260.083V13.9858H268.723V7.58823H265.331V10.7014H263.476V5.69648H270.578V15.8771H258.229V0.607935H275.823V13.9858H289.708V2.49818H281.07V8.89828H284.462V5.78358H286.316V10.7885H279.216V0.606934H291.562V15.8771H273.969Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip8_27_5221)">
                <path d="M310.802 15.8771V2.49968H296.917V13.9858H305.557V7.58823H302.164V10.7014H300.31V5.69648H307.411V15.8771H295.063V0.607935H312.657V13.9858H326.541V2.49818H317.904V8.89828H321.295V5.78358H323.15V10.7885H316.05V0.606934H328.396V15.8771H310.802Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <defs>
                <clipPath id="clip0_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(0.395508 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip1_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(37.229 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip2_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(74.0623 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip3_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(110.896 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip4_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(147.729 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip5_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(184.562 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip6_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(221.396 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip7_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(258.229 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip8_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(295.063 0.606934)"></rect>
                </clipPath>
              </defs>
            </svg>
        </div>
      </div>

      {/* Card 3 */}
      <div className="border border-[#e9c6c6] p-10 text-left hover:shadow-sm transition-shadow">
        <h3 className="text-[26px] font-bold text-[#121214] mb-1">
          Service That
        </h3>
        <p className="text-[22px] text-[#B83439] italic font-['Instrument_Serif'] mb-5">
          Feels Like Home
        </p>
        <p className="text-[#444] leading-relaxed mb-8 text-[15px]">
          We blend the bold, sun-kissed flavors of the Mediterranean with recipes inspired by the
          ancient tale of Europa. Every pizza is a harmony of tradition, legend, and the finest
          ingredients.
        </p>
        <div className="pt-4">
          <svg width="329" height="16" viewBox="0 0 329 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_27_5221)">
                <path d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip1_27_5221)">
                <path d="M52.9686 15.8771V2.49968H39.0831V13.9858H47.7229V7.58823H44.3303V10.7014H42.4762V5.69648H49.5775V15.8771H37.229V0.607935H54.8232V13.9858H68.7077V2.49818H60.0699V8.89828H63.4615V5.78358H65.3161V10.7885H58.2158V0.606934H70.5618V15.8771H52.9686Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip2_27_5221)">
                <path d="M89.8019 15.8771V2.49968H75.9163V13.9858H84.5561V7.58823H81.1635V10.7014H79.3094V5.69648H86.4107V15.8771H74.0623V0.607935H91.6564V13.9858H105.541V2.49818H96.9031V8.89828H100.295V5.78358H102.149V10.7885H95.049V0.606934H107.395V15.8771H89.8019Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip3_27_5221)">
                <path d="M126.635 15.8771V2.49968H112.75V13.9858H121.39V7.58823H117.997V10.7014H116.143V5.69648H123.244V15.8771H110.896V0.607935H128.49V13.9858H142.374V2.49818H133.737V8.89828H137.128V5.78358H138.983V10.7885H131.883V0.606934H144.229V15.8771H126.635Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip4_27_5221)">
                <path d="M163.469 15.8771V2.49968H149.583V13.9858H158.223V7.58823H154.83V10.7014H152.976V5.69648H160.077V15.8771H147.729V0.607935H165.323V13.9858H179.208V2.49818H170.57V8.89828H173.962V5.78358H175.816V10.7885H168.716V0.606934H181.062V15.8771H163.469Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip5_27_5221)">
                <path d="M200.302 15.8771V2.49968H186.417V13.9858H195.056V7.58823H191.664V10.7014H189.81V5.69648H196.911V15.8771H184.562V0.607935H202.157V13.9858H216.041V2.49818H207.403V8.89828H210.795V5.78358H212.65V10.7885H205.549V0.606934H217.895V15.8771H200.302Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip6_27_5221)">
                <path d="M237.136 15.8771V2.49968H223.25V13.9858H231.89V7.58823H228.497V10.7014H226.643V5.69648H233.744V15.8771H221.396V0.607935H238.99V13.9858H252.875V2.49818H244.237V8.89828H247.628V5.78358H249.483V10.7885H242.383V0.606934H254.729V15.8771H237.136Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip7_27_5221)">
                <path d="M273.969 15.8771V2.49968H260.083V13.9858H268.723V7.58823H265.331V10.7014H263.476V5.69648H270.578V15.8771H258.229V0.607935H275.823V13.9858H289.708V2.49818H281.07V8.89828H284.462V5.78358H286.316V10.7885H279.216V0.606934H291.562V15.8771H273.969Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <g clip-path="url(#clip8_27_5221)">
                <path d="M310.802 15.8771V2.49968H296.917V13.9858H305.557V7.58823H302.164V10.7014H300.31V5.69648H307.411V15.8771H295.063V0.607935H312.657V13.9858H326.541V2.49818H317.904V8.89828H321.295V5.78358H323.15V10.7885H316.05V0.606934H328.396V15.8771H310.802Z" fill="#B73339" fill-opacity="0.5"></path>
              </g>
              <defs>
                <clipPath id="clip0_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(0.395508 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip1_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(37.229 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip2_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(74.0623 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip3_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(110.896 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip4_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(147.729 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip5_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(184.562 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip6_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(221.396 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip7_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(258.229 0.606934)"></rect>
                </clipPath>
                <clipPath id="clip8_27_5221">
                  <rect width="33.3328" height="15.2701" fill="white" transform="translate(295.063 0.606934)"></rect>
                </clipPath>
              </defs>
            </svg>
        </div>
      </div>
    </div>
  </div>
</section>




      {/* Gallery Section */}
      <section className="py-20 bg-white">
  <div className="container mx-auto px-4 max-w-7xl">
    {/* Section Title */}
    <div className="text-center mb-12">
      <h2
        className="text-[40px] md:text-[64px] leading-[100%] text-[#121214] font-[400] font-['Instrument_Serif'] mb-6"
      >
        See <span className="accent-text">What’s Cooking</span>
      </h2>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        Here's a peek at what we've been baking — pizzas, pastas, and smiles fresh from our kitchen.
      </p>
    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {galleryImages.map((img, idx) => (
        <div key={idx} className="relative h-80 overflow-hidden rounded-lg">
          <Image
            src={img}
            alt={`Gallery ${idx + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  </div>
</section>


  

<section className="py-28 bg-[#FFFEFD]">
  <div className="container mx-auto px-4 max-w-7xl text-center">
    {/* Heading */}
    <h2
      className="font-['Instrument_Serif'] text-[#121214] leading-none
                 text-[48px] md:text-[68px] lg:text-[76px] font-normal"
    >
      Our Customers
    </h2>
    <p
      className="mt-2 font-['Instrument_Serif'] leading-none
                 text-[42px] md:text-[60px] lg:text-[66px] italic text-[#B83439]"
    >
      can’t get enough <span className="not-italic font-normal text-[#121214]">of us.</span>
    </p>

    {/* Carousel row */}
    {(() => {
      const testimonials = [
        { name: "Sam", text: "Flavorful and satisfying." },
        { name: "Priya", text: "The truffle funghi is amazing." },
        { name: "Lee", text: "Great variety and quality." },
        { name: "Janet Jackson", text: "I tried Europa Pizza on a friend's recommendation and I'm so glad I did. The flavors are fresh and balanced, and the crust has that perfect crunch. It's easily become my weekend treat." },
      ];

      const n = testimonials.length;
      if (n === 0) return null;

      const Bar = () => (
        <div
          className="mt-6 h-[8px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #b24b57 0 14px, transparent 14px 20px)",
          }}
        />
      );

      const SideCard = ({ t }: { t: { name: string; text: string } }) => (
        <div
          className="w-[290px] md:w-[330px] p-10 rounded-md border border-[#e9c6c6]
                     opacity-40 blur-[2px] md:blur-[3px] scale-95 select-none
                     transition-all duration-300"
          aria-hidden="true"
        >
          <Quote className="h-8 w-8 text-[#B83439] mb-6" />
          <p className="text-[#6a6a6a] text-base leading-relaxed italic">{t.text}</p>
          <p className="text-[#333] font-semibold mt-6">{t.name}</p>
          <Bar />
        </div>
      );

      const CenterCard = ({ t }: { t: { name: string; text: string } }) => (
        <div
          className="w-[320px] md:w-[380px] lg:w-[420px] p-12 rounded-md bg-white
                     border border-[#d9a1a7] shadow-sm scale-105
                     transition-all duration-300"
        >
          <svg width="40" height="30" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.94935 40.877C7.00064 40.877 4.70064 39.8233 3.04935 37.7161C1.28012 35.6088 0.395508 32.7407 0.395508 29.1115C0.395508 23.7263 1.575 18.8094 3.93397 14.3608C6.41089 9.91218 10.3622 5.75623 15.7878 1.89295C17.2032 0.839324 18.3237 0.605186 19.1494 1.19053C19.6211 1.54174 19.857 2.06855 19.857 2.77096C19.857 3.35631 19.4442 3.94165 18.6186 4.527C14.6083 7.92201 12.0135 10.5561 10.834 12.4292C9.77243 14.1852 9.24166 16.0583 9.24166 18.0485C9.24166 20.1557 9.71346 21.7947 10.657 22.9654C11.6006 24.019 12.6622 24.9556 13.8417 25.775C15.0211 26.4775 16.0827 27.3555 17.0263 28.4091C17.9699 29.4627 18.4417 31.0432 18.4417 33.1504C18.4417 35.2576 17.675 37.0722 16.1417 38.5941C14.7263 40.116 12.6622 40.877 9.94935 40.877ZM36.4878 40.877C33.5391 40.877 31.1801 39.8233 29.4109 37.7161C27.7596 35.6088 26.934 32.7407 26.934 29.1115C26.934 23.7263 28.1135 18.8094 30.4724 14.3608C32.9494 9.91218 36.9006 5.75623 42.3263 1.89295C43.7417 0.839324 44.8622 0.605186 45.6878 1.19053C46.1596 1.54174 46.3955 2.06855 46.3955 2.77096C46.3955 3.35631 45.9827 3.94165 45.157 4.527C41.1468 7.92201 38.5519 10.5561 37.3724 12.4292C36.3109 14.1852 35.7801 16.0583 35.7801 18.0485C35.7801 20.1557 36.2519 21.7947 37.1955 22.9654C38.1391 24.019 39.2006 24.9556 40.3801 25.775C41.5596 26.4775 42.6211 27.3555 43.5647 28.4091C44.5083 29.4627 44.9801 31.0432 44.9801 33.1504C44.9801 35.2576 44.2135 37.0722 42.6801 38.5941C41.2647 40.116 39.2006 40.877 36.4878 40.877Z" fill="#BC4045"></path>
              </svg>
          <p className="text-[#2b2b2b] text-lg md:text-xl mt-5 leading-relaxed italic">{t.text}</p>
          <p className="text-[#121214] font-bold text-lg mt-8">{t.name}</p>
          <svg width="329" height="16" viewBox="0 0 329 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_27_5221)">
                  <path d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip1_27_5221)">
                  <path d="M52.9686 15.8771V2.49968H39.0831V13.9858H47.7229V7.58823H44.3303V10.7014H42.4762V5.69648H49.5775V15.8771H37.229V0.607935H54.8232V13.9858H68.7077V2.49818H60.0699V8.89828H63.4615V5.78358H65.3161V10.7885H58.2158V0.606934H70.5618V15.8771H52.9686Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip2_27_5221)">
                  <path d="M89.8019 15.8771V2.49968H75.9163V13.9858H84.5561V7.58823H81.1635V10.7014H79.3094V5.69648H86.4107V15.8771H74.0623V0.607935H91.6564V13.9858H105.541V2.49818H96.9031V8.89828H100.295V5.78358H102.149V10.7885H95.049V0.606934H107.395V15.8771H89.8019Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip3_27_5221)">
                  <path d="M126.635 15.8771V2.49968H112.75V13.9858H121.39V7.58823H117.997V10.7014H116.143V5.69648H123.244V15.8771H110.896V0.607935H128.49V13.9858H142.374V2.49818H133.737V8.89828H137.128V5.78358H138.983V10.7885H131.883V0.606934H144.229V15.8771H126.635Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip4_27_5221)">
                  <path d="M163.469 15.8771V2.49968H149.583V13.9858H158.223V7.58823H154.83V10.7014H152.976V5.69648H160.077V15.8771H147.729V0.607935H165.323V13.9858H179.208V2.49818H170.57V8.89828H173.962V5.78358H175.816V10.7885H168.716V0.606934H181.062V15.8771H163.469Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip5_27_5221)">
                  <path d="M200.302 15.8771V2.49968H186.417V13.9858H195.056V7.58823H191.664V10.7014H189.81V5.69648H196.911V15.8771H184.562V0.607935H202.157V13.9858H216.041V2.49818H207.403V8.89828H210.795V5.78358H212.65V10.7885H205.549V0.606934H217.895V15.8771H200.302Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip6_27_5221)">
                  <path d="M237.136 15.8771V2.49968H223.25V13.9858H231.89V7.58823H228.497V10.7014H226.643V5.69648H233.744V15.8771H221.396V0.607935H238.99V13.9858H252.875V2.49818H244.237V8.89828H247.628V5.78358H249.483V10.7885H242.383V0.606934H254.729V15.8771H237.136Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip7_27_5221)">
                  <path d="M273.969 15.8771V2.49968H260.083V13.9858H268.723V7.58823H265.331V10.7014H263.476V5.69648H270.578V15.8771H258.229V0.607935H275.823V13.9858H289.708V2.49818H281.07V8.89828H284.462V5.78358H286.316V10.7885H279.216V0.606934H291.562V15.8771H273.969Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <g clip-path="url(#clip8_27_5221)">
                  <path d="M310.802 15.8771V2.49968H296.917V13.9858H305.557V7.58823H302.164V10.7014H300.31V5.69648H307.411V15.8771H295.063V0.607935H312.657V13.9858H326.541V2.49818H317.904V8.89828H321.295V5.78358H323.15V10.7885H316.05V0.606934H328.396V15.8771H310.802Z" fill="#B73339" fill-opacity="0.5"></path>
                </g>
                <defs>
                  <clipPath id="clip0_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(0.395508 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip1_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(37.229 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip2_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(74.0623 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip3_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(110.896 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip4_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(147.729 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip5_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(184.562 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip6_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(221.396 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip7_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(258.229 0.606934)"></rect>
                  </clipPath>
                  <clipPath id="clip8_27_5221">
                    <rect width="33.3328" height="15.2701" fill="white" transform="translate(295.063 0.606934)"></rect>
                  </clipPath>
                </defs>
              </svg>
        </div>
      );

      const center = testimonialIndex;
      const left = (center - 1 + n) % n;
      const right = (center + 1) % n;

      return (
        <>
          <div className="mt-20 flex items-start justify-center gap-10 md:gap-14">
            <SideCard t={testimonials[left]} />
            <CenterCard t={testimonials[center]} />
            <SideCard t={testimonials[right]} />
          </div>

          {/* Navigation */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => setTestimonialIndex((i) => (i - 1 + n) % n)}
              className="h-12 w-12 grid place-items-center rounded-md
                         border border-[#b24b57] text-[#b24b57]
                         hover:bg-[#fff1f1] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setTestimonialIndex((i) => (i + 1) % n)}
              className="h-12 w-12 grid place-items-center rounded-md
                         border border-[#b24b57] text-[#b24b57]
                         hover:bg-[#fff1f1] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      );
    })()}
  </div>
</section>





      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-[64px] leading-none  font-['Instrument_Serif'] text-[#121214] mb-6">
                Contact Us
              </h2>
              <p className="text-gray-600 font-sans text-lg mb-8">
                We'd love to hear from you! Whether you have a question, feedback, or want to place an order, feel free to get in touch.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#8B2635] mt-1" />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Call Us</p>
                    <a href="tel:1300827286" className="text-gray-600 text-lg hover:text-[#8B2635]">
                      1300 827 286
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#8B2635] mt-1" />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Email Us</p>
                    <a href="mailto:info@europapizza.com.au" className="text-gray-600 text-lg hover:text-[#8B2635]">
                      info@europapizza.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#8B2635] mt-1" />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Visit Us</p>
                    <p className="text-gray-600 text-lg">75 Dorcas St, South Melbourne, 3205</p>
                  </div>
                </div>
              </div>

              <Link href="/menu" className="bg-[#8B2635] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#6d1e29] transition-colors inline-block">
                Order Now
              </Link>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-3xl font-light text-gray-800 mb-8">
                Enquire Now
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Enter your name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Enter your email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Enter your message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Enter Captcha</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Please enter the 4 digit CAPTCHA code"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2635]"
                    />
                    <div className="bg-gray-200 px-4 py-3 rounded-lg font-mono text-lg">
                      3282
                    </div>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#8B2635] text-white py-4 rounded-lg text-lg font-medium hover:bg-[#6d1e29] transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center bg-white">
  <div className="w-[80vw] h-[50vh] p-10 flex justify-center items-center">
    <iframe
      title="Europa Pizza Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.799347988959!2d144.9658937756749!3d-37.83243687196737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66816fdac92a3%3A0xd3a95a9c2f5a1c0c!2s75%20Dorcas%20St%2C%20South%20Melbourne%20VIC%203205%2C%20Australia!5e0!3m2!1sen!2sau!4v1699288570001!5m2!1sen!2sau"
      className="w-[70%] h-full border-0 rounded-lg shadow-lg"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>




      {/* Final CTA Section */}
<section
  className="relative w-full h-screen bg-cover bg-center font-['Playfair_Display']"
  style={{
    backgroundImage:
      "url('https://europa-pizza.vercel.app/assets/about.png')",
  }}
>
  {/* Optional gradient for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

  {/* Text container — side by side layout */}
  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
      {/* Left side - Heading */}
      <div className="text-white">
        <h2 className="text-4xl md:text-5xl font-light leading-tight">
          Authentic
          <br />
          <span className="italic text-5xl md:text-6xl font-normal">
            Mediterranean Taste.
          </span>
        </h2>
      </div>

      {/* Right side - Paragraph */}
      <div className="text-white">
        <p className="text-[15px] md:text-[16px] leading-relaxed text-white/90 font-sans max-w-md ml-auto">
          At Europa Pizza, we draw inspiration from the Mediterranean's rich
          history and flavors. Our name comes from the legend of Europa — the
          Tyrian princess whisked away by Zeus in the form of a white bull.
          Europa's journey across the sea symbolizes adventure, culture, and
          connection.
        </p>
      </div>
    </div>
  </div>

  {/* Greek-style decorative red border at bottom */}
  <div
    className="absolute bottom-0 left-0 w-full h-[22px]"
    style={{
      backgroundColor: "#8B2635",
      backgroundImage:
        "repeating-linear-gradient(90deg, #8B2635 0 18px, transparent 18px 22px)",
    }}
  ></div>
</section>
<section
  className="relative w-full h-screen overflow-hidden font-['Playfair_Display']"
>
  {/* Background image with zoom animation */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-110 animate-zoom-slow"
    style={{
      backgroundImage: "url('https://europa-pizza.vercel.app/assets/about.png')",
    }}
  ></div>

  {/* Optional gradient for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

  {/* Greek-style decorative red border at bottom */}
  <div className="absolute bottom-0 left-0 w-full h-[22px] scale-[110%]"></div>
</section>





      <Footer />
    </>
  );
}