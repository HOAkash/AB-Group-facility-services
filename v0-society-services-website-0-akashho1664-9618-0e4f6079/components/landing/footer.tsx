import Link from "next/link"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Login", href: "/login" },
]

const serviceLinks = [
  "Security Services",
  "Plumbing",
  "Gardening",
  "Housekeeping",
  "Electrical Repairs",
  "Pest Control",
  "Administrative Services",
]

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
  },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <Building2 className="size-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">
                  AB Group
                </span>
                <span className="text-[10px] leading-tight text-muted-foreground">
                  Facility Services
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium facility management services for residential societies
              across India. Technology-driven, people-powered.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <social.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <span className="text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                No.23, Site No 98, Neeladri Road, Electronic City, Bangalore - 560100.
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="size-4 shrink-0" />
               +91 9036954451
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0" />
               info@abgroupfmc.com
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 AB Group Facility Services. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}