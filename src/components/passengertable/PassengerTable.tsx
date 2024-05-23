'use client'

import {EditPassenger} from '@/app/dashboard/passengers/EditPassenger'
import {useUser} from '@/lib/user/useUser'
import {Icon} from '@/ui/Icon'
import {fromModule} from '@/utils/styler/Styler'
import React, {useEffect, useState} from 'react'
import {fetchPassengers} from '../planner/FetchPlanner'
import css from './PassengerTable.module.scss'
import { useRouter } from 'next/navigation'
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react'
import { Loader } from '@/ui/loader/Loader'
import { useAsyncList } from '@react-stately/data'
import { Passenger } from '@/types/passenger.type'

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

  const {user} = useUser()
  //load all possible passengers
  const loadPassengers = async () => {
    if (passengers?.length) return
    setPassengers(await fetchPassengers(user!))
  }
  useEffect(() => {
    loadPassengers()
  }, [user])

  const sort = (key: string) => {
    setPassengers(passengers!.sort((a, b) => a.firstname.localeCompare(b.firstname)))
  }

  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 2;
  const pages = passengers? Math.ceil(passengers!.length / rowsPerPage) : 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return passengers?.length != undefined? passengers!.slice(start, end) : passengers;
  }, [page, passengers]);



  let list = useAsyncList({
    async load({signal}) {
      let res = await fetch('https://swapi.py4e.com/api/people/?search', {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);

      return {
        items: json.results,
      };
    },
    async sort({sortDescriptor}) {
      return {
        items: items!.sort((a, b) => {
          let first = String(a[sortDescriptor.column as keyof Passenger]);
          let second = String(b[sortDescriptor.column as keyof Passenger]);
          let cmp = first < second ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });
  return (
    <div className={styles.tableContainer()}>
      {/* <table className={styles.table()}>
        <thead>
          <tr>
            <th onClick={() => sort("naam")}>Naam</th>
            <th>Leeftijd</th>
            <th>Noodcontact</th>
            <th>Relatie</th>
            <th>Extra</th>
          </tr>
        </thead>
        <tbody>
          {passengers?.map(passengers => (
            <tr key={passengers.id}>
              <td className={styles.table.row()}>
                <div className={styles.table.flex()}>
                  {passengers.firstname} {passengers.lastname}
                  {passengers.wheelchair && (
                    <Icon className={styles.table.icon()} icon="wheelchair" />
                  )}
                </div>
              </td>
              <td className={styles.table.row()}>
                {calculateAge(passengers.dateofbirth || '')}
              </td>
              <td className={styles.table.row()}>
                {`${passengers.emergency_contact || '-'}`}
              </td>
              <td>{passengers.emergency_relation || '-'}</td>
              <td>{passengers.extra || '-'}</td>
              <td
                onClick={() => handleEdit(passengers.id)}
                className={styles.table.row()}
              >
                •••
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

    <Table 
    aria-label="Passenger-table"
    sortDescriptor={list.sortDescriptor}
    onSortChange={list.sort}
    bottomContent={
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    }
    >
      <TableHeader>
        <TableColumn key={"firstname"} allowsSorting>Naam</TableColumn>
        <TableColumn key={"dateofbirth"}>Leeftijd</TableColumn>
        <TableColumn key={"emergency_contact"}>Noodcontact</TableColumn>
        <TableColumn key={"emergency_relation"}>Relatie</TableColumn>
        <TableColumn key={"extra"}>Extra</TableColumn>
        <TableColumn key={""}> </TableColumn>
      </TableHeader>
      
      <TableBody emptyContent={"Geen passagiers gevonden."} items={items || []} isLoading={isLoading}  loadingContent={<Loader/>}>
        {(passenger) => (
          <TableRow key={passenger.id}>
            {/* {(columnKey) => <TableCell>{getKeyValue(passenger, columnKey)}</TableCell>} */}
            <TableCell>{passenger.firstname} {passenger.lastname}</TableCell>
            <TableCell>{calculateAge(passenger.dateofbirth || '')}</TableCell>
            <TableCell>{`${passenger.emergency_contact || '-'}`}</TableCell>
            <TableCell>{passenger.emergency_relation || '-'}</TableCell>
            <TableCell>{passenger.extra || '-'}</TableCell>
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
