import { SCREEN_WIDTH } from "./Window"; 

export const SIZE = SCREEN_WIDTH * 0.75;
export const STROKE_WIDTH = 9; // Reduced stroke width for narrower lines
export const CENTER = SIZE / 2;
export const LINE_COUNT = 100; // Keep the line count
export const BASE_LINE_LENGTH = STROKE_WIDTH * 2.6; // Reduced base line length for more gap
export const ANGLE_STEP = (2 * Math.PI) / LINE_COUNT;