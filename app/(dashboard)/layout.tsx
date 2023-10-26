import Header from "@/components/Header"

const DashboardLayout = ({children}:{children: React.ReactNode}) => {

    return(
        <div className=" h-screen w-full bg-white dark:bg-gray-900">
            <Header/>
            {children}
        </div>
    )
}

export default DashboardLayout