import { useTable } from "react-table";
import { useMemo } from "react";
import { DummyColumn } from "../../dummy";

export default function TransactionHistory({header, data}){
    const table = useTable({
        DummyColumn, data
    })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>

                </tbody>
            </table>
        </div>
    )
}