export const Loader = ({ width, height }) => {
    const w = width || 12;
    const h = height || 12;

    return (<div className={`block mx-auto my-5 w-${w} h-${h} border-4 border-dashed rounded-full animate-spin-slow dark:border-indigo-600`}></div>);
}
