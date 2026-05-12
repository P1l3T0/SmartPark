import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ParkingSpot from './parking-spot';
import ParkingSpotDeleteDialog from './parking-spot-delete-dialog';
import ParkingSpotDetail from './parking-spot-detail';
import ParkingSpotUpdate from './parking-spot-update';

const ParkingSpotRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ParkingSpot />} />
    <Route path="new" element={<ParkingSpotUpdate />} />
    <Route path=":id">
      <Route index element={<ParkingSpotDetail />} />
      <Route path="edit" element={<ParkingSpotUpdate />} />
      <Route path="delete" element={<ParkingSpotDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ParkingSpotRoutes;
