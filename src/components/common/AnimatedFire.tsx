import React from 'react';
import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import { COLORS } from '../../assets/themeColors';

type AnimatedFireProps = {
	size?: number | string;
	className?: string;
	animate?: boolean;
};

const flameFlicker = keyframes({
	'0%': { transform: 'translateY(0) scale(1)', opacity: 1 },
	'30%': { transform: 'translateY(-1px) scale(1.02)', opacity: 0.95 },
	'60%': { transform: 'translateY(-2px) scale(1.04)', opacity: 1 },
	'100%': { transform: 'translateY(0) scale(1)', opacity: 1 },
});

const AnimatedFire: React.FC<AnimatedFireProps> = ({ size = 20, className, animate = true }) => {
	const id = React.useId?.() || String(Math.random()).slice(2, 8);
	const width = typeof size === 'number' ? `${size}px` : size;
	const gradId = `fire-grad-${id}`;
	const gradientStart = COLORS.GYM_ACCENT || COLORS.PURPLE_ACCENT;
	const gradientMid = COLORS.PURPLE_PRIMARY;
	const gradientEnd = COLORS.PURPLE_DEEP;

	return (
		<Box
			component="span"
			className={className}
			aria-hidden
			sx={{ display: 'inline-flex', width, height: width, alignItems: 'center', justifyContent: 'center' }}
		>
			<svg
				viewBox="0 0 24 24"
				width={width}
				height={width}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				focusable="false"
			>
				<defs>
					<linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor={gradientStart} stopOpacity="1" />
						<stop offset="55%" stopColor={gradientMid} stopOpacity="1" />
						<stop offset="100%" stopColor={gradientEnd} stopOpacity="1" />
					</linearGradient>
				</defs>

				<g
					style={{
						transformOrigin: 'center center',
						transformBox: 'fill-box',
						animation: animate ? `${flameFlicker} 1.4s infinite ease-in-out` : 'none',
					}}
				>
					<path d="M12 3c-2 2-4 3-4 6 0 3 2 6 4 6s4-3 4-6c0-3-2-4-4-6z" fill={`url(#${gradId})`} opacity="0.98" />
				</g>
				<path d="M12 2.2c-2.7 2.7-5 4-5 7.5 0 3.2 2.3 6.3 5 6.3s5-3.1 5-6.3c0-3.5-2.3-4.8-5-7.5z" fill={gradientStart} opacity="0.12" />
			</svg>
		</Box>
	);
};

export default AnimatedFire;
