import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getParkingSpots } from 'app/entities/parking-spot/parking-spot.reducer';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './booking.reducer';

export const BookingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const vehicles = useAppSelector(state => state.vehicle.entities);
  const parkingSpots = useAppSelector(state => state.parkingSpot.entities);
  const bookingEntity = useAppSelector(state => state.booking.entity);
  const loading = useAppSelector(state => state.booking.loading);
  const updating = useAppSelector(state => state.booking.updating);
  const updateSuccess = useAppSelector(state => state.booking.updateSuccess);
  const bookingStatusValues = Object.keys(BookingStatus);

  const handleClose = () => {
    navigate(`/booking${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUserProfiles({}));
    dispatch(getVehicles({}));
    dispatch(getParkingSpots({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);
    values.dateCreated = convertDateTimeToServer(values.dateCreated);

    const entity = {
      ...bookingEntity,
      ...values,
      userProfile: userProfiles.find(it => it.id.toString() === values.userProfile?.toString()),
      vehicle: vehicles.find(it => it.id.toString() === values.vehicle?.toString()),
      parkingSpot: parkingSpots.find(it => it.id.toString() === values.parkingSpot?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          startDate: displayDefaultDateTime(),
          endDate: displayDefaultDateTime(),
          dateCreated: displayDefaultDateTime(),
        }
      : {
          status: 'CONFIRMED',
          ...bookingEntity,
          startDate: convertDateTimeFromServer(bookingEntity.startDate),
          endDate: convertDateTimeFromServer(bookingEntity.endDate),
          dateCreated: convertDateTimeFromServer(bookingEntity.dateCreated),
          userProfile: bookingEntity?.userProfile?.id,
          vehicle: bookingEntity?.vehicle?.id,
          parkingSpot: bookingEntity?.parkingSpot?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="smartparkApp.booking.home.createOrEditLabel" data-cy="BookingCreateUpdateHeading">
            Create or edit a Booking
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="booking-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Start Date"
                id="booking-startDate"
                name="startDate"
                data-cy="startDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Date"
                id="booking-endDate"
                name="endDate"
                data-cy="endDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Date Created"
                id="booking-dateCreated"
                name="dateCreated"
                data-cy="dateCreated"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Status" id="booking-status" name="status" data-cy="status" type="select">
                {bookingStatusValues.map(bookingStatus => (
                  <option value={bookingStatus} key={bookingStatus}>
                    {bookingStatus}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="booking-userProfile" name="userProfile" data-cy="userProfile" label="User Profile" type="select" required>
                <option value="" key="0" />
                {userProfiles
                  ? userProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="booking-vehicle" name="vehicle" data-cy="vehicle" label="Vehicle" type="select" required>
                <option value="" key="0" />
                {vehicles
                  ? vehicles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <ValidatedField id="booking-parkingSpot" name="parkingSpot" data-cy="parkingSpot" label="Parking Spot" type="select" required>
                <option value="" key="0" />
                {parkingSpots
                  ? parkingSpots.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/booking" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookingUpdate;
