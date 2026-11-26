export type BlockName = "Grass" | "Stone" | "Dirt" | "Water";

export interface BlockData {
  readonly texture: string;
  readonly color: string;
}

export const BLOCK_CATALOG: Record<BlockName, BlockData> = {
  Grass: { texture: "grass_top.png", color: "#5DA130" },
  Stone: { texture: "stone.png", color: "#7F7F7F" },
  Dirt: { texture: "dirt.png", color: "#866043" },
  Water: { texture: "water.png", color: "#3F76E4" },
};