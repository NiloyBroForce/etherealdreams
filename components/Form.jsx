"use client";

import { useState, useTransition } from "react";
import Script from "next/script";

export default function MyForm() {
    const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        message: "",
    });
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const { Name, Email, message } = formData;

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!window.grecaptcha?.enterprise) {
            setError("Security library not loaded. Please refresh.");
            return;
        }
        
        // Validation logic
        if (!Email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!Name || !Email || !message) {
            setError("Please fill in all fields.");
            return;
        }

        startTransition(async () => {
            try {
               await new Promise((resolve) => window.grecaptcha.enterprise.ready(resolve));

        const token = await window.grecaptcha.enterprise.execute(
            RECAPTCHA_SITE_KEY, 
            { action: 'submit' }
        );

        const res = await fetch("/api/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: Name, email: Email, message, token }),
        });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Unknown error');

                alert('Thank you for your kind feedback!');
                setFormData({ Name: "", Email: "", message: "" });
            } catch (err) {
                console.error('Submit error:', err);
                setError('Failed to send message. Try again later.');
            }
        });
    };

    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
        />
        <div className="section pt-2 flex flex-col gap-4">
            <p className="text-center text-sm font-[family-name:var(--font-body)] font-medium uppercase tracking-[0.2em] text-white">
                Send me a message
              </p></div>
              <form onSubmit={handleSubmit} style={{ margin: "auto", width: "60%" }}>
				<div id="get" className="section">
					<label className="text-primary">
						Your Name
						<input
							name="Name"
							className="input"
							placeholder="Name"
							value={Name}
							onChange={handleChange}
						/>
					</label>
					<label className="text-primary">
						Your Email
						<input
							name="Email"
							className="input"
							placeholder="Email"
							onChange={handleChange}
							value={Email}
						/>
					</label>
					<label className="text-primary">
						Message
						<textarea
							name="message"
							placeholder="Message"
							className="input"
							onChange={handleChange}
							value={message}
						/>
					</label>

					{error && (
						<p className="text-red-500 text-[12px] text-center">
							{error}
						</p>
					)}
                           <div className="flex justify-center w-full my-4">

        <button

            disabled={isPending}

            className="group relative flex items-center overflow-hidden cursor-pointer

                       bg-[#13aff0] text-white font-bold text-xl py-[0.7em] px-[1.2em] pl-[0.9em] rounded-2xl

                       transition-all duration-300 active:scale-95 border-none disabled:opacity-50


                       shadow-[0_0_15px_rgba(19,175,240,0.4)]

                       hover:shadow-[0_0_40px_rgba(19,175,240,0.7)]

                       hover:brightness-110"

        >


            <div className="absolute inset-0 bg-[#13aff0] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />




            <div className="relative z-10 transition-transform duration-300 ease-in-out group-hover:animate-pulse">

                <svg

                    xmlns="http://www.w3.org/2000/svg"

                    viewBox="0 0 24 24"

                    width="24"

                    height="24"

                    className="block origin-center transition-transform duration-300 ease-in-out group-hover:translate-x-[1.2em] group-hover:rotate-45 group-hover:scale-110"

                >

                    <path fill="none" d="M0 0h24v24H0z"></path>

                    <path

                        fill="currentColor"

                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"

                    ></path>

                </svg>

            </div>




            <span className="relative z-10 block ml-[0.3em] transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-x-4">

                {isPending ? "Sending..." : "Send"}

            </span>

        </button>

   

                </div>

                <div className="text-large text-white">

                    <p style={{ textAlign: "center" }}>

                        Made with Next.js & TailwindCSS{" "}

                    </p>

                </div>

                </div>



            </form>

            </>

        );

}