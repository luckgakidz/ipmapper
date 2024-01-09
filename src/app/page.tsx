'use client'

import { EntryButton } from '@/components/EntryButton'
import { MappingDialog } from '@/components/MappingDialog'
import { MappingTable } from '@/components/MappingTable'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'

export default function Main() {
  return (
    <FluentProvider theme={webDarkTheme}>
      <EntryButton />
      <MappingDialog />
      <MappingTable />
    </FluentProvider>
  )
}
