

import { useLocale } from 'next-intl'

const SidebarHeader = () => {
    const locale = useLocale()
  return (
     <div className="inline-flex flex-col items-center w-full justify-center text-shadow-sm space-x-2 bg-gradient-to-r from-slate-100 to-slate-100 dark:from-amber-900/30 dark:to-red-900/30 px-4 py-2 rounded-lg mb-4">
        {/* <Layout className="h-5 w-5 mx-2 text-amber-600 dark:text-amber-400" /> */}
        <span className="text-lg text-center font-[700] text-blue-900 dark:text-amber-400">
          {locale === "en" ? "Dashboard" : "لوحه التحكم"}
        </span>
        <span className="text-xs text-center font-medium text-slate-800 dark:text-amber-400">
          {locale === "en" ? "Manage Dashboard" : "اداره لوحه التحكم"}
        </span>
        {/* <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" /> */}
      </div>
  )
}

export default SidebarHeader