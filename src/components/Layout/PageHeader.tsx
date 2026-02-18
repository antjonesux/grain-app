interface PageHeaderProps {
  title: string
}

export const PageHeader = ({ title }: PageHeaderProps) => (
  <header
    className="flex-shrink-0 border-b border-stone-200 bg-[#faf9f7] px-4 py-3"
    role="banner"
  >
    <h1 className="text-lg font-medium text-stone-800 truncate">{title}</h1>
  </header>
)
