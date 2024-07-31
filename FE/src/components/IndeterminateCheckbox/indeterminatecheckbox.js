import { forwardRef, useEffect, useRef } from 'react';

// Document: https://tanstack.com/table/v8/docs/framework/react/examples/row-selection
// Component display checkbox in table 
const IndeterminateCheckbox =   (
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

export default IndeterminateCheckbox;