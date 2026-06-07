import Category from '@/components/modules/home/Category/Category';
import HeroSection from '@/components/modules/home/HeroSection/HeroSection';
import React from 'react';

const homePage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
           <HeroSection />
           <Category />
        </div>
    );
};

export default homePage;