const faker = require('faker');

let title;
let idBook;

context('Books', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
  })

  title = 'api.book.' + faker.datatype.number();

  it('Create a book', () => {
    cy.request('POST', 'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books', {
      title: title,
      author: 'Olga C'
    })
      .then((response) => {
        idBook = ('https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/' + response.body.id);
        cy.request('https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/' + response.body.id).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.title).to.eq(title)
          cy.log(idBook);
        })
      })
  })

  it('Get books', () => {
    cy.request('GET', 'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books', {
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.be.null
      })
  })

  it('Get my book', () => {
    cy.request('GET', idBook, {
    })
      .then((response) => {
        expect(response.body.title).to.eq(title)
        cy.log(idBook);
      })
  })

  it('Change my book', () => {
    cy.request('GET', idBook, {
    })
    cy.log(idBook);
    cy.request('PUT', idBook, {
      title: 'new',
      author: 'Olga C'
    })
      .then((response) => {
        expect(response.body.title).to.eq('new')
        cy.log(idBook);
      })
  })

  it('Delete my book', () => {
    cy.request('DELETE', idBook, {
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        cy.log(idBook);
      })
  })
})    