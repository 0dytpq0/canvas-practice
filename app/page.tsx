"use client";
import {
  CanvasHTMLAttributes,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { draw } from "./lib/draw";
import { useCanvas } from "./hook/useCanvas";

export default function Home() {
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const Canvas = (
    props: {
      draw: (context: CanvasRenderingContext2D, count: number) => void;
    } & CanvasHTMLAttributes<HTMLCanvasElement>,
  ) => {
    const { draw, ...rest } = props;
    const ref = useCanvas({ draw });
    return <canvas ref={ref} {...rest} />;
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = drawingCanvasRef.current;
    if (!canvas) return;
    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "square";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
    ctxRef.current?.lineTo(offsetX, offsetY);
    ctxRef.current?.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const drawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    ctxRef.current?.lineTo(offsetX, offsetY);
    ctxRef.current?.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    ctxRef.current?.closePath();
    setIsDrawing(false);
  };
  const setToDraw = () => {
    if (!ctxRef.current) return;
    ctxRef.current.globalCompositeOperation = "source-over";
  };
  const setToErase = () => {
    if (!ctxRef.current) return;
    ctxRef.current.globalCompositeOperation = "destination-out";
  };

  const setBorderThicker = () => {
    if (!ctxRef.current) return;
    ctxRef.current.lineWidth = ctxRef.current.lineWidth + 5;
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold h-10 flex items-center justify-center">
        Konva & Canvas Test
      </h1>

      <div className="flex flex-1 w-full justify-center items-center bg-amber-100">
        <Canvas draw={draw} className="flex  border-red-500 border" />
        <canvas
          ref={drawingCanvasRef}
          className="flex border-blue-500 border"
          onMouseDown={startDrawing}
          onMouseMove={drawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={setToDraw}>draw</button>
        <button onClick={setToErase}>erase</button>
        <button onClick={setBorderThicker}>border</button>
      </div>
    </div>
  );
}
