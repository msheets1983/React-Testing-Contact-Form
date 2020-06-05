import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm'

//Test
test("renders App without crashing", () => {
  render(<App />);
});

//Arrange
test('form can be filled in', () => {
  render(<ContactForm />)

  //Act
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const emailInput = screen.getByLabelText(/email/i)
  const messageInput = screen.getByLabelText(/message/i)

  //Assert
  expect(firstNameInput).toBeVisible();
  expect(lastNameInput).toBeVisible();
  expect(emailInput).toBeVisible();
  expect(messageInput).toBeVisible();

});

test('Test values can be intered into inputs', () => {
  //Arrange
  render(<ContactForm />)

  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const emailInput = screen.getByLabelText(/email/i)
  const messageInput = screen.getByLabelText(/message/i)

  //Act
  fireEvent.change(firstNameInput, { target: { value: 'Michael' } })
  fireEvent.change(lastNameInput, { target: { value: 'Sheets' } })
  fireEvent.change(emailInput, { target: { value: 'michael.sheets83@gmail.com' } })
  fireEvent.change(messageInput, { target: { value: 'This is a message' } })

  //Assert
  expect(firstNameInput.value).toBe('Michael')
  expect(lastNameInput.value).toBe('Sheets')
  expect(emailInput.value).toBe('michael.sheets83@gmail.com')
  expect(messageInput.value).toBe('This is a message')

});

test('Test maxLength for firstName input is 10 char instead of 3', async () => {
  //Arrange
  render(<ContactForm />)
  const firstNameInput = screen.getByLabelText(/First Name*/i)
  const submitButton = screen.getByTestId(/Submit/i)
  const firstNameError = screen.findByTestId(/firstNameError/i)

  //Act
  await act(() => {
    fireEvent.change(firstNameInput, { target: { value: '12345689a' } });
    fireEvent.click(submitButton);
  });

  //Assert
  expect(firstNameError).toBeNull;
});

test('Form submit add new contact', async () => {
  await act(async () => {

    //Arrange
    const { getByLabelText, getByTestId, findByTestId } = render(<ContactForm />);
    const firstNameInput = getByLabelText(/First Name*/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    const submitButton = getByTestId(/Submit/i);
    const success = findByTestId(/success/i);

    //Act
    await act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Michael' } })
      fireEvent.change(lastNameInput, { target: { value: 'Sheets' } })
      fireEvent.change(emailInput, { target: { value: 'michael.sheets83@gmail.com' } })
      fireEvent.change(messageInput, { target: { value: 'This is a message' } })
    })

    //Assert
    expect(firstNameInput.value).toBe('Michael')
    expect(lastNameInput.value).toBe('Sheets')
    expect(emailInput.value).toBe('michael.sheets83@gmail.com')
    expect(messageInput.value).toBe('This is a message')

    //Act
    await act (() =>{
      fireEvent.click(submitButton);
    })

    //Assert
    expect(findByTestId(success)).not.toBeNull();
  })
});