


export default function WebsiteDemoImages() {

    return (
        <div className="grid gap-4 p-20 bg-white h-[42rem]">

            <div className="flex justify-between h-full overflow-hidden">
                <div >
                    <h1 className="pb-4 text-4xl text-black font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">Redefinindo o Visual</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus recusandae dolorum architecto fuga a harum, dignissimos odio dolore cupiditate facere consectetur optio quod in distinctio id nemo et sed officia?
                    </p>
                </div>
                <img className="h-full max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="" />
            </div>

            <div className="grid grid-cols-5 gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                </div>
            </div>
        </div>

    )
}