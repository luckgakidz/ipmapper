import { ActiveSwitch } from '@/components/ActiveSwitch'
import { useDialogItem, useDialogMode, useDialogOpen } from '@/hooks/useDialog'
import { Item, MappingTableColumn, TargetItem } from '@/types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  InputProps,
  Label,
  useId,
} from '@fluentui/react-components'
import { useEffect, useState } from 'react'
import styles from './MappingDialog.module.css'

const MappingTableColumns: MappingTableColumn[] = [
  { columnKey: 'mode', label: 'Mode' },
  { columnKey: 'host', label: 'Host' },
  { columnKey: 'hostip', label: 'HostIP' },
  { columnKey: 'hostport', label: 'HostPort' },
  { columnKey: 'rootingip', label: 'RootingIP' },
  { columnKey: 'rootingport', label: 'RootingPort' },
  { columnKey: 'active', label: 'Active' },
]

const DialogInputProps: InputProps = {}

//////////////////////////////////////
// Component
//////////////////////////////////////
export function MappingDialog() {
  const [dialogOpen, switchDialogOpen] = useDialogOpen()
  const [dialogMode, setDialogMode] = useDialogMode()
  const [dialogItem, setDialogItem] = useDialogItem()

  function applyButtonClickHandle() {
    // switchDialogOpen()
  }

  function DialogInputComponent(label: string) {
    const key = label.toLowerCase()
    return key == 'active' ? (
      <div key={label} className={styles.dialog_input_root}>
        <Label
          htmlFor={useId('input')}
          size={DialogInputProps.size}
          disabled={DialogInputProps.disabled}
        >
          {label}
        </Label>
        <ActiveSwitch active={dialogItem['active']} />
      </div>
    ) : (
      <div key={label} className={styles.dialog_input_root}>
        <Label
          htmlFor={useId('input')}
          size={DialogInputProps.size}
          disabled={DialogInputProps.disabled}
        >
          {label}
        </Label>
        <Input
          id={useId('input')}
          value={dialogItem[key as keyof TargetItem] as string}
          disabled={
            dialogMode === 'create'
              ? false
              : key == 'mode' || (key == 'host' && dialogItem[key as keyof Item] === '-')
                ? true
                : false
          }
          onChange={(event) => {
            setDialogItem({ ...dialogItem, [key]: event.target.value })
          }}
          {...DialogInputProps}
        />
      </div>
    )
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{dialogMode == 'create' ? 'Create New Entry' : 'Edit Entry'}</DialogTitle>
          <DialogContent>
            {MappingTableColumns.map((column) => DialogInputComponent(column.label))}
          </DialogContent>
          <DialogActions>
            <Button
              appearance='primary'
              onClick={() => {
                applyButtonClickHandle()
              }}
            >
              {dialogMode == 'create' ? 'Add' : 'Update'}
            </Button>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance='secondary'
                onClick={() => {
                  switchDialogOpen()
                }}
              >
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
