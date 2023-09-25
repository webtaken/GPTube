import { Card } from "@nextui-org/react"

export const Footer = () => {
  return (
    <footer className="relative">
      <Card fullWidth radius="none" className="flex items-center justify-center h-40">
        <div className="flex items-center justify-center gap-1 font-medium">
          <span className="flex"> Contact us </span>
          <a className="text-green-700" href="https://github.com/webtaken" target="_blank">@webtaken</a> and <a className="text-green-700" href="https://github.com/webtaken" target="_blank">@CamiloEMP</a>
        </div>
      </Card>
    </footer>
  )
}
