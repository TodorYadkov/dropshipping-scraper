export const Loader = ({ width, height, margin }) => {
    const w = width || 12;
    const h = height || 12;

    return (
        <div className={`flex items-center justify-center ${margin ? margin : 'my-6'}`}>
            <div className={`w-${w} h-${h} border-4 border-dashed rounded-full animate-spin-slow dark:border-indigo-600`}></div>
        </div>
    );
};