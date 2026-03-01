

import { Send } from 'lucide-react'
import { useLocale } from 'next-intl'
import React from 'react'

const ContactHeader = () => {
    const locale = useLocale()
  return (
     <div className="text-center container pt-10 text-shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-4">
          <Send className="h-5 w-5 text-blue-600 mx-2" />{" "}
          {/* Changed to "Send" icon for contact */}
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {locale === "ar" ? "تواصل معنا" : "Get In Touch"}
          </span>
        </div>
        <h2 className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 text-shadow-sm">
          {locale === "ar" ? "لنعمل معًا" : "Let's Build Something Great"}
        </h2>
        <p className="text-md lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {locale === "ar"
            ? "هل لديك مشروع أو فكرة تحتاج إلى حلول برمجية متكاملة؟ تواصل معنا الآن!"
            : "Have a project or idea that needs full-stack expertise? Reach out today!"}
        </p>
      </div>

  )
}

export default ContactHeader