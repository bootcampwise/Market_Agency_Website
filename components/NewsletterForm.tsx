'use client'

export default function NewsletterForm() {
    return (
        <div className="flex w-full flex-col gap-2">
            <form
                className="m-auto flex w-full flex-col gap-4 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="flex-1 rounded-[14px] border border-white bg-transparent px-6 py-4 text-white placeholder-white focus:border-primary focus:bg-transparent focus:outline-none"
                />
                <button
                    type="submit"
                    className="whitespace-nowrap rounded-[14px] bg-primary px-6 py-4 text-xl font-normal text-dark transition-colors hover:bg-primary/90"
                >
                    Subscribe to news
                </button>
            </form>
        </div>
    )
}
