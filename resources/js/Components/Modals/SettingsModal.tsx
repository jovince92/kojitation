import React, { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useSettings } from '@/Hooks/useSettings'
import { Label } from '../ui/label'
import { ModeToggle } from '../ModeToggle'
import { APP_NAME } from '@/Pages/Welcome'

const SettingsModal:FC = () => {
    const {isOpen,onClose} = useSettings();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='border-b pb-2.5'>
                        <span className='text-lg font-medium'>{APP_NAME} Settings</span>
                    </DialogTitle>
                </DialogHeader>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-1'>
                        <Label>Appearance</Label>
                        <span className='text-[0.8rem] text-muted-foreground'>
                            Customize {APP_NAME} Theme
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal