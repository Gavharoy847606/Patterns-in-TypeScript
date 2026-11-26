import { BLOCK_CATALOG, type BlockName } from "./blockCatalog";
import { BlockType } from "./BlockType";

export class BlockFactory {
  private readonly types = new Map<BlockName, BlockType>();

  getBlockType(name: BlockName): BlockType {
    const existing = this.types.get(name);
    if (existing) {
      return existing;                 // bor bolsa oshaning ozi qaytadi
    }

    const data = BLOCK_CATALOG[name];
    const type = new BlockType(name, data.texture, data.color);
    this.types.set(name, type);        // topilmasa yangi create qiladi va eslab qoladi
    console.log(`[Factory] Yangi BlockType yaratildi: ${name}`);
    return type;
  }

  getTypeCount(): number {
    return this.types.size;
  }
}