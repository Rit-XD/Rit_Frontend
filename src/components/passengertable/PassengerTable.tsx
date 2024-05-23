'use client'

import {EditPassenger} from '@/app/dashboard/passengers/EditPassenger'
import {useUser} from '@/lib/user/useUser'
import {Passenger} from '@/types/passenger.type'
import {fromModule} from '@/utils/styler/Styler'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import {useAsyncList} from '@react-stately/data'
import React, {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {fetchPassengers} from '../planner/FetchPlanner'
import css from './PassengerTable.module.scss'

const styles = fromModule(css)

export const PassengerTable: React.FC<{
  initial: {
    carecenter_id: string
    dateofbirth: string | null
    emergency_contact: string | null
    emergency_relation: string | null
    extra: string | null
    firstname: string
    id: string
    lastname: string
    wheelchair: boolean
  }[]
}> = ({initial}) => {
  const [passengers, setPassengers] = useState<typeof initial>()
  const [isEditPassengerOpen, setEditPassengerOpen] = useState(false)
  const [selectedPassengerId, setSelectedPassengerId] = useState<string | null>(
    null
  )

  const closeEditPassenger = () => {
    setSelectedPassengerId(null)
    setEditPassengerOpen(false)
  }

  const handleEdit = (id: string) => {
    setSelectedPassengerId(id) // Set the selected passenger id when the edit button is clicked
    setEditPassengerOpen(true)
  }

  function calculateAge(dateofbirth: string) {
    const birthDate = new Date(dateofbirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate())

    if (!hasBirthdayPassed) {
      age-- // Subtract 1 from age if the birthday hasn't passed yet
    }
    return age
  }

  const {user, isLoading} = useUser()
  //load all possible passengers
  const loadPassengers = async () => {
    if (passengers?.length) return
    setPassengers(await fetchPassengers(user!))
  }
  useEffect(() => {
    loadPassengers()
  }, [user])

  const sort = (key: string) => {
    setPassengers(
      passengers!.sort((a, b) => a.firstname.localeCompare(b.firstname))
    )
  }

  const [page, setPage] = React.useState(1)
  const rowsPerPage = 10
  const pages = passengers ? Math.ceil(passengers!.length / rowsPerPage) : 1

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return passengers?.length != undefined
      ? passengers!.slice(start, end)
      : passengers
  }, [page, passengers])

  let list = useAsyncList({
    async load({signal}) {
      let res = await fetch('https://swapi.py4e.com/api/people/?search', {
        signal
      })
      let json = await res.json()

      return {
        items: json.results
      }
    },
    async sort({sortDescriptor}) {
      return {
        items: items!.sort((a, b) => {
          let first = String(a[sortDescriptor.column as keyof Passenger])
          let second = String(b[sortDescriptor.column as keyof Passenger])
          let cmp = first < second ? -1 : 1

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1
          }

          return cmp
        })
      }
    }
  })

  if(isLoading) {
    return (
      <div className={styles.tableContainer()}>

        <Table
        classNames={{base: styles.table(), wrapper: styles.tableWrapper()}}
        aria-label="Passenger-table"
        >
        <TableHeader>
          <TableColumn key={'firstname'} width={128} allowsSorting>Voornaam</TableColumn>
          <TableColumn key={'lastname'} width={128} allowsSorting>Achternaam</TableColumn>
          <TableColumn key={'dateofbirth'} width={64}>Leeftijd</TableColumn>
          <TableColumn key={'emergency_contact'} width={256}>Noodcontact</TableColumn>
          <TableColumn key={'emergency_relation'} width={128}>Relatie</TableColumn>
          <TableColumn key={'extra'} width={256}>Extra</TableColumn>
          <TableColumn key={''} width={64}>{' '}</TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={'Geen passagiers gevonden.'}
          items={[{key: 1}, {key: 2}, {key: 3}, {key: 4}, {key: 5}, {key: 6}]}
        >
          {item => (
            <TableRow key={item.key}>
              <TableCell>          
                <Skeleton count={1} width={128} height={16} />
              </TableCell>
              <TableCell>
                <Skeleton count={1} width={128} height={16} />
              </TableCell>
              <TableCell>
                <Skeleton count={1} width={64} height={16} />
              </TableCell>
              <TableCell>
                <Skeleton count={1} width={256} height={16} />
              </TableCell>
              <TableCell>
                <Skeleton count={1} width={128} height={16} />
              </TableCell>
              <TableCell>
                <Skeleton count={1} width={256} height={16} />
              </TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          )}
        </TableBody>
        </Table>

        {isEditPassengerOpen && selectedPassengerId && (
        <EditPassenger id={selectedPassengerId} onClose={closeEditPassenger} />
        )}
      </div>
    )
  }
  return (
    <div className={styles.tableContainer()}>
      <Table
        classNames={{base: styles.table(), wrapper: styles.tableWrapper()}}
        aria-label="Passenger-table"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              className={styles.pagination()}
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key={'firstname'} width={128} allowsSorting>Voornaam</TableColumn>
          <TableColumn key={'lastname'} width={128} allowsSorting>Achternaam</TableColumn>
          <TableColumn key={'dateofbirth'} width={64}>Leeftijd</TableColumn>
          <TableColumn key={'emergency_contact'} width={256}>Noodcontact</TableColumn>
          <TableColumn key={'emergency_relation'} width={128}>Relatie</TableColumn>
          <TableColumn key={'extra'} width={256}>Extra</TableColumn>
          <TableColumn key={''} width={64}>{' '}</TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={'Geen passagiers gevonden.'}
          items={items || []}
        >
          {passenger => (
            <TableRow key={passenger.id}>
              <TableCell>{passenger.firstname}</TableCell>
              <TableCell>{passenger.lastname}</TableCell>
              <TableCell>{calculateAge(passenger.dateofbirth || '')}</TableCell>
              <TableCell>{passenger.emergency_contact}</TableCell>
              <TableCell>{passenger.emergency_relation}</TableCell>
              <TableCell>{passenger.extra}</TableCell>
              <TableCell onClick={() => handleEdit(passenger.id)}>...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isEditPassengerOpen && selectedPassengerId && (
        <EditPassenger id={selectedPassengerId} onClose={closeEditPassenger} />
      )}
    </div>
  )
}
