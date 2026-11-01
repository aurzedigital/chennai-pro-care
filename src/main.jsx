import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const B = {
  phone: '919344532942',
  phone2: '919344531524',
  email: 'chennaiprotankcleaners@gmail.com',
  address: 'Adambakkam, Chennai',
  maps: 'https://www.google.com/maps/place/Chennai+Pro+Water+Tank+Cleaning+Services/@12.9883506,80.1987337,17z/data=!4m12!1m2!2m1!1schennai+pro+water+tank+cleaning+services!3m8!1s0x3a525d8664dffecf:0xcb233fe8ccf41ac2!8m2!3d12.9883506!4d80.2032399!9m1!1b1!15sCihjaGVubmFpIHBybyB3YXRlciB0YW5rIGNsZWFuaW5nIHNlcnZpY2VzWioiKGNoZW5uYWkgcHJvIHdhdGVyIHRhbmsgY2xlYW5pbmcgc2VydmljZXOSARt3YXRlcl90YW5rX2NsZWFuaW5nX3NlcnZpY2XgAQA!16s%2Fg%2F11tck4h3dg?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D'
};

const LOCATIONS = [
  {
    name: 'Chennai Pro Water Tank Cleaning Services',
    area: 'Adambakkam, Chennai',
    map: 'https://www.google.com/maps/place/Chennai+Pro+Water+Tank+Cleaning+Services/@12.9883506,80.1987337,17z/data=!4m12!1m2!2m1!1schennai+pro+water+tank+cleaning+services!3m8!1s0x3a525d8664dffecf:0xcb233fe8ccf41ac2!8m2!3d12.9883506!4d80.2032399!9m1!1b1!15sCihjaGVubmFpIHBybyB3YXRlciB0YW5rIGNsZWFuaW5nIHNlcnZpY2VzWioiKGNoZW5uYWkgcHJvIHdhdGVyIHRhbmsgY2xlYW5pbmcgc2VydmljZXOSARt3YXRlcl90YW5rX2NsZWFuaW5nX3NlcnZpY2XgAQA!16s%2Fg%2F11tck4h3dg?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D',
    embed: 'https://www.google.com/maps?q=12.9883506,80.2032399&output=embed'
  },
  {
    name: 'Chennai Pro Care Pipeline Cleaners',
    area: 'Chennai',
    map: 'https://www.google.com/maps/place/Chennai+Pro+Care+Pipeline+Cleaners/@12.9345571,80.1152387,15z/data=!4m6!3m5!1s0x3a525ff246784945:0x88a508a708989676!8m2!3d12.9345738!4d80.1254189!16s%2Fg%2F11zxwzxngp?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D',
    embed: 'https://www.google.com/maps?q=12.9345738,80.1254189&output=embed'
  }
];

const SOCIAL = {
  instagram: 'https://www.instagram.com/chennaiprocare/',
  facebook: 'https://www.facebook.com/p/Chennai-pro-tank-cleaning-company-61572249132025/',
  youtube: 'https://www.youtube.com/channel/UCXbx0CzmkOxxp-Rd1smHM8g'
};

const GOOGLE_REVIEWS = 'https://www.google.com/maps/place/Chennai+Pro+Care+Pipeline+Cleaners/@12.9345571,80.1152387,15z/data=!4m6!3m5!1s0x3a525ff246784945:0x88a508a708989676!8m2!3d12.9345738!4d80.1254189!16s%2Fg%2F11zxwzxngp?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D';

const wa = text =>
  `https://wa.me/${B.phone}?text=${encodeURIComponent(text)}`;

const waterTankVideo = '/Videos/water-tank-cleaning.mp4';
const sumpVideo = '/Videos/%20sump-cleaning.mp4';
const pipelineVideo = '/Videos/pipeline-cleaning.mp4';

const LOGOS = {
  header: '/images/chennai-pro-care-logo-top.png',
  footer: '/images/chennai-pro-care-logo-bottom.png'
};

/* =========================================================
   LOCAL MEDIA
   The real Chennai Pro Care media is kept inside src/public.
   Vite imports these files as URLs so the browser can play
   the local MP4 files correctly.
   ========================================================= */

const localImages = import.meta.glob(
  './public/images/*',
  { eager: true, query: '?url', import: 'default' }
);

const fileName = path => path.split('/').pop().toLowerCase();

const findLocalAsset = (assets, keywords) => {
  const entries = Object.entries(assets);
  const match = entries.find(([path]) => {
    const name = fileName(path);
    return keywords.some(keyword => name.includes(keyword));
  });

  return match ? match[1] : null;
};

const localImageFiles = Object.entries(localImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

const heroImage =
  findLocalAsset(localImages, ['hero', 'banner', 'home']) ||
  localImageFiles[0] ||
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=85';


/* =========================================================
   CORE SERVICES
   Service videos displayed on the website.
   ========================================================= */

const services = [
  {
    icon: '💧',
    title: 'Water Tank Cleaning',
    description:
      'Professional cleaning for overhead water tanks to help remove dirt, sludge, algae and accumulated deposits.',
    video: waterTankVideo,
    videoLabel: 'WATCH TANK CLEANING'
  },
  {
    icon: '⬇️',
    title: 'Sump Cleaning',
    description:
      'Deep cleaning for underground sumps with drainage, washing and removal of accumulated dirt and sludge.',
    video: sumpVideo,
    videoLabel: 'WATCH SUMP CLEANING'
  },
  {
    icon: '🔧',
    title: 'Pipeline Cleaning',
    description:
      'Pipeline cleaning and maintenance support to help keep water-supply lines cleaner and flowing efficiently.',
    video: pipelineVideo,
    videoLabel: 'WATCH PIPELINE CLEANING'
  }
];

const supportingServices = [
  {
    number: '01',
    category: 'RESIDENTIAL',
    title: 'Residential Services',
    description: 'Cleaning solutions for homes, villas and apartments.',
    image:
      '/images/residental_service_.png',
    alt: 'Premium residential villa'
  },
  {
    number: '02',
    category: 'COMMERCIAL',
    title: 'Commercial Services',
    description:
      'Reliable cleaning support for offices, apartments and businesses.',
    image:
      '/images/commerical_service_.png',
    alt: 'Modern commercial building'
  },
  {
    number: '03',
    category: 'INDUSTRIAL',
    title: 'Industrial Services',
    description:
      'Cleaning support for larger facilities and water-storage systems.',
    image:
      '/images/industrial.png',
    alt: 'Large industrial facility'
  }
];

const productNames = [
  'Chlorine',
  'Pump',
  'Water-Quality Testing Kits',
  'Tank-Cleaning Tools & Accessories'
];

// External product images are illustrative references. Confirm the exact
// supplied brand/specification and suitability before publishing as stock.
const chlorinePhotos = [
  'https://poolife.com/wp-content/uploads/sites/8/2022/01/42120-a-plf-mpt-xtra-4lb-front.png',
  'https://kywiec.vtexassets.com/arquivos/ids/201289/435882.jpg?v=638574303287130000',
  'https://media.adeo.com/mkp/dc57fa5d89292a594c81beb661a3c6ce/media.png?fit=bounds&format=jpg&height=1600&quality=80&width=1600'
];
const pumpPhotos = ['/images/pump-1.png', '/images/pump-2.png', '/images/pump-3.png'];
const waterTestingPhotos = [
  'https://www.aquariuswater.com.au/cdn/shop/collections/Chlorine-_-pH-Water-test-Kit-Aquarius-Water-66216948_6b08dd31-d740-45f5-9622-4679b483a485.jpg?v=1750037184&width=1100',
  'https://techshop.lk/cdn/shop/products/PH-Chlorine-Water-Quality-Test-Kit.jpg?v=1561370058',
  'https://www.restaurantware.com/cdn/shop/files/RWT1090-2-LR.jpg?v=1725367157'
];
const tankToolPhotos = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1000&q=85'
];
const waterTestingVideoLink = 'https://washresources.cawst.org/en/resources/6c783156/measure-ph-free-and-total-chlorine-using-a-pooltester';

