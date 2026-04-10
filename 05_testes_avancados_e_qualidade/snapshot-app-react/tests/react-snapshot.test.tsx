// Testando Componentes React com Snapshot
//
// react-test-renderer transforma o componente em uma árvore de objetos JSON,
// sem precisar de um DOM real (diferente de @testing-library/react).
// Isso o torna ideal para "fotografar" a estrutura de renderização.

import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../src/components/Button";
import { UserCard } from "../src/components/UserCard";

describe("Button — Testes de Snapshot", () => {
  it("deve renderizar o botão primário corretamente", () => {
    const tree = renderer.create(<Button label="Clique aqui" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("deve renderizar a variante danger corretamente", () => {
    const tree = renderer
      .create(<Button label="Deletar" variant="danger" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("deve renderizar o estado desabilitado corretamente", () => {
    const tree = renderer
      .create(<Button label="Enviar" disabled={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("UserCard — Testes de Snapshot", () => {
  it("deve renderizar o card sem avatar", () => {
    const tree = renderer
      .create(
        <UserCard
          name="Renan Pallin"
          email="renan@example.com"
          role="Editor"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("deve renderizar o card com avatar", () => {
    const tree = renderer
      .create(
        <UserCard
          name="Renan Pallin"
          email="renan@example.com"
          role="Admin"
          avatarUrl="https://example.com/avatar.jpg"
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// O que acontece quando o snapshot falha?
// Tente alterar o className do Button para 'btn-novo-nome' e rode os testes.
// O Jest vai mostrar um diff com as linhas que mudaram.
// Para aceitar a mudança: npm run test:update ou pressionar 'u' no watch mode.
