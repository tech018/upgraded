const pricingConfig = {
  student: {
    motor: 25,
    tricycle: 50,
    fourwheelmore: 75,
  },
  employee: {
    motor: 50,
    tricycle: 75,
    fourwheelmore: 100,
  },
  publicvehicle: {
    motor: 100,
    tricycle: 100,
    fourwheelmore: 100,
  },
  others: {
    motor: 75,
    tricycle: 125,
    fourwheelmore: 150,
  },
};

export const paymentHelper = (type, vehicle) => {
  const pricing = pricingConfig[type.toLowerCase()];
  return pricing[vehicle.toLowerCase()];
};
