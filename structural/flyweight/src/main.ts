import type { BlockName } from "./blockCatalog";
import { World } from "./World";

function smallWorld(): void {
  console.log("=== Kichik dunyo ===");
  const world = new World();

  world.addBlock(0, 0, 0, "Grass");
  world.addBlock(1, 0, 0, "Grass");
  world.addBlock(2, 0, 0, "Stone");
  world.addBlock(3, 0, 0, "Grass");
  world.addBlock(4, 0, 0, "Dirt");

  console.log("\n--- Render ---");
  world.render();

  console.log("\n--- Natija ---");
  console.log(`Bloklar soni:     ${world.getBlockCount()}`);
  console.log(`Noyob BlockType:  ${world.getUniqueTypeCount()}`);

  
  const [grass1, grass2, stone, grass3] = world.getBlocks();

  console.log("\n--- === tekshiruvi ---");
  console.log(`Grass(0) === Grass(1): ${grass1.getType() === grass2.getType()}`);
  console.log(`Grass(0) === Grass(3): ${grass1.getType() === grass3.getType()}`);
  console.log(`Grass(0) === Stone(2): ${grass1.getType() === stone.getType()}`);
}

function bigWorld(): void {
  console.log("\n=== Katta dunyo (render yo'q) ===");
  const names: BlockName[] = ["Grass", "Dirt", "Stone", "Water"];
  const world = new World();

  for (let x = 0; x < 100; x++) {
    for (let z = 0; z < 100; z++) {
      world.addBlock(x, 0, z, names[(x + z) % 4]);
    }
  }

  console.log(`Bloklar soni:     ${world.getBlockCount()}`);
  console.log(`Noyob BlockType:  ${world.getUniqueTypeCount()}`);
}

smallWorld();
bigWorld();