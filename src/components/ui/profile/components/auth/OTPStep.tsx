import { useCustomer } from "@/components/providers/CustomerProfileProvider";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Label } from "@/components/ui/shadcn-ui/label";
import { formatCpf } from "@/services/formatStrings";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/shadcn-ui/input-otp"




export default function OTPStep() {

    return (
        <>
            <Label>Senha</Label>
            <InputOTP maxLength={4} className="border-rose-500 text-rose-100" onChange={(e) => console.log(e)}>
                <InputOTPGroup className="*:border-rose-500">
                    <p>OXX</p>
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="*:border-rose-500">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            {/* <Input onChange={(e) => setCpf(e.target.value)} value={0} className=' ' placeholder="cpf" maxLength={15} /> */}
            {/* <p className="text-xs pt-5">A senha foi enviada para {customer?.email}</p> */}
        </>
    )
}