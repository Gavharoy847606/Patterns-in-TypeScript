import type { BlockType } from "./BlockType";

export class Block {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number,
    private readonly type: BlockType,
  ) {}

  getType(): BlockType {
    return this.type;
  }

  render(): void {
    this.type.render(this.x, this.y, this.z);
  }
}
