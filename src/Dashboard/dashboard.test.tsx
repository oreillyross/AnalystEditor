import React from 'react';
import { render } from "@testing-library/react";
import Dashboard from './index'

describe('<Dashboard/>', () => {
    it('renders correctly', () => {
       const dashboard = render(<Dashboard/>)   
       expect(dashboard).toBeDefined();
    })
})