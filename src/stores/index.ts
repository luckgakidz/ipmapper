import { Item, TargetItem } from '@/types'
import { atom } from 'jotai'

export const dialogModeAtom = atom<'create' | 'edit'>('create')
export const dialogOpenAtom = atom<boolean>(false)
export const dialogItemAtom = atom<TargetItem>({} as TargetItem)
export const tableItemsAtom = atom<Item[]>([] as Item[])
