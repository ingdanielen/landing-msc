"use client"

interface GoogleMapProps {
  lat?: number
  lng?: number
  zoom?: number
  height?: string
  className?: string
}

export function GoogleMap({ 
  lat = 8.975003, 
  lng = -79.541983, 
  zoom = 15,
  height = "400px",
  className = ""
}: GoogleMapProps) {
  // Google Maps Embed API URL with coordinates
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4kUx3x1x0&q=${lat},${lng}&zoom=${zoom}`

  // Alternative: Direct embed using coordinates (works without API key)
  const directMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`

  return (
    <div className={`w-full overflow-hidden rounded-lg ${className}`} style={{ height }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={directMapUrl}
        title="MSC Location Map"
      />
    </div>
  )
}

