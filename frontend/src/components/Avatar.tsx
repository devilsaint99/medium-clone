

interface IAvatar {
    initials: string
}

export const Avatar = ({initials}: IAvatar)=>{

    return(
       <div className={"relative flex place-items-center justify-center  w-8 h-8 overflow-hidden bg-gray-950 rounded-full dark:bg-gray-950"}>
            <div className="font-extralight text-sm text-gray-600 dark:text-gray-300">{initials}</div>
        </div>
    )
}