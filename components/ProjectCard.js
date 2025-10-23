import Link from 'next/link'
import React from 'react'

const ProjectCard = (props) => {

    return (
        <>
            <div className='relative group w-1/2 h-full hover:rounded-[3rem] transition-all overflow-hidden'>
                <img className='h-full w-full object-cover group-hover:scale-120 scale-115 transition-all group' src={props.image1} alt="" />
                <div className="absolute group group-hover:opacity-100 opacity-0 transition-all top-0 flex items-center justify-center h-full w-full left-0 hover:bg-black/10">
                    <h2 className='text-white border-4 transition-all border-white rounded-full text-[50px] leading-[50px] uppercase px-4 py-2'><Link href={props.link1} target='_blank'>View Project</Link></h2>
                </div>
            </div>
            <div className='relative group w-1/2 h-full hover:rounded-[3rem] transition-all overflow-hidden'>
                <img className='h-full w-full object-cover group-hover:scale-120 scale-115 transition-all group' src={props.image2} alt="" />
                <div className="absolute group group-hover:opacity-100 opacity-0 transition-all top-0 flex items-center justify-center h-full w-full left-0 hover:bg-black/10">
                    <h2 className='text-white border-4 transition-all border-white rounded-full text-[50px] leading-[50px] uppercase px-4 py-2'><Link href={props.link2} target='_blank'>View Project</Link></h2>
                </div>
                {/* <div className=" group md:opacity-100 opacity-0 transition-all top-0 flex items-center justify-center h-full w-full left-0 hover:bg-black/10">
                    <h2 className='text-white border-4 transition-all border-white rounded-full text-[50px] leading-[50px] uppercase px-4 py-2'><Link href={props.link2} target='_blank'>View Project</Link></h2>
                </div> */}
            </div>
        </>
    )
}

export default ProjectCard