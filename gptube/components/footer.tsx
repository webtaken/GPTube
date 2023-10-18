import { Card } from '@nextui-org/react'

export function Footer() {
  return (
    <footer className="relative">
      <Card fullWidth className="flex items-center justify-center h-40" radius="none">
        <div className="flex items-center justify-center gap-1 font-medium">
          <span className="flex"> Contact us </span>
          <a
            className="text-green-700"
            href="https://github.com/webtaken"
            rel="noopener"
            target="_blank"
          >
            @webtaken
          </a>{' '}
          and{' '}
          <a
            className="text-green-700"
            href="https://github.com/CamiloEMP"
            rel="noopener"
            target="_blank"
          >
            @CamiloEMP
          </a>
        </div>
      </Card>
    </footer>
  )
}
