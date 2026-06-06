import { Navbar } from '@/components/shared/navbar';
import React from 'react';

const publicLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
             <Navbar  />
            {children}
        </div>
    );
};

export default publicLayout;