'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon.jsx';
import { useScroll } from '@/components/ui/use-scroll.js';
import WarpText from '../3d/WrapText';
export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed z-50 mx-auto w-full transition-all duration-300 ease-out bg-background/80 py-0 supports-[backdrop-filter]:bg-background/40 backdrop-blur-md border-border',
				scrolled
					? 'top-4 max-w-5xl rounded-[16px] border shadow-lg left-1/2 -translate-x-1/2'
					: 'top-0 max-w-full rounded-none border-b border-x-0 border-t-0',
				{
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex w-full items-center justify-between px-6 md:px-8 transition-all duration-300 ease-out',
					scrolled ? 'h-14' : 'h-16'
				)}
			>
				<div className="flex items-center gap-3">
					<img src="/workloom-logo.png" alt="WorkLoom Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(124,60,255,0.44)]" />
					<div className="flex items-center" style={{ height: '32px', width: '130px' }}>
						<WarpText
							text="WorkLoom"
							color="#f8f5ff"
							warpStrength={0.08}
							warpScale={1.7}
							speed={0.55}
							pointerInfluence={0.42}
							pointerStrength={0.38}
							refraction={0.018}
							ripple
							fontSize={26}
							fontWeight={700}
							style={{ width: '100%', height: '100%' }}
							fontFamily="'Space Grotesk', sans-serif"
							letterSpacing={-0.04}
							lineHeight={1}
						/>
					</div>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline" className="cursor-pointer">Sign In</Button>
					<Button className="cursor-pointer">Get Started</Button>
				</div>
				<Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="flex flex-col gap-2">
						<Button variant="outline" className="w-full cursor-pointer">
							Sign In
						</Button>
						<Button className="w-full cursor-pointer">Get Started</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
