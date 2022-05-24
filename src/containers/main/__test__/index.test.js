/* eslint-disable testing-library/no-debugging-utils */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryProvider } from "../../../hooks/query";
import {
  useFetchGetCurrencies,
  useFetchGetHistorical,
} from "../../../hooks/useQuery";
import { mockCurrencies, mockExchanges } from "../../../__test__/utils";
import Main from "../index";

jest.mock("../../../hooks/useQuery", () => ({
  useFetchGetCurrencies: jest.fn(),
  useFetchGetHistorical: jest.fn(),
}));

describe("<Main/>", () => {
  beforeEach(() => {
    useFetchGetHistorical.mockImplementation(() => ({
      status: "success",
      data: mockExchanges,
    }));
    useFetchGetCurrencies.mockImplementation(() => ({
      status: "success",
      data: mockCurrencies,
    }));
  });

  test("renders main page", () => {
    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );
    const pageElement = screen.getByTestId("main-content");
    expect(pageElement).toBeInTheDocument();
  });

  test("Expect to find CHF and USD currency by default", () => {
    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    const currencyCHF = screen.getByDisplayValue(/CHF/);
    expect(currencyCHF).toBeInTheDocument();

    const currencyUSD = screen.getByDisplayValue(/USD/);
    expect(currencyUSD).toBeInTheDocument();
  });

  test("Expect to find the conversion rate", () => {
    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    const conversionRateElement = screen.getByTestId("conversion-rate");

    expect(conversionRateElement).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(typeof conversionRateElement.innerHTML).toBe("string");
  });

  test("Expect title for historical section", () => {
    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    const titleElement = screen.getByText(/Search historical rates/i);

    expect(titleElement).toBeInTheDocument();
  });

  test("Expect the amount conversion to change", async () => {
    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    const resultElement = screen.getByTestId("conversion-result");

    expect(resultElement.innerHTML).toBe("0.00");

    const inputElement = screen.getByTestId("input-amount");

    fireEvent.change(inputElement, {
      target: {
        value: 500,
      },
    });

    fireEvent.click(screen.getByTestId("submit"));

    expect(resultElement.innerHTML).not.toBe("0.00");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
