const pricingConfig = {
  student: {
    motorcycle: 25,
    tricycle: 50,
    '4wheels': 75,
  },
  employee: {
    motorcycle: 50,
    tricycle: 75,
    '4wheels': 100,
  },
  publicvehicle: {
    motorcycle: 100,
    tricycle: 100,
    '4wheels': 100,
  },
  default: {
    motorcycle: 75,
    tricycle: 125,
    '4wheels': 150,
  },
};

export const paymentHelper = (type, vehicle) => {
  // Determine pricing based on type and vehicle
  const pricing = pricingConfig[type.toLowerCase()] || pricingConfig.default;
  return pricing[vehicle.toLowerCase()] || pricing['4wheels'];
};
