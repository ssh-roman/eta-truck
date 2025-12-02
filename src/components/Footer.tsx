import Link from "next/link";
import BackTopButton from "./microComponents/BackTopButton";
import { SocialIcon } from 'react-social-icons'
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations('Footer');

    const transport1 = [
        { name: "+ 40 727 878 350", href: "tel:+40727878350" },
        { name: "+ 373 68 977 800", href: "tel:+37368977800" },
        { name: "+ 40 720 330 809", href: "tel:+40720330809" },
        { name: "+ 373 689 77 655", href: "tel:+37368977655" },
        { name: "sau.anton@eta-truck.ro", href: "mailto:sau.anton@eta-truck.ro" },
        { name: "lesnic.danu@eta-truck.ro", href: "mailto:lesnic.danu@eta-truck.ro" }
    ];

    const transport2 = [
        { name: "+ 49 1520 7896152", href: "tel:+4915207896152" },
        { name: "+ 40 728 133912", href: "tel:+40728133912" },
        { name: "+ 373 787 88 558", href: "tel:+37378788558" },
        { name: "stejar.v@eta-truck.ro", href: "mailto:stejar.v@eta-truck.ro" }
    ]

    const invoice = [
        { name: "+ 373 689 66 634", href: "tel:+37368966634" },
        { name: "+ 40 727 878 426", href: "tel:+40727878426" },
        { name: "+ 373 689 59 977", href: "tel:+37368959977" },
        { name: "invoice@eta-truck.ro", href: "mailto:invoice@eta-truck.ro" },
        { name: "eta.expedition@gmail.com", href: "mailto:eta.expedition@gmail.com" }
    ]

    const admin = [
        { name: "+ 40 724 483 545", href: "tel:+40724483545" },
        { name: "+ 373 69 519 136", href: "tel:+37369519136" },
        { name: "etatrucklogistic@gmail.com", href: "mailto:etatrucklogistic@gmail.com" }
    ]

    return (
        <>
            <footer className="bg-[#212356] text-white w-full py-16 relative overflow-hidden z-0">
                <div className="container max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 px-4">
                    <div className="flex flex-col gap-8 max-w-xl">
                        <div className="flex flex-col items-start justify-start gap-6">
                            <Link href={`/${locale}/`} className="flex items-center gap-2 group cursor-pointer">
                                <Image src="/logo/logo.svg" alt="Eta Truck Logo" width={150} height={40} className="group-hover:scale-105 transition-all duration-300" />
                            </Link>
                            <p className="text-gray-300 text-sm whitespace-nowrap">S.C. &quot;ETA-TRUCKLOGISTIC&quot; S.R.L <br /> str. Biruintei 20, Ap.8, sector 1 <br /> 012128 București, Romania</p>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-4 gap-8 justify-between">
                        <div className="flex flex-col gap-6">
                            <span className="text-sm font-semibold text-gray-400 uppercase">Transport Agabaritic</span>
                            <div className="flex flex-col gap-3">
                                {transport1.map((item) => (
                                    <Link key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <span className="text-sm font-semibold text-gray-400 uppercase">Transport Agabaritic</span>
                            <div className="flex flex-col gap-3">
                                {transport2.map((item) => (
                                    <Link key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <span className="text-sm font-semibold text-gray-400 uppercase">Invoice</span>
                            <div className="flex flex-col gap-3">
                                {invoice.map((item) => (
                                    <Link key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <span className="text-sm font-semibold text-gray-400 uppercase">Administrare</span>
                            <div className="flex flex-col gap-3">
                                {admin.map((item) => (
                                    <Link key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <span className="text-sm font-semibold text-gray-400 uppercase">{t("followUs")}</span>
                            <div className="flex gap-3">
                                <SocialIcon url="https://facebook.com" bgColor="#FFF" fgColor="#3b82f6" style={{ height: '36px', width: '36px' }} />
                                <SocialIcon url="https://instagram.com" bgColor="#FFF" fgColor="#3b82f6" style={{ height: '36px', width: '36px' }} />
                                <SocialIcon url="https://linkedin.com" bgColor="#FFF" fgColor="#3b82f6" style={{ height: '36px', width: '36px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="bg-[#0e0f38] text-white w-full py-4">
                <div className="container max-w-[1200px] mx-auto flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center text-sm px-4">
                    <span>2025 © ETA Truck. {t("allRightsReserved")}</span>
                    <BackTopButton text="↑" />
                </div>
            </div>
        </>
    );
}