const products = [
  {
    name: productNames[0],
    price: 499,
    description: 'Chlorine treatment products for appropriate water-system applications. Confirm product grade and intended use before purchase.',
    media: chlorinePhotos,
    videoLink: null
  },
  {
    name: productNames[1],
    price: 299,
    description: 'Submersible water pump with float-switch configuration. Contact us to confirm availability, specifications and compatibility.',
    media: pumpPhotos,
    videoLink: null
  },
  {
    name: productNames[2],
    price: 299,
    sold: true,
    description: 'Water-testing kits for selected parameters such as pH and chlorine. Test results do not by themselves establish microbiological safety.',
    media: waterTestingPhotos,
    videoLink: waterTestingVideoLink
  },
  {
    name: productNames[3],
    price: 399,
    sold: true,
    description: 'Tank-cleaning brushes and accessories are a proposed category. Please confirm the exact items supplied by Chennai Pro Care.',
    media: tankToolPhotos,
    videoLink: null
  }
];

const reviews = [
  {
    name: 'G. B. RAJESH',
    meta: '4 reviews · 5 photos · 2 weeks ago',
    date: '2 weeks ago',
    isNew: true,
    rating: 5,
    text: 'Excellent Water Tank Cleaning Service in Chennai! Chennai Pro Water Tank Cleaning Service provided excellent service. The team was professional, punctual, and well-organized. They cleaned the water tank thoroughly and maintained good hygiene throughout the process. Their work quality and customer service were impressive. I’m very satisfied with their service and would definitely recommend them to anyone looking for reliable water tank cleaning in Chennai. Highly recommended! Excellent service and great work!'
  },
  {
    name: 'Ramya M',
    meta: '3 reviews · 5 photos · 2 weeks ago',
    date: '2 weeks ago',
    isNew: true,
    rating: 5,
    text: 'I am fully satisfied with the tank cleaning service. The service was Excellent, the work was done neatly, and the staff were professional and friendly. Very good service at the reasonable price. Highly recommend! Thank you for your wonderful service.'
  },
  {
    name: 'Egavalli',
    meta: '1 review · 2 photos · 6 months ago',
    date: '6 months ago',
    rating: 5,
    text: 'Highly recommend service in Chennai. Iam not Maintain my overhead sintex in past 2 years. The employees very knowledge about water condition and health responsibility, they complete the tank cleaning and they use water TDS level. It is very use to maintain the water tanks. Water is a basic necessary it is very important for your healthly life. Worth for price. Great job and very professional service!'
  },
  {
    name: 'Arunachalam Narayanan',
    meta: 'Local Guide · 17 reviews · 3 photos · 8 months ago',
    date: '8 months ago',
    rating: 5,
    text: 'Recently engaged Chennai Pro Water Tank Cleaning Service and I’m truly impressed with their speed, professionalism, and perfection. They came fully equipped, including pumping motors, and handled everything efficiently. Real specialists in their work. Truly value for money. Wishing them great success ahead!'
  },
  {
    name: 'Rajesh',
    meta: '1 review · 7 months ago',
    date: '7 months ago',
    rating: 5,
    text: 'Excellent team work. In my apartment have a three 100KL capacity underground sump and 10 OHT tank i plan to clean with the help of chennai pro care they give a excellent team work and given a best service. Everyone definitely give your sump and tank to chennai pro care.'
  },
  {
    name: 'grace g',
    meta: '1 review · a month ago',
    date: 'a month ago',
    rating: 5,
    text: 'Wonderful work done by Team, Thank you so much, the sump tank was in very bad condition but team work hardly and made it very clean, Price was really affordable 👌 Thank you once again team 🙌 Keep up your good work Never compromise with any of thing which you are doing now'
  },
  {
    name: 'Lavanya lavu',
    meta: '5 reviews · 2 photos · 6 months ago',
    date: '6 months ago',
    rating: 5,
    text: 'I very satisfied my overhead tank and underground sump cleaning. The persons used complete machine cleaning. This Organic cleaning it’s very good for health. I recommend to all the viewers. Finally completed the service used TDS meter for water level condition.'
  },
  {
    name: 'Sharmila A',
    meta: '4 reviews · 6 months ago',
    date: '6 months ago',
    rating: 5,
    text: 'My home water tank was in a very bad condition. So yesterday, I contacted the Chennai Pro Tank Cleaner team 🙏Today, (9.4.26) they sent Sanjay and John to clean the tank at our house. They did the cleaning very well and neatly. I would like to express my heartfelt thanks to the Chennai Pro Tank Cleaner team. Special thanks to Sanjay and John 🙏'
  },
  {
    name: 'Sanjay',
    meta: '1 review · 4 months ago',
    date: '4 months ago',
    rating: 5,
    text: 'My home at Madambakkam. My wife book tank cleaning service from chennai pro care. They did excellent service and neat work Definitely highly recommend, three types of machine cleaning, Abisheik sir explain the process of cleaning and some advisable for befits of tank cleaning. Thank you Chennai pro care and Team.'
  }
];

