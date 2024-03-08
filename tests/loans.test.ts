import request from 'supertest';
import app from '../src/app';
import {
  loanApplicationSuccess,
  loanApplicationError,
  loanApplicationSeed,
  updateLoanApplicationSuccess,
  updateLoanApplicationError,
} from './fixtures/loan-applications-data';
import { generateRandomString } from 'ts-randomstring/lib';

const randomLoanApplicationId = generateRandomString({
  length: 5,
});

describe('Loan Application', () => {
  // Seeder for loan applications
  beforeAll(async () => {
    await request(app).post('/v1/api/loans').send(loanApplicationSeed);
  });

  describe('POST - Create loan application', () => {
    it('should create loan application', async () => {
      const res = await request(app)
        .post('/v1/api/loans')
        .send(loanApplicationSuccess);

      expect(res.status).toEqual(201);
    });

    it('should throw error due to error validations', async () => {
      const res = await request(app)
        .post('/v1/api/loans')
        .send(loanApplicationError);

      expect(res.status).toEqual(422);
    });

    it('should throw error due to loan application already existing', async () => {
      // 1st application created
      await request(app).post('/v1/api/loans').send(loanApplicationSeed);

      // 2nd loan application
      const res = await request(app)
        .post('/v1/api/loans')
        .send(loanApplicationSeed);

      expect(res.status).toEqual(409);
    });
  });

  describe('GET - Get loan application by id', () => {
    it('should get loan application by id', async () => {
      const res = await request(app)
        .get(`/v1/api/loans/${loanApplicationSeed.id}`)
        .send(loanApplicationSeed);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message');
    });

    it('should throw error due to loan application not found', async () => {
      const res = await request(app)
        .get(`/v1/api/loans/${randomLoanApplicationId}`)
        .send(loanApplicationError);

      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Not Found');
    });
  });

  describe('GET - Get loan applications', () => {
    // Remove added loan applications for empty scenario
    beforeAll(async () => {
      await Promise.all([
        await request(app).delete(`/v1/api/loans/${loanApplicationSeed.id}`),
        await request(app).delete(`/v1/api/loans/${loanApplicationSuccess.id}`),
      ]);
    });

    // Delete newly added loan application and re-seed loan application
    afterAll(async () => {
      await request(app).delete(`/v1/api/loans/${loanApplicationSuccess.id}`);
      await request(app).post('/v1/api/loans').send(loanApplicationSeed);
    });

    it('should return empty loan applications', async () => {
      const res = await request(app)
        .get(`/v1/api/loans`)
        .send(loanApplicationSeed);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message');
      expect(res.body.data.length).toEqual(0);
    });

    it('should get loan applications', async () => {
      await Promise.all([
        request(app).post('/v1/api/loans').send(loanApplicationSeed),
        request(app).post('/v1/api/loans').send(loanApplicationSuccess),
      ]);

      const res = await request(app)
        .get(`/v1/api/loans`)
        .send(loanApplicationSeed);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message');
      expect(res.body.data.length).toEqual(2);
    });
  });

  describe('PUT - Update loan application', () => {
    it('should update loan application by id', async () => {
      const res = await request(app)
        .put(`/v1/api/loans/${loanApplicationSeed.id}`)
        .send(updateLoanApplicationSuccess);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message');
      expect(res.body.data.applicantName).toEqual('Updated applicant');
    });

    it('should throw error when loan application due to error validations', async () => {
      const res = await request(app)
        .put(`/v1/api/loans/${loanApplicationSeed}`)
        .send(updateLoanApplicationError);

      expect(res.status).toEqual(422);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Validation Error');
    });

    it('should throw error when loan application does not exist', async () => {
      const res = await request(app)
        .put(`/v1/api/loans/${randomLoanApplicationId}`)
        .send(updateLoanApplicationSuccess);

      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Not Found');
    });
  });

  describe('DELETE - Delete loan application', () => {
    it('should delete loan application by id', async () => {
      const res = await request(app).delete(
        `/v1/api/loans/${loanApplicationSeed.id}`,
      );

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message');
    });

    it('should throw error when loan application does not exist', async () => {
      const res = await request(app).delete(
        `/v1/api/loans/${randomLoanApplicationId}`,
      );

      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Not Found');
    });
  });
});
