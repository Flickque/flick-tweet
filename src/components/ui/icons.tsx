type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
	logo: (props: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
			<rect width="256" height="256" fill="none" />
			<line
				x1="208"
				y1="128"
				x2="128"
				y2="208"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
			<line
				x1="192"
				y1="40"
				x2="40"
				y2="192"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</svg>
	),
	twitter: (props: IconProps) => (
		<svg
			{...props}
			height="23"
			viewBox="0 0 1200 1227"
			width="23"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
		</svg>
	),
	farcaster: (props: IconProps) => (
		<svg
			width="225"
			height="225"
			viewBox="0 0 225 225"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect width="225" height="225" rx="50" fill="#855DCD" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M84.8902 190H29.9999V184C29.9999 181.239 32.2386 179 35.0001 179H36V173C36 170.239 38.2385 168 40.9999 168V78.9999H35.5L29 56.9999H58V35H167V56.9999H196L189.5 78.9999H184V168C186.762 168 189 170.239 189 173V179H190C192.761 179 195 181.239 195 184V190H140.171V184C140.171 181.239 142.41 179 145.172 179H146.171V173C146.171 170.296 148.318 168.093 151 168.003V119C149.231 99.3773 132.583 83.9999 112.5 83.9999C92.4169 83.9999 75.7685 99.3773 74 119V168.001C76.7106 168.06 78.8902 170.275 78.8902 173V176V179H79.8901C82.6515 179 84.8902 181.239 84.8902 184V190Z"
				fill="white"
			/>
		</svg>
	),
	spinner: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),
};
