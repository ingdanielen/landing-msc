"use client"

export function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Pure white base */}
      <div className="absolute inset-0 bg-[#fafbfc]" />
      
      {/* Soft ambient gradient - top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[60vh]"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(46, 134, 193, 0.08) 0%, transparent 100%)',
        }}
      />

      {/* Soft ambient gradient - bottom corner */}
      <div 
        className="absolute bottom-0 right-0 w-[50vw] h-[50vh]"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, rgba(10, 42, 67, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Very subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
