'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

//models
const data = require('../src/models/index');

//sqlite initialization
beforeAll(async () => {
  await data.db.sync();
})

//sqlite termination
afterAll(async () => {
  await data.db.drop();
})

describe('Run test for server and API calls', () => {

  // ###### 404 Status Codes ###### 

  it('should respond with a status code 404 on a bad route', () => {
    return mockRequest
    .get('/foo')
    .then( results => {
      expect(results.status).toBe(404)
    })
  })

  it('should respond with a status code 404 on a bad method', () => {
    return mockRequest
    .get('/*')
    .then(results => {
      expect(results.req.method).toBe('GET')
    })
  })

  // ###### Clothes Routes ###### 

  it('should GET record from a get request', () => {
    return mockRequest
    .get('/clothes')
    .then(results => {
      expect(results.status).toBe(200)
      expect(results.body).toEqual([])
    })
  })

  it('should POST while equaling data given', async () => {
    let obj = {
      shirtColor: 'test',
      pantColor: 'test'
    }
    let response = await mockRequest.post('/clothes').send(obj)
    expect(response.status).toBe(200)
    expect(response.body.shirtColor).toEqual('test')
  })

  it('should GET a single record from get request', () => {
    return mockRequest
    .get('/clothes/1')
    .then(results => {
      expect(results.status).toBe(200)
      expect(results.body.pantColor).toEqual('test')
    })
  })

  it('should UPDATE clothes request with new object', () => {
    let obj = {
      shirtColor: 'test1',
      pantColor: 'test1'
    }
    return mockRequest
    .put('/clothes/1').send(obj)
    .then(results => {
      expect(results.status).toBe(200)
      expect(results.body.pantColor).toEqual('test1')
    })
  })

  it('should DELETE a clothing item by id', () => {
    return mockRequest
    .delete('/clothes/1')
    .then(results => {
      expect(results.status).toBe(200)
    })
  })

  // ###### food Routes ######
  
  it('should GET record from a get request', () => {
    return mockRequest
    .get('/food')
    .then(results => {
      expect(results.status).toBe(200)
      expect(results.body).toEqual([])
    })
  })

  it('should POST while equaling data given', async () => {
    let obj = {
      favDrink: 'test',
      lovePizza: 'test'
    }
    let response = await mockRequest.post('/food').send(obj)
    expect(response.status).toBe(200)
    expect(response.body.favDrink).toEqual('test')
  })

  it('should GET a single record from get request', () => {
    return mockRequest
    .get('/food/1')
    .then(results => {
      expect(results.status).toBe(200)
      expect(results.body.lovePizza).toEqual('test')
    })
  })

  it('should UPDATE food request with new object', () => {
    let obj = {
      favDrink: 'test1',
      lovePizza: 'test1'
    }
    return mockRequest
    .put('/food/1').send(obj)
    .then(results => {
      expect(results.status).toBe(200)
      expect(results.body.lovePizza).toEqual('test1')
    })
  })

  it('should DELETE a clothing item by id', () => {
    return mockRequest
    .delete('/food/1')
    .then(results => {
      expect(results.status).toBe(200)
    })
  })
})
