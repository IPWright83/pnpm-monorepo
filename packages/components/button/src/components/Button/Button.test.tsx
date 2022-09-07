import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Button } from './Button';

describe('Button', () => {
    it('matches snapshot', () => {
        render(<Button onClick={function () {}} />);

        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
});
