import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { deleteEntity, getEntity } from './parking-spot.reducer';

export const ParkingSpotDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const parkingSpotEntity = useAppSelector(state => state.parkingSpot.entity);
  const updateSuccess = useAppSelector(state => state.parkingSpot.updateSuccess);

  const handleClose = () => {
    navigate(`/parking-spot${pageLocation.search}`);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(parkingSpotEntity.id));
  };

  return (
    <Modal show onHide={handleClose}>
      <ModalHeader data-cy="parkingSpotDeleteDialogHeading" closeButton>
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="smartparkApp.parkingSpot.delete.question">
        Are you sure you want to delete Parking Spot {parkingSpotEntity.id}?
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-parkingSpot" data-cy="entityConfirmDeleteButton" variant="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ParkingSpotDeleteDialog;
