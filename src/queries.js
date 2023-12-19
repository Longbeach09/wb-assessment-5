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
    birthYear: null,
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



export async function printHumansAndAnimals() {
  const result = [];

  const humans = await Human.findAll({
    include: {
      model: Animal,
      attributes: ['name'], // Include only the 'name' column from the Animal model
    },
  });

  for (const human of humans) {
    for (const animal of human.Animals) {
      result.push(`Human: ${human.fname} ${human.lname}, Animal: ${animal.name}`);
    }
  }

  return result;
}






// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  // Assuming you have Sequelize models and associations set up
  const humans = await Human.findAll({
    include: {
      model: Animal,
      where: {
        species: species,
      },
    },
  });

  // Create a Set to store unique full names
  const humanNamesSet = new Set();

  // Loop through the humans and add their full names to the Set
  for (const human of humans) {
    const fullName = `${human.fname} ${human.lname}`;
    humanNamesSet.add(fullName);
  }

  return humanNamesSet;
}

