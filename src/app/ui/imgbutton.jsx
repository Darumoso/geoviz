'use client'

import Image from 'next/image';

export default function ButtonImg({ children, className, onClick, imgSrc, imgAlt, width, height }) {
    return (
        <button className={`p-2 hover rounded transition duration-200 flex items-center justify-center ${className}`} onClick={onClick}>
            {imgSrc && (
                <Image 
                    src={imgSrc} 
                    alt={imgAlt} 
                    width={width} 
                    height={height} 
                />
            )}
            {children}
        </button>
    );
}