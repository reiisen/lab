//given by a friend, thanks
export const colorCycle = (
  setColor: (color: string) => void,
  options = {
    speed: 0.2,
    brightness: 50,
    saturation: 90
  }
) => {
  let hue = 0;
  let lastTime = 0;

  const HSLToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (60 <= h && h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (120 <= h && h < 180) {
      [r, g, b] = [0, c, x];
    } else if (180 <= h && h < 240) {
      [r, g, b] = [0, x, c];
    } else if (240 <= h && h < 300) {
      [r, g, b] = [x, 0, c];
    } else if (300 <= h && h < 360) {
      [r, g, b] = [c, 0, x];
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const animate = (currentTime: number) => {
    if (!lastTime) lastTime = currentTime;
    const delta = currentTime - lastTime;

    hue = (hue + options.speed * (delta / 16)) % 360;
    setColor(HSLToHex(hue, options.saturation, options.brightness));

    lastTime = currentTime;
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
  return () => { };
};
