package com.tusofia.smartpark.web.rest;

import com.tusofia.smartpark.repository.ParkingSpotRepository;
import com.tusofia.smartpark.service.ParkingSpotService;
import com.tusofia.smartpark.service.dto.ParkingSpotDTO;
import com.tusofia.smartpark.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.tusofia.smartpark.domain.ParkingSpot}.
 */
@RestController
@RequestMapping("/api/parking-spots")
public class ParkingSpotResource {

    private static final Logger LOG = LoggerFactory.getLogger(ParkingSpotResource.class);

    private static final String ENTITY_NAME = "parkingSpot";

    @Value("${jhipster.clientApp.name:smartpark}")
    private String applicationName;

    private final ParkingSpotService parkingSpotService;

    private final ParkingSpotRepository parkingSpotRepository;

    public ParkingSpotResource(ParkingSpotService parkingSpotService, ParkingSpotRepository parkingSpotRepository) {
        this.parkingSpotService = parkingSpotService;
        this.parkingSpotRepository = parkingSpotRepository;
    }

    /**
     * {@code POST  /parking-spots} : Create a new parkingSpot.
     *
     * @param parkingSpotDTO the parkingSpotDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parkingSpotDTO, or with status {@code 400 (Bad Request)} if the parkingSpot has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ParkingSpotDTO> createParkingSpot(@Valid @RequestBody ParkingSpotDTO parkingSpotDTO) throws URISyntaxException {
        LOG.debug("REST request to save ParkingSpot : {}", parkingSpotDTO);
        if (parkingSpotDTO.getId() != null) {
            throw new BadRequestAlertException("A new parkingSpot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        parkingSpotDTO = parkingSpotService.save(parkingSpotDTO);
        return ResponseEntity.created(new URI("/api/parking-spots/" + parkingSpotDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, parkingSpotDTO.getId().toString()))
            .body(parkingSpotDTO);
    }

    /**
     * {@code PUT  /parking-spots/:id} : Updates an existing parkingSpot.
     *
     * @param id the id of the parkingSpotDTO to save.
     * @param parkingSpotDTO the parkingSpotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parkingSpotDTO,
     * or with status {@code 400 (Bad Request)} if the parkingSpotDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parkingSpotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ParkingSpotDTO> updateParkingSpot(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ParkingSpotDTO parkingSpotDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ParkingSpot : {}, {}", id, parkingSpotDTO);
        if (parkingSpotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parkingSpotDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parkingSpotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        parkingSpotDTO = parkingSpotService.update(parkingSpotDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, parkingSpotDTO.getId().toString()))
            .body(parkingSpotDTO);
    }

    /**
     * {@code PATCH  /parking-spots/:id} : Partial updates given fields of an existing parkingSpot, field will ignore if it is null
     *
     * @param id the id of the parkingSpotDTO to save.
     * @param parkingSpotDTO the parkingSpotDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parkingSpotDTO,
     * or with status {@code 400 (Bad Request)} if the parkingSpotDTO is not valid,
     * or with status {@code 404 (Not Found)} if the parkingSpotDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the parkingSpotDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ParkingSpotDTO> partialUpdateParkingSpot(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ParkingSpotDTO parkingSpotDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ParkingSpot partially : {}, {}", id, parkingSpotDTO);
        if (parkingSpotDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parkingSpotDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parkingSpotRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ParkingSpotDTO> result = parkingSpotService.partialUpdate(parkingSpotDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, parkingSpotDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /parking-spots} : get all the Parking Spots.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Parking Spots in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ParkingSpotDTO>> getAllParkingSpots(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of ParkingSpots");
        Page<ParkingSpotDTO> page = parkingSpotService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /parking-spots/:id} : get the "id" parkingSpot.
     *
     * @param id the id of the parkingSpotDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parkingSpotDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ParkingSpotDTO> getParkingSpot(@PathVariable("id") Long id) {
        LOG.debug("REST request to get ParkingSpot : {}", id);
        Optional<ParkingSpotDTO> parkingSpotDTO = parkingSpotService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parkingSpotDTO);
    }

    /**
     * {@code DELETE  /parking-spots/:id} : delete the "id" parkingSpot.
     *
     * @param id the id of the parkingSpotDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParkingSpot(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete ParkingSpot : {}", id);
        parkingSpotService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
