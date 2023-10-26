import Header from '@/components/Header'

export default function Home() {
  return (
<>
    <Header/>
    <section className="bg-gray-50 dark:bg-gray-900">
    <div
      className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
      >
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
        Your PDF, Your Way {" "}
          <strong className="font-extrabold text-primary-700 sm:block">
          Page by Page
          </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
        Tailor your PDFs with precision. Customize and create documents page by page. Your way, no compromise
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-primary-600 px-12 py-3 text-sm font-medium text-white  shadow hover:bg-primary-700 focus:outline-none focus:ring active:bg-primary-500 sm:w-auto"
            href="/dashboard"
            >
            Get Started
          </a>
        </div>
      </div>
    </div>
  </section>
              </>
  )
}
