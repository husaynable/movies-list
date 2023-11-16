describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('List is Empty')
  })
})

describe('Add and delete movie',() => {
  it('Add and delete movie', () => {
    cy.visit('/')
    cy.get('.searchBtn').click()
    cy.get('input').type('The Matrix')
    cy.get('mat-option').first().click()
    cy.contains('Add to List').click()
    cy.contains('Close').click()
    cy.contains('The Matrix')
    cy.get('button[mat-icon-button]').first().click()
    cy.contains('Delete').click()
    cy.contains('List is Empty')
  })
});
