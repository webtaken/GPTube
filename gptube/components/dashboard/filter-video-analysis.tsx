import { Search } from 'lucide-react'

import { Input } from '../Common/input'

export function FilterVideoAnalysis() {
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Filter videos analyzed"
        labelPlacement="outside"
        size="lg"
        startContent={<Search className="w-4 h-4" />}
        variant="underlined"
      />
    </div>
  )
}
