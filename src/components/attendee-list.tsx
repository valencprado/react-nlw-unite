import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { ChangeEvent, useState } from 'react';
import { attendees } from '../data/attendees';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
export default function AttendeeList() {
    // const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(attendees.length / 10);
    // function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    //     setSearch(event.target.value);
    // }
    function goToNextPage(): void {
        setPage(page + 1);
    } function goToPreviousPage(): void {
        setPage(page - 1);
    }

    function goToFirstPage(): void {
        setPage(1); 
  } 
  function goToLastPage(): void {
       setPage(totalPages);
    }

    return (
        <div>

            <div className="flex gap-3 items-center ">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input type="text" name="" id="" placeholder="Buscar participante..." className=" bg-transparent flex-1 outline-none" />
                </div>
            </div>
            <Table>

                <thead>
                    <tr className='border-b border-white/10'>
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className='size-4 bg-black/20 rounded border-white/10 h-auto p-0 border-0 text-sm checked:bg-orange-400' name="" id="" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data de check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, (page * 10)).map((attendee) => {
                        return (<TableRow key={attendee.id}>
                            <TableCell>
                                <input type="checkbox" name="" id="" className='size-4 bg-black/20 rounded  border-white/10 h-auto p-0 border-0 text-sm checked:bg-orange-400' />
                            </TableCell>
                            <TableCell>{attendee.id}</TableCell>
                            <TableCell>
                                <div className='flex flex-col gap-1'>

                                    <span> {attendee.name}</span>
                                    <span>{attendee.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                            <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                            <TableCell>
                                <IconButton transparent>
                                    <MoreHorizontal className='size-4' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </tbody>
                <tfoot >
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando {page} de {attendees.length}
                        </TableCell>
                        <TableCell colSpan={3} className='text-right'>
                            <div className='inline-flex items-center gap-8'>
                                <span>Página {page} de {totalPages} </span>
                                <div className='flex gap-1.5'>
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage}  disabled={page === totalPages}>
                                        <ChevronRight className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className='size-4' />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}