describe('cypress testing working',() => {
    it('can go to baseUrl',()=> {
        cy.visit('/');
    })
    it('can input into mailing list',()=> {
        cy.visit('/about');
        cy.get('#inputing').click();
        cy.get('input').first().type("what is this?")
    }) 
    it('can navigate to either page using the navbar',()=> {
        // cy.visit('/about');
        // cy.get('#close-icon');
        
    }) 
})