import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'ewewj',
            price: 20
        })
        .expect(404);
})

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'ewewj',
            price: 20
        })
        .expect(401);
})

it('returns a 401 if the user does not own the ticket', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    
    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
        title: 'ewewj',
        price: 20
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'dkfkdfj',
            price: 200
        })
        .expect(401);
})

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();

    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: '',
        price: 20
    })
    .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'dkfkdfj',
            price: -200
        })
        .expect(400);
})

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: 'MY Title',
        price: 20
    })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'My new title',
            price: 200
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('My new title');
    expect(ticketResponse.body.price).toEqual(200);
})