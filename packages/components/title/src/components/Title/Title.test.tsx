import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Title } from './Title';

describe('Button', () => {
    it('matches snapshot', () => {
        render(<Title />);

        expect(screen.getByText('This is a title')).toBeInTheDocument();
    });
});
