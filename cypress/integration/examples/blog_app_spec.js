const baseUrl = 'http://localhost:3000';

describe('Blog app',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Jose Mourinho',
      username: 'mojo',
      password: 'chelsea2005'
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit(baseUrl);
  });

  it('Login page can be opened', function(){
    cy.get("#passwordInput");
    cy.get("#usernameInput");
  });

  it('Mourinho\'s username is shown after login', function() {
    cy.get("#usernameInput")
      .type('mojo');
    cy.get("#passwordInput")
      .type("chelsea2005");
    cy.contains('login').click();
    cy.contains('Jose Mourinho is logged in');
  });

  describe('after logging in', function(){
    beforeEach(function(){
      cy.get("#usernameInput")
        .type('mojo');
      cy.get("#passwordInput")
        .type("chelsea2005");
      cy.contains('login').click();
    });

    it('find current user in userlist', function() {
      cy.contains('users').click();
      cy.contains('Jose Mourinho');
      cy.contains('0');
    });

    describe('add new note', function(){
      beforeEach(function(){
        cy.contains('add blog').click();
        cy.get('#titleInput')
          .type('The 100 Most Popular Free Online Courses of 2019');
        cy.get('#authorInput')
          .type('Dhawal Shah');
        cy.get('#urlInput')
          .type('https://www.freecodecamp.org/news/100-popular-free-online-courses-2019/');

        cy.get('#createBlogBtn').click();
      });

      it('contains new note', function() {
        cy.contains('The 100 Most Popular Free Online Courses of 2019');
      });
    });

  });
});