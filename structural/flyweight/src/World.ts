import { Block } from "./Block";
import { BlockFactory } from "./BlockFactory";
import type { BlockName } from "./blockCatalog";

export class World {
  private readonly blocks: Block[] = [];

  constructor(private readonly factory = new BlockFactory()) {}

  addBlock(x: number, y: number, z: number, name: BlockName): void {
    const type = this.factory.getBlockType(name);
    this.blocks.push(new Block(x, y, z, type));
  }

  render(): void {
    this.blocks.forEach((block) => block.render());
  }

  getBlocks(): readonly Block[] {
    return this.blocks;
  }

  getBlockCount(): number {
    return this.blocks.length;
  }

  getUniqueTypeCount(): number {
    return this.factory.getTypeCount();
  }
}