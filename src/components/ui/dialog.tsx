'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-[#8EB69B] dark:bg-[#0B0D10]/80 fixed inset-0 z-50 backdrop-blur-md',
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'bg-light-surface dark:bg-[#1c1c1e] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-[32px] border border-light-border dark:border-white/10 shadow-2xl duration-200 sm:max-w-lg p-0 overflow-hidden',
					className,
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-body"
			className={cn('px-6 py-6', className)}
			{...props}
		/>
	);
}

function DialogHeader({
	className,
	children,
	hideCloseButton = false,
	...props
}: React.ComponentProps<'div'> & { hideCloseButton?: boolean }) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'bg-[#8EB69B]/30 dark:bg-white/5 flex flex-col gap-2 rounded-t-lg border-b border-light-border dark:border-white/5 p-6 text-center sm:text-left relative',
				className,
			)}
			{...props}
		>
			{children}
			{!hideCloseButton && (
				<DialogPrimitive.Close className="absolute top-6 right-6 rounded-full opacity-50 transition-opacity hover:opacity-100 p-1 hover:bg-[#235347] dark:hover:bg-[#8EB69B] dark:bg-white/10 text-light-text dark:text-white">
					<XIcon className="w-5 h-5" />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'bg-[#8EB69B]/30 dark:bg-white/5 flex flex-col gap-2 rounded-b-lg border-t border-light-border dark:border-white/5 px-6 py-4 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('text-xl font-bold text-light-text dark:text-white', className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-light-text-subtle dark:text-gray-500 text-sm', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogBody,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
