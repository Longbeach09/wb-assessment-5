import { Op } from "sequelize";
import { Animal, Human } from "./model.js";

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

console.log(query1);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
  where: { species: "fish" },
});

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
  where: {
    humanId: 5,
  },
});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: {
    birthYear: {
      [Op.gt]: 2015,
    },
  },
});

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: {
    fname: {
      [Op.like]: "J%",
    },
  },
});

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: {
    birthYear: {
      [Op.not]: null,
    },
  },
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = Animal.findAll({
  where: {
    species: {
      [Op.or]: ["fish", "rabbit"],
    },
  },
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = Human.findAll({
  where: {
    email: {
      [Op.notLike]: "%gmail%",
    },
  },
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  try {
    // Assuming you have Sequelize models and associations set up
    const humans = await Human.findAll({
      include: Animal, // Include the Animal association
    });

    // Loop through the humans and their associated animals
    for (const human of humans) {
      console.log(`Human: ${human.fname} ${human.lname}`);
      if (human.Animals.length > 0) {
        console.log("Animals:");
        for (const animal of human.Animals) {
          console.log(`  - ${animal.name}`);
        }
      } else {
        console.log("No associated animals.");
      }
      console.log();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {}
