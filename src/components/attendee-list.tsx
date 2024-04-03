import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime';
import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
import { ChangeEvent, useEffect, useState } from 'react';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');


interface Attendee {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}
export default function AttendeeList() {
    const [search, setSearch] = useState(() => {
            const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees');
            if (url.searchParams.has('search')) {
                return url.searchParams.get('search') ?? '';
            }
            return '';
    });
    const [page, setPage] = useState(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees');
        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'));
        }
        return 1;
    });
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10);
    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees');
        url.searchParams.set('pageIndex', String(page - 1));
        if (search.length > 1) {
            url.searchParams.set('query', search);
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAttendees(data.attendees)
                setTotal(data.total)
            }
            );
    }, [page, search]);
    function setCurrentSearch(search: string): void {
        const url = new URL(window.location.toString());
        url.searchParams.set('search', search);
        window.history.pushState({}, "", url);
        setSearch(search);
    }
    function setCurrentPage(page: number): void {
        const url = new URL(window.location.toString());
        url.searchParams.set('page', String(page));
        window.history.pushState({}, "", url);
        setPage(page);
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value);
        setCurrentPage(1);
    }
    function goToNextPage(): void {
        setCurrentPage(page + 1);
    } function goToPreviousPage(): void {
        setCurrentPage(page - 1);
    }

    function goToFirstPage(): void {
        // setPage(1);
        setCurrentPage(1);
    }
    function goToLastPage(): void {
        setCurrentPage(totalPages);
        // setPage(total);
    }

    return (
        <div>

            <div className="flex gap-3 items-center ">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input onChange={onSearchInputChanged} type="text" name="" id="" placeholder="Buscar participante..." className=" bg-transparent flex-1 outline-none focus:ring-0" value={search}/>
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
                    {attendees.map((attendee) => {
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
                            <TableCell>{attendee.checkedInAt === null ? <span className='text-zinc-400'>Não fez check-in</span> : dayjs().to(attendee.checkedInAt)}</TableCell>
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
                            Mostrando {attendees.length} de {total}
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
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
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