import React, { useState, useRef } from "react";

const Tracker = () => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30'>
            {/* Background Gradients */}
            <div className='fixed inset-0 z-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-40 animate-pulse'></div>
                <div
                    className='absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-40 animate-pulse'
                    style={{ animationDelay: "1s" }}></div>
            </div>

            <div className='relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen'>
                {/* Header */}
                <div className='text-center mb-10 space-y-2'>
                    <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 drop-shadow-sm'>
                        Calorie Tracker
                    </h1>
                    <p className='text-slate-400 text-lg md:text-xl max-w-md mx-auto'>
                        Snap a photo of your meal and let AI track your
                        nutrition.
                    </p>
                </div>

                {/* Main Card */}
                <div className='w-full max-w-xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-cyan-500/10 hover:border-slate-700'>
                    <div className='p-8'>
                        {/* Upload Area */}
                        <div
                            className={`relative group cursor-pointer transition-all duration-300 ease-in-out
                ${image ? "h-auto" : "h-64"}
                rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50
                flex flex-col items-center justify-center overflow-hidden
              `}
                            onClick={() =>
                                !image && fileInputRef.current?.click()
                            }>
                            <input
                                type='file'
                                ref={fileInputRef}
                                className='hidden'
                                accept='image/*'
                                onChange={handleImageUpload}
                            />

                            {image ? (
                                <div className='relative w-full h-auto'>
                                    <img
                                        src={image}
                                        alt='Food preview'
                                        className='w-full h-auto max-h-96 object-cover rounded-xl shadow-lg'
                                    />
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl'>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage();
                                            }}
                                            className='bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-transform hover:scale-110 shadow-lg'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='24'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'>
                                                <path d='M3 6h18' />
                                                <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                                                <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                                                <line
                                                    x1='10'
                                                    x2='10'
                                                    y1='11'
                                                    y2='17'
                                                />
                                                <line
                                                    x1='14'
                                                    x2='14'
                                                    y1='11'
                                                    y2='17'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center p-6 space-y-4'>
                                    <div className='w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='32'
                                            height='32'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='text-cyan-400'>
                                            <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                                            <polyline points='17 8 12 3 7 8' />
                                            <line
                                                x1='12'
                                                x2='12'
                                                y1='3'
                                                y2='15'
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-lg font-medium text-slate-200'>
                                            Click or drag image to upload
                                        </p>
                                        <p className='text-sm text-slate-500 mt-1'>
                                            Supports JPG, PNG, WEBP
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        <div className='mt-8'>
                            <button
                                disabled={!image}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all duration-300 flex items-center justify-center gap-3
                  ${
                      !image
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  }
                `}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'>
                                    <path d='M5 12h14' />
                                    <path d='m12 5 7 7-7 7' />
                                </svg>
                                Analyze Food
                            </button>
                        </div>
                    </div>
                </div>

                {/*Calore Tracker*/}
                <div className='mt-12 grid grid-cols-3 gap-8 text-center w-full max-w-2xl opacity-60'>
                    <div className='space-y-1'>
                        <p className='text-2xl font-bold text-slate-200'>Food Name</p>
                        <p className='text-1xl tracking-wider text-slate-100'>
                            Biriyani
                        </p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-2xl font-bold text-slate-200'>Total Quantity</p>
                        <p className='text-1xl uppercase tracking-wider text-slate-100'>
                            100 gm
                        </p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-2xl font-bold text-slate-200'>Total Calorie</p>
                        <p className='text-1xl uppercase tracking-wider text-slate-100'>
                            1000 cal
                        </p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-2xl font-bold text-slate-200'>Total Protein</p>
                        <p className='text-1xl uppercase tracking-wider text-slate-100'>
                            100 gm
                        </p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-2xl font-bold text-slate-200'>Total Fat</p>
                        <p className='text-1xl uppercase tracking-wider text-slate-100'>
                            100 gm
                        </p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-2xl font-bold text-slate-200'>Total Carbs</p>
                        <p className='text-1xl uppercase tracking-wider text-slate-100'>
                            100 gm
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
