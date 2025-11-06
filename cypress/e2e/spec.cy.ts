import { timeout } from "rxjs"

describe("Product Catalog App", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("displays at least 5 products on load", () => {
    cy.get('[data-cy="product-card"]') 
      .should("have.length.at.least", 5);
  })

  it("filters products correctly using the search bar", () => {

    const searchTerm = "Wireless Mouse";

    cy.get('[data-cy="search-input"]').type(searchTerm);

    // Matching product should be visible
    cy.contains(searchTerm)
      .should("be.visible");

    // Non-matching products should not be visible
    cy.get('[data-cy="product-card"]').each(($card) => {
      const name = $card.find("h3").text().toLowerCase();
      if (!name.includes(searchTerm.toLowerCase())) {
        cy.wrap($card).should("not.be.visible");
      }
    })
  })

  it("opens product details modal and shows correct information", () => {

    // Click the first product
    cy.get('[data-cy="product-card"]').first().click();

    // Modal should appear
    cy.get('[data-cy="product-modal"]')
      .should("be.visible");

    // Name
    cy.get('[data-cy="modal-name"]')
      .should("exist")
      .and("not.be.empty");

    // Price
    cy.get('[data-cy="modal-price"]')
      .should("exist")
      .and("contain", "₹");

    // Description
    cy.get('[data-cy="modal-desc"]')
      .should("exist")
      .and("not.be.empty");
  })

  it("closes the modal when close button is clicked", () => {

    // Open product modal first
    cy.get('[data-cy="product-card"]').eq(1).click();

    // Ensure modal is visible
    cy.get('[data-cy="product-modal"]')
      .should("be.visible");

    // Click close button
    cy.get('[data-cy="close-modal"]').click();

    // Modal should be gone
    cy.get('[data-cy="product-modal"]')
      .should("not.exist");
  });

})
