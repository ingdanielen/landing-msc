"use client"

import { useEffect, useRef, useState } from "react"
import type { Language } from "@/lib/content"
import type L from "leaflet"

// Coordenadas: 8°58'30.0"N 79°32'31.1"W
// Convertidas a decimal: 8.975, -79.5420
const MSC_COORDINATES = {
  lat: 8.975,
  lng: -79.5420,
}

const mapContent = {
  es: {
    title: "MSC",
    subtitle: "Oficinas Principales",
    address: "Altos de Curundu, Calle River, Edificio 569B",
    city: "Ancón, Ciudad de Panamá",
    country: "República de Panamá",
    phone: "(+507) 263-6601",
    openMaps: "Ver en Google Maps",
  },
  en: {
    title: "MSC",
    subtitle: "Head Office",
    address: "Altos de Curundu, Calle River, Building 569B",
    city: "Ancón, Panama City",
    country: "Republic of Panama",
    phone: "(+507) 263-6601",
    openMaps: "View in Google Maps",
  },
  zh: {
    title: "MSC",
    subtitle: "总部办公室",
    address: "Altos de Curundu, Calle River, 569B号楼",
    city: "安孔，巴拿马城",
    country: "巴拿马共和国",
    phone: "(+507) 263-6601",
    openMaps: "在谷歌地图中打开",
  },
}

interface MSCMapProps {
  lang: Language
  height?: string
  className?: string
}

export function MSCMap({ lang, height = "350px", className = "" }: MSCMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const t = mapContent[lang]

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return
    if (mapInstanceRef.current) return

    const initMap = async () => {
      const leaflet = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      if (!mapRef.current || mapInstanceRef.current) return

      const map = leaflet.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([MSC_COORDINATES.lat, MSC_COORDINATES.lng], 16)

      leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 19,
      }).addTo(map)

      // Icono personalizado más compacto
      const customIcon = leaflet.divIcon({
        className: "msc-custom-marker",
        html: `
          <div style="position: relative;">
            <div style="
              position: absolute;
              top: -40px;
              left: 50%;
              transform: translateX(-50%);
              background: linear-gradient(135deg, #0a2a43 0%, #1e4a6d 100%);
              color: white;
              padding: 5px 10px;
              border-radius: 6px;
              box-shadow: 0 3px 10px rgba(0,0,0,0.25);
              white-space: nowrap;
              font-size: 12px;
              font-weight: 700;
            ">
              MSC
              <div style="
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%) rotate(45deg);
                width: 10px;
                height: 10px;
                background: #1e4a6d;
              "></div>
            </div>
            <div style="
              width: 20px;
              height: 20px;
              background: #f97316;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 3px 10px rgba(0,0,0,0.25);
            "></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -25],
      })

      // Popup más compacto para mobile
      const popupContent = `
        <div style="min-width: ${isMobile ? '180px' : '220px'}; max-width: ${isMobile ? '220px' : '260px'}; font-family: system-ui, -apple-system, sans-serif;">
          <div style="background: linear-gradient(135deg, #0a2a43 0%, #1e4a6d 100%); padding: ${isMobile ? '10px' : '12px'}; color: white; margin: -10px -10px 10px -10px; border-radius: 6px 6px 0 0;">
            <div style="font-weight: 700; font-size: ${isMobile ? '12px' : '13px'}; margin-bottom: 2px;">${t.title}</div>
            <span style="opacity: 0.8; font-size: ${isMobile ? '10px' : '11px'};">${t.subtitle}</span>
          </div>
          <div style="font-size: ${isMobile ? '11px' : '12px'}; color: #334155; line-height: 1.3; margin-bottom: 8px;">
            <div style="font-weight: 500;">${t.address}</div>
            <div>${t.city}</div>
            <div style="color: #64748b; font-size: ${isMobile ? '10px' : '11px'};">${t.country}</div>
          </div>
          <div style="font-size: ${isMobile ? '11px' : '12px'}; color: #334155; padding-top: 8px; border-top: 1px solid #e2e8f0;">
            📞 ${t.phone}
          </div>
          <a href="https://maps.google.com/?q=${MSC_COORDINATES.lat},${MSC_COORDINATES.lng}" 
             target="_blank" 
             rel="noopener noreferrer"
             style="
               display: block;
               width: 100%;
               margin-top: 10px;
               padding: ${isMobile ? '8px' : '10px'};
               background: #f97316;
               color: white;
               font-size: ${isMobile ? '11px' : '12px'};
               font-weight: 600;
               border-radius: 6px;
               text-decoration: none;
               text-align: center;
             "
          >
            ${t.openMaps}
          </a>
        </div>
      `

      const marker = leaflet.marker([MSC_COORDINATES.lat, MSC_COORDINATES.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent, {
          maxWidth: isMobile ? 240 : 280,
          className: "msc-popup",
        })

      setTimeout(() => marker.openPopup(), 500)

      mapInstanceRef.current = map
      setIsLoaded(true)
      setTimeout(() => map.invalidateSize(), 100)
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [t, isMobile])

  return (
    <div className={`relative ${className}`} style={{ height, zIndex: 0 }}>
      <style jsx global>{`
        .msc-custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .msc-popup .leaflet-popup-content-wrapper {
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .msc-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-control-attribution {
          font-size: 9px;
        }
        @media (max-width: 640px) {
          .msc-popup .leaflet-popup-content-wrapper {
            padding: 8px;
          }
          .leaflet-control-zoom {
            margin-right: 8px !important;
            margin-bottom: 8px !important;
          }
        }
      `}</style>
      <div 
        ref={mapRef}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ position: 'relative', zIndex: 1 }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center rounded-xl">
          <div className="text-slate-500 flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
      )}
    </div>
  )
}
