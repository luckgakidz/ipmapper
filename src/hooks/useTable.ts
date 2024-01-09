import { tableItemsAtom } from '@/stores'
import { Item } from '@/types'
import { invoke } from '@tauri-apps/api/tauri'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export function useTable() {
  const [tableItems, useTableItems] = useAtom(tableItemsAtom)

  useEffect(() => {
    invoke('get_ipmap').then((res) => {
      useTableItems(res as Item[])
    })
  }, [])

  return { tableItems, useTableItems } as const
}
