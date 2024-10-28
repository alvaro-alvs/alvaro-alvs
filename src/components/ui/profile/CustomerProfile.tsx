
import { GoogleOAuthProvider } from "@react-oauth/google"
import CustomerProfileProvider from "@/components/providers/CustomerProfileProvider"
import type { OrderType, SessionType } from "@/types/ProfileTypes"
import CustomerLastOrder from "./components/CustomerLastOrder";
import CustomerLogin from "./components/auth/CustomerLogin";
import CustomerIndex from "./CustomerIndex";
import type { CustomerType } from "@/types/PaymentTypes";
import { useEffect } from "react";



export default function CustomerProfile({ session, order, oauth_id }: { session?: any | undefined, order?: OrderType | undefined, oauth_id: string }) {


    return (
        <GoogleOAuthProvider clientId={oauth_id}>
            <CustomerProfileProvider>
                <CustomerIndex order={order} />
            </CustomerProfileProvider>
        </GoogleOAuthProvider>
    )
}