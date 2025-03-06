'use client';

import { Center, Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

interface ModelProps {
	isDragging: boolean;
}

function Model({ isDragging }: ModelProps) {
	const modelRef = useRef<THREE.Group | null>(null);
	const fbx = useLoader(FBXLoader, '/objects/symbol.fbx');
	const [rotationDirection, setRotationDirection] = useState(1);
	const [verticalDirection, setVerticalDirection] = useState(1);
	const [scale, setScale] = useState(0);
	const [opacity, setOpacity] = useState(0);
	const maxRotation = 0.25; // Maximum horizontal rotation in radians
	const maxVerticalRotation = 0.15; // Maximum vertical rotation in radians

	// Entrance animation
	useEffect(() => {
		const animationDuration = 1000; // 1 second
		const startTime = Date.now();

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / animationDuration, 1);

			// Easing function for smooth animation
			const eased = 1 - (1 - progress) ** 3;

			setScale(0.01 * eased);
			setOpacity(eased);

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		animate();
	}, []);

	useFrame((_state, _delta) => {
		if (modelRef.current && !isDragging) {
			const currentRotation = modelRef.current.rotation.y;
			const currentVerticalRotation = modelRef.current.rotation.x;

			// Horizontal rotation
			if (currentRotation >= maxRotation) {
				setRotationDirection(-1);
			} else if (currentRotation <= -maxRotation) {
				setRotationDirection(1);
			}

			// Vertical rotation
			if (currentVerticalRotation >= maxVerticalRotation) {
				setVerticalDirection(-1);
			} else if (currentVerticalRotation <= -maxVerticalRotation) {
				setVerticalDirection(1);
			}

			// Apply smooth rotations
			modelRef.current.rotation.y += 0.0005 * rotationDirection;
			modelRef.current.rotation.x += 0.0002 * verticalDirection;
		}
	});

	// Apply material to all meshes in the model
	useEffect(() => {
		// Create a custom material
		const material = new THREE.MeshPhysicalMaterial({
			color: new THREE.Color('#9f9fa9'),
			metalness: 0.9,
			roughness: 0.2,
			clearcoat: 0.8,
			clearcoatRoughness: 1,
			reflectivity: 1,
			transparent: true,
			opacity: opacity,
		});

		fbx.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material = material;
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [fbx, opacity]);

	return <primitive ref={modelRef} object={fbx} scale={scale} />;
}

function Fallback() {
	return (
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="white" />
		</mesh>
	);
}

export function CommandSymbol3D() {
	const [isDragging, setIsDragging] = useState(false);

	return (
		<div className="absolute inset-0 size-full">
			<Canvas shadows camera={{ position: [0, 0, 5], fov: 50, zoom: 0.5 }}>
				<fog attach="fog" args={['#3c82f6', 5, 15]} />
				<ambientLight intensity={0.2} />
				<spotLight
					position={[5, 5, 5]}
					angle={0.4}
					penumbra={0.5}
					intensity={2}
					castShadow
					shadow-mapSize={2048}
				/>
				<directionalLight
					position={[-5, 5, -5]}
					intensity={1}
					color="#3c82f6"
					castShadow
				/>
				<Center>
					<Suspense fallback={<Fallback />}>
						<Model isDragging={isDragging} />
					</Suspense>
				</Center>
				<OrbitControls
					enableZoom={true}
					enablePan={false}
					autoRotate={false}
					onStart={() => setIsDragging(true)}
					onEnd={() => setIsDragging(false)}
				/>
				<Environment preset="studio" />
			</Canvas>
		</div>
	);
}
