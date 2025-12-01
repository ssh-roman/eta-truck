import { useTranslations } from 'next-intl';

const contactCard = (type: string, href: string, contact: string) => (
    <a className="bg-[#1D4E1A] cursor-pointer w-full p-6 flex flex-col justify-between gap-2 rounded-2xl"
        href={href}>
        <h3 className="text-sm">{type}</h3>
        <span className="font-heading text-xl">{contact}</span>
    </a>
);

export default function ContactList() {
    const t = useTranslations('ContactList');

    const contactList = [
        {
            type: t('generalInquiries'),
            href: 'tel:+37368686818',
            contact: '+373 68 68 68 18'
        },
        {
            type: t('sales'),
            href: 'mailto:danytanint@gmail.com',
            contact: 'danytanint@gmail.com'
        },
        {
            type: t('program'),
            href: 'tel:+37368686818',
            contact: '08:00 – 18:00'
        }
    ];

    return (
        <div className="container max-w-[1200px] mx-auto px-5 pb-16 lg:pb-24 flex flex-col gap-10">
            <h2 className="text-3xl font-heading text-center text-[#1D4E1A]">{t('needHelp')}</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {contactList.map((contact, index) => (
                    <div key={index} className="w-full md:w-1/3">
                        {contactCard(contact.type, contact.href, contact.contact)}
                    </div>
                ))}
            </div>
        </div>
    )
}