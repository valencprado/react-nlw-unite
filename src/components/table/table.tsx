import { ComponentProps } from "react"
interface TableProps extends ComponentProps<'table'> {

}
export function Table(props: TableProps) {
    return (
        <div className='border border-white/10 rounded-lg flex flex-col gap-4'>

            <table className='w-full ' {...props} ></table>
        </div>)
}