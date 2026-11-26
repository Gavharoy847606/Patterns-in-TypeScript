import type { BlockName } from "./blockCatalog";

export class BlockType {
  constructor(
    readonly name: BlockName,
    readonly texture: string,
    readonly color: string,
  ) {}

  render(x: number, y: number, z: number): void {
    console.log(
      `${this.name} (${x}, ${y}, ${z}) | tekstura: ${this.texture} | rang: ${this.color}`,
    );
  }
}