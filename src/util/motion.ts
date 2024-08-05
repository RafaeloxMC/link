export function slideInFromLeft(delay: number) {
	return {
		hidden: { x: -100, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				delay: delay,
				duration: 0.5,
			},
		},
	};
}

export function slideInFromRight(delay: number) {
	return {
		hidden: { x: 100, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				delay: delay,
				duration: 0.5,
			},
		},
	};
}

export const slideInFromTop = {
	hidden: { y: -100, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.5,
		},
	},
};

export const fadeInWithDelay = (delay: number) => ({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: delay,
			duration: 0.5,
		},
	},
});

export const movingDots = (duration: number, delay: number) => {
	if (typeof window !== 'undefined') {
		return {
			hidden: { opacity: 0, x: 0, y: 0 },
			visible: {
				opacity: 1,
				x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth - 50],
				y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 50],
				transition: {
					duration: duration,
					delay: delay,
					repeat: Infinity,
					repeatType: "reverse",
				},
			},
		};
	} else {
		return {
			hidden: { opacity: 0, x: 0, y: 0 },
			visible: {
				opacity: 1,
				x: [0, 0],
				y: [0, 0],
				transition: {
					duration: duration,
					delay: delay,
					repeat: Infinity,
					repeatType: "reverse",
				},
			},
		};
	}
};