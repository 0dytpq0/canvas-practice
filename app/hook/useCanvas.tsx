import { useEffect, useRef } from "react";

export const useCanvas = ({
  draw,
}: {
  draw: (context: CanvasRenderingContext2D, count: number) => void;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let count = 0;
    let animationID: number;

    const renderer = () => {
      count++;
      draw(context, count);
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();
    return () => window.cancelAnimationFrame(animationID);
  }, [draw]);

  return ref;
};
