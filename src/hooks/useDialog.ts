import { dialogModeAtom, dialogOpenAtom, dialogItemAtom } from '@/stores'
import { Item } from '@/types'
import { useAtom } from 'jotai'

export function useDialogOpen() {
  const [dialogOpen, _setDialogOpen] = useAtom(dialogOpenAtom)
  const [dialogMode, _setDialogMode] = useAtom(dialogModeAtom)
  const [targetItem, setTargetItem] = useAtom(dialogItemAtom)

  function switchDialogOpen(mode: 'create' | 'edit', index: number, item: Item) {
    _setDialogMode(mode)
    setTargetItem({ targetIndex: index, ...item })
    _setDialogOpen(!dialogOpen)
  }

  return [dialogOpen, switchDialogOpen] as const
}

export function useDialogMode() {
  const [dialogMode, setDialogMode] = useAtom(dialogModeAtom)
  return [dialogMode, setDialogMode] as const
}

export function useDialogItem() {
  const [dialogItem, setDialogItem] = useAtom(dialogItemAtom)
  return [dialogItem, setDialogItem] as const
}
