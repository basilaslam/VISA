import Header from '@/components/Header'

export default function Home() {
  return (
<>
    <Header/>
    <section className="bg-gray-50 dark:bg-gray-900">
    <div
      className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center"
      >
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
        Visa Made Easy{" "}
          <strong className="font-extrabold text-primary-700 sm:block">
          Your Journey Begins
          </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
        Streamline your visa applications effortlessly with our <span className='text-primary-700'>Visa</span> app, embark on your global journey hassle-free and easy.
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
