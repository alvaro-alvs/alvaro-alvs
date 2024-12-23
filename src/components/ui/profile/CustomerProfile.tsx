
import { GoogleOAuthProvider } from "@react-oauth/google"
import CustomerProfileProvider from "@/components/providers/CustomerProfileProvider"
import type { OrderType, SessionType } from "@/types/ProfileTypes"
import CustomerIndex from "./CustomerIndex";



export default function CustomerProfile({ session, order, oauth_id }: { session?: any | undefined, order?: OrderType | undefined, oauth_id: string }) {


    return (
        <GoogleOAuthProvider clientId={oauth_id}>
            <CustomerProfileProvider>
                <CustomerIndex order={order} />
            </CustomerProfileProvider>
        </GoogleOAuthProvider>
    )
}