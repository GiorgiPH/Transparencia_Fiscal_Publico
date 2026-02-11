import {
  ChevronRight,
  FileDown,
  ExternalLink,
  FileText,
  Target,
  DollarSign,
  TrendingUp,
  FileStack,
  Scale,
  AlertCircle,
  PieChart,
  Shield,
  Users,
  Briefcase,
  BookOpen,
  Gavel,
  BarChart,
  Percent,
  FileSignature,
  Activity,
  Building,
  Hammer,
  Gift,
  ShoppingCart,
  Megaphone,
  Search,
  FileCheck,
  CheckCircle,
  ScrollText,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

interface Subsection {
  title: string
  icon: string
  items: string[]
}

interface BreadcrumbItem {
  label: string
  href: string
}

interface CategoryDetailProps {
  title: string
  description: string
  subsections: Subsection[]
  breadcrumb: BreadcrumbItem[]
}

function SubsectionIcon({ iconName, className }: { iconName: string; className?: string }) {
  switch (iconName) {
    case "FileText":
      return <FileText className={className} />
    case "Target":
      return <Target className={className} />
    case "DollarSign":
      return <DollarSign className={className} />
    case "TrendingUp":
      return <TrendingUp className={className} />
    case "FileStack":
      return <FileStack className={className} />
    case "Scale":
      return <Scale className={className} />
    case "AlertCircle":
      return <AlertCircle className={className} />
    case "PieChart":
      return <PieChart className={className} />
    case "Shield":
      return <Shield className={className} />
    case "Users":
      return <Users className={className} />
    case "Briefcase":
      return <Briefcase className={className} />
    case "BookOpen":
      return <BookOpen className={className} />
    case "Gavel":
      return <Gavel className={className} />
    case "BarChart":
      return <BarChart className={className} />
    case "Percent":
      return <Percent className={className} />
    case "FileSignature":
      return <FileSignature className={className} />
    case "Activity":
      return <Activity className={className} />
    case "Building":
      return <Building className={className} />
    case "Hammer":
      return <Hammer className={className} />
    case "Gift":
      return <Gift className={className} />
    case "ShoppingCart":
      return <ShoppingCart className={className} />
    case "Megaphone":
      return <Megaphone className={className} />
    case "Search":
      return <Search className={className} />
    case "FileCheck":
      return <FileCheck className={className} />
    case "CheckCircle":
      return <CheckCircle className={className} />
    case "ScrollText":
      return <ScrollText className={className} />
    default:
      return <FileText className={className} />
  }
}

export function CategoryDetail({ title, description, subsections, breadcrumb }: CategoryDetailProps) {
  return (
    <div className="p-6 lg:p-12 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {index === breadcrumb.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">{title}</h1>
        <p className="text-lg text-muted-foreground text-pretty">{description}</p>
      </div>

      {/* Subsections as Accordion */}
      <Accordion type="single" collapsible className="space-y-4">
        {subsections.map((subsection, index) => {
          return (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden bg-card">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 text-left">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <SubsectionIcon iconName={subsection.icon} className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-base">{subsection.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="ml-13 space-y-3 pt-2">
                  {subsection.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="group">
                      <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="text-sm text-foreground leading-relaxed">{item}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Descargar documento">
                            <FileDown className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Ver documento">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      {/* Info Box */}
      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ExternalLink className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">¿Necesitas más información?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Si no encuentras la información que buscas o necesitas documentos específicos, contáctanos a través de
                la Unidad de Transparencia Fiscal.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/participacion-ciudadana">
                  <Button variant="outline" size="sm">
                    Contactar UTF
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    Volver a categorías
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