const goldenClientRows = [
  [
    { name: 'Reserve Bank of India', logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Reserve_Bank_of_India_logo.svg' },
    { name: 'Tidel', logo: 'https://www.tidelpark.com/manage/includes/kcfinder/upload/image/blog-images/tidel_logos-01.png' },
    { name: 'Fomra Hues', logo: 'https://www.google.com/s2/favicons?domain=fomrahousing.in&sz=128' },
    { name: 'Kochar Homes', logo: 'images/kocharhomes.png' },
    { name: 'Tagore Medical College & Hospital', logo: 'https://www.google.com/s2/favicons?domain=tagoremch.edu.in&sz=128' },
    { name: 'Sangeetha Veg Restaurant', logo: 'https://static.wixstatic.com/media/a94a23_0bd7f095ef24479198cfe21bb091441d~mv2.png/v1/fill/w_980,h_481,al_c,q_90/usm_0.66_1.00_0.01,enc_avif,quality_auto/a94a23_0bd7f095ef24479198cfe21bb091441d~mv2.png' },
    { name: 'Indian Bank', logo: 'https://companieslogo.com/img/orig/INDIANB.NS_BIG-ab454691.svg?download=true&t=1746790300' },
    { name: 'TA Enclave', logo: '/images/TAclient.png'},
    { name: 'Casa Grande PropCare', logo: 'https://pbs.twimg.com/profile_images/886824658112200705/mY9RCU6B.jpg' },
    { name: 'YWCA of Madras', logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/YWCA_Logo.svg' },
    { name: 'Akila Heights', logo: 'https://www.google.com/s2/favicons?domain=asvini.com&sz=128' },
    { name: 'Harini City', logo: 'https://www.logotypes101.com/logos/804/B17EFEBB5B4EDB1436333D579AD7C0D1/harini_city_logo.png' },
    { name: 'Tea Break in Adambakkam', logo: '/images/teabreak.png' }
  ],
  [
    { name: 'Season 4 Residences', logo: 'https://www.google.com/s2/favicons?domain=season4.in&sz=128' },
    { name: 'Naturals', logo: 'https://www.google.com/s2/favicons?domain=naturals.in&sz=128' },
    { name: 'Ramada by Wyndham', logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ramada_Worldwide_logo_(2).svg' },
    { name: 'Malles Trusted Through Generations', logo: 'Malles.png' },
    { name: 'Blue Cross of India', logo: 'https://r2.cdn.yaclass.in/ef9352a5-91cb-4da9-9580-fa2f3ce0024e/bciregw1800png.png' },
    { name: 'Chitra Township', logo: 'images/chirtatownship.png' },
    { name: 'Techno Digital', logo: 'https://technodigital.in/wp-content/uploads/2025/04/Techno-Digital-Logo-Vertical-1.png' },
    { name: 'Anvil Projects', logo: 'https://www.anvilprojects.com/imgs/logo-blue.png' },
    { name: 'California Burrito Mexican Kitchen', logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/California_Burrito_logo_(2025).svg' },
    { name: 'Madras Race Club', logo: 'https://madrasraceclub.com/backend/images/MRC_Logo.png' },
    { name: 'Shree Anandhaas Sweets and Snacks', logo: 'https://cdn.prod.website-files.com/684a8af0c46603a31390dff9/694124ee900f5998cf24a00b_Logo%3Danandhaas.png' },
    { name: 'Savi3 Global Services', logo: 'https://www.google.com/s2/favicons?domain=savi3hr.in&sz=128' },
    { name: 'Hotel Pandiyas', logo: 'images/pandiyas.png' }
  ],
  [
    { name: 'Amromed', logo: 'https://www.google.com/s2/favicons?domain=amromed.com&sz=128' },
    { name: 'Sristi Millennium', logo: 'https://www.google.com/s2/favicons?domain=sristibuilders.com&sz=128' },
    { name: 'RISHS International School', logo: 'https://cdndatacorp31.myclassboard.com/8/0/OrganisationUploads/62024/2706241803331495.jpg' },
    { name: 'E-con Systems', logo: 'https://www.e-consystems.com/images/card-images/e-consystems-featured-banner.jpg' },
    { name: 'Perficient', logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Perficient_logo.png' },
    { name: 'Kences Construction', logo: 'https://www.google.com/s2/favicons?domain=kences.in&sz=128' },
    { name: 'North Town', logo: 'images/NT.png' },
    { name: 'The Shri Ram Universal School SPR City Chennai', logo: 'https://cdn.aptoide.com/imgs/d/d/5/dd51f3830b35dce14b3af9005b347410_fgraphic.png' },
    { name: "Salma's Amar Enclave", logo: 'https://www.google.com/s2/favicons?domain=salmaconstructions.com&sz=128' },
    { name: 'VA Distributors Adding Value to Supply Chain', logo: 'images/vad.png' },
    { name: 'Archivo Infra Inc', logo: 'https://www.google.com/s2/favicons?domain=archivo.in&sz=128' },
    { name: 'CK Wonder Kidz Kids-Preschool', logo: 'https://www.google.com/s2/favicons?domain=ckwonderkidz.in&sz=128' },
    { name: 'Kumaran Engineers Ekkaduthangal Chennai', logo: 'https://www.google.com/s2/favicons?domain=kumaranengineers.in&sz=128' }
  ]
];

function ClientLogo({ client }) {
  const [imageFailed, setImageFailed] = useState(!client.logo);

  return (
    <div className={`client-logo ${imageFailed ? 'client-logo-fallback' : ''}`} title={client.name}>
      {!imageFailed ? (
        <img
          src={client.logo}
          alt={client.name}
          title={client.name}
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <strong>{client.name}</strong>
      )}
    </div>
  );
}

function GoldenClientRow({ clients, reverse = false }) {
  // Two identical groups create a continuous marquee loop with no blank gap.
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="client-track-wrap">
      <div className={`client-track ${reverse ? 'reverse' : ''}`}>
        {duplicatedClients.map((client, index) => (
          <ClientLogo client={client} key={`${client.name}-${index}`} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE VIDEO MODAL
   ========================================================= */

function ServiceVideoModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="service-video-bg" onClick={onClose}>
      <div
        className="service-video-modal"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="service-video-close"
          onClick={onClose}
          aria-label="Close service video"
        >
          ×
        </button>

        <div className="service-video-player">
          <video
            src={service.video}
            controls
            playsInline
            autoPlay
          >
            Your browser does not support video playback.
          </video>
        </div>

        <div className="service-video-info">
          <p className="eyebrow">SERVICE PROCESS</p>
          <h2>{service.title}</h2>
          <p>
            Take a quick look at how Chennai Pro Care approaches this service.
          </p>

          <a
            className="cta full"
            href="#booking"
            onClick={onClose}
          >
            Enquire About This Service →
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }) {
  const [activeMedia, setActiveMedia] = useState(0);

  if (!product) return null;

  const hasVideo = product.name !== productNames[0] && Boolean(product.videoLink || product.video);
  const isVideo = hasVideo && activeMedia === product.media.length;

  return (
    <div className="modalbg" onClick={onClose}>
      <div className="product-modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close product">
          ×
        </button>

        <div className="product-media-main">
          {isVideo ? (
            product.videoLink ? (
              <div className="product-video-link">
                <span className="play-badge">▶</span>
                <h3>Water-testing video</h3>
                <p>Opens the water-testing video resource in a new tab.</p>
                <a className="cta" href={product.videoLink} target="_blank" rel="noreferrer">Watch video ↗</a>
              </div>
            ) : (
              <video controls playsInline src={product.video}>
                Your browser does not support video playback.
              </video>
            )
          ) : (
            <img
              src={product.media[activeMedia]}
              alt={`${product.name} ${activeMedia + 1}`}
              onError={event => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/images/hygine.png';
              }}
            />
          )}
        </div>

        <div className="media-thumbs">
          {product.media.map((photo, index) => (
            <button
              className={activeMedia === index ? 'active' : ''}
              key={photo + index}
              onClick={() => setActiveMedia(index)}
              aria-label={`View photo ${index + 1}`}
            >
              <img
                src={photo}
                alt=""
                onError={event => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/images/hygine.png';
                }}
              />
            </button>
          ))}

          {hasVideo && (
            <button
              className={`video-thumb ${isVideo ? 'active' : ''}`}
              onClick={() => setActiveMedia(product.media.length)}
            >
              <span>▶</span>
              <small>Video</small>
            </button>
          )}
        </div>

        <p className="eyebrow">PRODUCT ENQUIRY</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <div className="modal-price">
          Price on enquiry
          <small>Confirm availability and specifications</small>
        </div>

        <a
          className="cta full"
          href={wa(
            `Hi Chennai Pro Care, I am interested in ${product.name}. Please share the availability, final price and product details.`
          )}
          target="_blank"
          rel="noreferrer"
        >
          Order / Enquire on WhatsApp →
        </a>
      </div>
    </div>
  );
}

function PricingListModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="pricing-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="pricing-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Chennai Pro Care service price list"
        onClick={event => event.stopPropagation()}
      >
        <button className="pricing-modal-close" type="button" onClick={onClose} aria-label="Close price list">×</button>
        <p className="eyebrow">CHENNAI PRO CARE</p>
        <h2>Our Service Price List</h2>
        <img src="/images/pricinglist.png" alt="Chennai Pro Care service price list" />
        <a className="cta" href="/images/pricinglist.png" target="_blank" rel="noreferrer">Open Full Size ↗</a>
      </section>
    </div>
  );
}

function OfferPopup({ onClose }) {
  return (
    <div
      className="offer-popup-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Chennai Pro Care special service offer"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="offer-popup">
        <button
          type="button"
          className="offer-popup-close"
          onClick={onClose}
          aria-label="Close offer"
        >
          ×
        </button>

        <img
          src="/images/chennai-pro-care-offer.jpg"
          alt="Chennai Pro Care special offer: 20% discount for service in the next 3 months and 10% discount for service in the next 6 months"
        />

        <div className="offer-popup-actions">
          <a className="cta" href="#booking" onClick={onClose}>
            Book a Cleaning →
          </a>
          <button type="button" className="offer-popup-dismiss" onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

const blogArticles = {
  safeWater: {
    title: 'Why Professional Water Tank Cleaning Is Essential for a Safe Water Supply',
    date: 'November 20, 2025',
    category: 'Awareness',
    paragraphs: [
      'Water tanks and underground sumps are easy to overlook because they are usually out of sight. Over time, sediment and other deposits can settle at the bottom, while poorly maintained covers, access points or connected pipework may create additional hygiene concerns. A clear-looking supply is not, by itself, proof that a storage system is clean.',
      'A professional cleaning visit should begin with an assessment of the tank, access conditions and the work required. The service plan may include removing stored water as appropriate, taking out settled sludge, cleaning internal surfaces, rinsing and following suitable hygiene procedures before the system is returned to use.',
      'Cleaning frequency should be based on the tank condition, water source, building use and applicable public-health guidance rather than a one-size-fits-all promise. Property managers should keep a record of cleaning dates and investigate recurring sediment, unusual colour, smell or taste instead of relying on cleaning alone to solve a supply-side problem.',
      'Safety matters as much as cleanliness. Tanks, sumps and drainage wells can be confined spaces where hazardous atmospheres or other serious risks may exist. Workers should not enter such spaces casually; the job needs appropriate assessment, equipment, training and safe procedures.',
      'For apartments, homes and commercial premises in Chennai, planned inspection and maintenance can help identify issues earlier. Chennai Pro Care offers water tank, sump and pipeline cleaning services; contact the team to discuss the size of your system and the work required.'
    ]
  },
  professional: {
    title: 'The Importance of Professional Tank Cleaning Services',
    date: 'May 24, 2025',
    category: 'Water Hygiene',
    paragraphs: [
      'Professional tank cleaning helps address accumulated sediment and deposits in water-storage systems. A suitable service should include an assessment of the tank, safe access, appropriate equipment and a clear explanation of the work performed.',
      'Before choosing a provider, ask about the cleaning process, worker safety, equipment, scheduling and the steps taken to keep the surrounding area tidy.',
      'For apartments and commercial properties, planned maintenance can make it easier to track inspections and arrange cleaning before problems arise.'
    ]
  },
  chooseProvider: {
    title: 'Water Tank Cleaning Service: What to Look for When Choosing a Provider',
    date: 'May 24, 2025',
    category: 'Practical Guide',
    paragraphs: [
      'Compare providers based on the scope of work, experience with your type of tank, equipment, safety procedures and transparent pricing. Ask what is included in the quote before confirming the service.',
      'For larger buildings, clarify how many tanks or sumps will be cleaned, the expected time on site, water availability during the work and whether a maintenance record will be provided.',
      'Choose a provider who explains the process clearly and recommends a schedule suited to the property rather than making unsupported guarantees.'
    ]
  },
  commercial: {
    title: 'Hygienic Water Starts with a Clean Tank: Essential for Commercial Establishments in Chennai',
    date: 'June 6, 2025',
    category: 'Commercial Awareness',
    paragraphs: [
      'Offices, restaurants, shops and other commercial establishments rely on well-maintained water-storage systems for everyday operations. Tanks and sumps should be inspected and maintained according to the building’s use and applicable guidance.',
      'A maintenance plan can record inspection dates, cleaning work, access arrangements and any issues that need follow-up. Staff should report changes in water appearance, taste or odour promptly.',
      'Commercial property managers can contact Chennai Pro Care to discuss water tank, sump and pipeline cleaning needs across Chennai.'
    ]
  }
};

function BlogArticleModal({ article, onClose }) {
  if (!article) return null;
  return (
    <div className="blog-article-backdrop" role="presentation" onClick={onClose}>
      <article className="blog-article-modal" role="dialog" aria-modal="true" aria-label={article.title} onClick={e => e.stopPropagation()}>
        <button className="blog-article-close" type="button" onClick={onClose} aria-label="Close article">×</button>
        <p className="eyebrow">{article.category}</p>
        <h2>{article.title}</h2>
        <p className="blog-article-date">{article.date} · Chennai Pro Care</p>
        {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <a className="cta" href={wa(`Hi Chennai Pro Care, I read your article “${article.title}” and would like to enquire about cleaning services.`)} target="_blank" rel="noreferrer">Enquire on WhatsApp →</a>
      </article>
    </div>
  );
}

const newsItems = [
  { title: 'Why Professional Water Tank Cleaning Is Essential for a Safe Water Supply', date: 'November 20, 2025', tag: 'Awareness', source: 'Chennai Pro Care', href: '/?article=safeWater', internal: true, image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=85', fallback: '/images/sump-cleaning.png' },
  { title: 'Namakkal College Water Contamination: A Wake-Up Call for Regular Tank and Sump Cleaning', date: 'October 29, 2025', tag: 'Local Awareness', source: 'The New Indian Express', href: 'https://www.newindianexpress.com/states/tamil-nadu/2025/Oct/29/129-students-fall-sick-due-to-water-contamination-at-namakkal-engineering-college-hostel', image: '/images/news.png', fallback: '/images/hygine.png' },
  { title: 'The Importance of Professional Tank Cleaning Services', date: 'May 24, 2025', tag: 'Article', source: 'Chennai Pro Care', href: '/?article=professional', internal: true, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85', fallback: '/images/why-professional-equipment.png' },
  { title: 'Water Tank Cleaning Service: What to Look for When Choosing a Provider', date: 'May 24, 2025', tag: 'Article', source: 'Chennai Pro Care', href: '/?article=chooseProvider', internal: true, image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85', fallback: '/images/why-professional-equipment.png' },
  { title: 'Hygienic Water Starts with a Clean Tank: Essential for Commercial Establishments in Chennai', date: 'June 6, 2025', tag: 'Article', source: 'Chennai Pro Care', href: '/?article=commercial', internal: true, image: '/images/commerical_service_.png', fallback: '/images/hygine.png' },
  { title: 'Recurring Black Silt in Water Tanks Troubles Virugambakkam', date: 'October 9, 2026', tag: 'Chennai News', source: 'Times of India', href: 'https://timesofindia.indiatimes.com/city/chennai/recurring-black-silt-in-water-tanks-troubles-virugambakkam/articleshow/134841261.cms', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=85', fallback: '/images/sump-cleaning.png' },
  { title: 'Video: Sewage Mixed in Drinking Water — Chennai Report', date: 'March 11, 2026', tag: 'Video', source: 'Polimer News · YouTube', href: 'https://www.youtube.com/watch?v=p93Vuk05T44', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85', fallback: '/images/hygine.png' },
  { title: 'E. coli Found in 43 Water Samples from Chennai’s Zone 11', date: 'August 29, 2026', tag: 'Water Quality', source: 'The New Indian Express', href: 'https://www.newindianexpress.com/amp/story/cities/chennai/2026/Aug/29/ecoli-found-in-43-water-samples-from-chennais-zone-11', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85', fallback: '/images/hygine.png' },
  { title: 'Sewage-Mixed Water Leaves Arumbakkam Thirsty', date: 'March 11, 2026', tag: 'Chennai News', source: 'The New Indian Express', href: 'https://www.newindianexpress.com/cities/chennai/2026/Mar/11/sewage-mixed-water-leaves-arumbakkam-thirsty', image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=900&q=85', fallback: '/images/hygine.png' },
  { title: 'Sewage Concerns at Chembarambakkam, a Major Chennai Water Source', date: 'September 21, 2026', tag: 'Water Pollution', source: 'The New Indian Express', href: 'https://www.newindianexpress.com/cities/chennai/2026/Sep/21/sewage-stains-chennais-major-thirst-quencher-chembarambakkam', image: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=900&q=85', fallback: '/images/hygine.png' },
  { title: 'Chennai Study Raises Questions About E. coli in RO-Purified Water', date: 'May 26, 2026', tag: 'Research', source: 'The South First', href: 'https://thesouthfirst.com/health/chennais-ro-water-looked-clear-smelled-fine-and-tasted-good-but-e-coli-disagreed/', image: 'https://s3.ap-south-1.amazonaws.com/media.thesouthfirst.com/wp-content/uploads/2026/05/iStock-1324053358-modified-057c560a-8202-4b69-a658-f4bc6f81d92d.jpg', fallback: '/images/hygine.png' },
  { title: 'Report Highlights Sewage Flow into Puzhal Lake', date: 'January 13, 2026', tag: 'Chennai Water Source', source: 'DT Next', href: 'https://www.dtnext.in/news/chennai/drinking-water-contamination-sewage-flows-unchecked-into-puzhal-lake', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85', fallback: '/images/hygine.png' }
];

function App() {
  const [open, setOpen] = useState(false);
  const [prod, setProd] = useState(null);
  const [serviceVideo, setServiceVideo] = useState(null);
  const [offerOpen, setOfferOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);
  const [form, setForm] = useState({});
  const [aboutStats, setAboutStats] = useState({
    years: 0,
    customers: 0,
    tanks: 0
  });
  const aboutStatsRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOfferOpen(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = aboutStatsRef.current;
    if (!section) return undefined;

    const targets = { years: 4, customers: 15000, tanks: 20000 };
    const duration = 1800;
    let frame = null;
    let started = false;

    const startAnimation = () => {
      if (started) return;
      started = true;

      const start = performance.now();

      const animate = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setAboutStats({
          years: Math.floor(targets.years * eased),
          customers: Math.floor(targets.customers * eased),
          tanks: Math.floor(targets.tanks * eased)
        });

        if (progress < 1) {
          frame = window.requestAnimationFrame(animate);
        } else {
          setAboutStats(targets);
        }
      };

      frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const set = (key, value) => {
    setForm(previous => ({ ...previous, [key]: value }));
  };

  const submit = e => {
    e.preventDefault();

    const message = `Hi Chennai Pro Care, I would like to book a cleaning service.

Name: ${form.name || ''}
Phone: ${form.phone || ''}
Email: ${form.email || ''}
Property: ${form.property || ''}
Service: ${form.service || ''}
Number of tanks: ${form.tanks || ''}
Preferred date: ${form.date || ''}
Preferred time: ${form.time || ''}
Message: ${form.message || ''}`;

    window.open(wa(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <>

      <header>
        <a className="brand" href="#home" aria-label="Chennai Pro Care home">
          <img
            className="brand-logo"
            src={LOGOS.header}
            alt="Chennai Pro Care"
          />
        </a>

        <button
          className="hamb"
          onClick={() => setOpen(!open)}
          aria-label="Open navigation menu"
        >
          ☰
        </button>

        <nav className={open ? 'open' : ''}>
          {[
            'Home',
            'Services',
            'Golden Clients',
            'Reviews',
            'News',
            'Products',
            'About Us',
            'Booking',
            'Contact'
          ].map(item => (
            <a
              onClick={() => setOpen(false)}
              href={item === 'Reviews' ? '#feedback' : item === 'About Us' ? '#about-us' : '#' + item.toLowerCase().replaceAll(' ', '-')}
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          className="headwa"
          href={wa(
            'Hi Chennai Pro Care, I would like to enquire about your services.'
          )}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>

        <a className="cta small" href="#booking">
          Book a Cleaning
        </a>
      </header>

      <section id="home" className="hero">
        <div>
          <p className="eyebrow">SAFE WATER • CLEAN SYSTEMS • BETTER LIVING</p>

          <h1>
            Pure Tanks.
            <br />
            <span>Pure Water.</span>
          </h1>

          <p className="lead">
            Professional water tank, sump and pipeline cleaning services for
            homes, apartments, offices, businesses and other properties across
            Chennai.
          </p>

          <div className="buttons">
            <a
              className="cta"
              href={wa(
                'Hi Chennai Pro Care, I would like to enquire about your cleaning services.'
              )}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp Us
            </a>

            <a className="cta blue" href="#booking">
              📅 Book a Cleaning
            </a>

            <a className="outline" href={'tel:+' + B.phone}>
              📞 Call Now
            </a>
          </div>

          <div className="trust">
            ✓ Water Tank Cleaning　 ✓ Sump Cleaning　 ✓ Pipeline Cleaning　 ✓
            Service Across Chennai
          </div>
        </div>

        <div
          className="heroimg"
        >
          <div className="hero-logo-panel">
            <img
              className="hero-brand-logo"
              src={LOGOS.header}
              alt="Chennai Pro Care company logo"
              onError={event => { event.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="head">
          <p className="eyebrow">OUR CORE SERVICES</p>

          <h2>Three Services. One Cleaning Partner.</h2>

          <p>
            Chennai Pro Care focuses on the three core cleaning services that
            help maintain cleaner water-storage and supply systems.
          </p>
        </div>

        <div className="grid core-services">
          {services.map(service => (
            <article className="core-service" key={service.title}>
              <div className="service-card-top">
                <div>
                  <i>{service.icon}</i>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </div>
              </div>

              <div
                className="service-video-preview"
                onClick={() => setServiceVideo(service)}
                role="button"
                tabIndex="0"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setServiceVideo(service);
                  }
                }}
              >
                <video
                  src={service.video}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                />

                <div className="service-video-shade" />

                <div className="service-video-play">
                  <span>▶</span>
                </div>

                <div className="service-video-label">
                  <small>20–30 SEC PROCESS</small>
                  <b>{service.videoLabel}</b>
                </div>
              </div>

              <div className="service-card-bottom">
                <a href="#booking">Enquire →</a>

                <button
                  type="button"
                  onClick={() => setServiceVideo(service)}
                >
                  Watch Process
                  <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="supporting-services">
          <div className="supporting-head">
            <p className="eyebrow">SERVICE COVERAGE</p>

            <h3>Cleaning Support for Different Properties</h3>

            <p>
              Professional cleaning solutions tailored for residential,
              commercial and industrial properties.
            </p>
          </div>

          <div className="property-services">
            {supportingServices.map(service => (
              <article className="property-card" key={service.title}>
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                />

                <div className="property-overlay">
                  <div className="property-top">
                    <span className="property-number">
                      {service.number}
                    </span>

                    <span className="property-icon">
                      {service.number === '01'
                        ? '🏠'
                        : service.number === '02'
                        ? '🏢'
                        : '🏭'}
                    </span>
                  </div>

                  <div className="property-content">
                    <span className="property-category">
                      {service.category}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <a href="#booking">
                      Enquire for your property
                      <b>→</b>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="why-section">
        <div className="why-inner">
          <div
            className="why-copy"
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              maxWidth: '780px',
              margin: '0 auto'
            }}
          >
            <p className="eyebrow">WHY CHOOSE US</p>

            <h2>Trusted. Professional. Reliable.</h2>

            <p>
              We help homes and businesses maintain cleaner water systems
              through systematic cleaning, trained teams and suitable
              professional equipment.
            </p>
          </div>

          <div
            className="benefits"
            style={{
              gridColumn: '1 / -1',
              width: '100%'
            }}
          >
            {/* EXPERIENCED TEAM */}
            <article
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                textAlign: 'center',
                padding: '0 0 20px',
                overflow: 'hidden',
                minHeight: '255px',
                transition: 'transform .25s ease, box-shadow .25s ease'
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '13px 13px 0 0',
                  fontSize: '0'
                }}
              >
                <img
                  src="/images/chennai-pro-care-team.png"
                  alt="Chennai Pro Care service team"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </span>

              <div style={{ padding: '18px 16px 0' }}>
                <b style={{ fontSize: '14px' }}>
                  Experienced Team
                </b>

                <small style={{ fontSize: '10px' }}>
                  Trained professionals
                </small>
              </div>
            </article>

            {/* MODERN EQUIPMENT */}
            <article
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                textAlign: 'center',
                padding: '0 0 20px',
                overflow: 'hidden',
                minHeight: '255px',
                transition: 'transform .25s ease, box-shadow .25s ease'
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '13px 13px 0 0',
                  fontSize: '0'
                }}
              >
                <img
                  src="/images/why-professional-equipment.png"
                  alt="Professional cleaning equipment"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </span>

              <div style={{ padding: '18px 16px 0' }}>
                <b style={{ fontSize: '14px' }}>
                  Modern Equipment
                </b>

                <small style={{ fontSize: '10px' }}>
                  Efficient cleaning methods
                </small>
              </div>
            </article>

            {/* SAFETY & HYGIENE */}
            <article
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                textAlign: 'center',
                padding: '0 0 20px',
                overflow: 'hidden',
                minHeight: '255px',
                transition: 'transform .25s ease, box-shadow .25s ease'
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '13px 13px 0 0',
                  fontSize: '0'
                }}
              >
                <img
                  src="/images/hygine.png"
                  alt="Professional cleaning and hygiene work"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </span>

              <div style={{ padding: '18px 16px 0' }}>
                <b style={{ fontSize: '14px' }}>
                  Safety & Hygiene
                </b>

                <small style={{ fontSize: '10px' }}>
                  Hygiene-first approach
                </small>
              </div>
            </article>

            {/* CLEAR PRICING */}
            <article
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                textAlign: 'center',
                padding: '0 0 20px',
                overflow: 'hidden',
                minHeight: '255px',
                transition: 'transform .25s ease, box-shadow .25s ease'
              }}
            >
              <span
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '13px 13px 0 0',
                  background: 'linear-gradient(135deg, #eaf7ff, #f8fcff)',
                  fontSize: '0'
                }}
              >
                <img
                  src="/images/pricing.png"
                  alt="Clear pricing"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </span>

              <div style={{ padding: '18px 16px 0' }}>
                <b style={{ fontSize: '14px' }}>
                  Clear Pricing
                </b>

                <small style={{ fontSize: '10px' }}>
                  Quote based on requirement
                </small>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="golden-clients" className="golden-section">
        <div className="golden-head">
          <p className="eyebrow">OUR VALUED CLIENTS</p>

          <h2>Golden Clients</h2>

          <p>Trusted by homes, communities, businesses and institutions.</p>
        </div>

        <div className="golden-rows">
          <GoldenClientRow clients={goldenClientRows[0]} />
          <GoldenClientRow clients={goldenClientRows[1]} reverse />
          <GoldenClientRow clients={goldenClientRows[2]} />
        </div>

        <p className="golden-note">
          Selected clients and partners.
        </p>
      </section>

      <section id="feedback" className="section soft">
        <div className="head">
          <p className="eyebrow">CUSTOMER FEEDBACK</p>
          <h2>What Our Customers Say</h2>
          <div className="review-heading-rating">
            <strong className="review-rating-number">4.6</strong>
            <span aria-label="Five stars">★★★★★</span>
            <span className="review-rating-label">Google customer reviews</span>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noreferrer">View on Google →</a>
          </div>
          <p className="review-heading-subtitle">Real experiences shared by Chennai Pro Care customers.</p>
        </div>

        <div className="reviews grid" aria-label="Customer review cards">
          {reviews.map((review, index) => (
            <article className="review" key={`${review.name}-${index}`}>
              <strong className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
              </strong>
              <p className="review-preview">“{review.text}”</p>
              <b>{review.name}</b>
              <small>Chennai · Google Review</small>
            </article>
          ))}
        </div>

        <div className="review-button">
          <a className="cta" href={GOOGLE_REVIEWS} target="_blank" rel="noreferrer">⭐ Read More Reviews on Google →</a>
        </div>
      </section>



      <section id="news" className="section news-awareness">
        <div className="news-heading">
          <p className="eyebrow">BLOG &amp; WATER-SAFETY UPDATES</p>
          <h2>Recent News</h2>
          <p>Important water-safety reports and practical guidance for cleaner tanks, sumps and safer water systems.</p>
        </div>

        <div className="news-cards">
          {(showAllNews ? newsItems : newsItems.slice(0, 6)).map(item => (
            <a
              className="news-card"
              key={item.title}
              href={item.href}
              target="_blank"
              rel={item.internal ? 'noopener noreferrer' : 'noreferrer'}
            >
              <div className="news-card-image">
                <img
                  src={item.image}
                  referrerPolicy="no-referrer"
                  alt={item.title}
                  loading="lazy"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = item.fallback; }}
                />
                <span className="news-card-tag">{item.tag}</span>
              </div>
              <div className="news-card-body">
                <h3>{item.title}</h3>
                <div className="news-card-meta">
                  <span>{item.date}</span>
                  <span>{item.source}{item.internal ? '' : ' ↗'}</span>
                </div>
                <span className="news-card-link">Read more →</span>
              </div>
            </a>
          ))}
        </div>

        <div className="review-button">
          <button type="button" className="cta" onClick={() => setShowAllNews(!showAllNews)}>
            {showAllNews ? 'Show fewer ↑' : 'Show more news ↓'}
          </button>
        </div>

        <p className="news-disclaimer">Every news report and guidance article opens in a new browser tab. News reports describe specific incidents and do not imply that all Chennai water is unsafe.</p>
      </section>

      <section id="products" className="section">
        <div className="head">
          <p className="eyebrow">OUR PRODUCTS</p>

          <h2>Products & Cleaning Equipment</h2>

          <p>
            Explore our water-treatment products, testing kits and cleaning accessories. Contact us to confirm product availability, specifications and pricing.
          </p>
        </div>

        <div className="grid products">
          {products.map(product => (
            <article
              className={`product ${product.sold ? 'product-sold' : ''}`}
              key={product.name}
              onClick={() => { if (!product.sold) setProd(product); }}
              aria-disabled={Boolean(product.sold)}
            >
              <div className="product-image-wrap">
                <img
                  src={product.media[0]}
                  alt={product.name}
                  loading="lazy"
                  onError={event => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/images/hygine.png';
                  }}
                />
                <span className="media-count">
                  {product.media.length} PHOTOS{product.videoLink && !product.sold ? ' + VIDEO' : ''}
                </span>
                {product.sold ? (
                  <span className="sold-badge">SOLD</span>
                ) : (
                  <span className="play-badge">↗</span>
                )}
              </div>

              <div className="product-body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-bottom">
                  {product.sold ? (
                    <>
                      <b className="sold-label">₹{product.price.toLocaleString('en-IN')}</b>
                      <span className="sold-label">SOLD</span>
                    </>
                  ) : (
                    <>
                      <b>{product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on enquiry'}</b>
                      <button
                        onClick={event => {
                          event.stopPropagation();
                          setProd(product);
                        }}
                      >
                        Order on Watsapp
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about-us" className="about-section">
        <div className="about-shell">
          <div className="about-heading">
            <div>
              <p className="eyebrow">OUR STORY</p>
              <h2>
                Built on trust.<br />
                <span>Growing with purpose.</span>
              </h2>
            </div>

            <div className="story-card">
              <span>THE FOUNDATION</span>
              <h3>
                Founder and Managing Director <strong>Mr. Babu</strong>
              </h3>
              <p>
                Founded by Mr. Babu in 2022, Chennai Pro Care was built around a
                simple promise: deliver dependable, professional water tank and
                sump cleaning with care for hygiene, workmanship, and customer
                trust. Today, the team continues that commitment while serving
                homes, apartments, businesses, and institutions across Chennai.
              </p>
            </div>
          </div>

          <div className="about-timeline about-timeline-second-row">
            <div className="story-node story-start">
              <div className="story-year">2022</div>

              <div className="story-connector" aria-hidden="true">
                <div className="story-dot"></div>
              </div>

              <div className="story-card">
                <span>THE BEGINNING</span>
                <h3>
                  Founder and Managing Director <strong>Mr. Babu</strong>
                </h3>
                <p>
                  Mr. Babu founded Chennai Pro Care in 2022 to help homes and
                  businesses maintain cleaner, more hygienic water storage systems.
                  The company’s approach is rooted in careful workmanship,
                  dependable service, and respect for every customer’s trust.
                </p>
              </div>
            </div>

            <div className="story-node story-now">
              <div className="story-year">NOW</div>

              <div className="story-connector" aria-hidden="true">
                <div className="story-dot"></div>
              </div>

              <div className="story-card">
                <span>THE JOURNEY CONTINUES</span>
                <h3>
                  Led by CEO <strong>Abishek Manikandan</strong>
                </h3>
                <p>
                  Building on the company's foundation with professional teams,
                  suitable equipment, and a continued commitment to dependable
                  service.
                </p>
              </div>
            </div>
          </div>

          {/* FIXED: removed the duplicated, unclosed <article> block */}
          <div className="about-stats" ref={aboutStatsRef}>
            <article>
              <strong>{aboutStats.years}+</strong>
              <span>Years of Service</span>
            </article>

            <article>
              <strong>{aboutStats.customers.toLocaleString('en-IN')}+</strong>
              <span>Happy Customers</span>
            </article>

            <article>
              <strong>{aboutStats.tanks.toLocaleString('en-IN')}+</strong>
              <span>Tanks Cleaned</span>
            </article>
          </div>
        </div>
      </section>

      <section id="booking" className="booking">
        <div>
          <p className="eyebrow">BOOK A SERVICE</p>
          <h2>Request a Cleaning Service</h2>

          <p>
            Share your details and service requirements. Your enquiry will be
            sent to Chennai Pro Care on WhatsApp so the team can contact you
            to discuss the service and confirm the schedule.
          </p>

          <p>
            ⚡ Quick response
            <br />
            📍 Service across Chennai
            <br />
            📞 Direct contact
          </p>
        </div>

        <form onSubmit={submit}>
          <div className="two">
            <label>
              Name*
              <input
                required
                onChange={e => set('name', e.target.value)}
              />
            </label>

            <label>
              Phone*
              <input
                required
                onChange={e => set('phone', e.target.value)}
              />
            </label>
          </div>

          <div className="two">
            <label>
              Email
              <input
                type="email"
                onChange={e => set('email', e.target.value)}
              />
            </label>

            <label>
              Property
              <select
                onChange={e => set('property', e.target.value)}
              >
                <option>House</option>
                <option>Apartment</option>
                <option>Office</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </label>
          </div>

          <div className="two">
            <label>
              Service
              <select
                onChange={e => set('service', e.target.value)}
              >
                <option>Water Tank Cleaning</option>
                <option>Sump Cleaning</option>
                <option>Pipeline Cleaning</option>
                <option>Multiple Services</option>
              </select>
            </label>

            <label>
              Number of Tanks / Areas
              <input
                onChange={e => set('tanks', e.target.value)}
              />
            </label>
          </div>

          <div className="two">
            <label>
              Date
              <input
                type="date"
                onChange={e => set('date', e.target.value)}
              />
            </label>

            <label>
              Time
              <input
                type="time"
                onChange={e => set('time', e.target.value)}
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              onChange={e => set('message', e.target.value)}
            />
          </label>

          <button className="cta full">
            Request Booking on WhatsApp →
          </button>

          <button
            type="button"
            className="cta full pricing-check-button"
            onClick={() => setPricingOpen(true)}
          >
            Check Our Prices →
          </button>
        </form>
      </section>

      <section id="contact" className="section contact">
        <div>
          <p className="eyebrow">GET IN TOUCH</p>

          <h2>Let's keep your water systems clean.</h2>

          <div className="contactlinks">
            <a href={'tel:+' + B.phone}>
              📞 +91 93445 32942
            </a>

            <a href={'tel:+' + B.phone2}>
              📞 +91 93445 31524
            </a>

            <a href={'mailto:' + B.email}>
              ✉️ {B.email}
            </a>

            <a
              href={B.maps}
              target="_blank"
              rel="noreferrer"
            >
              📍 {B.address}
            </a>
          </div>
        </div>

        <div className="map locations-map">
          <div className="maphead">
            <div>
              <p className="eyebrow">OUR LOCATIONS</p>
              <b>Chennai Pro Care</b>
              <span>Expanded to serve you through two locations</span>
            </div>
            <span className="mappin">📍</span>
          </div>

          <div className="mapframe locations-map-frame">
            <iframe
              title="Map showing both Chennai Pro Care locations"
              src="https://maps.google.com/maps?q=12.9345738,80.1254189&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="locations-directions">
            <a
              href={LOCATIONS[0].map}
              target="_blank"
              rel="noreferrer"
            >
              <strong>Branch 1</strong>
              <span>Chennai Pro Water Tank Cleaning Services</span>
              <small>Adambakkam, Chennai · Directions ↗</small>
            </a>

            <a
              href={LOCATIONS[1].map}
              target="_blank"
              rel="noreferrer"
            >
              <strong>Branch 2</strong>
              <span>Chennai Pro Care Pipeline Cleaners</span>
              <small>Chennai · Directions ↗</small>
            </a>
          </div>

          <a
            className="mapbutton"
            href="https://www.google.com/maps/dir/12.9883506,80.2032399/12.9345738,80.1254189/"
            target="_blank"
            rel="noreferrer"
          >
            View Both Locations in Google Maps →
          </a>
        </div>

        <div className="social">
          <p className="eyebrow">STAY CONNECTED</p>

          <h3>Follow the business</h3>

          <div>
            <a
              href={wa(
                'Hi Chennai Pro Care, I would like to enquire.'
              )}
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" />
              <span>WhatsApp</span>
            </a>

            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Chennai Pro Care on Instagram"
            >
              <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="" />
              <span>Instagram</span>
            </a>

            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Chennai Pro Care on Facebook"
            >
              <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="" />
              <span>Facebook</span>
            </a>

            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Chennai Pro Care on YouTube"
            >
              <img src="https://cdn.simpleicons.org/youtube/FF0000" alt="" />
              <span>YouTube</span>
            </a>
          </div>

          <small>
            Follow Chennai Pro Care for service updates, cleaning work and
            customer experiences.
          </small>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img
            className="footer-logo"
            src={LOGOS.footer}
            alt="Chennai Pro Care"
          />
        </div>

        <span>
          Water Tank • Sump • Pipeline Cleaning Services
        </span>

        <div>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#golden-clients">Golden Clients</a>
          <a href="#feedback">Reviews</a>
          <a href="#news">News</a>
          <a href="#products">Products</a>
          <a href="#about-us">About Us</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </div>

        <small>
          © 2026 Chennai Pro Care. All rights reserved.
        </small>
      </footer>

      <a
        className="floatwa"
        href={wa(
          'Hi Chennai Pro Care, I would like to enquire about your services.'
        )}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact Chennai Pro Care on WhatsApp"
      >
        💬
      </a>

      <ProductModal
        product={prod}
        onClose={() => setProd(null)}
      />

      {pricingOpen && (
        <PricingListModal onClose={() => setPricingOpen(false)} />
      )}

      <ServiceVideoModal
        service={serviceVideo}
        onClose={() => setServiceVideo(null)}
      />

      {offerOpen && <OfferPopup onClose={() => setOfferOpen(false)} />}
    </>
  );
}

function ArticlePage({ article }) {
  if (!article) return <App />;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f4faff',
        padding: '48px 20px',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#16334e'
      }}
    >
      <article
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: 'clamp(24px, 5vw, 56px)',
          background: '#fff',
          border: '1px solid #dceaf5',
          borderRadius: '22px',
          boxShadow: '0 18px 55px rgba(6,55,101,.08)'
        }}
      >
        <a
          href="/#news"
          style={{
            display: 'inline-block',
            marginBottom: '30px',
            color: '#0d82d9',
            fontWeight: 800,
            textDecoration: 'none'
          }}
        >
          ← Back to Chennai Pro Care
        </a>

        <p
          style={{
            color: '#0d82d9',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '.14em',
            textTransform: 'uppercase'
          }}
        >
          {article.category}
        </p>

        <h1
          style={{
            margin: '10px 0 12px',
            color: '#063765',
            fontSize: 'clamp(30px, 5vw, 46px)',
            lineHeight: 1.12
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            marginBottom: '34px',
            color: '#71869a',
            fontSize: '13px'
          }}
        >
          {article.date} · Chennai Pro Care
        </p>

        {article.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              color: '#526b80',
              fontSize: '16px',
              lineHeight: 1.85,
              margin: '0 0 22px'
            }}
          >
            {paragraph}
          </p>
        ))}

        <a
          className="cta"
          href={wa(`Hi Chennai Pro Care, I read your article “${article.title}” and would like to enquire about cleaning services.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire on WhatsApp →
        </a>
      </article>
    </main>
  );
}

const articleSlug = new URLSearchParams(window.location.search).get('article');

createRoot(document.getElementById('root')).render(
  <ArticlePage article={articleSlug ? blogArticles[articleSlug] : null} />
);