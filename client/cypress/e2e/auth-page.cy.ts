import { ApiErrorMessages } from "@/api/api-errors";
import { login, register, registeredUser, normalUserRefreshToken } from "cypress/seeds/user.seeds";

describe('Testing the auth pages', () => {
  context('Testing on iphone-5 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-5');
    });

    it('Register successful', () => {
      cy.setCookie('refresh-cookie', '');
      cy.getCookie('refresh-cookie').should('not.exist');

      cy.visit('/auth');
      cy.get('[data-cy="register"]').should('have.text', 'Registrarme').click();
      cy.url().should('include', '/register');
  
      // Components should be visible
      cy.get('[data-cy="email-input"]').should('be.visible');
      cy.get('[data-cy="password-input"]').should('be.visible');
      cy.get('[data-cy="confirm-password-input"]').should('be.visible');
      cy.get('[data-cy="apple-button"]').should('be.visible');
      cy.get('[data-cy="google-button"]').should('be.visible');
  
      // Input data
      cy.get('[data-cy="email-input"]').type(register.email);
      cy.get('[data-cy="password-input"]').type(register.password);
      cy.get('[data-cy="confirm-password-input"]').type(register.confirmPassword);

      // Submit data
      cy.intercept('POST', '/auth/registry', { statusCode: 201 }).as('register');
      cy.get('[data-cy="register-form"]').submit();
      cy.wait('@register').then((interception) => {
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
      cy.setCookie('refresh-cookie', '');
      cy.getCookie('refresh-cookie').should('not.exist');

      cy.visit('/auth');
      cy.get('[data-cy="register"]').should('have.text', 'Registrarme').click();
      cy.url().should('include', '/register');
  
      // Components should be visible
      cy.get('[data-cy="email-input"]').should('be.visible');
      cy.get('[data-cy="password-input"]').should('be.visible');
      cy.get('[data-cy="confirm-password-input"]').should('be.visible');
      cy.get('[data-cy="apple-button"]').should('be.visible');
      cy.get('[data-cy="google-button"]').should('be.visible');
  
      // Input data
      cy.get('[data-cy="email-input"]').type(registeredUser.email);
      cy.get('[data-cy="password-input"]').type(registeredUser.password);
      cy.get('[data-cy="confirm-password-input"]').type(registeredUser.confirmPassword);

      // Submit data
      cy.intercept('POST', '/auth/registry',
        { 
          statusCode: 409,
          body: {
            message: ApiErrorMessages.REGISTERED_USER,
          },
        })
        .as('register');
      cy.get('[data-cy="register-form"]').submit();
      cy.wait('@register').then((interception) => {
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

    it('Login successful', () => {
      cy.setCookie('refresh-cookie', '');
      cy.getCookie('refresh-cookie').should('not.exist');

      cy.visit('/auth');
      cy.get('[data-cy="login"]').should('have.text', 'Iniciar sesión').click();
      cy.url().should('include', '/login');

      // Components should be visible
      cy.get('[data-cy="email-input"]').should('be.visible');
      cy.get('[data-cy="password-input"]').should('be.visible');
      cy.get('[data-cy="apple-button"]').should('be.visible');
      cy.get('[data-cy="google-button"]').should('be.visible');
  
      // Input data
      cy.get('[data-cy="email-input"]').type(login.email);
      cy.get('[data-cy="password-input"]').type(login.password);

      // Submit data
      cy.intercept('POST', '/auth/login', { statusCode: 200 }).as('login');
      cy.get('[data-cy="login-form"]').submit();
      cy.wait('@login').then((interception) => {
        expect(interception?.response?.statusCode).to.equal(200);
      });

      // Dashboard page
      cy.url().should('include', '/dashboard');

      // Logout
      cy.setCookie('refresh-token', normalUserRefreshToken)
      cy.intercept('GET', '/auth/logout', { statusCode: 200 }).as('logout');
      cy.get('[data-cy="logout-button"]').should('be.visible').click();
      cy.wait('@logout').then((interception) => {
        expect(interception?.response?.statusCode).to.equal(200);
      });
      cy.url().should('include', '/auth');
    })
  })
})
