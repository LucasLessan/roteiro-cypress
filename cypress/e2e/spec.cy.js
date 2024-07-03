describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Insere e Completa Tarefas, Depois Limpa a Lista', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Instalar Kali Linux{enter}')
      .type('Treinar Vim Motions{enter}');

    cy.get('.todo-list li .toggle')
      .eq(0)
      .click();

    cy.get('.todo-list li .toggle')
      .eq(1)
      .click();

    cy.contains('Clear completed').click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Completa Tarefa, Depois Desfaz Mudança', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Instalar LSP{enter}')
      .type('Redigir Artigo{enter}');

    cy.get('.todo-list li .toggle')
      .eq(1)
      .click();

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Redigir Artigo');

    cy.get('.todo-list li .toggle')
      .eq(0)
      .click();

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2)
      .eq(1)
      .should('have.text', 'Redigir Artigo');
  });

  it('Teste Completo', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Aprender Arch Linux{enter}')
      .type('Instalar Arch{enter}');

    cy.get('.todo-list li .toggle')
      .eq(0)
      .click();

    cy.get('.todo-list li .toggle')
      .eq(1)
      .click();

    cy.get('.new-todo')
      .type('Configurar Arch{enter}');

    cy.get('.todo-list li')
      .should('have.length', 3);

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 2);

    cy.contains('Clear completed').click();

    cy.get('.new-todo')
      .type('Configurar DE{enter}')
      .type('Configurar WM{enter}');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 3);

    cy.get('.todo-list li .toggle')
      .eq(0)
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });
});