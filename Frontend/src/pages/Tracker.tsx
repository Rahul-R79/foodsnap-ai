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
        <div className='min-h-screen bg-[#FFFBF2] text-slate-800 font-sans selection:bg-orange-500/30'>
            {/* Background Gradients */}
            <div className='fixed inset-0 z-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-400/20 rounded-full blur-3xl opacity-60 animate-pulse'></div>
                <div
                    className='absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl opacity-60 animate-pulse'
                    style={{ animationDelay: "1s" }}></div>
            </div>

            <div className='relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen'>
                {/* Header */}
                <div className='text-center mb-10 space-y-2'>
                    <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 drop-shadow-sm'>
                        Nutrition AI
                    </h1>
                    <p className='text-slate-600 text-lg md:text-xl max-w-md mx-auto'>
                        Your personal food analyst. Snap your meal to get instant
                        nutrition details.
                    </p>
                </div>

                {/* Main Card */}
                <div className='w-full max-w-xl bg-white/80 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-2xl shadow-orange-500/10 overflow-hidden transition-all duration-300 hover:shadow-orange-500/20'>
                    <div className='p-8'>
                        {/* Upload Area */}
                        <div
                            className={`relative group cursor-pointer transition-all duration-300 ease-in-out
                ${image ? "h-auto" : "h-72"}
                rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-400 hover:bg-orange-50
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
                                        className='w-full h-auto max-h-96 object-cover rounded-xl shadow-md'
                                    />
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl'>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage();
                                            }}
                                            className='bg-white text-red-500 p-3 rounded-full hover:scale-110 shadow-lg transition-transform'>
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
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center p-6 space-y-4'>
                                    <div className='w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='36'
                                            height='36'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            className='text-orange-500'>
                                            <path d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5' />
                                            <path d='M9 18h6' />
                                            <path d='M10 22h4' />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-xl font-semibold text-slate-700'>
                                            Upload your Meal
                                        </p>
                                        <p className='text-sm text-slate-500 mt-1'>
                                            JPG, PNG, WEBP supported
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
                  ${!image
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : "bg-linear-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
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
                                    <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
                                    <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
                                    <line x1='12' y1='22.08' x2='12' y2='12' />
                                </svg>
                                Analyze Nutrition
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nutrition Grid */}
                {image && (
                    <div className='mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl'>
                        {[
                            { label: "Food Name", value: "Biriyani", unit: "" },
                            { label: "Total Quantity", value: "100", unit: "gm" },
                            { label: "Total Calorie", value: "350", unit: "kCal" },
                            { label: "Protein", value: "12", unit: "gm" },
                            { label: "Fat", value: "18", unit: "gm" },
                            { label: "Carbs", value: "45", unit: "gm" },
                        ].map((item, index) => (
                            <div key={index} className="bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {item.value} <span className="text-lg text-orange-600 font-medium">{item.unit}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracker;
