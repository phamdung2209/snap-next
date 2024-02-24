import Link from 'next/link'
import { Logo } from '~/assets/icons'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gradient-to-r from-slate-500 to-yellow-100">
            <div className="flex flex-col items-center justify-center min-h-screen bg-auth-layout">
                <div className="p-8 bg-white rounded-lg shadow-md min-w-80">
                    <Link href="/" className="flex justify-center mb-4">
                        <Logo width={40} height={40} />
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
