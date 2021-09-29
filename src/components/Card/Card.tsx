export default function Card({children}:{children: React.ReactNode}):JSX.Element{
    return(
        <div className='w-full shadow-xl bg-white rounded-2xl mt-10'>
            {children}
        </div>
    )
}