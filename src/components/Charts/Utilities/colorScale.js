import { interpolateRainbow } from "d3-scale-chromatic";

export default function colorScale(dataLength, colorStart, colorEnd) {
    // Assume color scale starts at 0 and ends at 1
    const colorInterval = (colorEnd - colorStart) / dataLength;

    const colorArray = [];

    for (let i = colorStart; i <= colorEnd; i += colorInterval) {
        colorArray.push(interpolateRainbow(i));
    }
    return colorArray;
}
