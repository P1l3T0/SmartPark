package com.tusofia.smartpark.web.rest;

import static com.tusofia.smartpark.domain.ParkingSpotAsserts.*;
import static com.tusofia.smartpark.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tusofia.smartpark.IntegrationTest;
import com.tusofia.smartpark.domain.ParkingSpot;
import com.tusofia.smartpark.repository.ParkingSpotRepository;
import com.tusofia.smartpark.service.dto.ParkingSpotDTO;
import com.tusofia.smartpark.service.mapper.ParkingSpotMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ParkingSpotResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ParkingSpotResourceIT {

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_SLOT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SLOT_NUMBER = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/parking-spots";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2L * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    @Autowired
    private ParkingSpotMapper parkingSpotMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParkingSpotMockMvc;

    private ParkingSpot parkingSpot;

    private ParkingSpot insertedParkingSpot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParkingSpot createEntity() {
        return new ParkingSpot().dateCreated(DEFAULT_DATE_CREATED).slotNumber(DEFAULT_SLOT_NUMBER);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParkingSpot createUpdatedEntity() {
        return new ParkingSpot().dateCreated(UPDATED_DATE_CREATED).slotNumber(UPDATED_SLOT_NUMBER);
    }

    @BeforeEach
    void initTest() {
        parkingSpot = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedParkingSpot != null) {
            parkingSpotRepository.delete(insertedParkingSpot);
            insertedParkingSpot = null;
        }
    }

    @Test
    @Transactional
    void createParkingSpot() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);
        var returnedParkingSpotDTO = om.readValue(
            restParkingSpotMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(parkingSpotDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ParkingSpotDTO.class
        );

        // Validate the ParkingSpot in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedParkingSpot = parkingSpotMapper.toEntity(returnedParkingSpotDTO);
        assertParkingSpotUpdatableFieldsEquals(returnedParkingSpot, getPersistedParkingSpot(returnedParkingSpot));

        insertedParkingSpot = returnedParkingSpot;
    }

    @Test
    @Transactional
    void createParkingSpotWithExistingId() throws Exception {
        // Create the ParkingSpot with an existing ID
        parkingSpot.setId(1L);
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restParkingSpotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(parkingSpotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateCreatedIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        parkingSpot.setDateCreated(null);

        // Create the ParkingSpot, which fails.
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        restParkingSpotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(parkingSpotDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSlotNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        parkingSpot.setSlotNumber(null);

        // Create the ParkingSpot, which fails.
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        restParkingSpotMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(parkingSpotDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllParkingSpots() throws Exception {
        // Initialize the database
        insertedParkingSpot = parkingSpotRepository.saveAndFlush(parkingSpot);

        // Get all the parkingSpotList
        restParkingSpotMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parkingSpot.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].slotNumber").value(hasItem(DEFAULT_SLOT_NUMBER)));
    }

    @Test
    @Transactional
    void getParkingSpot() throws Exception {
        // Initialize the database
        insertedParkingSpot = parkingSpotRepository.saveAndFlush(parkingSpot);

        // Get the parkingSpot
        restParkingSpotMockMvc
            .perform(get(ENTITY_API_URL_ID, parkingSpot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(parkingSpot.getId().intValue()))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.slotNumber").value(DEFAULT_SLOT_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingParkingSpot() throws Exception {
        // Get the parkingSpot
        restParkingSpotMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingParkingSpot() throws Exception {
        // Initialize the database
        insertedParkingSpot = parkingSpotRepository.saveAndFlush(parkingSpot);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the parkingSpot
        ParkingSpot updatedParkingSpot = parkingSpotRepository.findById(parkingSpot.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedParkingSpot are not directly saved in db
        em.detach(updatedParkingSpot);
        updatedParkingSpot.dateCreated(UPDATED_DATE_CREATED).slotNumber(UPDATED_SLOT_NUMBER);
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(updatedParkingSpot);

        restParkingSpotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, parkingSpotDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(parkingSpotDTO))
            )
            .andExpect(status().isOk());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedParkingSpotToMatchAllProperties(updatedParkingSpot);
    }

    @Test
    @Transactional
    void putNonExistingParkingSpot() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        parkingSpot.setId(longCount.incrementAndGet());

        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParkingSpotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, parkingSpotDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(parkingSpotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchParkingSpot() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        parkingSpot.setId(longCount.incrementAndGet());

        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParkingSpotMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(parkingSpotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamParkingSpot() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        parkingSpot.setId(longCount.incrementAndGet());

        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParkingSpotMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(parkingSpotDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateParkingSpotWithPatch() throws Exception {
        // Initialize the database
        insertedParkingSpot = parkingSpotRepository.saveAndFlush(parkingSpot);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the parkingSpot using partial update
        ParkingSpot partialUpdatedParkingSpot = new ParkingSpot();
        partialUpdatedParkingSpot.setId(parkingSpot.getId());

        restParkingSpotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParkingSpot.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedParkingSpot))
            )
            .andExpect(status().isOk());

        // Validate the ParkingSpot in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertParkingSpotUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedParkingSpot, parkingSpot),
            getPersistedParkingSpot(parkingSpot)
        );
    }

    @Test
    @Transactional
    void fullUpdateParkingSpotWithPatch() throws Exception {
        // Initialize the database
        insertedParkingSpot = parkingSpotRepository.saveAndFlush(parkingSpot);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the parkingSpot using partial update
        ParkingSpot partialUpdatedParkingSpot = new ParkingSpot();
        partialUpdatedParkingSpot.setId(parkingSpot.getId());

        partialUpdatedParkingSpot.dateCreated(UPDATED_DATE_CREATED).slotNumber(UPDATED_SLOT_NUMBER);

        restParkingSpotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParkingSpot.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedParkingSpot))
            )
            .andExpect(status().isOk());

        // Validate the ParkingSpot in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertParkingSpotUpdatableFieldsEquals(partialUpdatedParkingSpot, getPersistedParkingSpot(partialUpdatedParkingSpot));
    }

    @Test
    @Transactional
    void patchNonExistingParkingSpot() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        parkingSpot.setId(longCount.incrementAndGet());

        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParkingSpotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, parkingSpotDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(parkingSpotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchParkingSpot() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        parkingSpot.setId(longCount.incrementAndGet());

        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParkingSpotMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(parkingSpotDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamParkingSpot() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        parkingSpot.setId(longCount.incrementAndGet());

        // Create the ParkingSpot
        ParkingSpotDTO parkingSpotDTO = parkingSpotMapper.toDto(parkingSpot);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParkingSpotMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(parkingSpotDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ParkingSpot in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteParkingSpot() throws Exception {
        // Initialize the database
        insertedParkingSpot = parkingSpotRepository.saveAndFlush(parkingSpot);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the parkingSpot
        restParkingSpotMockMvc
            .perform(delete(ENTITY_API_URL_ID, parkingSpot.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return parkingSpotRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected ParkingSpot getPersistedParkingSpot(ParkingSpot parkingSpot) {
        return parkingSpotRepository.findById(parkingSpot.getId()).orElseThrow();
    }

    protected void assertPersistedParkingSpotToMatchAllProperties(ParkingSpot expectedParkingSpot) {
        assertParkingSpotAllPropertiesEquals(expectedParkingSpot, getPersistedParkingSpot(expectedParkingSpot));
    }

    protected void assertPersistedParkingSpotToMatchUpdatableProperties(ParkingSpot expectedParkingSpot) {
        assertParkingSpotAllUpdatablePropertiesEquals(expectedParkingSpot, getPersistedParkingSpot(expectedParkingSpot));
    }
}
