// composables/useGeofencing.js
import { useContent } from '#imports'
import * as geolib from '@/node_modules/geolib';

export const useGeofencing = () => {
  const isRelayingLocation = ref(false)
  const locations = ref([])
  const isWithinGeofence = ref(null)
  const errorMessage = ref('')

  const fetchLocations = async () => {
    const contentQuery = queryContent('operations')
    const content = await contentQuery.find() 
    locations.value = content.map(location => ({ polygon: location.polygon, id: location.id })) // Add unique id if not present
  }

  const clearError = () => {
    errorMessage.value = '';
  }

  // In useGeofencing.js, modify the checkLocation function
  const checkLocation = async () => {
    console.log('Checking location...');
    isRelayingLocation.value = true;
    errorMessage.value = '';

    try {
      if (!locations.value.length) {
        await fetchLocations();
      }

      const userCoords = await getUserLocation();

      let found = locations.value.find((location) => {
        const polygon = location.polygon.map(point => ({ latitude: point.latitude, longitude: point.longitude }));
        return geolib.isPointInPolygon(userCoords, polygon);
      });

      // Wait for 5 seconds before continuing
      await new Promise(resolve => setTimeout(resolve, 1000));

      isWithinGeofence.value = found;
    } catch (error) {
      console.error('Error checking location:', error);
    } finally {
      isRelayingLocation.value = false;
      console.log('Final isWithinGeofence value:', isWithinGeofence.value);
    }
  };


  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude 
        }),
        reject
      )
    })
  }

  return {
    isRelayingLocation,
    locations,
    isWithinGeofence,
    errorMessage,
    checkLocation,
    clearError,
  }
}
