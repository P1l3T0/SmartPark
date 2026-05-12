import React from 'react';
import { Route } from 'react-router'; // eslint-disable-line

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Booking from './booking';
import ParkingSpot from './parking-spot';
import UserProfile from './user-profile';
import Vehicle from './vehicle';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="/user-profile/*" element={<UserProfile />} />
        <Route path="/vehicle/*" element={<Vehicle />} />
        <Route path="/parking-spot/*" element={<ParkingSpot />} />
        <Route path="/booking/*" element={<Booking />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
