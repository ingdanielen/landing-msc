"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { type Language } from "@/lib/content"
import { 
  Home, 
  Briefcase, 
  Lightbulb, 
  Users, 
  BarChart3, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Play,
  ChevronUp,
  ChevronDown,
  Ship,
  Anchor,
  Shield,
  Award,
  Globe,
  Camera,
  Mail,
  Phone,
  Clock,
  Star,
  Heart,
  Settings,
  Search,
  Info,
  HelpCircle,
  Book,
  Layers,
  Target,
  Compass,
  Flag,
  Zap,
  TrendingUp,
  Package,
  Truck,
  Building,
  Calendar,
  CheckCircle,
  AlertCircle,
  Eye,
  Image,
  Video,
  Music,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Cpu,
  Database,
  Cloud,
  Lock,
  Unlock,
  Key,
  Link,
  ExternalLink,
  Download,
  Upload,
  Share,
  Send,
  Inbox,
  Archive,
  Trash,
  Edit,
  Copy,
  Clipboard,
  Printer,
  Save,
  Folder,
  File,
  FileText as FileTextIcon,
  FilePlus,
  FileCheck,
  FileX,
  List,
  Grid,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Minus,
  X,
  Check,
  RefreshCw,
  RotateCw,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Filter,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Power,
  Battery,
  Wifi,
  Bluetooth,
  Volume,
  VolumeX,
  Bell,
  BellOff,
  Sun,
  Moon,
  CloudRain,
  Wind,
  Thermometer,
  Droplet,
  Umbrella,
  Map,
  Navigation,
  Crosshair,
  Maximize2,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Activity,
  PieChart,
  LineChart,
  Briefcase as BriefcaseIcon,
  CreditCard,
  Wallet,
  ShoppingCart,
  ShoppingBag,
  Gift,
  Tag,
  Bookmark,
  Heart as HeartIcon,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MessageSquare as MessageSquareIcon,
  Quote,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "lucide-react"

interface Section {
  id: string
  label: string
  labelEn: string
  labelZh?: string
}

interface SectionExplorerProps {
  sections: Section[]
  lang: Language
}

// Comprehensive icon mapping for any section ID
const sectionIcons: Record<string, React.ElementType> = {
  // Navigation & General
  hero: Home,
  home: Home,
  header: Home,
  intro: Info,
  introduction: Info,
  overview: Eye,
  
  // Services & Business
  services: Briefcase,
  service: Briefcase,
  solutions: Lightbulb,
  solution: Lightbulb,
  products: Package,
  product: Package,
  offerings: Gift,
  features: Star,
  feature: Star,
  benefits: Award,
  
  // About & Company
  about: Users,
  "about-us": Users,
  team: Users,
  company: Building,
  mission: Target,
  vision: Compass,
  values: Heart,
  history: Clock,
  story: Book,
  
  // Stats & Data
  stats: BarChart3,
  statistics: BarChart3,
  metrics: Activity,
  numbers: Hash,
  data: Database,
  analytics: PieChart,
  results: TrendingUp,
  
  // Location & Contact
  location: MapPin,
  locations: Map,
  map: Map,
  address: MapPin,
  contact: MessageSquare,
  "contact-us": Mail,
  cta: MessageSquare,
  "call-to-action": Phone,
  form: FileText,
  
  // Content
  blog: FileText,
  news: FileText,
  articles: Book,
  posts: FileText,
  insights: Lightbulb,
  resources: Folder,
  
  // Media
  video: Play,
  videos: Video,
  gallery: Image,
  photos: Camera,
  media: Camera,
  portfolio: Grid,
  showcase: Eye,
  
  // Maritime specific
  vessels: Ship,
  ships: Ship,
  fleet: Ship,
  cargo: Package,
  port: Anchor,
  ports: Anchor,
  maritime: Anchor,
  marine: Ship,
  inspection: Search,
  inspections: Search,
  survey: ClipboardCheck,
  surveys: ClipboardCheck,
  compliance: Shield,
  quality: Award,
  safety: Shield,
  
  // Other common sections
  faq: HelpCircle,
  faqs: HelpCircle,
  questions: HelpCircle,
  help: HelpCircle,
  support: Headphones,
  pricing: DollarSign,
  plans: Layers,
  testimonials: Quote,
  reviews: Star,
  clients: Users,
  partners: Users,
  sponsors: Award,
  careers: Briefcase,
  jobs: Briefcase,
  events: Calendar,
  schedule: Calendar,
  process: RefreshCw,
  steps: List,
  timeline: Clock,
  roadmap: Navigation,
  downloads: Download,
  subscribe: Bell,
  newsletter: Mail,
  social: Share,
  
  // Technical
  technology: Cpu,
  tech: Cpu,
  api: Code,
  documentation: Book,
  docs: Book,
  tools: Settings,
  integrations: Link,
  
  // Default fallback
  default: Circle,
}

// Import missing icons
import { Circle, ClipboardCheck, Code } from "lucide-react"

export function SectionExplorer({ sections, lang }: SectionExplorerProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")
  const [isExpanded, setIsExpanded] = useState(false)

  const activeIndex = sections.findIndex(s => s.id === activeSection)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const getLabel = (section: Section) => {
    return lang === "es" 
      ? section.label 
      : lang === "zh" 
        ? (section.labelZh || section.labelEn) 
        : section.labelEn
  }

  const getIcon = (sectionId: string) => {
    // Try exact match first
    if (sectionIcons[sectionId]) {
      return sectionIcons[sectionId]
    }
    // Try lowercase
    const lowerId = sectionId.toLowerCase()
    if (sectionIcons[lowerId]) {
      return sectionIcons[lowerId]
    }
    // Try partial match
    for (const key of Object.keys(sectionIcons)) {
      if (lowerId.includes(key) || key.includes(lowerId)) {
        return sectionIcons[key]
      }
    }
    // Fallback
    return sectionIcons.default
  }

  const goToPrev = () => {
    if (activeIndex > 0) {
      scrollToSection(sections[activeIndex - 1].id)
    }
  }

  const goToNext = () => {
    if (activeIndex < sections.length - 1) {
      scrollToSection(sections[activeIndex + 1].id)
    }
  }

  const ActiveIcon = getIcon(activeSection)

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      {/* Main compact indicator */}
      <div 
        className="relative"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Expanded menu */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            x: isExpanded ? 0 : 10,
            pointerEvents: isExpanded ? "auto" : "none"
          }}
          transition={{ duration: 0.15 }}
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2"
        >
          <div className="bg-primary p-1.5 shadow-xl">
            {/* Accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
            
            <div className="flex flex-col">
              {sections.map((section) => {
                const isActive = activeSection === section.id
                const Icon = getIcon(section.id)

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      flex items-center gap-2 px-3 py-2 text-left transition-all duration-100
                      ${isActive 
                        ? "bg-accent text-white" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap">
                      {getLabel(section)}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="sectionDot"
                        className="w-1 h-1 bg-white ml-auto"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Compact indicator button */}
        <div className="bg-primary shadow-lg">
          {/* Top accent */}
          <div className="h-0.5 bg-accent" />
          
          {/* Nav buttons */}
          <button
            onClick={goToPrev}
            disabled={activeIndex === 0}
            className={`
              w-10 h-8 flex items-center justify-center transition-colors
              ${activeIndex === 0 
                ? "text-white/20 cursor-not-allowed" 
                : "text-white/60 hover:text-white hover:bg-white/10"
              }
            `}
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Current section indicator */}
          <div className="px-2 py-3 border-y border-white/10">
            <div className="flex flex-col items-center gap-1">
              <ActiveIcon className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="text-[9px] font-mono text-white/50">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            onClick={goToNext}
            disabled={activeIndex === sections.length - 1}
            className={`
              w-10 h-8 flex items-center justify-center transition-colors
              ${activeIndex === sections.length - 1 
                ? "text-white/20 cursor-not-allowed" 
                : "text-white/60 hover:text-white hover:bg-white/10"
              }
            `}
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Bottom accent */}
          <div className="h-0.5 bg-accent" />
        </div>
      </div>
    </div>
  )
}
