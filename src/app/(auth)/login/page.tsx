"use client";

import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld, PasswordField } from "@/components/ui/input";
import { loginUser } from "@/lib/validation/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { ZodIssue } from "zod";
import { getErrorField } from "@/utils/errorRenderer";
import FormMessages from "@/components/repsonse/formResponse";


const initialState = {
	message: "",
};

export default function SignupPage() {
	const [formState, formAction] = useActionState(loginUser, initialState);
	const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
	const [loginEmail, setLoginEmail] = useState<boolean>(true);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const router = useRouter();
	useEffect(() => {
		if (formState.status === 200) {
			router.push("/");
		}
	}, [formState, router]);

	useEffect(() => {
		setErrors(formState.zodErrors)
	}, [formState])


	return (
		<>
			<div className="min-h-screen flex items-center justify-center">
				<div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
					<div className="font-bold justify-center flex gap-4">
						<small onClick={() => setLoginEmail(true)} className={`${loginEmail ? 'underline' : 'no-underline'} cursor-pointer`}>Email</small>
						<small onClick={() => setLoginEmail(false)} className={`${!loginEmail ? 'underline' : 'no-underline'} cursor-pointer`}>Phone Number</small>
					</div>
					<form action={formAction} className="flex flex-col justify-center items-center w-full">
						{
							loginEmail ?
								<EditableInputFIeld
									inputFor="email"
									inputText="Email"
									inputType="email"
									inputId="email"
									inputName="email"
									placeholder="Input your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									error={getErrorField('email', errors)}
								/>
								:
								<EditableInputFIeld
									inputFor="phone-number"
									inputText="Phone Number"
									inputType="text"
									inputId="phone-number"
									inputName="phone-number"
									placeholder="Input your Phone Number"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									required
									error={getErrorField('phone_number', errors)}
								/>
						}
						<PasswordField
							inputFor="password"
							inputText="Password"
							inputId="password"
							inputName="password"
							placeholder="Input your Password"
							error={getErrorField('password', errors)}
						/>

						<SubmitButton
							pendingText="Logging in..."
							buttonText="Login"
						/>
						{/* Display feedback message */}
						<FormMessages formState={formState} errors={errors} />
					</form>
					<div className="flex flex-col items-center gap-1 mt-3">
						<div className="text-sm text-gray-200 text-center">
							<div className="flex gap-3">
								<p>Don&apos;t have an account? &nbsp;</p>
								<Link href="/signup" className="text-blue-600 hover:text-blue-700 underline">
									Sign up
								</Link>
							</div>
							<Link href="/password/forgot" className="text-blue-700 underline">
								Forgort Password
							</Link>
						</div>
					</div>
				</div>
			</div>


		</>
	);
}
