export const Loader = ({width = 16, height = 16}) => {
    return <div className={`block mx-auto my-5 w-${width} h-${height} border-4 border-dashed rounded-full animate-spin dark:border-indigo-600`}></div>
}