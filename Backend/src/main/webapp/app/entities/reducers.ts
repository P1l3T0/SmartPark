import booking from 'app/entities/booking/booking.reducer';
import parkingSpot from 'app/entities/parking-spot/parking-spot.reducer';
import userProfile from 'app/entities/user-profile/user-profile.reducer';
import vehicle from 'app/entities/vehicle/vehicle.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userProfile,
  vehicle,
  parkingSpot,
  booking,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
