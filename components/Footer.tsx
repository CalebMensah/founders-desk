import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

const footerLinks = {
  content: [
    { label: 'Business Ideas', href: '/category/business-ideas' },
    { label: 'Startup Playbooks', href: '/category/startup-playbooks' },
    { label: 'Make Money', href: '/category/make-money' },
    { label: 'African Startups', href: '/category/african-startups' },
  ],
  resources: [
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Write for us', href: '/write-for-us' },
    { label: 'Advertise', href: '/advertise' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
}

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com/foundersdesk' },
  { label: 'Instagram', href: 'https://instagram.com/foundersdesk' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/foundersdesk' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0A1628] text-white mt-20">

      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">
              Stay ahead of the game
            </h3>
            <p className="text-gray-400 text-sm">
              Weekly business ideas, opportunities and founder stories. Free forever.
            </p>
          </div>
          <div className="w-full md:w-96">
  <NewsletterForm variant="dark" />
</div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-medium">FD</span>
              </div>
              <span className="text-lg font-medium">
                Founders<span className="text-blue-500">Desk</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Africa&apos;s content platform for young entrepreneurs, students, and aspiring founders.
            </p>
            <p className="text-xs font-semibold text-blue-500 tracking-widest uppercase">
              Ideas. Builders. Opportunities.
            </p>
          </div>

          {/* Content links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Content
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            {currentYear} Founders Desk. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white text-xs transition-colors"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}