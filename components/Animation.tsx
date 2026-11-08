"use client";

import { useEffect, useRef, useState } from "react";

type BallType = "none" | "basketball" | "football" | "volleyball" | "face";

type AnimationProps = {
	fieldWidth?: number;
	fieldHeight?: number;
	ballRadius?: number;
};

type Position = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	rotation: number;
};

const ballImages: Partial<Record<BallType, string>> = {
	basketball: "/animation/basketball.png",
	football: "/animation/football.png",
	volleyball: "/animation/volleyball.png",
	face: "/animation/pf.png",
};

const ballOptions: { type: BallType; label: string }[] = [
	{ type: "none", label: "None" },
	{ type: "basketball", label: "Basketball" },
	{ type: "football", label: "Football" },
	{ type: "volleyball", label: "Volleyball" },
	{ type: "face", label: "Profile" },
];

export default function Animation({
	fieldWidth = 640,
	fieldHeight = 480,
	ballRadius = 50,
}: AnimationProps) {
	const ballDiameter = 2 * ballRadius;
	const ballRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);
	const positionRef = useRef<Position>({
		x: (fieldWidth - ballDiameter) / 2,
		y: (fieldHeight - ballDiameter) / 2,
		vx: 4,
		vy: 3,
		rotation: 0,
	});
	const [isRunning, setIsRunning] = useState(false);
	const [ballType, setBallType] = useState<BallType>("none");
	// Keyboard Event: กด Space เพื่อเริ่มหรือหยุด Animation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsRunning((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

	useEffect(() => {
		if (!isRunning) return;

		const animate = () => {
			let { x, y, vx, vy, rotation } = positionRef.current;
			const maxX = fieldWidth - ballDiameter;
			const maxY = fieldHeight - ballDiameter;

			x += vx;
			y += vy;
			rotation += 4;

			if (x <= 0 || x >= maxX) {
				x = Math.max(0, Math.min(x, maxX));
				vx = -vx;
			}
			if (y <= 0 || y >= maxY) {
				y = Math.max(0, Math.min(y, maxY));
				vy = -vy;
			}

			positionRef.current = { x, y, vx, vy, rotation };
			if (ballRef.current) {
				ballRef.current.style.left = `${x}px`;
				ballRef.current.style.top = `${y}px`;
				ballRef.current.style.transform = `rotate(${rotation}deg)`;
			}
			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [ballDiameter, fieldHeight, fieldWidth, isRunning]);

	return (
		<div className="mx-auto mt-3 w-full max-w-[680px] px-3">
			<div className="overflow-x-auto pb-2">
				<div
					className="relative overflow-hidden rounded-md border-2 border-black bg-cover bg-center"
					style={{
						width: `${fieldWidth}px`,
						height: `${fieldHeight}px`,
						backgroundImage: "url('/animation/field.jpg')",
					}}
				>
					<div
						ref={ballRef}
						className="absolute rounded-full border border-black"
						style={{
							  left: `${(fieldWidth - ballDiameter) / 2}px`,
							  top: `${(fieldHeight - ballDiameter) / 2}px`,
							width: `${ballDiameter}px`,
							height: `${ballDiameter}px`,
							backgroundColor: "#87ceeb",
							backgroundImage: ballImages[ballType]
								? `url('${ballImages[ballType]}')`
								: "none",
							backgroundSize:
								ballType === "volleyball"
									? "180%"
									: ballType === "football"
										? "155%"
										: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					/>
				</div>
			</div>

			<div className="mt-3 flex flex-wrap items-center justify-between gap-3">
				<button
					type="button"
					className={`min-w-28 rounded-md px-5 py-3 text-lg font-semibold text-white transition-colors ${
						isRunning
							? "bg-red-600 hover:bg-red-700"
							: "bg-green-700 hover:bg-green-800"
					}`}
					onClick={() => setIsRunning((running) => !running)}
					aria-pressed={isRunning}
				>
					{isRunning ? "PAUSE" : "RUN"}
				</button>

				<div className="flex flex-wrap gap-2">
					{ballOptions.map(({ type, label }) => {
						const selected = ballType === type;

						return (
							<button
								key={type}
								type="button"
								className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
									selected
										? "border-blue-700 bg-blue-700 text-white"
										: "border-blue-700 bg-white text-blue-700 hover:bg-blue-50"
								}`}
								onClick={() => setBallType(type)}
								aria-pressed={selected}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
