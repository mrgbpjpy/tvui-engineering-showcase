import {TREES} from "./data/trees"

export function TreesLayer() {
  return(
    <>
      {
        TREES.map((tree,i) =>(
          <div
            key={i}
            style={{
              position: "absolute",
              left: tree.x,
              top: tree.y,
              width: tree.width,
              height: tree.height,
              backgroundImage: `url(${tree.sprite})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
            }}
          />
        ))
      }
    </>
  )
}
