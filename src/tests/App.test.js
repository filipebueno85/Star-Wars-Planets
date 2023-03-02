import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from './mockData';

beforeEach(() => {
   jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(() => {
  global.fetch.mockClear();
});
describe('Testando a aplicação', () => {
  it('Testando header', async () => {
    render(<App />);

    const carregando = await screen.findByText('Carregando...')
    waitForElementToBeRemoved(carregando);
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'Tatooine');
      await waitFor(() => {
        expect(screen.getByRole('cell', { name: /tatooine/i})).toBeInTheDocument();
      });
      userEvent.clear(inputSearch);
    
      const selectComparison= screen.getByTestId('comparison-filter');
    await waitFor(() => {
      expect(selectComparison).toHaveValue('maior que');
    });
    userEvent.selectOptions(selectComparison, 'menor que');
    expect(selectComparison).toBeInTheDocument()

    const selectColumn= screen.getByTestId('column-filter');
    await waitFor(() => {
      expect(selectColumn).toHaveValue('population');
    });
    userEvent.selectOptions(selectColumn, 'rotation_period');
    expect(selectColumn).toBeInTheDocument();
    const inputNumber = screen.getByTestId('value-filter');
    expect(inputNumber).toBeInTheDocument();
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(inputNumber, '23');

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /hoth/i})).toBeInTheDocument();
    });
    
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.click(buttonFilter);
    // expect(screen.getByText(/0populationmaior que/i)).toBeInTheDocument();
  });

  it('testando as comparativos do filtro de maior que', async () => {
    render(<App />);
    const carregando = await screen.findByText('Carregando...')
    waitForElementToBeRemoved(carregando);
    const selectComparison= screen.getByTestId('comparison-filter');
    const selectColumn= screen.getByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'rotation_period');
    const inputNumber = screen.getByTestId('value-filter');
    expect(inputNumber).toBeInTheDocument();
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(inputNumber, '23');

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /Yavin IV/i})).toBeInTheDocument();
    });

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);
    
  })

  it('testando as comparativos do filtro de menor que', async () => {
    render(<App />);
    const carregando = await screen.findByText('Carregando...')
    waitForElementToBeRemoved(carregando);
    const selectComparison= screen.getByTestId('comparison-filter');
    const selectColumn= screen.getByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'rotation_period');
    const inputNumber = screen.getByTestId('value-filter');
    expect(inputNumber).toBeInTheDocument();
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputNumber, '23');

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /Bespin/i})).toBeInTheDocument();
    });

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);
    
  })
  it('testando botão de remover todos os filtros', async () => {
    render(<App />);
    const carregando = await screen.findByText('Carregando...')
    waitForElementToBeRemoved(carregando);
    const selectComparison= screen.getByTestId('comparison-filter');
    const selectColumn= screen.getByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'rotation_period');
    const inputNumber = screen.getByTestId('value-filter');
    expect(inputNumber).toBeInTheDocument();
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputNumber, '23');

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /Bespin/i})).toBeInTheDocument();
    });

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);
    const removeAllButton = screen.getByTestId('button-remove-filters');
    // expect(removeAllButton).toBeInTheDocument();
    userEvent.click(removeAllButton);
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /tatooine/i})).toBeInTheDocument();
    });
    })

    it('testando botão de remover um filtro', async () => {
      render(<App />);
      const carregando = await screen.findByText('Carregando...')
    waitForElementToBeRemoved(carregando);
    const selectComparison= screen.getByTestId('comparison-filter');
    const selectColumn= screen.getByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'rotation_period');
    const inputNumber = screen.getByTestId('value-filter');
    expect(inputNumber).toBeInTheDocument();
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.type(inputNumber, '23');

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /Bespin/i})).toBeInTheDocument();
    });
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);
      const removeButton = screen.getByRole('button', { name: /x/i });
      expect(removeButton).toBeInTheDocument();
      userEvent.click(removeButton);
    });

    it('testando filtros para ordenar as colunas', async () => {
      render(<App />);
    // const carregando = await screen.findByText('Carregando...')
    // waitForElementToBeRemoved(carregando);

    const sortColumn = screen.getByTestId('column-sort');
    // userEvent.selectOptions(sortColumn, 'rotation_period');
    await waitFor(() => {
      expect(sortColumn).toHaveValue('population');
    });
    userEvent.selectOptions(sortColumn, 'rotation_period');
    const radioACS = screen.getByTestId('column-sort-input-asc');
    userEvent.click(radioACS);
    expect(radioACS).toBeInTheDocument();
    const radioDESC = screen.getByTestId('column-sort-input-desc');
    expect(radioDESC).toBeInTheDocument();
    userEvent.click(radioDESC);

    const sortButton = screen.getByTestId('column-sort-button');
    expect(sortButton).toBeInTheDocument();
    userEvent.click(sortButton);
   
    })
});
