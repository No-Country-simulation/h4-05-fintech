const register = {
  email: 'newuser@email.com',
  password: 'newNormalUser123',
  confirmPassword: 'newNormalUser123',
};

const registeredUser = {
  email: 'unverified@email.com',
  password: 'unverifiedUser0',
  confirmPassword: 'unverifiedUser0',
};

const login = {
  email: 'normal@email.com',
  password: 'normalUser1',
};

describe('Testing the auth pages', () => {
  context('Testing on iphone-5 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-5');
    });

    describe('Testing register page', () => {
      it('Register successful', () => {
        cy.visit('/auth');
        cy.get('[data-cy="register"]').should('have.text', 'Registrarme').click();
        cy.url().should('include', '/register');
  
        // Components should be visible
        cy.get('[data-cy="email-input"]').should('be.visible');
        cy.get('[data-cy="password-input"]').should('be.visible');
        cy.get('[data-cy="password-input"]').should('be.visible');
        cy.get('[data-cy="register-button"]').should('be.visible');
        cy.get('[data-cy="apple-button"]').should('be.visible');
        cy.get('[data-cy="google-button"]').should('be.visible');
  
        // Input data
        cy.get('[data-cy="email-input"]').type(register.email);
        cy.get('[data-cy="password-input"]').type(register.password);
        cy.get('[data-cy="password-input"]').type(register.confirmPassword);

        // Submit data
        cy.intercept('POST', '/auth/registry', { statusCode: 201 }).as('user-register');
        cy.get('[data-cy="register-button"]').submit();
        cy.wait('@user-register').then((interception) => {
          expect(interception?.response?.statusCode).to.equal(201);
        });

        // Verification page
        cy.url().should('include', '/registered');
        cy.get('[data-cy="register-message"]').should('be.visible');
        cy.get('[data-cy="register-description"]').should('be.visible');
        cy.get('[data-cy="login-button"]').should('be.visible');
        cy.get('[data-cy="verification-button"]').should('be.visible');
        cy.get('[data-cy="register-message"]').should('have.text', 'Revisa tu dirección de correo');
        cy.get('[data-cy="register-description"]').should('have.text', `Te hemos una confimación de registro a ${register.email}`);
        cy.get('[data-cy="login-button"]').should('have.text', 'Ya lo confirmé');
        cy.get('[data-cy="verification-button"]').should('have.text', 'Reenviar confirmación');
      });

      it('Already registered', () => {
        cy.visit('/auth');
        cy.get('[data-cy="register"]').should('have.text', 'Registrarme').click();
        cy.url().should('include', '/register');
  
        // Components should be visible
        cy.get('[data-cy="email-input"]').should('be.visible');
        cy.get('[data-cy="password-input"]').should('be.visible');
        cy.get('[data-cy="password-input"]').should('be.visible');
        cy.get('[data-cy="register-button"]').should('be.visible');
        cy.get('[data-cy="apple-button"]').should('be.visible');
        cy.get('[data-cy="google-button"]').should('be.visible');
  
        // Input data
        cy.get('[data-cy="email-input"]').type(registeredUser.email);
        cy.get('[data-cy="password-input"]').type(registeredUser.password);
        cy.get('[data-cy="password-input"]').type(registeredUser.confirmPassword);

        // Submit data
        cy.intercept('POST', '/auth/registry', { statusCode: 409 }).as('user-register');
        cy.get('[data-cy="register-button"]').submit();
        cy.wait('@user-register').then((interception) => {
          expect(interception?.response?.statusCode).to.equal(409);
        });

        // Verification page
        cy.url().should('include', '/registered');
        cy.get('[data-cy="register-message"]').should('be.visible');
        cy.get('[data-cy="register-description"]').should('be.visible');
        cy.get('[data-cy="login-button"]').should('be.visible');
        cy.get('[data-cy="verification-button"]').should('be.visible');
        cy.get('[data-cy="register-message"]').should('have.text', `El correo ${registeredUser.email} ya está registrado`);
        cy.get('[data-cy="register-description"]').should('have.text', 'Si aún no has verificado tu correo, reenvía el código de verificación. Si ya lo has veriifcado, intenta iniciar sesión.');
        cy.get('[data-cy="login-button"]').should('have.text', 'Iniciar sesión');
        cy.get('[data-cy="verification-button"]').should('have.text', 'Reenviar confirmación');
      });
    })

    describe('Testing login page', () => {
      it('From auth main page, enter to login page', () => {
        cy.visit('/auth');
        cy.get('[data-cy="login"]').should('have.text', 'Iniciar sesión').click();
        cy.url().should('include', '/login');
  
        // Components should be visible
        cy.get('[data-cy="email-input"]').should('be.visible');
        cy.get('[data-cy="password-input"]').should('be.visible');
        cy.get('[data-cy="login-button"]').should('be.visible');
        cy.get('[data-cy="apple-button"]').should('be.visible');
        cy.get('[data-cy="google-button"]').should('be.visible');
  
        // Input data
        cy.get('[data-cy="email-input"]').type(login.email);
        cy.get('[data-cy="password-input"]').type(login.password);

        // Submit data
        cy.intercept('POST', '/auth/registry', { statusCode: 200 }).as('user-login');
        cy.get('[data-cy="login-button"]').submit();
        cy.wait('@user-login').then((interception) => {
          expect(interception?.response?.statusCode).to.equal(200);
        });
      })
    })
  })
})
