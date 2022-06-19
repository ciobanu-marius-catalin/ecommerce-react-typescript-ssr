// import {fireEvent, render, screen} from '@testing-library/react';
// import {Counter} from './index';
// import userEvent from "@testing-library/user-event";
//
// describe('components/counter', () => {
//
//     it('not crashes', () => {
//         const spy = jest.spyOn(global.console, 'error')
//         render(<Counter/>);
//
//         expect(spy).not.toHaveBeenCalled();
//         expect(screen.getByText('Counter')).toBeInTheDocument();
//     });
//
//     it('increases', () => {
//         const {container, rerender} = render(<Counter/>);
//
//
//         // eslint-disable-next-line testing-library/no-container
//         let onIncreaseButton = container.querySelector('.counter-increase');
//
//         userEvent.click(onIncreaseButton);
//
//         let numberOfClicksNode = container.querySelector('.counter-result');
//
//         expect(parseInt(numberOfClicksNode.textContent)).toEqual(1);
//
//
//     })
//     // it('prop refresh', () => {
//     //     const {container, rerender} = render(<Counter/>);
//     //     let newLabel = "Updated label"
//     //     rerender(<Counter label={newLabel}/>);
//     //     expect(screen.getByText(newLabel)).toBeInTheDocument();
//     // })
//     it('decreases', () => {
//         const {container} = render(<Counter/>);
//         const spy = jest.spyOn(global.console, 'error')
//
//         // eslint-disable-next-line testing-library/no-container
//         let onIncreaseButton = container.querySelector('.counter-increase');
//         let onDecreaseButton = container.querySelector('.counter-decrease');
//         userEvent.click(onIncreaseButton);
//         userEvent.click(onIncreaseButton);
//
//         let numberOfClicksNode = container.querySelector('.counter-result');
//
//         expect(parseInt(numberOfClicksNode.textContent)).toEqual(2);
//
//         userEvent.click(onDecreaseButton);
//
//         numberOfClicksNode = container.querySelector('.counter-result');
//         expect(parseInt(numberOfClicksNode.textContent)).toEqual(1);
//
//         userEvent.click(onDecreaseButton);
//         userEvent.click(onDecreaseButton);
//
//         numberOfClicksNode = container.querySelector('.counter-result');
//         expect(parseInt(numberOfClicksNode.textContent)).toEqual(0);
//         expect(spy).not.toHaveBeenCalled();
//     })
//     it('writes in input', () => {
//         const {container} = render(<Counter/>);
//         let input = container.querySelector('input');
//         let inputValue = 'new input';
//         fireEvent.change(input, {target: {value: inputValue}})
//
//         input = container.querySelector('input');
//
//         expect(input.value).toEqual(inputValue);
//     })
// })
