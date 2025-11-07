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
      <section className="relative h-[90vh] bg-cover bg-center flex flex-col">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        'url(https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1920)',
    }}
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Spacer for the image height */}
  <div className="flex-grow"></div>
</section>

{/* ✅ Text below the image */}
<div className="text-center text-gray-900 px-4 py-16 bg-white">
  <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
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
      <h2 className="text-[64px] leading-none font-normal font-['Instrument_Serif'] text-[#121214]">
        Our <span className="text-[#B83439] italic">Menu</span>
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
            className={`relative -mb-px pb-3 text-[14px] font-medium transition-colors ${
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
        className="inline-flex items-center gap-2 bg-[#B83439] text-white px-5 py-2 rounded-[6px] text-[14px] font-medium hover:bg-[#6D1E29] transition-colors"
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
              <h3 className="font-['Instrument_Serif'] text-[22px] text-[#121214] leading-snug mb-1">
                {pizza.name}
              </h3>

              {/* Description */}
              <p className="text-[#6b6b6b] text-[12.5px] leading-relaxed mb-2 line-clamp-3 pr-2">
                {pizza.description}
              </p>

              {/* Price */}
              <p className="text-[#B83439] font-bold text-[13px] mb-3">
                ${pizza.base_price.toFixed(2)}
              </p>

              {/* Link */}
              <Link
                href={`/customize/${pizza.id}`}
                className="text-[#B83439] text-[13px] font-medium hover:underline inline-flex items-center gap-1 mb-5"
              >
                View Product <span aria-hidden>»</span>
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
        className="inline-flex items-center gap-2 bg-[#B83439] text-white px-5 py-2 rounded-[6px] text-[14px] font-medium hover:bg-[#6D1E29] transition-colors"
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
          <svg
            width="100%"
            height="16"
            viewBox="0 0 329 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_27_5221)">
              <path
                d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z"
                fill="#B73339"
                fillOpacity="0.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_27_5221">
                <rect width="329" height="16" fill="white" />
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
          <svg
            width="100%"
            height="16"
            viewBox="0 0 329 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_27_5221)">
              <path
                d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z"
                fill="#B73339"
                fillOpacity="0.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_27_5221">
                <rect width="329" height="16" fill="white" />
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
          <svg
            width="100%"
            height="16"
            viewBox="0 0 329 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_27_5221)">
              <path
                d="M16.1351 15.8771V2.49968H2.24959V13.9858H10.8894V7.58823H7.49678V10.7014H5.64269V5.69648H12.744V15.8771H0.395508V0.607935H17.9897V13.9858H31.8742V2.49818H23.2364V8.89828H26.628V5.78358H28.4826V10.7885H21.3823V0.606934H33.7283V15.8771H16.1351Z"
                fill="#B73339"
                fillOpacity="0.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_27_5221">
                <rect width="329" height="16" fill="white" />
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


      {/* Testimonials Section */}
<section className="py-24 bg-[#fff8f8] font-['Playfair_Display']">
  <div className="container mx-auto px-4 max-w-7xl text-center">
    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-light text-gray-900">
      Our Customers
    </h2>
    <p className="text-[#8B2635] italic text-4xl md:text-[46px] font-medium mt-2">
      can’t get enough <span className="not-italic text-gray-900 font-normal">of us.</span>
    </p>

    {/* Testimonials Carousel */}
    <div className="flex justify-center gap-8 mt-16">
      {/* Card 1 (left faded) */}
      <div className="w-[280px] md:w-[320px] p-10 border border-[#d9a1a7] rounded-md opacity-60 backdrop-blur-sm">
        <Quote className="h-8 w-8 text-[#8B2635] mb-6 mx-auto" />
        <p className="text-gray-600 text-base leading-relaxed italic">
          Crispy crust, fresh toppings. Loved it!
        </p>
        <p className="text-gray-800 font-semibold mt-6">Alex</p>
        <div
          className="mt-6 h-[8px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #b24b57 0 14px, transparent 14px 20px)",
          }}
        ></div>
      </div>

      {/* Card 2 (center active) */}
      <div className="w-[300px] md:w-[360px] bg-white p-12 border border-[#d9a1a7] rounded-md shadow-md scale-105">
        <Quote className="h-10 w-10 text-[#8B2635] mb-6 mx-auto" />
        <p className="text-gray-800 text-lg md:text-xl leading-relaxed italic">
          Best pizza in town. Quick delivery!
        </p>
        <p className="text-gray-900 font-bold text-lg mt-8">Jordan</p>
        <div
          className="mt-6 h-[8px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #b24b57 0 14px, transparent 14px 20px)",
          }}
        ></div>
      </div>

      {/* Card 3 (right faded) */}
      <div className="w-[280px] md:w-[320px] p-10 border border-[#d9a1a7] rounded-md opacity-60 backdrop-blur-sm">
        <Quote className="h-8 w-8 text-[#8B2635] mb-6 mx-auto" />
        <p className="text-gray-600 text-base leading-relaxed italic">
          Flavorful and satisfying.
        </p>
        <p className="text-gray-800 font-semibold mt-6">Sam</p>
        <div
          className="mt-6 h-[8px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #b24b57 0 14px, transparent 14px 20px)",
          }}
        ></div>
      </div>
    </div>

    {/* Navigation Arrows */}
    <div className="flex justify-center gap-4 mt-10">
      <button
        onClick={prevTestimonial}
        className="p-4 border border-gray-300 hover:bg-gray-100 transition-colors rounded-md"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextTestimonial}
        className="p-4 border border-gray-300 hover:bg-gray-100 transition-colors rounded-md"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  </div>
</section>



      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-8">
                Contact Us
              </h2>
              <p className="text-gray-600 text-lg mb-8">
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
      allowFullScreen={true}
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

  {/* Text container — centered horizontally and near bottom */}
  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center max-w-3xl px-6">
    <h2 className="text-4xl md:text-5xl font-light leading-tight mb-3">
      Authentic
      <br />
      <span className="italic text-5xl md:text-6xl font-normal">
        Mediterranean Taste.
      </span>
    </h2>

    <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-white/90 font-sans max-w-xl mx-auto">
      At Europa Pizza, we draw inspiration from the Mediterranean's rich
      history and flavors. Our name comes from the legend of Europa — the
      Tyrian princess whisked away by Zeus in the form of a white bull.
      Europa’s journey across the sea symbolizes adventure, culture, and
      connection.
    </p>
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
  className="relative w-full h-screen bg-cover bg-center font-['Playfair_Display']"
  style={{
    backgroundImage:
      "url('https://europa-pizza.vercel.app/assets/about.png')",
  }}
>
  {/* Optional gradient for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

  {/* Text container — centered horizontally and near bottom */}


  {/* Greek-style decorative red border at bottom */}
  <div
    className="absolute bottom-0 left-0 w-full h-[22px] scale-[110%]"
  ></div>
</section>




      <Footer />
    </>
  );
}