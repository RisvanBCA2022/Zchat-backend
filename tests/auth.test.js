import mongoose from "mongoose";
import app from '../server'
import dotenv from 'dotenv'
import request from 'supertest'
dotenv.config()

beforeEach(async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
})

afterEach(async ()=>{
    await mongoose.connection.close()
})

describe('GET /api/user/gettotalusers', () => {
    it('should get count of user', async() => {
        const res = await request(app).get("/api/user/gettotalusers");
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            data:3
        })
        // expect(res.body.length).toBeGreaterThan(0)
    });
    
})

describe('POST /api/auth/signup', () => {
    it('register new user', async() => {
        const res = await request(app).post("/api/auth/signup").send({
            username:"user4",
            email:"user4@gmail.com",
            password:"user4"
        })
        expect(res.statusCode).toBe(500);
    });
    
})


