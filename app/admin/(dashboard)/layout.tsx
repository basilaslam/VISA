import Header from "@/components/Header"

const DashboardLayout = ({children}:{children: React.ReactNode}) => {

    return(
        <div className="h-[calc(100vh-4rem)] w-full bg-white dark:bg-gray-900">
            <Header/>
            <div className="mt-16">
            {children}
            </div>
        </div>
    )
}

export default DashboardLayout