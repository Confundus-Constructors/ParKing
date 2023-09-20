const axios = require('axios');
require("dotenv").config();

module.exports = {
  subtractReservedSpots: (availableCountPerGarage, reservedCountPerGarage) => {
    const parkingSpotCountsMap = new Map();

    // Populate the parkingSpotCountsMap with parking spot counts
    for (const row of availableCountPerGarage) {
      parkingSpotCountsMap.set(row.garage_id, row.count);
    }

    // Loop through the reservedCountPerGarage and subtract counts
    for (const row of reservedCountPerGarage) {
      const garageId = row.garage_id;
      const transactionCount = row.count;

      if (parkingSpotCountsMap.has(garageId)) {
        const parkingSpotCount = parkingSpotCountsMap.get(garageId);
        const updatedCount = parkingSpotCount - transactionCount;

        // Update the parking spot count in the availableCountPerGarage array
        for (const parkingSpotRow of availableCountPerGarage) {
          if (parkingSpotRow.garage_id === garageId) {
            parkingSpotRow.count = updatedCount;
            break; // Exit the loop once updated
          }
        }
      }
    }
    return availableCountPerGarage;
  },
  nestCountIntoGarageData: (garageData, availableSpots) => {
    // Create a map for available spots using garage_id as the key
    const availableSpotsMap = new Map();
    for (const spot of availableSpots) {
      availableSpotsMap.set(spot.garage_id, spot.count);
    }

    // Update the garageData array with the count from availableSpots
    for (const garage of garageData) {
      if (availableSpotsMap.has(garage.id)) {
        garage.count = availableSpotsMap.get(garage.id);
      }
    }

    return garageData;
  },
  lookupLatLong: async (address) => {
    const array = address.split(' ');
    const streetNumber = array[0];
    const street = array[1];

    const obj = {
      country: 'US',
      state: 'Florida',
      locality: 'Miami',
      street: street,
      houseNumber: streetNumber,
    }

    const authObj = {
      apiKey: `${process.env.PTV_AUTH}`
    }

    const result = await axios.get('https://api.myptv.com/geocoding/v1/locations/by-address', {params: obj, headers: authObj})
    return result;
  },
}