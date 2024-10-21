import { GoogleLogin } from '@react-oauth/google';
import { Label } from '../../shadcn-ui/label';
import { Input } from '../../shadcn-ui/input';
import { Button } from '../../shadcn-ui/button';



export default function CustomerLogin() {

    return (
        <section className="text-rose-100 w-full flex flex-col items-center ">
            <div>
                <h1 className='text-2xl'> Login com Email </h1>
                <form action="" className='my-5'>
                    <Label>Email</Label>
                    <Input placeholder="email" />

                    <Button className='w-full bg-fuchsia-900/20 mt-5'>
                        Host
                    </Button>
                </form>
            </div>

            <div className='my-10 border-b w-96'></div>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />
        </section>
    )
}