import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './vehicle.reducer';

export const VehicleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const vehicleEntity = useAppSelector(state => state.vehicle.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleDetailsHeading">Vehicle</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{vehicleEntity.id}</dd>
          <dt>
            <span id="dateCreated">Date Created</span>
          </dt>
          <dd>
            {vehicleEntity.dateCreated ? <TextFormat value={vehicleEntity.dateCreated} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="registrationNumber">Registration Number</span>
          </dt>
          <dd>{vehicleEntity.registrationNumber}</dd>
          <dt>
            <span id="model">Model</span>
          </dt>
          <dd>{vehicleEntity.model}</dd>
          <dt>
            <span id="brand">Brand</span>
          </dt>
          <dd>{vehicleEntity.brand}</dd>
          <dt>
            <span id="isPrimary">Is Primary</span>
          </dt>
          <dd>{vehicleEntity.isPrimary ? 'true' : 'false'}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{vehicleEntity.status}</dd>
          <dt>Owner</dt>
          <dd>{vehicleEntity.owner ? vehicleEntity.owner.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/vehicle" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/vehicle/${vehicleEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default VehicleDetail;
