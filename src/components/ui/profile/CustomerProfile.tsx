
import { GoogleOAuthProvider } from "@react-oauth/google"
import CustomerProfileProvider from "@/components/providers/CustomerProfileProvider"
import type { OrderType } from "@/types/ProfileTypes"
import CustomerLastOrder from "./components/CustomerLastOrder";
import CustomerLogin from "./components/auth/CustomerLogin";
import CustomerIndex from "./CustomerIndex";



export default function CustomerProfile({ order, open_pix_app_id, oauth_id }: { order: OrderType | undefined, open_pix_app_id: string, oauth_id: string }) {


    return (
        <GoogleOAuthProvider clientId={oauth_id}>
            <CustomerProfileProvider>
                <CustomerIndex />
            </CustomerProfileProvider>
        </GoogleOAuthProvider>
    )
}