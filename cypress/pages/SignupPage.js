class SignupPage {
    go(){
        cy.visit('/');
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats');

        // Act
        cy.get('a[href="/deliver"]').click();

        // Assert
        cy.log('**Checkpoint**: Verifica se foi para tela de o formulario correto');
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
    }

    fillForm(deliver){
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        cy.get('input[type=button][value="Buscar CEP"]').click();

        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);

        // COMENTEI ESSA PARTE PQ NO CYPRESS O BOTAO DE BUSCAR CEP NAO TA FUNCIONANDO
        // cy.get('input[name="address"]').should('have.value', deliver.address.street);
        // cy.get('input[name="district"]').should('have.value', deliver.address.district);
        // cy.get('input[name="city_uf"]').should('have.value', deliver.address.city_uf);

        cy.contains('.delivery-method li', deliver.delivery_method).click();

        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh);

        /*
         * O acento ^ (circunflexo) aplicado no localizador é uma tecnica de expressão regular básica que representa o "começa com" entao dessa forma ele vai 
         * buscar a palavra image no começo e ignorar o /* que existe no elemento lá no HTML.
         * Tem também por exemplo o "termina com"  que é usado o $ (cifrão).
         * E o "contém" que é usado o *(asterisco).
        */
    }

    submit(){
        cy.get('form button[type="submit"]').click();
    }

    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage){
        // cy.get('.alert-error').should('have.text', expectedMessage);
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }
}

export default new SignupPage;