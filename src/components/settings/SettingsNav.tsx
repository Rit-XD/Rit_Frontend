'use client'

import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import React, {useState} from 'react'
import css from './SettingsNav.module.scss'

const styles = fromModule(css)

export const SettingsNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gegevens')

  return (
    <aside className={styles.settings()}>
      <h1 className={styles.settings.title()}>Instellingen</h1>
      <p className={styles.settings.subtitle()}>Algemeen</p>
      <nav className={styles.settings.nav()}>
        <div
          className={
            activeTab === 'gegevens'
              ? styles.settings.nav.item.active()
              : styles.settings.nav.item()
          }
        >
          <button
            className={
              activeTab === 'gegevens' ? styles.activeTab() : styles.tab()
            }
            onClick={() => setActiveTab('gegevens')}
          >
            <Icon
              className={styles.settings.icon()}
              mod="square"
              icon="profile"
            />
            Gegevens
          </button>
          <Icon className={styles.settings.icon()} icon="arrowRight" />
        </div>
        <div
          className={
            activeTab === 'wijzig_wachtwoord'
              ? styles.settings.nav.item.active()
              : styles.settings.nav.item()
          }
        >
          <button
            className={
              activeTab === 'wijzig_wachtwoord'
                ? styles.activeTab()
                : styles.tab()
            }
            onClick={() => setActiveTab('wijzig_wachtwoord')}
          >
            <Icon className={styles.settings.icon()} mod="square" icon="key" />
            Wijzig Wachtwoord
          </button>
          <Icon className={styles.settings.icon()} icon="arrowRight" />
        </div>
        <div
          className={
            activeTab === 'meld_schade'
              ? styles.settings.nav.item.active()
              : styles.settings.nav.item()
          }
        >
          <button
            className={
              activeTab === 'meld_schade' ? styles.activeTab() : styles.tab()
            }
            onClick={() => setActiveTab('meld_schade')}
          >
            <Icon
              className={styles.settings.icon()}
              mod="square"
              icon="carCrash"
            />
            Meld Schade
          </button>
          <Icon className={styles.settings.icon()} icon="arrowRight" />
        </div>
      </nav>
    </aside>
  )
}
