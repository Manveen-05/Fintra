'use client';

import React from 'react';
import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import {
    Settings,
    Bell,
    Shield,
    Moon,
    Mail
} from 'lucide-react';

interface QuickSettingsDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    settings: {
        notifications: boolean;
        twoFactor: boolean;
        darkMode: boolean;
        emailUpdates: boolean;
    };
    setSettings: (settings: any) => void;
}

export default function QuickSettingsDialog({ children, open, onOpenChange, settings, setSettings }: QuickSettingsDialogProps) {
    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev: any) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children && (
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            )}
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#051F20]/10 dark:bg-brand-green/10 flex items-center justify-center text-[#051F20] dark:text-brand-green">
                            <Settings className="h-5 w-5" />
                        </div>
                        Quick Settings
                    </DialogTitle>
                    <DialogDescription>Manage your essential account preferences</DialogDescription>
                </DialogHeader>
                <DialogBody>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#8EB69B]/30 dark:bg-white/5 flex items-center justify-center text-light-text-subtle dark:text-gray-500 group-hover:text-[#051F20] dark:text-brand-green transition-colors">
                                    <Moon className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-bold text-light-text dark:text-white">Dark Mode</p>
                            </div>
                            <Switch
                                checked={settings.darkMode}
                                onCheckedChange={() => toggleSetting('darkMode')}
                            />
                        </div>

                        <div className="h-px bg-[#8EB69B]/30 dark:bg-white/5 my-2" />

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#8EB69B]/30 dark:bg-white/5 flex items-center justify-center text-light-text-subtle dark:text-gray-500 group-hover:text-[#051F20] dark:text-brand-green transition-colors">
                                    <Bell className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-light-text dark:text-white">Push Notifications</p>
                                    <p className="text-[10px] text-light-text-subtle dark:text-gray-500">Stay updated on transactions</p>
                                </div>
                            </div>
                            <Switch
                                checked={settings.notifications}
                                onCheckedChange={() => toggleSetting('notifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#8EB69B]/30 dark:bg-white/5 flex items-center justify-center text-light-text-subtle dark:text-gray-500 group-hover:text-[#051F20] dark:text-brand-green transition-colors">
                                    <Shield className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-light-text dark:text-white">Two-Factor Auth</p>
                                    <p className="text-[10px] text-light-text-subtle dark:text-gray-500">Secure your account access</p>
                                </div>
                            </div>
                            <Switch
                                checked={settings.twoFactor}
                                onCheckedChange={() => toggleSetting('twoFactor')}
                            />
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#8EB69B]/30 dark:bg-white/5 flex items-center justify-center text-light-text-subtle dark:text-gray-500 group-hover:text-[#051F20] dark:text-brand-green transition-colors">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-bold text-light-text dark:text-white">Email Updates</p>
                            </div>
                            <Switch
                                checked={settings.emailUpdates}
                                onCheckedChange={() => toggleSetting('emailUpdates')}
                            />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="gap-3">
                    <DialogClose asChild>
                        <Button variant="outline" className="flex-1">Close</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="flex-1 font-bold">Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
