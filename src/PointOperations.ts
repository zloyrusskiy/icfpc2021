import { Point } from './types'

const distance = (p1: Point, p2: Point) => Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)

const calcStretchFactor = (distance1: number, distance2: number) => Math.abs((distance2 / distance1) - 1) * 1_000_000

export { distance, calcStretchFactor }
