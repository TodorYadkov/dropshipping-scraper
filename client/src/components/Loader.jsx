export const Loader = ({ width, height }) => {
    const w = width || 12;
    const h = height || 12;

    return (
        <div className="flex my-6 items-center justify-center">
            <div className={`w-${w} h-${h} border-4 border-dashed rounded-full animate-spin-slow dark:border-indigo-600`}></div>
        </div>
    );
}
