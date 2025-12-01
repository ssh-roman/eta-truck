import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/contacts/ContactFormSection";
import ContactList from "@/components/contacts/ContactList";

import { useTranslations } from 'next-intl';
import { useLocale } from "next-intl";

function ContactPage() {
    const t = useTranslations('ContactPage');
    const locale = useLocale();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <ContactFormSection />
            <ContactList />

            <Footer locale={locale as 'ro' | 'en' | 'ru'} />
        </div>
    )
}

export default ContactPage;