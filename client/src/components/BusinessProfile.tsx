
import { useStore } from '../store'

const BusinessProfile = () => {
    const {business} = useStore()

    if (!business) {
        return <div className="text-center text-gray-500">No business data available. Please search for a business.</div>
    }
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }

    return stars;
  };

  const renderPriceLevel = (level: number|undefined) => {
    if (!level || level === undefined) {
        return <span className="text-gray-500">N/A</span>;
    }
    return '$'.repeat(level) + '$'.repeat(4 - level).split('').map((_, i) => 
      <span key={i} className="text-gray-300">$</span>
    );
  };

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  console.log("Business data:", business);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{business.name}</h2>
            {business.isVerified && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-2">{business.category}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(business.rating)}
              <span className="ml-1 font-semibold">{business.rating}</span>
            </div>
            <span className="text-gray-500">({business.reviewCount} reviews)</span>
            <span className="text-gray-500">{business.photoCount} photos</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end mb-2">
            {business.priceLevel}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700">{business.description}</p>
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📍</span>
              <span className="text-gray-700">{business.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📞</span>
              <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                {business.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🌐</span>
              <a 
                href={business.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                {business.website}
              </a>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Hours</h3>
          <div className="space-y-1">
            {business.hours && (
                Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-2">
                    <span className="text-gray-500">{formatDay(day)}:</span>
                    <span className="text-gray-700">{hours}</span>
                    </div>
                ))
                )}
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
        <div className="flex flex-wrap gap-2">
            {business.amenities && business.amenities.length > 0 ? (
                business.amenities.map((amenity, index) => (
                <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                    {amenity}
                </span>
                ))
            ) : (
                <span className="text-gray-500">No amenities listed</span>
            )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 border-t pt-3">
        Last updated: {business.lastUpdated ? new Date(business.lastUpdated).toLocaleDateString() : 'N/A'}
      </div>
    </div>)
}

export default BusinessProfile