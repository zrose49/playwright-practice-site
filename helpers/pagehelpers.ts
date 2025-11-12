export function rgbToHex(rgb:string) {
  // Extract RGB values from the string (e.g., "rgb(255, 0, 0)")
  const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!parts) return null; // Handle invalid RGB format

  // Convert each RGB component to a two-digit hexadecimal string
  const hex = (x:string) => ("0" + parseInt(x).toString(16)).slice(-2);

  // Combine them into a full hex code
  return "#" + hex(parts[1]) + hex(parts[2]) + hex(parts[3]);
}