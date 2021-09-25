import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'

//This is a higher order component. It is a function that takes a component that we want to wrap with some functionality of spinner loading feature. Then the wrapped component gets passed into a new component that wraps around it. So if isLoading is true, render the spinner else render the component itself.
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
};

//OR More explocitly
// const WithSpinner = (WrappedComponent) => {
//     const Spinner = ({ isLoading, ...otherProps }) => {
//         return isLoading ? (
//             <SpinnerOverlay>
//                 <SpinnerContainer />
//             </SpinnerOverlay>
//         ) : (
//             <WrappedComponent {...otherProps} />
//         );
//     };

//     return Spinner
// };
export default WithSpinner