import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useLatticeStore } from "../../hooks/api/useLatticeStore";

const WaypointsHull = ({ waypoints, zLevel, horizontalDistance, verticalDistance }) => {
	const {setLatticePoints} = useLatticeStore();

	const waypointsMatrix = React.useMemo(() => {
		const matrix = waypoints.map((waypoint) => [waypoint.x, waypoint.y, zLevel]);
		return matrix.length > 2 ? [...matrix, matrix[0]] : matrix;
	}, [waypoints, zLevel]);

	const latticePoints = React.useMemo(() => createLattice(waypoints, horizontalDistance, verticalDistance), [waypoints, horizontalDistance, verticalDistance]);

	useEffect(() => {
		setLatticePoints(latticePoints);
	}, [latticePoints, setLatticePoints]);

	return (
		<>
			<LatticePoints points={latticePoints} zLevel={zLevel} />

			{waypointsMatrix.length > 1 && (
				<Line
					points={waypointsMatrix.map(([x, y, z]) => new THREE.Vector3(x, y, z))}
					color={"#b83d3d"}
					lineWidth={2}
				/>
			)}
		</>
	);
};

const LatticePoints = ({ points, zLevel }) => {
	const meshRef = useRef();
	const dummy = new THREE.Object3D();

	useEffect(() => {
		if (!meshRef.current) return;

		points.forEach((point, i) => {
			dummy.position.set(point.x, point.y, zLevel);
			dummy.updateMatrix();
			meshRef.current.setMatrixAt(i, dummy.matrix);
		});
		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [points, zLevel]);

	return (
		<instancedMesh ref={meshRef} args={[null, null, points.length]}>
			<sphereGeometry args={[0.2, 16, 16]} />
			<meshBasicMaterial color="red" />
		</instancedMesh>
	);
};

const createLattice = (waypoints, columns, rows) => {
	if (waypoints.length < 2) return [];

	const boundingBox = getBoundingBox(waypoints);
	const grid = makeGrid(boundingBox, columns, rows);

	return grid.filter((point) => getPointsInPolygon(point, waypoints));
};

const getBoundingBox = (waypoints) => {
	return waypoints.reduce(
		(box, point) => ({
			minX: Math.min(box.minX, point.x),
			maxX: Math.max(box.maxX, point.x),
			minY: Math.min(box.minY, point.y),
			maxY: Math.max(box.maxY, point.y),
		}),
		{ minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
	);
};

const makeGrid = (boundingBox, columns, rows) => {
	const stepX = (boundingBox.maxX - boundingBox.minX) / (columns - 1);
	const stepY = (boundingBox.maxY - boundingBox.minY) / (rows - 1);

	const gridPoints = [];
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			gridPoints.push({
				x: boundingBox.minX + i * stepX,
				y: boundingBox.minY + j * stepY,
			});
		}
	}

	return gridPoints;
};

const getPointsInPolygon = (point, vertices) => {
	let isInside = false;
	for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
		const xi = vertices[i].x,
			yi = vertices[i].y;
		const xj = vertices[j].x,
			yj = vertices[j].y;

		const intersect =
			yi > point.y !== yj > point.y &&
			point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
		if (intersect) isInside = !isInside;
	}
	return isInside;
};

export default WaypointsHull;
