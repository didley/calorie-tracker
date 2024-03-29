export const guestsInitialDetails = {
  measurements: {
    currentWeightKg: 60,
    heightCm: 80,
  },
  goals: {
    energyGoalKJ: 8000,
  },
  preferences: {
    metricSystem: true,
    useKJ: false,
  },
  sex: "",
  role: "guest",
  name: "Guest",
  email: "Guest@guest.com",
  country: "AUS",
};

export const guestsInitialFoods = [
  {
    _id: "605bfd678cf5520d0306d4b9",
    name: "Greek Yoghurt",
    brand: "Jalna",
    perServeSize: 100,
    isLiquid: false,
    macrosPerServe: {
      EnergyKJ: 540,
      ProteinG: 3.8,
      FatTotalG: 10,
      saturatedG: 7.1,
      CarbohydrateG: 6.1,
      sugarsG: 4.8,
      SodiumMg: 78,
    },
    country: "AUS",
    isDeleted: false,
    isUserFood: true,
    id: "605bfd678cf5520d0306d4b9",
  },
  {
    _id: "605bfd678cf5520d0306d4ba",
    name: "Up&go Liquid Breakfast Choc Ice",
    brand: "Sanitarium",
    perServeSize: 250,
    isLiquid: true,
    macrosPerServe: {
      EnergyKJ: 815,
      ProteinG: 8.2,
      FatTotalG: 4.2,
      saturatedG: 0.6,
      CarbohydrateG: 28.7,
      sugarsG: 15.8,
      SodiumMg: 168,
    },
    servingOptions: [
      {
        _id: "h67lka4j5h6l34khg4asdhjo89vh4a25ioln",
        servingName: "3 pack",
        servingSize: 3,
      },
    ],
    country: "AUS",
    isDeleted: false,
    isUserFood: true,
    id: "605bfd678cf5520d0306d4ba",
  },
  {
    _id: "605bfd678cf5520d0306d4bb",
    name: "Extra Soft Fruitless Hot Cross Buns",
    brand: "Woolworths",
    perServeSize: 75,
    isLiquid: false,
    macrosPerServe: {
      EnergyKJ: 840,
      ProteinG: 5.8,
      FatTotalG: 2.6,
      saturatedG: 0.8,
      CarbohydrateG: 36.8,
      sugarsG: 4.8,
      SodiumMg: 201,
    },
    servingOptions: [
      {
        _id: "h67lk4j5h6l34khg4oafsdh89vh425ioln",
        servingName: "6 pack",
        servingSize: 6,
      },
    ],
    country: "AUS",
    isDeleted: false,
    isUserFood: true,
    id: "605bfd678cf5520d0306d4bb",
  },
  {
    _id: "605bfd678cf5520d0306d4bc",
    name: "Breakfast Bakes Classic Peanut Butter ",
    brand: "Uncle Tobys Oats ",
    perServeSize: 65,
    isLiquid: false,
    macrosPerServe: {
      EnergyKJ: 1110,
      ProteinG: 5.9,
      FatTotalG: 10.6,
      saturatedG: 1.6,
      CarbohydrateG: 31.7,
      sugarsG: 7.4,
      fibreG: 7.4,
      SodiumMg: 90,
    },
    servingOptions: [
      {
        _id: "h67lk4j5h6l34khg4o89vh425ioln",
        servingName: "4 Pack",
        servingSize: 4,
      },
    ],
    country: "AUS",
    isDeleted: false,
    isUserFood: true,
    id: "605bfd678cf5520d0306d4bc",
  },
];
