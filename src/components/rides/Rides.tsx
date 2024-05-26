'use client'

import { fromModule } from '@/utils/styler/Styler'
import React from 'react'
import css from './Rides.module.scss'


const styles = fromModule(css)

export const Rides: React.FC<{old?: boolean}> = ({old}) => {
  return (
    <div className={styles.container()}>
      <h3 className={styles.container.title()}>{old? "Oude" : "Aankomende"} ritten</h3>
      <div className={styles.container.rides()}>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
        <div className={styles.container.ride()}>
            <img src="https://caledoniagladiators.com/wp-content/uploads/2023/08/person.png" alt="passenger" />
            <div>
                <div className={styles.container.ride.group()}>
                <p>Bram Colleman</p>
                <p>17 km</p>
                </div>
                <span>Vandaag om 15.00</span>
            </div>
        </div>
      </div>
    </div>
  )
}
