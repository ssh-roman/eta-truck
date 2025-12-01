'use client';

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface FormData {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactFormSection() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const t = useTranslations('ContactFormSection');

    return (
        <>  
            <div className="container max-w-[1200px] mx-auto flex flex-col gap-16">
                <div className=" px-5 pt-16 lg:pt-32 text-[#1D4E1A]">
                    <h2 className="text-4xl lg:text-5xl text-center font-heading">{t('title')}</h2>
                    <p className="text-center text-lg lg:text-[18px] mt-3">{t('description')}</p>
                </div>
                <div className=" flex flex-col lg:flex-row justify-between gap-6 px-5 pb-16 lg:pb-24 text-[#1D4E1A]">
                    <div className="lg:w-1/2 rounded-2xl overflow-hidden">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1478.0363669066694!2d28.896386402862657!3d46.97860596718038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1763580691455!5m2!1sen!2s" width="100%" height="100%" loading="lazy"></iframe>
                    </div>
                    <div className="lg:w-1/2">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                            <div className="flex gap-5 w-full">
                                <input
                                    className="bg-[#1D4E1A0D] py-3 px-7 w-full outline-1 outline-[#1D4E1A1F] rounded-xl"
                                    type="text"
                                    name="name"
                                    placeholder={t('name')}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="bg-[#1D4E1A0D] py-3 px-7 w-full outline-1 outline-[#1D4E1A1F] rounded-xl"
                                    type="tel"
                                    name="phone"
                                    placeholder={t('phone')}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex gap-5 w-full">
                                <input
                                    className="bg-[#1D4E1A0D] py-3 px-7 w-full outline-1 outline-[#1D4E1A1F] rounded-xl"
                                    type="email"
                                    name="email"
                                    placeholder={t('email')}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    className="bg-[#1D4E1A0D] py-3 px-7 w-full outline-1 outline-[#1D4E1A1F] rounded-xl"
                                    type="text"
                                    name="subject"
                                    placeholder={t('subject')}
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <textarea
                                className="bg-[#1D4E1A0D] py-3 px-7 w-full outline-1 outline-[#1D4E1A1F] rounded-xl"
                                rows={5}
                                maxLength={500}
                                placeholder={t('message')}
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />

                            {submitStatus === 'success' && (
                                <div className="w-full p-4 bg-green-100 text-green-700 rounded">
                                    Message sent successfully! We&apos;ll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="w-full p-4 bg-red-100 text-red-700 rounded">
                                    Failed to send message. Please try again or contact us directly.
                                </div>
                            )}

                            <button
                                className="bg-[#1D4E1A] text-[#F9F0D6] ps-6 p-2.5 rounded-full w-full flex items-center justify-between gap-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('sending') : t('sendMessage')}
                                
                                <div className="p-2 bg-[#F9F0D6] rounded-full">
                                    <Image src="/icons/arrow-up-right.svg" alt="Send" width={18} height={18} className="" />
                                </div>
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}