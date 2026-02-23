import { useNavigate } from 'react-router-dom'
import { Settings as SettingsIcon } from 'lucide-react'

interface PageHeaderProps {
  title: string
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate()

  const handleSettingsClick = () => {
    navigate('/settings')
  }

  return (
    <header
      className="flex-shrink-0 border-b border-stone-200 bg-[#faf9f7] px-4 py-3"
      role="banner"
    >
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-medium text-stone-800 truncate">{title}</h1>
        <button
          type="button"
          onClick={handleSettingsClick}
          aria-label="Settings"
          className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 hover:text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-1 focus:ring-offset-[#faf9f7]"
        >
          <SettingsIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

