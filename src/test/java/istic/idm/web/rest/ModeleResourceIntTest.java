package istic.idm.web.rest;

import istic.idm.MemeGeneratorApp;

import istic.idm.domain.Modele;
import istic.idm.repository.ModeleRepository;
import istic.idm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ModeleResource REST controller.
 *
 * @see ModeleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MemeGeneratorApp.class)
public class ModeleResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    @Autowired
    private ModeleRepository modeleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restModeleMockMvc;

    private Modele modele;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModeleResource modeleResource = new ModeleResource(modeleRepository);
        this.restModeleMockMvc = MockMvcBuilders.standaloneSetup(modeleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Modele createEntity(EntityManager em) {
        Modele modele = new Modele()
            .name(DEFAULT_NAME)
            .path(DEFAULT_PATH);
        return modele;
    }

    @Before
    public void initTest() {
        modele = createEntity(em);
    }

    @Test
    @Transactional
    public void createModele() throws Exception {
        int databaseSizeBeforeCreate = modeleRepository.findAll().size();

        // Create the Modele
        restModeleMockMvc.perform(post("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isCreated());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeCreate + 1);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testModele.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createModeleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modeleRepository.findAll().size();

        // Create the Modele with an existing ID
        modele.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModeleMockMvc.perform(post("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllModeles() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        // Get all the modeleList
        restModeleMockMvc.perform(get("/api/modeles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modele.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        // Get the modele
        restModeleMockMvc.perform(get("/api/modeles/{id}", modele.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modele.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModele() throws Exception {
        // Get the modele
        restModeleMockMvc.perform(get("/api/modeles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Update the modele
        Modele updatedModele = modeleRepository.findOne(modele.getId());
        updatedModele
            .name(UPDATED_NAME)
            .path(UPDATED_PATH);

        restModeleMockMvc.perform(put("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModele)))
            .andExpect(status().isOk());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testModele.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Create the Modele

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restModeleMockMvc.perform(put("/api/modeles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isCreated());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);
        int databaseSizeBeforeDelete = modeleRepository.findAll().size();

        // Get the modele
        restModeleMockMvc.perform(delete("/api/modeles/{id}", modele.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modele.class);
        Modele modele1 = new Modele();
        modele1.setId(1L);
        Modele modele2 = new Modele();
        modele2.setId(modele1.getId());
        assertThat(modele1).isEqualTo(modele2);
        modele2.setId(2L);
        assertThat(modele1).isNotEqualTo(modele2);
        modele1.setId(null);
        assertThat(modele1).isNotEqualTo(modele2);
    }
}
