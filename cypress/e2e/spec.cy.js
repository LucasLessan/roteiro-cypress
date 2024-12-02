describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Insere três tarefas, completa uma, edita outra e deleta outra', () => {
    cy.visit(''); 

    // Insere três tarefas
    cy.get('[data-cy=todo-input]')
      .type('Keep searching{enter}')
      .type('Keep on searching{enter}')
      .type('Search and Destroy{enter}');

    // Remove a primeira
    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .first()
      .click();

    // Testa se existem duas e o texto da primeira restante
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2) 
      .first()
      .should('have.text', 'Keep on searching');

    // Adiciona texto à última
    cy.get('[data-id=3]')
      .invoke('show')
      .dblclick()
      .type(' and Destroy{enter}');
  });

  it('Limpa tarefas concluídas e insere mais', () => {
    cy.visit(''); 

    // Insere duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Meer{enter}')
      .type('Kat{enter}');

    // Completa a primeira e a última
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .last()
      .click();

    // Muda pra aba 'Active' e testa se a lista está vazia
    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);

    // Muda pra aba 'Completed' e testa se a lista tem tamanho 2
    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);

    // Muda pra aba 'All' e testa se a lista tem tamanho 2
    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);

    // Limpa completos e testa se a lista está vazia
    cy.get('[class=clear-completed]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);

    // Insere mais duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Killer{enter}')
      .type('Whale{enter}');

    // Muda pra aba 'Active' e testa se a lista tem tamanho 2
    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Testa as três abas', () => {
    cy.visit(''); 

    // Insere 4 tarefas
    cy.get('[data-cy=todo-input]')
      .type('Uno{enter}')
      .type('Dos{enter}')
      .type('Tres{enter}')
      .type('Catorze{enter}');

    // Completa a primeira
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    // Limpa completos e testa se restam 3
    cy.get('[class=clear-completed]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    // Completa a última tarefa
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .last()
      .click();

    // Testa se existem três na aba 'All'
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    // Muda para a aba 'Active' e testa se a lista tem tamanho 2
    // e confere o conteúdo das duas tarefas
    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)
      .first()
      .should('have.text', 'Dos');
    cy.get('[data-cy=todos-list]')
      .children()
      .last()
      .should('have.text', 'Tres');

    // Muda para a aba 'Completed' e testa se a lista tem tamanho 1
    // e confere o conteúdo da tarefa
    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Catorze');
    cy.get('[data-cy=todos-list]')
      .children()
      .last()
      .should('have.text', 'Catorze');
  });
});