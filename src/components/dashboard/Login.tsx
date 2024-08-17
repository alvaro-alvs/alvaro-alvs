import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

export default function DashboardLogin(context: any) {
    const { loginData, setLoginData } = context

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'username') {
            setUsername(value);
        } else if (id === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                setLoginData({
                    ...loginData,
                    status: 'logged'
                })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        console.log(username, password);
    }, [username, password]);

    return (
        <section className="w-1/2 p-0 bg-gradient-to-r from-black to-transparent">
            <div className="p-10 *:grid space-y-10 h-screen">
                <h1 className="text-6xl font-bold">
                    Login
                </h1>

                <Input field='username' label='Username' handleChange={handleChange} />
                <Input field='password' label='Password' handleChange={handleChange} />

                <button
                    onClick={onSubmit}
                    className="flex text-3xl font-thin items-center w-full h-20 border border-orange-700 rounded hover:bg-rose-400 transition"
                >
                    Login
                </button>
            </div>
        </section>
    );
}

type InputProps = {
    field: string;
    label: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ field, label, handleChange }: InputProps) => {
    return (
        <fieldset>
            <label htmlFor={field}>{label}</label>
            <input
                id={field}
                name={field}
                onChange={handleChange}
                className="bg-slate-800/80 p-5 text-2xl"
                type={field === 'password' ? 'password' : 'text'}
                autoComplete={field}
            />
        </fieldset>
    );
};
