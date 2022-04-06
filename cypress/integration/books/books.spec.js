/// <reference types="cypress" />

context('Books', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/network-requests')
    })
  
    // Manage HTTP requests in your app
  
    it('Create a book', () => {
      // https://on.cypress.io/request
      cy.request('POST','https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books', {
          title: "This is our first automated book creation",
          author: 'Olga C'
      }) 
        .should((response) => {
          expect(response.status).to.eq(200)
          // the server sometimes gets an extra comment posted from another machine
          // which gets returned as 1 extra object
          expect(response.body).to.have.property('length').and.be.oneOf([500, 501])
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })
  })