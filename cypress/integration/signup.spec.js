import signupPage from '../pages/SignupPage';
import signupFactory from '../factories/SignupFactory';



describe('Signup', () => {

    it('**User should be deliver**', () => {

        var deliver = signupFactory.deliver();

        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();


        // Assert
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
        signupPage.modalContentShouldBe(expectedMessage);

    })

    it('**Incorrect document**', () => {
        var deliver = signupFactory.deliver();

        deliver.cpf = '12312312388aa'
        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();


        signupPage.alertMessageShouldBe('Oops! CPF inválido');
    })

    it('**Incorrect email**', () => {
        var deliver = signupFactory.deliver();

        deliver.email = 'user.com.br'
        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();


        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.');
    })

    // ! esse formatado de teste substitui o formato escrito abaixo comentado
    // ? a forma feita abaixo, faz com que o teste nao aborte quando chega na validação campo de email,pois nao vai encontrar "e-mail", 
    // ? só email, dessa segue e faz as demais validações

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o e-mail' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]


        before(function () {
            signupPage.go();
            signupPage.submit();
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signupPage.alertMessageShouldBe(msg.output);
            })
        })
    })


    //// it('**Required fields**', () => {

    ////     signupPage.go();
    ////     signupPage.submit();

    ////     signupPage.alertMessageShouldBe('É necessário informar o nome');
    ////     signupPage.alertMessageShouldBe('É necessário informar o CPF');
    ////     signupPage.alertMessageShouldBe('É necessário informar o email');
    ////     signupPage.alertMessageShouldBe('É necessário informar o CEP');
    ////     signupPage.alertMessageShouldBe('É necessário informar o número do endereço');
    ////     signupPage.alertMessageShouldBe('Selecione o método de entrega');
    ////     signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH');
    //// })
})