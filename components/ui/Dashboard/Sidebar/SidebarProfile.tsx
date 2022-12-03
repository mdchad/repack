import Link from 'next/link'
import React from 'react'

function SidebarProfile({ user }: any) {
    console.log(user)
    return (
        <div className="flex flex-col gap-5 flex-shrink-0 border-b border-gray-200 pb-3">
            <div className="flex items-center">
                <div>
                    <img
                        className="inline-block h-12 w-12 rounded-full"
                        src={user.user_metadata.avatar_url ?? ''}
                        alt=""
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.user_metadata.full_name ?? ''}</p>
                    <Link href="/dashboard/settings">
                        <a className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</a>
                    </Link>
                </div>
            </div>

            <div className="">
                <p className="mb-2 text-sm">Free plan</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-gray-600 h-2.5 rounded-full w-[45%]"></div>
                </div>
                <div className="flex justify-between mb-1">
                    <span></span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        <strong>378</strong> of 1,500
                    </span>
                    {/* <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span> */}
                </div>
            </div>
        </div>
    )
}

export default SidebarProfile