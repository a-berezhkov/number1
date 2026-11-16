const sequelize = require('./database');
const Pokemon = require('./models/Pokemon');

const seedPokemon = async () => {
  try {
    await sequelize.sync({ force: true });
    
    await Pokemon.create({
      name: 'Pikachu',
      type: 'Electric',
      power: 85,
      hp: 35
    });

    await Pokemon.create({
      name: 'Charizard',
      type: 'Fire',
      power: 95,
      hp: 78
    });

    await Pokemon.create({
      name: 'Blastoise',
      type: 'Water',
      power: 92,
      hp: 79
    });

    await Pokemon.create({
      name: 'Venusaur',
      type: 'Grass',
      power: 90,
      hp: 80
    });

    await Pokemon.create({
      name: 'Arcanine',
      type: 'Fire',
      power: 88,
      hp: 90
    });

    await Pokemon.create({
      name: 'Lapras',
      type: 'Water',
      power: 85,
      hp: 130
    });

    await Pokemon.create({
      name: 'Gengar',
      type: 'Ghost',
      power: 95,
      hp: 45
    });

    await Pokemon.create({
      name: 'Dragonite',
      type: 'Dragon',
      power: 100,
      hp: 91
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedPokemon();
