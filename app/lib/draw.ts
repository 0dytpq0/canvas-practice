export const draw = (context: CanvasRenderingContext2D, count: number) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = "grey";
  const delta = count % 300;
  context.fillRect(10 + delta, 10, 10, 10);
};
