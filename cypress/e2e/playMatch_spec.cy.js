/* eslint-disable no-undef */

describe('play match', () => {
    it('user should play quizz, start another match and then reset quizz', () => {

        // Go to App's starting page
        cy.visit('/');

        // Change category to "Science: Computers" and difficulty to "Medium" and click "Start Quizz"
        cy.findByRole('combobox', { name: /category/i }).should('be.visible').select("Science: Computers");
        cy.findByRole('combobox', { name: /difficulty/i }).should('be.visible').select("Medium");
        cy.findByRole("button", { name: /start quizz/i }).click();

        // Select an answer for every question
        // Use the wrap method on the element so we can use cypress commands on it
        cy.findAllByRole("heading").should('have.length', 5).each($heading => cy.wrap($heading).next().children().first().click());

        // Assert that score isn't shown before clicking "Check Answers" button
        cy.findByLabelText(/results_description/i).should('not.be.visible');

        // Click "Check Answers" button
        cy.findByRole("button", { name: /check answers/i }).click();

        // Assert that score has been shown
        cy.findByLabelText(/results_description/i).should('be.visible');

        // Click "Play Again"
        cy.findByRole("button", { name: /play again/i }).click();

        // Assert that new 5 questions have been shown (no answers selected because css doesn't include scalling)
        //cy.findAllByRole("heading").each($heading => cy.wrap($heading).next().children().first().children().first().should('be.visible').should('not.have.class', /.\*answer_selected.\*/));
        cy.findAllByRole("heading").should('have.length', 5).each($heading => cy.wrap($heading).next().children().first().children().first().should('be.visible').should('have.css', 'transform', "matrix(1, 0, 0, 1, 0, 0)"));

        // Click "Reset Quizz"
        cy.findByRole("button", { name: /reset quizz/i }).click();

        // Assert that Start Quizz Menu page has been shown
        cy.findByRole("button", { name: /start quizz/i }).should('be.visible');
        // cy.findByRole("button", { name: /start quizz/i }).then(($button) => {
        //     expect($button).to.be.visible;
        // });
    })
})
