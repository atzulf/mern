import { ZapIcon } from "lucide-react"

const RateLimitedUI = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="shrink-0 bg-primary/20 rounded-full p-4 mb-4 md:mb-0 md:mr-6">
                        <ZapIcon className="size-10 text-primary" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">Rate Limit tercapai</h3>
                        <p className="text-base-content mb-1">
                            Maaf, Anda terlalu banyak mengirim request dan telah mencapai batas penggunaan, mohon tunggu sebentar.
                        </p>
                        <p className="text-sm text-base-content/70">
                            Silakan coba lagi setelah beberapa saat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RateLimitedUI