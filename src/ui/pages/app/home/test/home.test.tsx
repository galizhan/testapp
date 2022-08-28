import React from 'react'
import { rest } from 'msw'

import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '../../../../../utils/test-utils'
import Home from '../home'
import {setupServer} from "msw/node";
import setupStore, {useAppDispatch} from "../../../../../store/configure-store";
import {loadusers} from "../../../../../store/users";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
    rest.get('/api/users?page=1', (req, res, ctx) => {
        return res(ctx.json('{"page":1,"per_page":6,"total":12,"total_pages":2,"data":[{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},{"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},{"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},{"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}'), ctx.delay(0))
    }),
    rest.get('/api/users?page=2', (req, res, ctx) => {
        return res(ctx.json('{"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.in","first_name":"Michael","last_name":"Lawson","avatar":"https://reqres.in/img/faces/7-image.jpg"},{"id":8,"email":"lindsay.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://reqres.in/img/faces/8-image.jpg"},{"id":9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://reqres.in/img/faces/9-image.jpg"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://reqres.in/img/faces/10-image.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://reqres.in/img/faces/11-image.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://reqres.in/img/faces/12-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}'), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

// test('fetches & receives a user after clicking the fetch user button', async () => {
//
//     renderWithProviders(<Home />)
//
//     // should show no user initially, and not be fetching a user
//     expect(await screen.getByText(/george.bluth@reqres.in/i)).toBeInTheDocument()
//
//     // // after clicking the 'Fetch user' button, it should now show that it is fetching the user
//     // fireEvent.click(screen.getByRole('button', { name: '>' }))
//     // expect(screen.getByText(/michael.lawson@reqres.in/i)).toBeInTheDocument()
//
// })
describe("User", () => {
    it("should display user name", async () => {
        renderWithProviders(<Home />)

        let userName = await screen.findAllByText("george.bluth@reqres.in");

        expect(userName).toBeTruthy();
        fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }));

        let username = await screen.findAllByText("michael.lawson@reqres.in");

        expect(userName).toBeTruthy();
    });
});
