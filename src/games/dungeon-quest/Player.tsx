type PlayerProps = {
  x: number;
  y: number;
};

export function Player({ x, y }: PlayerProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 32,
        height: 32,
        backgroundColor: "#00aaff",
        border: "2px solid white",
        borderRadius: 6,
      }}
    />
  );
}
