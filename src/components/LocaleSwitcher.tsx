import { useLocale, useTranslations } from 'next-intl'
import { LocaleSwitcherSelect } from './microComponents/LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'ro',
          label: t('ro'),
        },
        {
          value: 'en',
          label: t('en'),
        },
        {
          value: 'ru',
          label: t('ru'),
        },
      ]}
      label={t('label')}
    />
  )
}
