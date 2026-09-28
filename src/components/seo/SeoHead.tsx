import React, { useEffect } from 'react';
import { ProductItem, CategoryItem, FaqItem } from '../../types';
import { BUSINESS_INFO } from '../../data/reviews';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  product?: ProductItem;
  category?: CategoryItem;
  faqs?: FaqItem[];
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'Chhabilal Cards — Wedding Invitations & Wholesale Stationery Manufacturer Jharsuguda',
  description = 'Chhabilal Cards is western Odisha’s premier manufacturer for opulent wedding invitations, 3D gatefold cards, Farman scrolls, and durable school & office stationery supplies in Brajarajnagar, Jharsuguda.',
  canonicalUrl = window.location.href,
  product,
  category,
  faqs,
}) => {
  useEffect(() => {
    // Dynamic Document Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Open Graph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // JSON-LD Structured Data Schema Generation
    const existingJsonLd = document.getElementById('chb-jsonld');
    if (existingJsonLd) existingJsonLd.remove();

    const jsonLdData: any[] = [
      // 1. LocalBusiness / Organization Schema
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'Chhabilal Cards',
        'legalName': 'Chhabilal Cards & Stationery Hub',
        'url': window.location.origin,
        'logo': `${window.location.origin}/logo.png`,
        'image': `${window.location.origin}/assets/invitation/lifestyle-reference.png`,
        'description': description,
        'telephone': BUSINESS_INFO.phone1,
        'email': BUSINESS_INFO.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': BUSINESS_INFO.address,
          'addressLocality': 'Brajarajnagar, Jharsuguda',
          'addressRegion': 'Odisha',
          'postalCode': '768216',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 21.8214,
          'longitude': 83.9248
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '09:00',
          'closes': '21:00'
        },
        'priceRange': '₹₹'
      }
    ];

    // 2. Product Schema
    if (product) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': product.imageUrl,
        'description': product.description,
        'sku': product.code,
        'brand': {
          '@type': 'Brand',
          'name': 'Chhabilal Cards'
        },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'INR',
          'lowPrice': product.pricePerPiece,
          'offerCount': product.minOrderQuantity,
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating,
          'reviewCount': product.reviewsCount
        }
      });
    }

    // 3. FAQ Schema
    if (faqs && faqs.length > 0) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer
          }
        }))
      });
    }

    const script = document.createElement('script');
    script.id = 'chb-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

  }, [title, description, canonicalUrl, product, category, faqs]);

  return null;
};
